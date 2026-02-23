import { useState } from 'react'
import './App.css'
import omniLogo from './assets/Omni-Logo-No-BG.png'

type Language = 'en' | 'pt'

const CONTACT_URL = 'mailto:hello@omni.ai'
const LOGO_ALT = 'Omni logo'

const copy: Record<Language, Record<string, string>> = {
  en: {
    navPlatform: 'Platform',
    navSolutions: 'Solutions',
    navCustomers: '',
    navResources: '',
    navAbout: 'About',
    signIn: 'Sign in',
    requestDemo: 'Talk to an AI specialist',
    heroEyebrow: 'AI for real businesses',
    heroTitleLine1: 'Integrate AI into',
    heroTitleLine2: 'every corner of your business.',
    heroBody:
      'Omni is your AI integration layer—connecting models, data, and workflows so you can safely deploy AI into products, operations, and customer experiences, and turn your data into decision-ready insights with data science.',
    ctaPrimary: 'Talk to an AI specialist',
    ctaSecondary: '',
    kpi1Label: 'Automation rate',
    kpi2Label: 'Incidents avoided',
    kpi3Label: 'Time-to-value',
    panelPill: 'AI control center',
    panelPrimaryTitle: 'One brain over all your systems',
    panelPrimaryBody:
      'Monitor AI usage, performance, and risk from a single live workspace—and surface decision signals from your data across every team and tool.',
    panelTodayLabel: "Today's AI initiatives",
    panelToday1: 'Deploy AI copilots to sales and support',
    panelToday2: 'Automate approvals for back-office ops',
    panelToday3: 'Roll out personalized onboarding flows',
    panelMetricLabel: 'Manual work reduced',
    panelPresenceLabel: '',
    sectionTitle:
      'The fastest path from AI idea to production impact—and better decisions.',
    sectionBody:
      'Omni handles the plumbing—integrations, orchestration, governance, and data foundations—so your teams can focus on AI experiences and data-science insights that move the business.',
    feature1Title: 'Data + AI foundation',
    feature1Body:
      'Unify business data for analytics and AI. Securely connect LLMs, vector stores, internal APIs, and SaaS tools behind a single, governed interface.',
    feature1Item1: 'Prebuilt connectors for popular AI stacks',
    feature1Item2: 'Fine-grained access control and tracing',
    feature1Item3: 'Decision-grade datasets for data science',
    feature2Title: 'Orchestrated AI workflows',
    feature2Body:
      'Design, test, and ship AI-powered journeys—from copilots to automated back-office flows—and tie outcomes back to metrics and decisions, exposing everything through secure APIs and modern web experiences.',
    feature2Item1: 'Visual workflow builder with versioning',
    feature2Item2: 'Human-in-the-loop review where it matters',
    feature2Item3: 'Realtime observability and feedback loops',
    feature3Title: 'Responsible AI by default',
    feature3Body:
      'Bake in governance from day one with policy, monitoring, and auditability built into the platform.',
    feature3Item1: 'Policy checks before every deployment',
    feature3Item2: 'Guardrails to prevent unsafe outputs',
    feature3Item3: 'Full audit trail across models and data',
    aboutTitle: 'About Omni',
    aboutBody:
      'Omni was founded in 2024 with a single focus: help real-world businesses safely integrate AI and data science into the decisions that run their products, operations, and customer experiences. We design and build AI systems end to end—from strategy and data pipelines to APIs, web applications, and custom software.',
    aboutFact1: 'Founded in 2024',
    aboutFact2: 'Born remote-first, built for global teams',
    aboutFact3:
      'Headquartered in São Miguel do Iguaçu – Paraná, serving companies worldwide',
    footerBody:
      'Omni helps organizations design, govern, and scale AI across every part of the business—from frontline teams to critical systems.',
    footerProduct: 'Product',
    footerCompany: 'Company',
    footerPlatform: 'Platform overview',
    footerUseCases: 'Use cases',
    footerCustomers: '',
    footerAbout: 'About',
    footerCareers: 'Careers',
    footerSecurity: '',
    footerRights: 'All rights reserved.',
    langLabel: 'EN',
  },
  pt: {
    navPlatform: 'Plataforma',
    navSolutions: 'Soluções',
    navCustomers: '',
    navResources: '',
    navAbout: 'Sobre',
    signIn: 'Entrar',
    requestDemo: 'Falar com um especialista em IA',
    heroEyebrow: 'IA para negócios de verdade',
    heroTitleLine1: 'Integre IA em',
    heroTitleLine2: 'todas as áreas da sua empresa.',
    heroBody:
      'A Omni é a camada de integração de IA do seu negócio — conectando modelos, dados e fluxos para você aplicar IA com segurança em produtos, operações e experiência do cliente, e transformar dados em insights para tomada de decisão com ciência de dados.',
    ctaPrimary: 'Falar com um especialista em IA',
    ctaSecondary: '',
    kpi1Label: 'Taxa de automação',
    kpi2Label: 'Incidentes evitados',
    kpi3Label: 'Tempo até o valor',
    panelPill: 'Central de IA',
    panelPrimaryTitle: 'Um cérebro sobre todos os sistemas',
    panelPrimaryBody:
      'Monitore uso, performance e risco de IA em um único painel vivo — e destaque sinais para decisão a partir dos seus dados entre times e ferramentas.',
    panelTodayLabel: 'Iniciativas de IA de hoje',
    panelToday1: 'Lançar copilots de IA para vendas e suporte',
    panelToday2: 'Automatizar aprovações em operações internas',
    panelToday3: 'Criar jornadas de onboarding personalizadas',
    panelMetricLabel: 'Trabalho manual reduzido',
    panelPresenceLabel: '',
    sectionTitle:
      'O caminho mais rápido da ideia de IA ao impacto real — e a melhores decisões.',
    sectionBody:
      'A Omni cuida da infraestrutura — integrações, orquestração, governança e base de dados — para seus times focarem em experiências de IA e insights de ciência de dados que geram resultado.',
    feature1Title: 'Base de dados + IA',
    feature1Body:
      'Unifique dados do negócio para analytics e IA. Conecte com segurança LLMs, bancos vetoriais, APIs internas e ferramentas SaaS em uma única interface governada.',
    feature1Item1: 'Conectores prontos para os principais stacks de IA',
    feature1Item2: 'Controle de acesso detalhado e rastreabilidade',
    feature1Item3: 'Dados prontos para decisão (ciência de dados)',
    feature2Title: 'Workflows de IA orquestrados',
    feature2Body:
      'Desenhe, teste e publique jornadas com IA — de copilots a automações administrativas — e conecte resultados a métricas e decisões, expondo tudo via APIs seguras e experiências web modernas.',
    feature2Item1: 'Construtor visual com versionamento',
    feature2Item2: 'Revisão humana onde faz diferença',
    feature2Item3: 'Observabilidade em tempo real e feedback contínuo',
    feature3Title: 'IA responsável por padrão',
    feature3Body:
      'Governança desde o primeiro dia, com políticas, monitoramento e auditoria embutidos na plataforma.',
    feature3Item1: 'Políticas checadas antes de cada deploy',
    feature3Item2: 'Guardrails para evitar respostas inseguras',
    feature3Item3: 'Trilha de auditoria entre modelos e dados',
    aboutTitle: 'Sobre a Omni',
    aboutBody:
      'A Omni nasceu em 2024 com um foco claro: ajudar empresas reais a integrarem IA e ciência de dados nas decisões que movem produtos, operações e experiência do cliente. Entregamos soluções completas de IA — da estratégia e dados até APIs, sites e softwares sob medida.',
    aboutFact1: 'Fundada em 2024',
    aboutFact2: 'Nascida remota, preparada para times globais',
    aboutFact3:
      'Sede em São Miguel do Iguaçu – Paraná, atendendo empresas no mundo todo',
    footerBody:
      'A Omni ajuda organizações a desenhar, governar e escalar IA em todas as áreas — de times de linha de frente a sistemas críticos.',
    footerProduct: 'Produto',
    footerCompany: 'Empresa',
    footerPlatform: 'Visão geral da plataforma',
    footerUseCases: 'Casos de uso',
    footerCustomers: '',
    footerAbout: 'Sobre',
    footerCareers: 'Carreiras',
    footerSecurity: '',
    footerRights: 'Todos os direitos reservados.',
    langLabel: 'PT',
  },
}

function App() {
  const [language, setLanguage] = useState<Language>('pt')
  const t = copy[language]

  return (
    <div className="omni-page">
      <header className="omni-header">
        <div className="omni-logo-wrap">
          <img src={omniLogo} alt={LOGO_ALT} className="omni-logo-img" />
          <span className="omni-logo-text">Omni</span>
        </div>

        <nav className="omni-nav">
          <a href="#platform">{t.navPlatform}</a>
          <a href="#solutions">{t.navSolutions}</a>
          <a href="#about">{t.navAbout}</a>
        </nav>

        <div className="omni-header-cta">
          <button
            type="button"
            className="omni-lang-toggle"
            onClick={() => setLanguage(language === 'en' ? 'pt' : 'en')}
            aria-label={
              language === 'en'
                ? 'Mudar para português'
                : 'Switch to English'
            }
          >
            {t.langLabel}
          </button>
          <a className="omni-btn omni-btn-primary" href={CONTACT_URL}>
            {t.ctaPrimary}
          </a>
        </div>
      </header>

      <main className="omni-main">
        <section
          id="platform"
          className="omni-hero"
          aria-labelledby="omni-hero-title"
        >
          <div className="omni-hero-copy">
            <p className="omni-eyebrow">{t.heroEyebrow}</p>
            <h1 id="omni-hero-title">
              {t.heroTitleLine1}
              <span> {t.heroTitleLine2}</span>
            </h1>
            <p className="omni-hero-body">{t.heroBody}</p>

            <div className="omni-hero-actions">
              <a
                className="omni-btn omni-btn-primary omni-btn-lg"
                href={CONTACT_URL}
              >
                {t.ctaPrimary}
              </a>
            </div>

            <div className="omni-hero-meta">
              <div>
                <p className="omni-kpi">3x</p>
                <p className="omni-kpi-label">{t.kpi1Label}</p>
              </div>
              <div>
                <p className="omni-kpi">99.99%</p>
                <p className="omni-kpi-label">{t.kpi2Label}</p>
              </div>
              <div>
                <p className="omni-kpi">140+</p>
                <p className="omni-kpi-label">{t.kpi3Label}</p>
              </div>
            </div>
          </div>

          <div className="omni-hero-panel" aria-label="Omni workspace preview">
            <div className="omni-panel-header">
              <span className="omni-pill">{t.panelPill}</span>
              <span className="omni-status-dot" />
            </div>

            <div className="omni-panel-grid">
              <div className="omni-panel-card omni-panel-card-primary">
                <h2>{t.panelPrimaryTitle}</h2>
                <p>{t.panelPrimaryBody}</p>
              </div>
              <div className="omni-panel-card">
                <p className="omni-panel-label">{t.panelTodayLabel}</p>
                <ul>
                  <li>{t.panelToday1}</li>
                  <li>{t.panelToday2}</li>
                  <li>{t.panelToday3}</li>
                </ul>
              </div>
              <div className="omni-panel-card">
                <p className="omni-panel-number">+42%</p>
                <p className="omni-panel-label">{t.panelMetricLabel}</p>
                <div className="omni-progress">
                  <span style={{ width: '72%' }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="solutions"
          className="omni-section omni-section-muted"
          aria-label="Key Omni capabilities"
        >
          <div className="omni-section-header">
            <h2>{t.sectionTitle}</h2>
            <p>{t.sectionBody}</p>
          </div>

          <div className="omni-feature-grid">
            <article className="omni-feature">
              <h3>{t.feature1Title}</h3>
              <p>{t.feature1Body}</p>
              <ul>
                <li>{t.feature1Item1}</li>
                <li>{t.feature1Item2}</li>
                <li>{t.feature1Item3}</li>
              </ul>
            </article>

            <article className="omni-feature">
              <h3>{t.feature2Title}</h3>
              <p>{t.feature2Body}</p>
              <ul>
                <li>{t.feature2Item1}</li>
                <li>{t.feature2Item2}</li>
                <li>{t.feature2Item3}</li>
              </ul>
            </article>

            <article className="omni-feature">
              <h3>{t.feature3Title}</h3>
              <p>{t.feature3Body}</p>
              <ul>
                <li>{t.feature3Item1}</li>
                <li>{t.feature3Item2}</li>
                <li>{t.feature3Item3}</li>
              </ul>
            </article>
          </div>
        </section>

        <section
          id="about"
          className="omni-section"
          aria-label={t.aboutTitle}
        >
          <div className="omni-section-header">
            <h2>{t.aboutTitle}</h2>
            <p>{t.aboutBody}</p>
          </div>

          <div className="omni-feature-grid">
            <article className="omni-feature">
              <h3>{t.aboutFact1}</h3>
            </article>
            <article className="omni-feature">
              <h3>{t.aboutFact2}</h3>
            </article>
            <article className="omni-feature">
              <h3>{t.aboutFact3}</h3>
            </article>
          </div>
        </section>
      </main>

      <footer className="omni-footer">
        <div className="omni-footer-main">
          <div>
            <div className="omni-logo-wrap">
              <img src={omniLogo} alt={LOGO_ALT} className="omni-logo-img" />
              <span className="omni-logo-text">Omni</span>
            </div>
            <p>{t.footerBody}</p>
          </div>
          <div className="omni-footer-links">
            <div>
              <p className="omni-footer-heading">{t.footerProduct}</p>
              <a href="#platform">{t.footerPlatform}</a>
              <a href="#solutions">{t.footerUseCases}</a>
            </div>
            <div>
              <p className="omni-footer-heading">{t.footerCompany}</p>
              <a href="#about">{t.footerAbout}</a>
            </div>
          </div>
        </div>
        <div className="omni-footer-bottom">
          <span>© {new Date().getFullYear()} Omni Technologies, Inc.</span>
          <span>{t.footerRights}</span>
        </div>
      </footer>
    </div>
  )
}

export default App
