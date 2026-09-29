const powerBiUrl =
  'https://app.powerbi.com/view?r=eyJrIjoiYWM5NWNmM2MtYTdhMC00NzY4LTgzZmItMDhmODhiMDhjOGYxIiwidCI6ImE0ZTBlZWY4LTFkMGYtNDE0NS1iNWVjLWEzYTkwM2ZkNjVmZSIsImMiOjR9'

export default function Dashboard() {
  return (
    <section className="page dashboard-page">
      <div className="page-hero">
        <p className="eyebrow">Panel de datos</p>
        <h1>Visualización pública para leer patrones y tendencias.</h1>
        <p>
          Los dashboards de NNI convierten bases de datos públicas o institucionales en
          evidencia visual. Permiten comparar periodos, detectar concentraciones
          territoriales y comunicar hallazgos con claridad ejecutiva.
        </p>
        <a className="primary-button" href={powerBiUrl} rel="noreferrer" target="_blank">
          Indicadores de violencia familiar
        </a>
      </div>

      <section className="section-grid intro-band">
        <div>
          <p className="eyebrow">Análisis de datos</p>
          <h2>De la base dispersa al tablero útil.</h2>
        </div>
        <p>
          Esta línea de trabajo puede adaptarse a seguridad pública, ventas, inventario,
          evaluación institucional, indicadores sociales, monitoreo territorial o
          seguimiento de programas.
        </p>
      </section>
    </section>
  )
}
