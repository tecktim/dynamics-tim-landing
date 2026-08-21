export interface EngagementModel {
  id: 'audit' | 'embedded' | 'fullpackage';
  badge: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  details: string[];
  caseStudy: {
    industry: string;
    text: string;
  };
  href: string;
  cta: string;
}

export const engagementModels: EngagementModel[] = [
  {
    id: 'audit',
    badge: 'Schnelleinstieg · 1–2 Wochen',
    title: 'Audit & Strategie',
    tagline: 'Du bekommst Klarheit — nicht nur Folien.',
    description:
      'Ich analysiere deine aktuelle Dynamics 365 Landschaft: Architektur, Security, Prozesse und ALM. Am Ende steht ein priorisierter Aktionsplan mit Quick Wins, Risiken und Roadmap.',
    features: [
      'Architektur- & Security-Analyse',
      'ALM- und DevOps-Bewertung',
      'Priorisierter Maßnahmenplan',
      'Aufwandsschätzung für nächste Schritte',
    ],
    details: [
      'Security Model Audits: Business Units, Rollen, Field Security und DLP',
      'Performance Tuning für Model-driven Apps, Plugins und Datenabfragen',
      'ALM-Standards für mehrere Umgebungen und release-sichere Deployments',
    ],
    caseStudy: {
      industry: 'IT-Dienstleister',
      text: 'Für einen IT-Dienstleister habe ich in 10 Tagen eine undokumentierte Plugin-Architektur mit 40+ Custom-Steps analysiert und kritische Sicherheitslücken im Rollenmodell aufgedeckt — Ergebnis: konsolidierter Maßnahmenplan, der 3 Monate Fehlerbehebung eingespart hat.',
    },
    href: 'contact',
    cta: 'Audit anfragen',
  },
  {
    id: 'embedded',
    badge: 'Laufend · Sprint-basiert',
    title: 'Embedded Developer',
    tagline: 'Senior-Kraft ins Team — ohne Overhead.',
    description:
      'Ich integriere mich direkt in euren SCRUM oder Kanban-Prozess und liefere Features, Plugins, Integrationen und Tests im Sprint-Rhythmus. Mit Pair-Programming und Code-Reviews hebe ich gleichzeitig das Niveau des Teams.',
    features: [
      'C# Plugins, PCF Controls & Power Automate',
      'Azure Functions & Service Bus Integrationen',
      'Playwright UI-Tests & Quality Gates',
      'Pair-Programming & Code-Reviews',
    ],
    details: [
      'Dynamics 365 Sales/Service Integrationen mit ERP, BI und Microsoft 365',
      'Power Automate Orchestrierung mit sauberem Fehlerhandling und Monitoring',
      'Azure Functions, Service Bus und Event Grid für event-driven Workflows',
    ],
    caseStudy: {
      industry: 'Maschinenbauunternehmen',
      text: 'Für ein Maschinenbauunternehmen habe ich als Embedded Developer über 6 Monate eine komplexe ERP-Dynamics-Integration mit Azure Service Bus und automatisierten UI-Tests aufgebaut — Ergebnis: stabile Release-Zyklen alle 2 Wochen ohne manuelle Regressionstests.',
    },
    href: 'contact',
    cta: 'Verfügbarkeit anfragen',
  },
  {
    id: 'fullpackage',
    badge: 'End-to-End · 3–4 Monate',
    title: 'Full Package: Audit → Enablement',
    tagline: 'Einmal richtig machen. Dauerhaft wirken.',
    description:
      'Vom Audit über Konzeption und Umsetzung bis zur Team-Übergabe. Ich verantworte den gesamten Zyklus und stelle sicher, dass dein Team am Ende eigenständig releasen kann.',
    features: [
      'Vollständiger Audit & Zielbild',
      'Iterative Umsetzung mit DevOps',
      'Dokumentation & Übergabe-Sprint',
      'Team-Enablement & Coaching',
    ],
    details: [
      'Dataverse, Model-driven Apps, Custom Pages und Canvas Apps',
      'CI/CD mit Azure DevOps oder GitHub Actions inklusive Quality Gates',
      'Monitoring über Application Insights, Log Analytics und Alerts',
    ],
    caseStudy: {
      industry: 'Handelsunternehmen',
      text: 'Für ein Handelsunternehmen habe ich von Audit bis Übergabe ein komplettes Dynamics 365 Sales-Rollout durchgeführt — Ergebnis: das interne Team konnte nach 12 Wochen eigenständig neue Features deployen, ohne externen Support.',
    },
    href: 'contact',
    cta: 'Gesamtpaket anfragen',
  },
];
