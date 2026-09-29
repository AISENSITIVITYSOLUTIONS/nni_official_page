import { NavLink } from 'react-router-dom'
import { useLanguage } from '../../i18n/language'

const navItems = [
  { to: '/', label: { es: 'Inicio', en: 'Home' } },
  { to: '/servicios', label: { es: 'Servicios', en: 'Services' } },
  { to: '/productos', label: { es: 'Productos', en: 'Products' } },
  { to: '/cursos', label: { es: 'Cursos', en: 'Training' } },
  { to: '/publicaciones', label: { es: 'Publicaciones', en: 'Publications' } },
  { to: '/nosotros', label: { es: 'Nosotros', en: 'About' } },
  { to: '/dashboard', label: { es: 'Panel', en: 'Dashboard' } },
  { to: '/contacto', label: { es: 'Contacto', en: 'Contact' }, cta: true },
]

export default function Layout({ children }) {
  const { language, setLanguage } = useLanguage()
  const copy = {
    es: {
      homeAria: 'Ir al inicio',
      tagline: 'Inteligencia aplicada',
      navAria: 'Navegación principal',
      languageAria: 'Cambiar idioma',
    },
    en: {
      homeAria: 'Go to home',
      tagline: 'Applied intelligence',
      navAria: 'Primary navigation',
      languageAria: 'Change language',
    },
  }[language]

  return (
    <div className="site-shell">
      <header className="site-header">
        <NavLink className="brand" to="/" aria-label={copy.homeAria}>
          <span className="brand-mark">NNI</span>
          <span className="brand-copy">
            <strong>Neural Network Initiative</strong>
            <small>{copy.tagline}</small>
          </span>
        </NavLink>

        <nav className="main-nav" aria-label={copy.navAria}>
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
              {item.label[language]}
            </NavLink>
          ))}
        </nav>

        <div className="language-switcher" aria-label={copy.languageAria}>
          {['es', 'en'].map((item) => (
            <button
              aria-pressed={language === item}
              className={language === item ? 'language-button language-button-active' : 'language-button'}
              key={item}
              onClick={() => setLanguage(item)}
              type="button"
            >
              {item.toUpperCase()}
            </button>
          ))}
        </div>
      </header>

      <main className="page-content">{children}</main>
    </div>
  )
}
