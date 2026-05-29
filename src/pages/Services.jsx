import { Link } from 'react-router-dom'

const servicesHeroImage =
  'https://cdn.prod.website-files.com/63dda5ccc90398185fca7bcc/645635172beb500eeaa7c7b2_Frame%201744.png'

const services = [
  {
    number: '01',
    title: 'AI para Empresas y Organizaciones',
    description:
      'Identificamos tendencias políticas emergentes y adaptamos estrategias para ayudar a los candidatos a mantenerse al frente de la competencia.',
    points: [
      'Inteligencia Artificial en los Flujos',
      'Innovación, Originalidad y Reingeniería',
      'Ciencia de Datos para la Automatización',
    ],
    images: [
      'https://cdn.prod.website-files.com/63dda5ccc90398185fca7bcc/63e3eec5b7a9811e2fc0135e_image%207.1.png',
      'https://cdn.prod.website-files.com/63dda5ccc90398185fca7bcc/63e3eec50ffe088296aba099_image%209.1.png',
    ],
  },
  {
    number: '02',
    title: 'AI en Innovación para Flujos y Procesos',
    description:
      'Comprometidos con la Agenda 2030, en pro de una visión hacia la sostenibilidad económica, social y ambiental, la seguimos como guía de referencia. Con IA creamos soluciones para ONGs, gobiernos, universidades e iniciativa privada, trabajando por la armonía ambiental.',
    points: ['Reingeniería', 'Innovación', 'Venture Innovation'],
    images: [
      'https://cdn.prod.website-files.com/63dda5ccc90398185fca7bcc/63e3eec6a4b22717c15f198d_image%209.1-1.png',
      'https://cdn.prod.website-files.com/63dda5ccc90398185fca7bcc/63e3eec667257e5fbda808ae_image%209.1-2.png',
    ],
    reverse: true,
  },
  {
    number: '03',
    title: 'Mercados & Consumidores',
    description:
      'Utilizamos técnicas de IA para analizar grandes cantidades de datos de consumidores y obtener insights valiosos sobre nuevas tendencias y ayudamos a las empresas a desarrollar estrategias competitivas.',
    points: ['Consumidores', 'Perfiles', 'Competidores'],
    images: [
      'https://cdn.prod.website-files.com/63dda5ccc90398185fca7bcc/63e3eec6f97c360280735dfa_image%207.1-1.png',
      'https://cdn.prod.website-files.com/63dda5ccc90398185fca7bcc/63e3eec65914d51d76193ac8_image%209.1-3.png',
    ],
  },
]

export default function Services() {
  return (
    <section className="services-page">
      <div className="services-hero">
        <div className="services-copy">
          <p className="eyebrow">Servicios</p>
          <h1>Servicios</h1>
          <p>
            Soluciones de inteligencia artificial, ciencia de datos e innovación
            para empresas, organizaciones, gobiernos, universidades y proyectos
            con impacto social.
          </p>
        </div>

        <div className="services-visual">
          <img
            src={servicesHeroImage}
            alt="Imagen principal de servicios de Neural Network Initiative"
          />
        </div>
      </div>

      <div className="services-list">
        {services.map((service) => (
          <article
            className={`service-feature ${service.reverse ? 'service-feature-reverse' : ''}`}
            key={service.title}
          >
            <div className="service-content">
              <span>{service.number}</span>
              <h2>{service.title}</h2>
              <p>{service.description}</p>
              <ul>
                {service.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <Link className="primary-button" to="/contacto">
                Agendar consulta
              </Link>
            </div>

            <div className="service-image-pair">
              {service.images.map((image, index) => (
                <img
                  src={image}
                  alt=""
                  className={index === 0 ? 'service-image-small' : 'service-image-large'}
                  key={image}
                />
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
