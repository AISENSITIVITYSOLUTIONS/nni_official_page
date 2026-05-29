import { NavLink } from 'react-router-dom'
import logo from '../../assets/nni-logo.svg'

const navItems = [
  { to: '/', label: 'Inicio' },
  { to: '/servicios', label: 'Servicios' },
  { to: '/cursos', label: 'Cursos' },
  { to: 'https://facer-webpage.web.app/', label: 'Productos', external: true },
  { to: '/publicaciones', label: 'Publicaciones' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/dashboard', label: 'Panel' },
  { to: '/contacto', label: 'Contacto', cta: true },
]

export default function Layout({ children }) {
  return (
    <div className="site-shell">
      <header className="site-header">
        <NavLink className="brand" to="/" aria-label="Ir al inicio">
          <img className="brand-logo" src={logo} alt="Neural Network Initiative" />
        </NavLink>

        <nav className="main-nav" aria-label="Navegacion principal">
          {navItems.map((item) =>
            item.external ? (
              <a
                key={item.to}
                className="nav-link"
                href={item.to}
                rel="noreferrer"
                target="_blank"
              >
                {item.label}
              </a>
            ) : (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [
                    'nav-link',
                    item.cta ? 'nav-link-cta' : '',
                    isActive ? 'nav-link-active' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')
                }
                end={item.to === '/'}
              >
                {item.label}
              </NavLink>
            ),
          )}
        </nav>
      </header>

      <main className="page-content">{children}</main>
    </div>
  )
}
