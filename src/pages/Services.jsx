import {
  Activity,
  BarChart3,
  Bot,
  BrainCircuit,
  GraduationCap,
  MessageSquareText,
  ShieldCheck,
  Workflow,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/language'

const serviceCopy = {
  es: {
    eyebrow: 'Servicios',
    title: 'Soluciones de inteligencia aplicada para decisiones institucionales.',
    lead:
      'Diseñamos, construimos y acompañamos sistemas que conectan datos, procesos, análisis y experiencia de usuario. Nuestro trabajo empieza con diagnóstico y termina en productos que pueden operar, medirse y mejorar.',
    labels: ['Problema', 'Entregamos', 'Para quién', 'Valor'],
    services: [
      {
        icon: Activity,
        title: 'Diagnóstico estratégico con IA',
        problem: 'Procesos con mucha información, poca lectura ejecutiva y decisiones tomadas sin evidencia suficiente.',
        deliverable: 'Mapa de problemas, fuentes, riesgos, oportunidades y ruta de automatización priorizada.',
        audience: 'Direcciones generales, equipos de innovación, áreas públicas y proyectos institucionales.',
        value: 'Permite decidir dónde invertir primero y qué solución digital tiene sentido construir.',
        cta: 'Solicitar diagnóstico',
      },
      {
        icon: Workflow,
        title: 'Automatización de procesos',
        problem: 'Flujos manuales, registros duplicados, pérdida de tiempo y baja trazabilidad operativa.',
        deliverable: 'Aplicaciones web, formularios, paneles administrativos e integraciones ligeras.',
        audience: 'Empresas, comercios, organizaciones, escuelas y equipos administrativos.',
        value: 'Reduce fricción, ordena responsabilidades y vuelve visible la operación diaria.',
        cta: 'Explorar solución',
      },
      {
        icon: BarChart3,
        title: 'Dashboards y visualización de datos',
        problem: 'Datos existentes que no se convierten en lectura estratégica ni seguimiento institucional.',
        deliverable: 'Tableros, indicadores, módulos comparativos, mapas y narrativas ejecutivas.',
        audience: 'Gobiernos, consultoras, áreas de seguridad, evaluación, ventas o investigación.',
        value: 'Convierte bases complejas en evidencia legible para tomar decisiones y comunicar hallazgos.',
        cta: 'Ver enfoque',
      },
      {
        icon: BrainCircuit,
        title: 'Modelos de inteligencia artificial',
        problem: 'Necesidad de clasificar, priorizar, detectar patrones o anticipar comportamientos con datos disponibles.',
        deliverable: 'Modelos, prototipos, asistentes, clasificadores y sistemas de recomendación.',
        audience: 'Equipos con datos históricos, bases operativas o necesidades predictivas.',
        value: 'Produce criterios automatizados, auditables y útiles para decisiones recurrentes.',
        cta: 'Agendar consulta',
      },
      {
        icon: MessageSquareText,
        title: 'Social listening y análisis público',
        problem: 'Conversaciones digitales dispersas que no se traducen en comprensión reputacional o política.',
        deliverable: 'Monitoreo, clasificación narrativa, análisis temático y reportes estratégicos.',
        audience: 'Instituciones, campañas, universidades, medios y organizaciones con exposición pública.',
        value: 'Ayuda a entender opinión, conflicto, reputación y narrativas emergentes.',
        cta: 'Solicitar análisis',
      },
      {
        icon: ShieldCheck,
        title: 'Seguridad institucional y trazabilidad',
        problem: 'Accesos, registros o validaciones sin capas suficientes de control, identidad y seguimiento.',
        deliverable: 'Experiencias con QR, identidad documental, validación facial, registros y trazabilidad.',
        audience: 'Instituciones, eventos, edificios, escuelas, empresas y espacios con control de acceso.',
        value: 'Eleva confianza, reduce riesgo y convierte cada operación en información verificable.',
        cta: 'Conocer FaceR',
      },
      {
        icon: GraduationCap,
        title: 'Capacitación y formación aplicada',
        problem: 'Equipos que usan IA de forma improvisada, sin método, ética, evaluación o productividad real.',
        deliverable: 'Cursos, talleres, guías, ejercicios y acompañamiento para adoptar IA con criterio.',
        audience: 'Docentes, investigadores, médicos, servidores públicos, empresas y universidades.',
        value: 'Instala capacidades internas para trabajar mejor con IA sin depender de soluciones opacas.',
        cta: 'Diseñar curso',
      },
      {
        icon: Bot,
        title: 'Consultoría para productos digitales',
        problem: 'Ideas con potencial que aún no tienen arquitectura, narrativa, interfaz ni ruta de publicación.',
        deliverable: 'Prototipos, landing pages, apps, productos mínimos viables y mejora conceptual.',
        audience: 'Emprendimientos, artistas, comercios, consultoras y proyectos en fase de crecimiento.',
        value: 'Convierte una idea en experiencia publicable, vendible y técnicamente sostenible.',
        cta: 'Iniciar proyecto',
      },
    ],
  },
  en: {
    eyebrow: 'Services',
    title: 'Applied intelligence solutions for institutional decision-making.',
    lead:
      'We design, build and support systems that connect data, processes, analysis and user experience. Our work begins with diagnosis and ends with products that can operate, be measured and improve over time.',
    labels: ['Problem', 'We deliver', 'Who it serves', 'Value'],
    services: [
      {
        icon: Activity,
        title: 'Strategic AI diagnosis',
        problem: 'Information-heavy processes with limited executive reading and decisions made without enough evidence.',
        deliverable: 'A map of problems, sources, risks, opportunities and a prioritized automation roadmap.',
        audience: 'Executive teams, innovation units, public agencies and institutional projects.',
        value: 'Clarifies where to invest first and which digital solution is worth building.',
        cta: 'Request an assessment',
      },
      {
        icon: Workflow,
        title: 'Process automation',
        problem: 'Manual workflows, duplicate records, lost time and weak operational traceability.',
        deliverable: 'Web applications, forms, administrative panels and lightweight integrations.',
        audience: 'Companies, retailers, organizations, schools and administrative teams.',
        value: 'Reduces friction, organizes responsibilities and makes daily operations visible.',
        cta: 'Explore solution',
      },
      {
        icon: BarChart3,
        title: 'Dashboards and data visualization',
        problem: 'Existing data that does not become strategic reading or institutional follow-up.',
        deliverable: 'Dashboards, indicators, comparative modules, maps and executive narratives.',
        audience: 'Governments, consulting teams, security, evaluation, sales or research units.',
        value: 'Turns complex databases into readable evidence for decisions and communication.',
        cta: 'View approach',
      },
      {
        icon: BrainCircuit,
        title: 'Artificial intelligence models',
        problem: 'The need to classify, prioritize, detect patterns or anticipate behaviors using available data.',
        deliverable: 'Models, prototypes, assistants, classifiers and recommendation systems.',
        audience: 'Teams with historical data, operational databases or predictive needs.',
        value: 'Produces automated, auditable and useful criteria for recurring decisions.',
        cta: 'Schedule consultation',
      },
      {
        icon: MessageSquareText,
        title: 'Social listening and public analysis',
        problem: 'Dispersed digital conversations that do not become reputational or political understanding.',
        deliverable: 'Monitoring, narrative classification, thematic analysis and strategic reports.',
        audience: 'Institutions, campaigns, universities, media and organizations with public exposure.',
        value: 'Helps understand opinion, conflict, reputation and emerging narratives.',
        cta: 'Request analysis',
      },
      {
        icon: ShieldCheck,
        title: 'Institutional security and traceability',
        problem: 'Access, records or validations without enough control, identity and follow-up layers.',
        deliverable: 'Experiences with QR, document identity, facial validation, records and traceability.',
        audience: 'Institutions, events, buildings, schools, companies and controlled-access spaces.',
        value: 'Increases trust, reduces risk and turns every operation into verifiable information.',
        cta: 'Meet FaceR',
      },
      {
        icon: GraduationCap,
        title: 'Training and applied learning',
        problem: 'Teams using AI improvisedly, without method, ethics, evaluation or real productivity.',
        deliverable: 'Courses, workshops, guides, exercises and support to adopt AI with judgment.',
        audience: 'Teachers, researchers, physicians, public officials, companies and universities.',
        value: 'Builds internal capacity to work better with AI without relying on opaque solutions.',
        cta: 'Design training',
      },
      {
        icon: Bot,
        title: 'Digital product consulting',
        problem: 'Promising ideas that still lack architecture, narrative, interface or publication roadmap.',
        deliverable: 'Prototypes, landing pages, apps, minimum viable products and conceptual improvement.',
        audience: 'Entrepreneurs, artists, retailers, consulting firms and growing projects.',
        value: 'Turns an idea into a publishable, sellable and technically sustainable experience.',
        cta: 'Start project',
      },
    ],
  },
}

export default function Services() {
  const { language } = useLanguage()
  const copy = serviceCopy[language]

  return (
    <section className="page services-page">
      <div className="page-hero">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1>{copy.title}</h1>
        <p>{copy.lead}</p>
      </div>

      <div className="service-grid">
        {copy.services.map((service) => {
          const Icon = service.icon
          return (
            <article className="service-card" key={service.title}>
              <div className="service-icon">
                <Icon />
              </div>
              <h2>{service.title}</h2>
              <dl>
                <div>
                  <dt>{copy.labels[0]}</dt>
                  <dd>{service.problem}</dd>
                </div>
                <div>
                  <dt>{copy.labels[1]}</dt>
                  <dd>{service.deliverable}</dd>
                </div>
                <div>
                  <dt>{copy.labels[2]}</dt>
                  <dd>{service.audience}</dd>
                </div>
                <div>
                  <dt>{copy.labels[3]}</dt>
                  <dd>{service.value}</dd>
                </div>
              </dl>
              <Link className="text-link" to="/contacto">
                {service.cta}
              </Link>
            </article>
          )
        })}
      </div>
    </section>
  )
}
