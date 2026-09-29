import { Component, lazy, Suspense } from 'react'
import { useLanguage } from '../i18n/language'

const CoursesExperience = lazy(() => import('./courses/CoursesExperience'))

const courses = [
  {
    title: { es: 'IA para ciencias sociales', en: 'AI for social sciences' },
    description: {
      es: 'Formación práctica para usar inteligencia artificial en investigación, análisis cualitativo, organización documental y escritura académica.',
      en: 'Practical training to use artificial intelligence in research, qualitative analysis, document organization and academic writing.',
    },
  },
  {
    title: { es: 'IA, comunicación política y ciudadanía', en: 'AI, political communication and citizenship' },
    description: {
      es: 'Curso para analizar conversación pública, narrativas, reputación, campañas y vínculos entre ciudadanía e instituciones.',
      en: 'A course to analyze public conversation, narratives, reputation, campaigns and links between citizens and institutions.',
    },
  },
  {
    title: { es: 'IA aplicada para equipos profesionales', en: 'Applied AI for professional teams' },
    description: {
      es: 'Programa modular para adoptar herramientas de IA con método, ética, productividad y evaluación de resultados.',
      en: 'A modular program to adopt AI tools with method, ethics, productivity and outcome evaluation.',
    },
  },
]

const courseCopy = {
  es: {
    eyebrow: 'Formación',
    title: 'Capacitación para usar IA con método, criterio y resultados.',
    lead:
      'Diseñamos cursos y talleres para investigadores, docentes, equipos públicos, empresas y organizaciones que necesitan incorporar inteligencia artificial sin improvisación.',
  },
  en: {
    eyebrow: 'Training',
    title: 'Training to use AI with method, judgment and results.',
    lead:
      'We design courses and workshops for researchers, educators, public teams, companies and organizations that need to incorporate artificial intelligence without improvisation.',
  },
}

function ExistingCourses({ language }) {
  const copy = courseCopy[language]

  return (
    <section className="page courses-page">
      <div className="page-hero">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1>{copy.title}</h1>
        <p>{copy.lead}</p>
      </div>

      <div className="cards-grid three">
        {courses.map((course) => (
          <article className="glass-card" key={course.title.es}>
            <h2>{course.title[language]}</h2>
            <p>{course.description[language]}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

class CoursesBoundary extends Component {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

export default function Courses() {
  const { language } = useLanguage()
  const existingCourses = <ExistingCourses language={language} />

  if (language !== 'es') return existingCourses

  return (
    <CoursesBoundary fallback={existingCourses}>
      <Suspense fallback={existingCourses}>
        <CoursesExperience />
      </Suspense>
    </CoursesBoundary>
  )
}
