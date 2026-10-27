---
title: 'Define useful before you measure intelligent'
description: 'An impressive AI demonstration is a starting point. A useful system needs a clear standard for the work it is meant to do.'
publishedAt: 2026-10-24T09:00:00+02:00
topic: ai
type: Essay
sample: true
---

An AI-generated answer can be fluent, plausible and difficult to use. That is a reason to define the task more carefully, rather than letting a convincing demonstration become the acceptance test.

## Name the outcome

Suppose a team wants help summarizing support requests. “Produce a good summary” leaves too much room for interpretation.

A more useful description identifies the reader, the decision they need to make and the information they must be able to trust. For example: a support lead needs to identify the issue, the actions already attempted and any unresolved question without reopening the full conversation.

This hypothetical task gives us something to evaluate.

## Test the failure cases

A small set of representative examples should include difficult inputs, missing context and cases where the right answer is to acknowledge uncertainty.

| Question                       | What to inspect                                    |
| ------------------------------ | -------------------------------------------------- |
| Is the summary grounded?       | Can each factual claim be traced to the request?   |
| Is anything important missing? | Are unresolved issues and prior actions preserved? |
| Is the result usable?          | Can the intended reader make the next decision?    |

A numerical score can help organize observations. It does not replace looking at the mistakes and deciding whether they matter for the task.

## Include the surrounding work

The model is one part of a process. People may still need to provide context, review a result, correct an error or handle an exception.

A useful evaluation considers that whole path. Otherwise, improving the generated text could make the demonstration better while leaving the actual work unchanged.

## Set a reconsideration point

Before expanding a trial, state what would justify continuing, changing the approach or stopping. That makes a pilot a learning exercise with a decision at the end.

The most productive first question may be simple: **what does useful look like for this specific person, doing this specific job?**
