import { useLanguage } from '../i18n/language'

const powerBiUrl =
  'https://app.powerbi.com/view?r=eyJrIjoiYWM5NWNmM2MtYTdhMC00NzY4LTgzZmItMDhmODhiMDhjOGYxIiwidCI6ImE0ZTBlZWY4LTFkMGYtNDE0NS1iNWVjLWEzYTkwM2ZkNjVmZSIsImMiOjR9'

const dashboardCopy = {
  es: {
    eyebrow: 'Panel de datos',
    title: 'Visualización pública para leer patrones y tendencias.',
    lead:
      'Los dashboards de NNI convierten bases de datos públicas o institucionales en evidencia visual. Permiten comparar periodos, detectar concentraciones territoriales y comunicar hallazgos con claridad ejecutiva.',
    button: 'Indicadores de violencia familiar',
    introEyebrow: 'Análisis de datos',
    introTitle: 'De la base dispersa al tablero útil.',
    intro:
      'Esta línea de trabajo puede adaptarse a seguridad pública, ventas, inventario, evaluación institucional, indicadores sociales, monitoreo territorial o seguimiento de programas.',
  },
  en: {
    eyebrow: 'Data dashboard',
    title: 'Public visualization to read patterns and trends.',
    lead:
      'NNI dashboards turn public or institutional databases into visual evidence. They make it possible to compare periods, detect territorial concentrations and communicate findings with executive clarity.',
    button: 'Family violence indicators',
    introEyebrow: 'Data analysis',
    introTitle: 'From dispersed database to useful dashboard.',
    intro:
      'This line of work can be adapted to public security, sales, inventory, institutional evaluation, social indicators, territorial monitoring or program tracking.',
  },
}

export default function Dashboard() {
  const { language } = useLanguage()
  const copy = dashboardCopy[language]

  return (
    <section className="page dashboard-page">
      <div className="page-hero">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1>{copy.title}</h1>
        <p>{copy.lead}</p>
        <a className="primary-button" href={powerBiUrl} rel="noreferrer" target="_blank">
          {copy.button}
        </a>
      </div>

      <section className="section-grid intro-band">
        <div>
          <p className="eyebrow">{copy.introEyebrow}</p>
          <h2>{copy.introTitle}</h2>
        </div>
        <p>{copy.intro}</p>
      </section>
    </section>
  )
}
