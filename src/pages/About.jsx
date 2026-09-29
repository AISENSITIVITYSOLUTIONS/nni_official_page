import { Link } from 'react-router-dom'

const areas = [
  'Ciencia de datos e inteligencia artificial',
  'Desarrollo web, apps y automatización',
  'Investigación social, política pública y seguridad',
  'Comunicación, reputación y visualización',
  'Innovación, sostenibilidad y formación aplicada',
]

const teamMembers = [
  ['Felipe de Alba', 'Ciencia de datos, IA, social listening y análisis institucional'],
  ['Aeelen Miranda', 'Python, inteligencia artificial y Big Data'],
  ['Winik Ivanovich Morales', 'Python, ciencia de datos e inteligencia artificial'],
  ['Josefina Pérez', 'Movilidades, cooperación internacional y seguridad'],
  ['Diana Varela', 'Innovación empresarial e intraemprendimiento'],
  ['Bryan Guzmán Álvarez', 'Desarrollo full-stack y sistemas escalables'],
  ['Raymundo Rodríguez Rosas', 'Back-end, software a la medida y bases de datos'],
  ['Itzel de Alba', 'Contenido multimedia, difusión y comunidad'],
  ['Senet Ferriz', 'Diseño, gestión de redes y educación estratégica'],
  ['Emilio Noriega', 'Robótica, STEAM e innovación tecnológica'],
  ['Enrique Durazo', 'Ciencia de datos, Python y visualización creativa'],
  ['Juan Alberto González', 'Mapeo urbano y visualización gráfica'],
  ['David Salazar Hernández', 'Front-end, aplicaciones móviles y UX/UI'],
  ['Luis Felipe Marín', 'IA, robótica e interacción humano-robot'],
]

export default function About() {
  return (
    <section className="page about-page">
      <div className="page-hero">
        <p className="eyebrow">Nosotros</p>
        <h1>Un equipo multidisciplinario para proyectos de IA con impacto.</h1>
        <p>
          NNI integra perfiles técnicos, académicos, creativos e institucionales para
          diseñar soluciones donde la inteligencia artificial se conecta con problemas
          reales: seguridad, gobierno, educación, comercio, investigación, reputación
          digital y operación cotidiana.
        </p>
      </div>

      <section className="section-grid intro-band">
        <div>
          <p className="eyebrow">Capacidad institucional</p>
          <h2>Talento técnico con lectura social, pública y estratégica.</h2>
        </div>
        <p>
          Nuestra diferencia está en combinar desarrollo de software, ciencia de datos,
          análisis social, visualización, comunicación y experiencia pública. Esto nos
          permite construir productos que no solo funcionan: explican, ordenan y ayudan
          a decidir.
        </p>
      </section>

      <div className="tag-list areas-list">
        {areas.map((area) => (
          <span key={area}>{area}</span>
        ))}
      </div>

      <div className="team-grid" aria-label="Equipo de Neural Network Initiative">
        {teamMembers.map(([name, role]) => (
          <article className="team-card" key={name}>
            <h2>{name}</h2>
            <p>{role}</p>
          </article>
        ))}
      </div>

      <section className="cta-band">
        <div>
          <p className="eyebrow">Trabajo conjunto</p>
          <h2>Armamos equipos alrededor del problema, no alrededor de una plantilla.</h2>
        </div>
        <Link className="primary-button" to="/contacto">
          Conversar con NNI
        </Link>
      </section>
    </section>
  )
}
