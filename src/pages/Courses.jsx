const coursesHeroImage =
  'https://cdn.prod.website-files.com/63dda5ccc90398185fca7bcc/645635187d4faa20b85c3e31_Frame%201745.png'

const courses = [
  {
    title: 'Curso práctico de inteligencia artificial para ciencias sociales',
    description:
      'Capacitación en el uso efectivo y ético de la inteligencia artificial para potenciar la calidad, eficiencia y profundidad de la investigación en ciencias sociales.',
    href: 'https://www.nni.ai/cursos/iacs',
    image:
      'https://cdn.prod.website-files.com/63df15dbc6567a9d323e4db8/65035768dc27386542efe60f_169%20Curso%20pr%C3%A1ctico.png',
  },
  {
    title: 'Inteligencia artificial, comunicación política y ciudadanía',
    description:
      'Exploración de nuevas formas de comunicación y colaboración entre líderes políticos y ciudadanía para una participación más auténtica y significativa.',
    href: 'https://www.nni.ai/cursos/iacs',
    image:
      'https://cdn.prod.website-files.com/63df15dbc6567a9d323e4db8/6516fbb4da03a61a27a1869c_sitio%20web.png',
  },
  {
    title: 'Curso 2.0',
    description:
      'Programa de formación orientado a fortalecer capacidades prácticas en herramientas digitales, análisis y aplicaciones de inteligencia artificial.',
    href: 'https://www.nni.ai/cursos/curso2-0',
    image:
      'https://cdn.prod.website-files.com/63dda5ccc90398185fca7bcc/65ca704f08e87be20f4774e2_5.png',
  },
]

export default function Courses() {
  return (
    <section className="courses-page">
      <div className="courses-hero">
        <div className="courses-copy">
          <p className="eyebrow">Formación</p>
          <h1>Cursos</h1>
          <p>
            Programas de capacitación para aplicar inteligencia artificial,
            análisis de datos y herramientas digitales en investigación,
            comunicación y toma de decisiones.
          </p>
        </div>

        <div className="courses-visual">
          <img
            src={coursesHeroImage}
            alt="Imagen principal de cursos de Neural Network Initiative"
          />
        </div>
      </div>

      <div className="courses-grid" aria-label="Listado de cursos">
        {courses.map((course) => (
          <a
            className="course-card"
            href={course.href}
            key={course.title}
            rel="noreferrer"
            target="_blank"
          >
            <img src={course.image} alt="" />
            <div className="course-card-body">
              <h2>{course.title}</h2>
              <p>{course.description}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
