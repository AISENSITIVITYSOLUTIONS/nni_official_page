import { useLanguage } from '../i18n/language'

const publications = [
  {
    year: '2022',
    title: { es: 'Social listening: la “mordida” en Twitter', en: 'Social listening: “la mordida” on Twitter' },
    description: {
      es: 'Análisis de conversación pública para identificar percepciones, narrativas y asociaciones sobre corrupción cotidiana.',
      en: 'Public conversation analysis to identify perceptions, narratives and associations around everyday corruption.',
    },
  },
  {
    year: '2023',
    title: { es: 'Social listening: palabra “corcholata”', en: 'Social listening: the term “corcholata”' },
    description: {
      es: 'Lectura metodológica de tendencias políticas, circulación de términos y disputas narrativas en plataformas digitales.',
      en: 'Methodological reading of political trends, term circulation and narrative disputes on digital platforms.',
    },
  },
  {
    year: '2022',
    title: { es: 'Social listening: el tema “trabajo”', en: 'Social listening: the topic of work' },
    description: {
      es: 'Exploración de preocupaciones públicas, conversación social y temas emergentes alrededor del trabajo.',
      en: 'Exploration of public concerns, social conversation and emerging issues around work.',
    },
  },
]

const publicationCopy = {
  es: {
    eyebrow: 'Publicaciones',
    title: 'Investigación aplicada para entender datos, conversación pública y conflicto.',
    lead:
      'NNI articula investigación, análisis de datos y social listening para producir conocimiento útil en temas públicos, urbanos, institucionales y estratégicos.',
  },
  en: {
    eyebrow: 'Publications',
    title: 'Applied research to understand data, public conversation and conflict.',
    lead:
      'NNI connects research, data analysis and social listening to produce useful knowledge on public, urban, institutional and strategic issues.',
  },
}

export default function Publications() {
  const { language } = useLanguage()
  const copy = publicationCopy[language]

  return (
    <section className="page publications-page">
      <div className="page-hero">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1>{copy.title}</h1>
        <p>{copy.lead}</p>
      </div>

      <div className="cards-grid three">
        {publications.map((publication) => (
          <article className="glass-card" key={publication.title.es}>
            <span className="year-label">{publication.year}</span>
            <h2>{publication.title[language]}</h2>
            <p>{publication.description[language]}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
