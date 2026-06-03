import { useState } from 'react'
import { Link } from 'react-router-dom'

const aboutCoverImage =
  'https://cdn.prod.website-files.com/63dda5ccc90398185fca7bcc/64563518ad6d32347cead071_image%209.1.png'

const nameParticles = new Set(['de', 'del', 'la', 'las', 'los', 'y'])

const teamMembers = [
  {
    name: 'Felipe de Alba',
    role: 'Ciencia de datos, IA y social listening',
    photo: '/images/team/felipe-de-alba.jpeg',
    bio: [
      'Especialista en ciencia de datos, inteligencia artificial y social listening. Es experto reconocido en temas hídricos, metrópolis e incidencia delictiva, con una gran variedad de publicaciones nacionales e internacionales.',
      'Tiene amplia experiencia en la función pública, como director general del Centro de Estudios Sociales y de Opinión Pública de la Cámara de Diputados federal. También fue director general en el Gobierno de la Ciudad de México.',
      'Cuenta con dos posdoctorados, uno en el MIT y otro en la École normale supérieure (ENS-Lyon), Francia. Es doctor en Planeación Territorial por la Universidad de Montreal, además de maestro y licenciado en Ciencia Política. Ha publicado 20 libros y más de 40 artículos científicos en revistas internacionales.',
    ],
  },
   {
    name: 'Aeelen Miranda',
    role: 'Python, inteligencia artificial y Big Data',
    photo: '/images/team/aeelen-miranda.png',
    bio: [
      'Es experta en programación en Python e inteligencia artificial, con especialidad en manejo de Big Data. Ha trabajado en proyectos para diferentes instituciones y centros de estudios como INEGI, IDC MX y CESOP, en los cuales se ha enfocado en la innovación tecnológica.',
      'Es licenciada en Estudios Socioterritoriales por la Universidad Autónoma Metropolitana (UAM).',
    ],
  },
  {
    name: 'Bryan Guzmán Álvarez',
    role: 'Full-Stack Developer System',
    photo: '/images/team/bryan-guzman-alvarez.png',
    bio: [
      'Desarrollador full-stack especializado en la construcción de soluciones web y sistemas digitales escalables. Cuenta con experiencia en front-end utilizando Angular, React e Ionic, integrando interfaces modernas, funcionales y orientadas a una experiencia de usuario eficiente.',
      'En back-end trabaja con Node.js, PHP, MySQL y PostgreSQL, desarrollando APIs, modelos de datos y servicios robustos para aplicaciones empresariales. Su perfil combina criterio técnico, capacidad de integración y enfoque en soluciones estables para entornos productivos.',
    ],
  },
  
   {
    name: 'Diana Varela',
    role: 'Innovación empresarial, intraemprendimiento y dirección estratégica',
    photo: '/images/team/diana-varela-londono.png',
    bio: [
      'Diana Janneth Varela Londoño es una profesional e investigadora colombiana especializada en innovación empresarial, intraemprendimiento y dirección estratégica. Su trayectoria se ha enfocado en fortalecer capacidades organizacionales orientadas al emprendimiento corporativo y la transformación empresarial.',
      'Cuenta con formación doctoral en Dirección de Empresas por Mondragon Unibertsitatea y ha desarrollado investigación, consultoría y proyectos de innovación abierta, gestión del conocimiento y fortalecimiento de ecosistemas de emprendimiento en España y Colombia.',
    ],
  },
 
  {
    name: 'Raymundo Rodríguez Rosas',
    role: 'Back-end, software a la medida y bases de datos',
    photo: '/images/team/raymundo-rodriguez-rosas.png',
    bio: [
      'Es ingeniero en Sistemas Computacionales por el Instituto de Estudios Superiores de Puebla (IESE). Alto potencial en puntos de venta, sistemas a la medida, desarrollo web y facturación electrónica CFDI 4.0.',
      'CEO y fundador de Taxi Ejad. Ha desarrollado aplicativos de escritorio para Windows y apps en Android nativo, especializándose en el back-end.',
      'Master en SQL, diseño y arquitectura de bases de datos. También es experto en VB.NET, C#.NET, Node.js, PHP y JavaScript. Tiene experiencia en Firebase y Google Maps para desarrollar apps y servicios basados en la nube.',
    ],
  },
  {
    name: 'Itzel de Alba',
    role: 'Contenido multimedia, difusión y comunidad',
    photo: '/images/team/itzel-de-alba.jpeg',
    bio: [
      'Creadora de contenido multimedia, difusión y community manager. Ha trabajado en diferentes oficinas de gobierno y medios de comunicación.',
      'Tiene una Maestría en Política y Gestión Energética y Medioambiental por la FLACSO México. Es licenciada en Periodismo por la Escuela de Periodismo Carlos Septién García.',
    ],
  },
  {
    name: 'Winik Ivanovich Morales',
    role: 'Python, ciencia de datos e inteligencia artificial',
    photo: '/images/team/winik-ivanovich-morales.png',
    bio: [
      'Es experto programador en Python, científico de datos e inteligencia artificial. Ha sido consultor ambiental para distintas consultoras y le apasiona la minería de datos.',
      'Es ingeniero ambiental por el Instituto Tecnológico de Misantla, Veracruz. Ha trabajado como consultor externo en diferentes investigaciones y publicaciones del CESOP.',
      'Participa en propuestas y soluciones puntuales segun su entorno, con preponderancia en el desarrollo habilidades basicas de IApara el uso publico.',
    ],
  },
  
  {
    name: 'Josefina Pérez',
    role: 'Movilidades, cooperación internacional y seguridad',
    bio: [
      'Es experta en análisis de temas fronterizos y en procesos de cooperación internacional sobre movilidades y seguridad. Cuenta con amplia experiencia en desarrollo económico y normatividad ambiental dentro del Gobierno de la Ciudad de México, así como en temas de migración dentro del gobierno federal.',
      'Es doctora por la Universidad de Sussex y maestra por la Universidad de las Américas. Fue investigadora visitante en la Universidad de Turín, en la especialización de migraciones internacionales y seguridad fronteriza en Norteamérica y el Mediterráneo.',
    ],
  },
  
  {
    name: 'Senet Ferriz',
    role: 'Diseño y gestión de redes',
    bio: [
      'Es experta en diseño y gestión de redes. Tiene una Maestría en Administración y Dirección de Empresas por la Escuela Europea de Dirección y Empresa (EUDE), en España. Es ingeniera en Telecomunicaciones por la Universidad Nacional Autónoma de México (UNAM).',
      'También es directora ejecutiva de la Escuela Nacional de Ajedrez Liga C, instructora de ajedrez con gran experiencia a nivel educativo y empresarial, y creadora de contenido para redes sociales sobre temas de ajedrez e ingeniería.',
    ],
  },
  
  {
    name: 'Emilio Noriega',
    role: 'Robótica, STEAM e innovación tecnológica',
    bio: [
      'Colaboró con Vyrian y es fundador de PIBOTIC, empresa proveedora de servicios de educación y capacitación en desarrollo tecnológico, robótica y STEAM. Actualmente colabora en SECTEI y ha sido consultor en el CESOP de la Cámara de Diputados.',
      'Es ingeniero en Robótica Industrial con una Maestría en Política y Gestión del Cambio Tecnológico, con énfasis en gestión de la innovación.',
    ],
  },
  {
    name: 'Enrique Durazo',
    role: 'Ciencia de datos, Python y visualización creativa',
    bio: [
      'Es experto en ciencia de datos, Python y visualización creativa. Conoce varios lenguajes de programación y colabora actualmente desde Zúrich, Suiza.',
    ],
  },
  {
    name: 'Juan Alberto González',
    role: 'Mapeo urbano y visualización gráfica',
    bio: [
      'Especialista en mapeo urbano y visualización gráfica. Ha participado en investigaciones y ponencias sobre vivienda y acceso al agua. Es arquitecto por la Universidad Nacional Autónoma de México (UNAM).',
      'Ha colaborado en el Centro de Estudios Sociales y de Opinión Pública de la Cámara de Diputados.',
    ],
  },
  {
    name: 'David Salazar Hernández',
    role: 'Front-end, aplicaciones móviles y UX/UI',
    bio: [
      'Experto programador front-end, en aplicaciones móviles y en diseño de interfaces y experiencias de usuario. Cuenta con amplia experiencia en Flutter e Internet de las Cosas (IoT).',
      'Es ingeniero en Tecnologías de la Información y Telecomunicaciones (TI) por el Instituto Tecnológico Superior de Misantla. Colaboró en la empresa Atmósfera Digital.',
    ],
  },
  {
    name: 'Luis Felipe Marín',
    role: 'IA, robótica e interacción humano-robot',
    bio: [
      'Especialista en inteligencia artificial, robótica inteligente, interacción humano-robot e interfaces cerebro-ordenador. Ha obtenido patentes relacionadas con IA en la industria de extracción de petróleo.',
      'Cofundador del laboratorio de Robótica de la facultad,  y participó en la actualización del programa de Ingeniería Informática (CS) en la Universidad Veracruzana (UV).',
      'Tiene Doctorado en Ciencia Computacional y Maestría en Sistemas Informáticos, ambas por la Universidad Paul Sabatier Toulouse III, en Francia. Es coordinador de diferentes grupos académicos y pionero en el programa de internacionalización de la UV',
    ],
  },
  
  
  
]

const socialLinks = [
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/neural-network-initiative-8a1b61263/',
    icon: LinkedInIcon,
  },
  {
    name: 'WhatsApp',
    url: '',
    icon: WhatsAppIcon,
  },
  {
    name: 'Instagram',
    url: '',
    icon: InstagramIcon,
  },
  {
    name: 'Telegram',
    url: '',
    icon: TelegramIcon,
  },
]

function getMemberInitials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .filter((part) => !nameParticles.has(part.toLowerCase()))
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
}

function TeamPortrait({ member }) {
  const [hasImageError, setHasImageError] = useState(false)
  const showPhoto = Boolean(member.photo) && !hasImageError

  return (
    <div className="team-portrait-frame">
      {showPhoto ? (
        <img
          className="team-portrait"
          src={member.photo}
          alt={`Retrato de ${member.name}`}
          loading="lazy"
          onError={() => setHasImageError(true)}
        />
      ) : (
        <div className="team-avatar" aria-hidden="true">
          {getMemberInitials(member.name)}
        </div>
      )}
    </div>
  )
}

function SocialGlyph({ children }) {
  return (
    <svg
      className="social-icon-mark"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.85"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <SocialGlyph>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="8.15" cy="8.1" r="0.95" fill="currentColor" stroke="none" />
      <path d="M8.15 11v5" />
      <path d="M12 11v5" />
      <path d="M12 13.35a2.2 2.2 0 0 1 4.4 0V16" />
    </SocialGlyph>
  )
}

function WhatsAppIcon() {
  return (
    <SocialGlyph>
      <path d="M12 4.5a7.2 7.2 0 0 0-6.3 10.7L5 19l4-.9A7.2 7.2 0 1 0 12 4.5Z" />
      <path d="m10 9.55.7 1.7-.8.8a6.35 6.35 0 0 0 2.1 2.1l.8-.8 1.7.7c.3.12.5.5.3.82-.4.67-1.2 1.08-1.9.96-2.8-.48-5-2.68-5.48-5.48-.12-.7.29-1.5.96-1.9.32-.2.7 0 .82.3Z" />
    </SocialGlyph>
  )
}

function InstagramIcon() {
  return (
    <SocialGlyph>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5.25" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="17.05" cy="6.95" r="0.95" fill="currentColor" stroke="none" />
    </SocialGlyph>
  )
}

function TelegramIcon() {
  return (
    <SocialGlyph>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m8 12 8-4-2.5 8-2.4-2.2-1.7 1.7v-3.1l4.6-3.5L8 12Z" />
    </SocialGlyph>
  )
}

function SocialLinkCard({ social }) {
  const Icon = social.icon
  const isAvailable = Boolean(social.url)

  const content = (
    <>
      <span className="social-icon-shell">
        <Icon />
      </span>
      <span className="social-link-copy">
        <span className="social-link-name">{social.name}</span>
        <span className={`social-link-url${isAvailable ? '' : ' is-placeholder'}`}>
          {social.url || 'https://...'}
        </span>
      </span>
    </>
  )

  if (!isAvailable) {
    return (
      <div
        className="social-link-card social-link-card-placeholder"
        aria-label={`${social.name} pendiente de URL`}
      >
        {content}
      </div>
    )
  }

  return (
    <a
      className="social-link-card"
      href={social.url}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={`Abrir ${social.name}`}
    >
      {content}
    </a>
  )
}

export default function About() {
  return (
    <section className="about-page">
      <div className="about-hero">
        <p className="eyebrow">Nosotros</p>
        <h1>Un equipo multidisciplinario para proyectos de IA con impacto</h1>
        <p>
          Neural Network Initiative se dedica a utilizar el poder de la
          inteligencia artificial para abordar temas de impacto social y
          ambiental.
        </p>
      </div>

      <div className="about-feature">
        <div className="about-intro">
          <p className="eyebrow">¿Quiénes somos?</p>
          <h2>Talento técnico, investigación aplicada y experiencia pública</h2>
          <p>
            Nuestro equipo integra perfiles de ciencia de datos, inteligencia
            artificial, robótica, desarrollo de software, visualización,
            comunicación, políticas públicas, medio ambiente y análisis social.
          </p>
        </div>

        <div className="about-cover-image">
          <img
            src={aboutCoverImage}
            alt="Equipo reunido en una mesa de trabajo"
          />
        </div>
      </div>

      <div className="team-grid" aria-label="Equipo de Neural Network Initiative">
        {teamMembers.map((member) => (
          <article className="team-card" key={member.name}>
            <div className="team-card-header">
              <TeamPortrait member={member} />
              <div className="team-card-copy">
                <h2>{member.name}</h2>
                <p className="team-card-role">{member.role}</p>
              </div>
            </div>
            <div className="team-bio">
              {member.bio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="about-contact">
        <div>
          <p className="eyebrow">Contacto</p>
          <h2>¿Quieres conversar con NNI?</h2>
          <p>
            Contáctanos para conocer cómo la inteligencia artificial y la ciencia
            de datos pueden apoyar tus proyectos.
          </p>
        </div>
        <div className="contact-actions">
          <a href="tel:+525527088372">+52 (55) 27088372</a>
          <a href="tel:+525527491298">+52 (55) 27491298</a>
          <a href="tel:+573104866828">+57 (31) 04866828</a>
          <a href="mailto:fdealbam@nni.ai">fdealbam@nni.ai</a>
          <Link className="primary-button" to="/contacto">
            Contacto
          </Link>
        </div>
      </div>

      <div className="about-social">
        <div className="about-social-copy">
          <p className="eyebrow">Redes</p>
          <h2>Siguenos en nuestras redes sociales</h2>
          <p>
            LinkedIn ya esta disponible. Los espacios de WhatsApp, Instagram y
            Telegram quedan listos para agregar su URL despues.
          </p>
        </div>

        <div className="social-links-grid" aria-label="Redes sociales de Neural Network Initiative">
          {socialLinks.map((social) => (
            <SocialLinkCard key={social.name} social={social} />
          ))}
        </div>
      </div>
    </section>
  )
}
