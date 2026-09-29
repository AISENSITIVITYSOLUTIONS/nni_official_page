import { ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'

const products = [
  {
    name: 'EasyMeet',
    category: 'Productividad institucional',
    problem: 'Reuniones, acuerdos y seguimiento dispersos entre mensajes, minutas y recordatorios.',
    solution: 'Experiencia para organizar reuniones, acuerdos, responsables y trazabilidad de tareas.',
    tech: ['IA asistida', 'Flujos de trabajo', 'Gestión de acuerdos'],
    users: 'Equipos directivos, consultorías, coordinación académica y grupos de proyecto.',
    status: 'Prototipo conceptual',
    value: 'Reduce pérdida de acuerdos y convierte reuniones en seguimiento accionable.',
  },
  {
    name: 'Cash-ito',
    category: 'Finanzas ligeras',
    problem: 'Pequeños negocios que registran ingresos, egresos y metas sin lectura clara del flujo diario.',
    solution: 'Herramienta para registrar movimientos, visualizar saldos y estimar metas de operación.',
    tech: ['Dashboard', 'Registro financiero', 'Automatización'],
    users: 'Comercios, talleres, proyectos familiares y microempresas.',
    status: 'Demo funcional',
    value: 'Hace visible el dinero cotidiano y ayuda a decidir con información simple.',
  },
  {
    name: 'InQilinos',
    category: 'Gestión inmobiliaria',
    problem: 'Rentas, pagos, incidencias y comunicación con inquilinos sin registro organizado.',
    solution: 'Sistema para ordenar inmuebles, contratos, pagos, reportes e incidencias.',
    tech: ['CRM ligero', 'Base de datos', 'Panel administrativo'],
    users: 'Propietarios, administradores y pequeños portafolios inmobiliarios.',
    status: 'Prototipo',
    value: 'Profesionaliza una operación que suele depender de mensajes informales.',
  },
  {
    name: 'FaceR',
    category: 'Seguridad institucional',
    problem: 'Control de acceso sin validación suficiente de identidad, QR y trazabilidad.',
    solution: 'Producto para identidad documental, reconocimiento facial, QR seguro y registro de accesos.',
    tech: ['Identidad documental', 'Biometría facial', 'QR seguro', 'Trazabilidad'],
    users: 'Instituciones, edificios, eventos, escuelas y espacios con acceso controlado.',
    status: 'Landing publicada',
    value: 'Convierte la entrada institucional en una experiencia inteligente y verificable.',
    href: 'https://facer-webpage.web.app/',
  },
  {
    name: 'Delitos-SESNSP',
    category: 'Seguridad pública y datos',
    problem: 'Bases de incidencia delictiva difíciles de leer para comparación territorial y temporal.',
    solution: 'Dashboard para explorar delitos, tendencias, entidades y categorías de alto impacto.',
    tech: ['React', 'Visualización', 'Datos SESNSP', 'Análisis territorial'],
    users: 'Analistas, gobiernos, periodistas, investigadores y equipos de seguridad.',
    status: 'Sitio en desarrollo',
    value: 'Transforma datos públicos en inteligencia visual para seguimiento estratégico.',
  },
  {
    name: 'Lukas Portfolio',
    category: 'Reputación artística',
    problem: 'Obra visual joven que requería una presentación digital fina, curada y memorable.',
    solution: 'Portafolio web con recorrido visual, jerarquía estética y navegación suave por piezas.',
    tech: ['React', 'Diseño visual', 'Curaduría digital'],
    users: 'Artistas, galerías, coleccionistas y proyectos culturales.',
    status: 'Sitio publicado',
    value: 'Convierte una trayectoria artística en una experiencia de reputación internacional.',
  },
  {
    name: 'La Cantina Artesanal',
    category: 'Operación comercial',
    problem: 'Inventario, compras, ventas y utilidad diaria registrados sin sistema integrado.',
    solution: 'Aplicación administrativa para productos, precios, stock, compras, ventas y reportes.',
    tech: ['Firebase', 'Inventario', 'Ventas', 'Panel administrativo'],
    users: 'Bares, tiendas, comercios locales y proyectos gastronómicos.',
    status: 'App publicada',
    value: 'Ordena la operación diaria y permite saber qué se compra, vende y gana.',
  },
  {
    name: 'Z-Scooters',
    category: 'Ecommerce y reputación digital',
    problem: 'Sitio comercial con necesidad de diagnóstico SEO, contenidos, catálogo y posicionamiento.',
    solution: 'Auditoría, plan de mejora, contenidos, estructura comercial y seguimiento de pendientes.',
    tech: ['SEO', 'Wix ecommerce', 'Catálogo', 'Contenido comercial'],
    users: 'Comercio especializado en scooters eléctricos, refacciones y taller.',
    status: 'En proceso',
    value: 'Fortalece confianza, visibilidad y conversión para un negocio de movilidad premium.',
  },
]

export default function Products() {
  return (
    <section className="page products-page">
      <div className="page-hero">
        <p className="eyebrow">Productos y experiencias</p>
        <h1>Proyectos que muestran cómo NNI convierte ideas en sistemas.</h1>
        <p>
          Esta sección reúne productos, prototipos, sitios y experiencias desarrolladas
          por NNI. No son piezas aisladas: muestran capacidades acumuladas en diseño,
          IA aplicada, datos, seguridad, comercio, reputación digital y operación.
        </p>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <article className="product-card" key={product.name}>
            <div className="product-card-top">
              <span>{product.category}</span>
              <strong>{product.status}</strong>
            </div>
            <h2>{product.name}</h2>
            <p>{product.problem}</p>
            <div className="product-detail">
              <b>Solución</b>
              <span>{product.solution}</span>
            </div>
            <div className="product-detail">
              <b>Usuarios</b>
              <span>{product.users}</span>
            </div>
            <div className="tag-list compact">
              {product.tech.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <p className="product-value">{product.value}</p>
            {product.href ? (
              <a className="text-link" href={product.href} rel="noreferrer" target="_blank">
                Ver experiencia <ExternalLink size={16} />
              </a>
            ) : (
              <Link className="text-link" to="/contacto">
                Solicitar demo
              </Link>
            )}
          </article>
        ))}
      </div>

      <section className="product-note">
        <p className="eyebrow">Integración recomendada</p>
        <h2>FaceR debe permanecer visible como producto propio de NNI.</h2>
        <p>
          La landing externa de FaceR funciona como demostración inicial. La ruta
          recomendada es integrarla después como <strong>www.nni.ai/productos/facer</strong>
          o publicarla en <strong>facer.nni.ai</strong>, para conservar la fuerza del
          producto sin sacar al visitante del ecosistema institucional.
        </p>
      </section>
    </section>
  )
}
