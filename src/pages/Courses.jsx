const courses = [
  {
    title: 'IA para ciencias sociales',
    description:
      'Formación práctica para usar inteligencia artificial en investigación, análisis cualitativo, organización documental y escritura académica.',
  },
  {
    title: 'IA, comunicación política y ciudadanía',
    description:
      'Curso para analizar conversación pública, narrativas, reputación, campañas y vínculos entre ciudadanía e instituciones.',
  },
  {
    title: 'IA aplicada para equipos profesionales',
    description:
      'Programa modular para adoptar herramientas de IA con método, ética, productividad y evaluación de resultados.',
  },
]

export default function Courses() {
  return (
    <section className="page courses-page">
      <div className="page-hero">
        <p className="eyebrow">Formación</p>
        <h1>Capacitación para usar IA con método, criterio y resultados.</h1>
        <p>
          Diseñamos cursos y talleres para investigadores, docentes, equipos públicos,
          empresas y organizaciones que necesitan incorporar inteligencia artificial sin
          improvisación.
        </p>
      </div>

      <div className="cards-grid three">
        {courses.map((course) => (
          <article className="glass-card" key={course.title}>
            <h2>{course.title}</h2>
            <p>{course.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
