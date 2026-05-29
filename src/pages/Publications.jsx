const publicationsHeroImage =
  'https://cdn.prod.website-files.com/63dda5ccc90398185fca7bcc/645635187d4faa20b85c3e31_Frame%201745.png'

const publications = [
  {
    year: '2022',
    title: 'Social listening: La “mordida” en Twitter',
    description: 'Preguntas básicas para conocer las zonas metropolitanas.',
    href: '/publicaciones/zonas-metropolitanas',
    image:
      'https://cdn.prod.website-files.com/63df15dbc6567a9d323e4db8/6450377bf89f0bdf2ca5971f_Social%20listening%20MORDIDA.png',
  },
  {
    year: '2023',
    title: 'Social listening: palabra “corcholata”',
    description:
      'La metodología para el análisis de Twitter representa una vía para observar conversación pública y tendencias emergentes.',
    href: '/publicaciones/sociallisteningcorcholata',
    image:
      'https://cdn.prod.website-files.com/63df15dbc6567a9d323e4db8/646fe27deaa29abbb0e51c1e_Social%20listening%20CORCHOLATA.png',
  },
  {
    year: '2022',
    title: 'Social listening: el tema “trabajo” - 1 de mayo',
    description:
      'La necesidad de contar con datos cifrados sobre conversación social permite analizar preocupaciones y narrativas públicas.',
    href: '/publicaciones/mexico-en-cifras',
    image:
      'https://cdn.prod.website-files.com/63df15dbc6567a9d323e4db8/64503b30f558317192713469_NNI.%20social%20listening.V2.png',
  },
]

export default function Publications() {
  return (
    <section className="publications-page">
      <div className="publications-hero">
        <div className="publications-copy">
          <p className="eyebrow">Contenido</p>
          <h1>Publicaciones</h1>
          <p>
            Investigación aplicada, análisis de datos y social listening para
            entender conversaciones públicas, fenómenos sociales y temas de
            interés estratégico.
          </p>
        </div>

        <div className="publications-visual">
          <img
            src={publicationsHeroImage}
            alt="Imagen principal de publicaciones de Neural Network Initiative"
          />
        </div>
      </div>

      <div className="publications-grid" aria-label="Listado de publicaciones">
        {publications.map((publication) => (
          <a className="publication-card" href={publication.href} key={publication.title}>
            <img src={publication.image} alt="" />
            <div className="publication-card-body">
              <span>{publication.year}</span>
              <h2>{publication.title}</h2>
              <p>{publication.description}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
