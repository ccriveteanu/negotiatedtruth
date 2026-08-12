// Site configuration and content
export const siteConfig = {
  title: "Negotiated Truth",
  description: "A production-quality public website built with Astro",
  url: "https://negotiatedtruth.github.io",
  base: "/",
  
  navLinks: [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Work", href: "#work" },
    { label: "Contact", href: "#contact" },
  ],
  
  hero: {
    title: "Clarity Through Conversation",
    subtitle: "We help organizations find common ground through strategic communication and negotiation.",
    ctaText: "Get Started",
    ctaLink: "#contact",
  },
  
  features: [
    {
      title: "Strategic Negotiation",
      description: "Expert guidance through complex negotiations to reach mutually beneficial outcomes.",
      icon: "⚖️",
    },
    {
      title: "Conflict Resolution",
      description: "Mediation services that de-escalate tensions and rebuild working relationships.",
      icon: "🤝",
    },
    {
      title: "Communication Strategy",
      description: "Clear, compelling messaging that resonates with your target audience.",
      icon: "📢",
    },
  ],
  
  work: [
    {
      title: "Corporate Merger",
      category: "Business",
      description: "Facilitated negotiations between two Fortune 500 companies.",
    },
    {
      title: "Community Mediation",
      category: "Public",
      description: "Resolved long-standing disputes between neighborhood groups.",
    },
    {
      title: "Labor Relations",
      category: "Human Resources",
      description: "Negotiated collective bargaining agreement for major industry.",
    },
  ],
  
  about: {
    headline: "About Us",
    text: "Founded on the belief that every conflict holds the seed of opportunity, we combine journalistic rigor with diplomatic finesse. Our team brings years of experience in negotiation, communication strategy, and conflict resolution to help organizations and individuals find common ground.",
    stats: [
      { number: "100+", label: "Projects Completed" },
      { number: "25+", label: "Years Experience" },
      { number: "98%", label: "Client Satisfaction" },
    ],
  },
  
  contact: {
    cta: "Ready to find your negotiated truth?",
    email: "contact@negotiatedtruth.example",
    phone: "+1 (555) 000-0000",
  },
  
  footer: {
    copyright: "© 2024 Negotiated Truth. All rights reserved.",
    socialLinks: [
      { label: "Twitter", href: "#" },
      { label: "LinkedIn", href: "#" },
      { label: "Email", href: "mailto:contact@negotiatedtruth.example" },
    ],
  },
};

export type SiteConfig = typeof siteConfig;
