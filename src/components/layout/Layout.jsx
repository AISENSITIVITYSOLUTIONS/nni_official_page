import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Inicio' },
  { to: '/servicios', label: 'Servicios' },
  { to: '/productos', label: 'Productos' },
  { to: '/cursos', label: 'Cursos' },
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
          <span className="brand-mark">NNI</span>
          <span className="brand-copy">
            <strong>Neural Network Initiative</strong>
            <small>Inteligencia aplicada</small>
          </span>
        </NavLink>

        <nav className="main-nav" aria-label="Navegación principal">
          {navItems.map((item) => (
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
          ))}
        </nav>
      </header>

      <main className="page-content">{children}</main>
    </div>
  )
}
