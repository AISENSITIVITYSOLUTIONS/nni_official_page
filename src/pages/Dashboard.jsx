const dashboardImage =
  'https://cdn.prod.website-files.com/63dda5ccc90398185fca7bcc/63e3eec6a02803823d3fbae8_image%207-1.png'

const powerBiUrl =
  'https://app.powerbi.com/view?r=eyJrIjoiYWM5NWNmM2MtYTdhMC00NzY4LTgzZmItMDhmODhiMDhjOGYxIiwidCI6ImE0ZTBlZWY4LTFkMGYtNDE0NS1iNWVjLWEzYTkwM2ZkNjVmZSIsImMiOjR9'

export default function Dashboard() {
  return (
    <section className="dashboard-page">
      <div className="dashboard-hero">
        <div className="dashboard-copy">
          <p className="eyebrow">Dashboard</p>
          <h1>Violencia familiar</h1>
          <p>
            En este dashboard presentamos los índices más actuales de violencia
            familiar en México, con información de enero de 2015 a septiembre de
            2023.
          </p>
          <a
            className="primary-button"
            href={powerBiUrl}
            rel="noreferrer"
            target="_blank"
          >
            Indicadores de violencia familiar
          </a>
        </div>

        <div className="dashboard-visual">
          <img
            src={dashboardImage}
            alt="Vista previa del dashboard de indicadores de violencia familiar"
          />
        </div>
      </div>

      <div className="dashboard-note">
        <p className="eyebrow">Análisis de datos</p>
        <h2>Información pública para visualizar patrones y tendencias</h2>
        <p>
          La visualización permite consultar indicadores, comparar periodos y
          explorar el comportamiento territorial de los registros de violencia
          familiar en México.
        </p>
      </div>
    </section>
  )
}
