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

const services = [
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
]

export default function Services() {
  return (
    <section className="page services-page">
      <div className="page-hero">
        <p className="eyebrow">Servicios</p>
        <h1>Soluciones de inteligencia aplicada para decisiones institucionales.</h1>
        <p>
          Diseñamos, construimos y acompañamos sistemas que conectan datos,
          procesos, análisis y experiencia de usuario. Nuestro trabajo empieza con
          diagnóstico y termina en productos que pueden operar, medirse y mejorar.
        </p>
      </div>

      <div className="service-grid">
        {services.map((service) => {
          const Icon = service.icon
          return (
            <article className="service-card" key={service.title}>
              <div className="service-icon">
                <Icon />
              </div>
              <h2>{service.title}</h2>
              <dl>
                <div>
                  <dt>Problema</dt>
                  <dd>{service.problem}</dd>
                </div>
                <div>
                  <dt>Entregamos</dt>
                  <dd>{service.deliverable}</dd>
                </div>
                <div>
                  <dt>Para quién</dt>
                  <dd>{service.audience}</dd>
                </div>
                <div>
                  <dt>Valor</dt>
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
