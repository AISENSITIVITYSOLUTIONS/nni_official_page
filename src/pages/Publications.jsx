const publications = [
  {
    year: '2022',
    title: 'Social listening: la “mordida” en Twitter',
    description:
      'Análisis de conversación pública para identificar percepciones, narrativas y asociaciones sobre corrupción cotidiana.',
  },
  {
    year: '2023',
    title: 'Social listening: palabra “corcholata”',
    description:
      'Lectura metodológica de tendencias políticas, circulación de términos y disputas narrativas en plataformas digitales.',
  },
  {
    year: '2022',
    title: 'Social listening: el tema “trabajo”',
    description:
      'Exploración de preocupaciones públicas, conversación social y temas emergentes alrededor del trabajo.',
  },
]

export default function Publications() {
  return (
    <section className="page publications-page">
      <div className="page-hero">
        <p className="eyebrow">Publicaciones</p>
        <h1>Investigación aplicada para entender datos, conversación pública y conflicto.</h1>
        <p>
          NNI articula investigación, análisis de datos y social listening para producir
          conocimiento útil en temas públicos, urbanos, institucionales y estratégicos.
        </p>
      </div>

      <div className="cards-grid three">
        {publications.map((publication) => (
          <article className="glass-card" key={publication.title}>
            <span className="year-label">{publication.year}</span>
            <h2>{publication.title}</h2>
            <p>{publication.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
