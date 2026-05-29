import { Link } from 'react-router-dom'

const aboutCoverImage =
  'https://cdn.prod.website-files.com/63dda5ccc90398185fca7bcc/64563518ad6d32347cead071_image%209.1.png'

const teamMembers = [
  {
    name: 'Aeelen Miranda',
    role: 'Python, inteligencia artificial y Big Data',
    bio: [
      'Es experta en programación en Python e inteligencia artificial, con especialidad en manejo de Big Data. Ha trabajado en proyectos para diferentes instituciones y centros de estudios como INEGI, IDC MX y CESOP, en los cuales se ha enfocado en la innovación tecnológica.',
      'Es licenciada en Estudios Socioterritoriales por la Universidad Autónoma Metropolitana (UAM).',
    ],
  },
  {
    name: 'Itzel de Alba',
    role: 'Contenido multimedia, difusión y comunidad',
    bio: [
      'Creadora de contenido multimedia, difusión y community manager. Ha trabajado en diferentes oficinas de gobierno y medios de comunicación.',
      'Tiene una Maestría en Política y Gestión Energética y Medioambiental por la FLACSO México. Es licenciada en Periodismo por la Escuela de Periodismo Carlos Septién García.',
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
    name: 'Winik Ivanovich Morales',
    role: 'Python, ciencia de datos e inteligencia artificial',
    bio: [
      'Es experto programador en Python, científico de datos e inteligencia artificial. Ha sido consultor ambiental para distintas consultoras y le apasiona la minería de datos.',
      'Es ingeniero ambiental por el Instituto Tecnológico de Misantla, Veracruz. Ha trabajado como consultor externo en diferentes investigaciones y publicaciones del CESOP.',
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
      'Cuenta con alta especialización en inteligencia artificial, robótica inteligente, interacción humano-robot e interfaces cerebro-ordenador, entre otros campos. Colabora con la industria y ha obtenido patentes relacionadas con IA en la industria de extracción de petróleo.',
      'Ha sido miembro de proyectos de investigación en México y Europa relacionados con robótica. Es cofundador del laboratorio de Robótica de la facultad, donde obtuvo apoyo financiero para equipamiento. Además, participó en la actualización del programa de Ingeniería Informática (CS) en la Universidad Veracruzana (UV).',
      'Es coordinador de diferentes grupos académicos y pionero en el programa de internacionalización de la UV junto con SUNY-COIL y varias universidades de Latinoamérica. Ha sido asesor de proyectos de estudiantes relacionados con HRI, AR, BCI, entre otros.',
      'Tiene Doctorado en Ciencia Computacional y Maestría en Sistemas Informáticos, ambas por la Universidad Paul Sabatier Toulouse III, en Francia.',
    ],
  },
  {
    name: 'Raymundo Rodríguez Rosas',
    role: 'Back-end, software a la medida y bases de datos',
    bio: [
      'Es ingeniero en Sistemas Computacionales por el Instituto de Estudios Superiores de Puebla (IESE). Ha colaborado en proyectos de desarrollo de software para diferentes empresas, como experto en puntos de venta, sistemas a la medida, desarrollo web y facturación electrónica CFDI 4.0.',
      'Además, es CEO y fundador de Taxi Ejad, una plataforma móvil para el transporte público de taxis. Ha desarrollado aplicativos de escritorio para Windows y apps en Android nativo, especializándose como desarrollador back-end.',
      'Posee amplio conocimiento en SQL, diseño y arquitectura de bases de datos. También es experto en VB.NET, C#.NET, Node.js, PHP y JavaScript. Tiene experiencia en Firebase y Google Maps para desarrollar apps y servicios basados en la nube.',
      'Ha sido administrador de servidores VPS en entornos Linux, lo que le permite implementar y mantener infraestructuras de servidor de manera eficiente.',
    ],
  },
  {
    name: 'Felipe de Alba',
    role: 'Ciencia de datos, IA y social listening',
    bio: [
      'Especialista en ciencia de datos, inteligencia artificial y social listening. Es experto reconocido en temas hídricos, metrópolis e incidencia delictiva, con una gran variedad de publicaciones nacionales e internacionales.',
      'Tiene amplia experiencia en la función pública, como director general del Centro de Estudios Sociales y de Opinión Pública de la Cámara de Diputados federal. También fue director general en el Gobierno de la Ciudad de México.',
      'Cuenta con dos posdoctorados, uno en el MIT y otro en la École normale supérieure (ENS-Lyon), Francia. Es doctor en Planeación Territorial por la Universidad de Montreal, además de maestro y licenciado en Ciencia Política. Ha publicado 20 libros y más de 40 artículos científicos en revistas internacionales.',
    ],
  },
  {
    name: 'Bryan Guzmán Álvarez',
    role: 'Full-Stack Developer System',
    bio: [
      'Desarrollador full-stack especializado en la construcción de soluciones web y sistemas digitales escalables. Cuenta con experiencia en front-end utilizando Angular, React e Ionic, integrando interfaces modernas, funcionales y orientadas a una experiencia de usuario eficiente.',
      'En back-end trabaja con Node.js, PHP, MySQL y PostgreSQL, desarrollando APIs, modelos de datos y servicios robustos para aplicaciones empresariales. Su perfil combina criterio técnico, capacidad de integración y enfoque en soluciones estables para entornos productivos.',
    ],
  },
]

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
              <div className="team-avatar" aria-hidden="true">
                {member.name
                  .split(' ')
                  .slice(0, 2)
                  .map((part) => part[0])
                  .join('')}
              </div>
              <div>
                <h2>{member.name}</h2>
                <p>{member.role}</p>
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
          <a href="tel:+525537141345">+52 (55) 3714 1345</a>
          <a href="mailto:fdealbam@nni.ai">fdealbam@nni.ai</a>
          <Link className="primary-button" to="/contacto">
            Contacto
          </Link>
        </div>
      </div>
    </section>
  )
}
