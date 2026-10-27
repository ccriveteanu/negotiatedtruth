import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';
const program = await readFile(
  new URL('../src/lib/appearance.js', import.meta.url),
  'utf8',
);
const key = 'negotiatedtruth:appearance';
function browser({ stored = null, dark = false, blocked = false } = {}) {
  const saved = new Map(stored === null ? [] : [[key, stored]]);
  const documentListeners = new Map(),
    windowListeners = new Map();
  let mediaListener,
    loaded = false;
  const root = { dataset: {} };
  const meta = {
    content: '',
    setAttribute(name, value) {
      this[name] = value;
    },
  };
  class Select {
    value = 'system';
    disabled = true;
    matches(selector) {
      return selector === '[data-appearance-select]';
    }
  }
  const select = new Select();
  const query = {
    matches: dark,
    addEventListener(_name, callback) {
      mediaListener = callback;
    },
  };
  const document = {
    documentElement: root,
    querySelector: () => meta,
    querySelectorAll: () => (loaded ? [select] : []),
    addEventListener: (name, callback) => documentListeners.set(name, callback),
  };
  const window = {
    matchMedia: () => query,
    get localStorage() {
      if (blocked) throw new Error('Storage denied');
      return {
        getItem: (name) => saved.get(name) ?? null,
        setItem: (name, value) => saved.set(name, value),
      };
    },
    addEventListener: (name, callback) => windowListeners.set(name, callback),
  };
  runInNewContext(program, { window, document, HTMLSelectElement: Select });
  return {
    root,
    meta,
    saved,
    select,
    load() {
      loaded = true;
      documentListeners.get('DOMContentLoaded')();
    },
    choose(value) {
      select.value = value;
      documentListeners.get('change')({ target: select });
    },
    system(value) {
      query.matches = value;
      mediaListener();
    },
    storage(value, storageKey = key) {
      windowListeners.get('storage')({ key: storageKey, newValue: value });
    },
  };
}
test('saved preference is applied in the head before controls exist', () => {
  const page = browser({ stored: 'light', dark: true });
  assert.equal(page.root.dataset.theme, 'light');
  assert.equal(page.meta.content, '#f7f5ef');
  assert.equal(page.select.disabled, true);
  page.load();
  assert.equal(page.select.value, 'light');
  assert.equal(page.select.disabled, false);
});
test('system default follows the device and reacts to changes', () => {
  const page = browser({ dark: true });
  page.load();
  assert.equal(page.root.dataset.appearance, 'system');
  assert.equal(page.root.dataset.theme, 'dark');
  assert.equal(page.meta.content, '#191a18');
  page.system(false);
  assert.equal(page.root.dataset.theme, 'light');
});
test('explicit choices persist across navigation and override device changes', () => {
  const page = browser();
  page.load();
  page.choose('dark');
  assert.equal(page.saved.get(key), 'dark');
  page.system(false);
  assert.equal(page.root.dataset.theme, 'dark');
  const next = browser({ stored: page.saved.get(key) });
  assert.equal(next.root.dataset.theme, 'dark');
  page.choose('light');
  page.system(true);
  assert.equal(page.root.dataset.theme, 'light');
});
test('returning to System restores device-driven behavior', () => {
  const page = browser({ stored: 'light', dark: true });
  page.load();
  page.choose('system');
  assert.equal(page.root.dataset.theme, 'dark');
  assert.equal(page.saved.get(key), 'system');
  page.system(false);
  assert.equal(page.root.dataset.theme, 'light');
});
test('unavailable storage does not break changing appearance', () => {
  const page = browser({ blocked: true });
  page.load();
  page.choose('dark');
  assert.equal(page.root.dataset.theme, 'dark');
  assert.equal(page.select.value, 'dark');
});
test('invalid saved values fall back to System', () => {
  const page = browser({ stored: 'unknown', dark: true });
  page.load();
  assert.equal(page.select.value, 'system');
  assert.equal(page.root.dataset.theme, 'dark');
});
test('other-tab changes and clearing storage synchronize the controls', () => {
  const page = browser();
  page.load();
  page.storage('dark');
  assert.equal(page.select.value, 'dark');
  assert.equal(page.root.dataset.theme, 'dark');
  page.storage('light', 'unrelated-key');
  assert.equal(page.root.dataset.theme, 'dark');
  page.storage(null, null);
  assert.equal(page.select.value, 'system');
  assert.equal(page.root.dataset.theme, 'light');
});
function luminance(hex) {
  const channels = hex
    .match(/[a-f\d]{2}/gi)
    .map((c) => parseInt(c, 16) / 255)
    .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return channels.reduce(
    (sum, v, i) => sum + v * [0.2126, 0.7152, 0.0722][i],
    0,
  );
}
function contrast(a, b) {
  const x = luminance(a),
    y = luminance(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}
test('both palettes keep reading text, metadata and links at AA contrast', async () => {
  const css = await readFile(
    new URL('../src/styles/global.css', import.meta.url),
    'utf8',
  );
  const tokens = Object.fromEntries(
    [
      ...css.matchAll(
        /--([\w-]+):\s*light-dark\(\s*(#[a-f\d]{6}),\s*(#[a-f\d]{6})\s*\)/gi,
      ),
    ].map((m) => [m[1], [m[2], m[3]]]),
  );
  for (const mode of [0, 1])
    for (const background of ['paper', 'surface'])
      for (const text of ['ink', 'text', 'muted', 'link']) {
        const ratio = contrast(tokens[text][mode], tokens[background][mode]);
        assert(
          ratio >= 4.5,
          `${text} on ${background}, mode ${mode}: ${ratio.toFixed(2)}:1`,
        );
      }
});
