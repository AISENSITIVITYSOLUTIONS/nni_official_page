import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/language'
import './About.css'

const areas = {
  es: [
    'Ciencia de datos e inteligencia artificial',
    'Desarrollo web, apps y automatización',
    'Investigación social, política pública y seguridad',
    'Comunicación, reputación y visualización',
    'Innovación, sostenibilidad y formación aplicada',
  ],
  en: [
    'Data science and artificial intelligence',
    'Web development, apps and automation',
    'Social research, public policy and security',
    'Communication, reputation and visualization',
    'Innovation, sustainability and applied training',
  ],
}

const teamMembers = [
  ['Felipe de Alba', { es: 'Ciencia de datos, IA, social listening y análisis institucional', en: 'Data science, AI, social listening and institutional analysis' }, '/images/team/felipe-de-alba.jpeg'],
  ['Aeelen Miranda', { es: 'Python, inteligencia artificial y Big Data', en: 'Python, artificial intelligence and Big Data' }, '/images/team/aeelen-miranda.png'],
  ['Winik Ivanovich Morales', { es: 'Python, ciencia de datos e inteligencia artificial', en: 'Python, data science and artificial intelligence' }, '/images/team/winik-ivanovich-morales.png'],
  ['Josefina Pérez', { es: 'Movilidades, cooperación internacional y seguridad', en: 'Mobilities, international cooperation and security' }],
  ['Diana Varela', { es: 'Innovación empresarial e intraemprendimiento', en: 'Business innovation and intrapreneurship' }, '/images/team/diana-varela-londono.png'],
  ['Bryan Guzmán Álvarez', { es: 'Desarrollo full-stack y sistemas escalables', en: 'Full-stack development and scalable systems' }, '/images/team/bryan-guzman-alvarez.png'],
  ['Raymundo Rodríguez Rosas', { es: 'Back-end, software a la medida y bases de datos', en: 'Back-end, custom software and databases' }, '/images/team/raymundo-rodriguez-rosas.png'],
  ['Itzel de Alba', { es: 'Contenido multimedia, difusión y comunidad', en: 'Multimedia content, outreach and community' }, '/images/team/itzel-de-alba.jpeg'],
  ['Emilio Noriega', { es: 'Robótica, STEAM e innovación tecnológica', en: 'Robotics, STEAM and technological innovation' }],
  ['Enrique Durazo', { es: 'Ciencia de datos, Python y visualización creativa', en: 'Data science, Python and creative visualization' }],
  ['Juan Alberto González', { es: 'Mapeo urbano y visualización gráfica', en: 'Urban mapping and graphic visualization' }],
  ['David Salazar Hernández', { es: 'Front-end, aplicaciones móviles y UX/UI', en: 'Front-end, mobile applications and UX/UI' }],
  ['Luis Felipe Marín', { es: 'IA, robótica e interacción humano-robot', en: 'AI, robotics and human-robot interaction' }],
]

const orderedTeamMembers = [
  ...teamMembers.filter(([, , photo]) => Boolean(photo)),
  ...teamMembers.filter(([, , photo]) => !photo),
]

const aboutCopy = {
  es: {
    eyebrow: 'Nosotros',
    title: 'Un equipo multidisciplinario para proyectos de IA con impacto.',
    lead:
      'NNI integra perfiles técnicos, académicos, creativos e institucionales para diseñar soluciones donde la inteligencia artificial se conecta con problemas reales: seguridad, gobierno, educación, comercio, investigación, reputación digital y operación cotidiana.',
    introEyebrow: 'Capacidad institucional',
    introTitle: 'Talento técnico con lectura social, pública y estratégica.',
    intro:
      'Nuestra diferencia está en combinar desarrollo de software, ciencia de datos, análisis social, visualización, comunicación y experiencia pública. Esto nos permite construir productos que no solo funcionan: explican, ordenan y ayudan a decidir.',
    teamAria: 'Equipo de Neural Network Initiative',
    ctaEyebrow: 'Trabajo conjunto',
    ctaTitle: 'Armamos equipos alrededor del problema, no alrededor de una plantilla.',
    cta: 'Conversar con NNI',
  },
  en: {
    eyebrow: 'About',
    title: 'A multidisciplinary team for high-impact AI projects.',
    lead:
      'NNI brings together technical, academic, creative and institutional profiles to design solutions where artificial intelligence connects with real problems: security, government, education, commerce, research, digital reputation and daily operations.',
    introEyebrow: 'Institutional capacity',
    introTitle: 'Technical talent with social, public and strategic judgment.',
    intro:
      'Our difference lies in combining software development, data science, social analysis, visualization, communication and public-sector experience. This allows us to build products that do more than work: they explain, organize and help people decide.',
    teamAria: 'Neural Network Initiative team',
    ctaEyebrow: 'Collaborative work',
    ctaTitle: 'We build teams around the problem, not around a template.',
    cta: 'Talk to NNI',
  },
}

export default function About() {
  const { language } = useLanguage()
  const copy = aboutCopy[language]

  return (
    <section className="page about-page">
      <div className="page-hero">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1>{copy.title}</h1>
        <p>{copy.lead}</p>
      </div>

      <section className="section-grid intro-band">
        <div>
          <p className="eyebrow">{copy.introEyebrow}</p>
          <h2>{copy.introTitle}</h2>
        </div>
        <p>{copy.intro}</p>
      </section>

      <div className="tag-list areas-list">
        {areas[language].map((area) => (
          <span key={area}>{area}</span>
        ))}
      </div>

      <div className="team-grid" aria-label={copy.teamAria}>
        {orderedTeamMembers.map(([name, role, photo]) => (
          <article className="team-card" key={name}>
            {photo && (
              <img
                className="team-portrait"
                src={photo}
                alt={language === 'es' ? `Retrato de ${name}` : `Portrait of ${name}`}
                width="1122"
                height="1402"
                loading="lazy"
                decoding="async"
              />
            )}
            <h2>{name}</h2>
            <p>{role[language]}</p>
          </article>
        ))}
      </div>

      <section className="cta-band">
        <div>
          <p className="eyebrow">{copy.ctaEyebrow}</p>
          <h2>{copy.ctaTitle}</h2>
        </div>
        <Link className="primary-button" to="/contacto">
          {copy.cta}
        </Link>
      </section>
    </section>
  )
}
