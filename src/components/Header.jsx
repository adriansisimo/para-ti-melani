import { useEffect, useState } from 'react'
import './Header.css'

const links = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#ella', label: 'Ella' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#tiempo', label: 'Nuestro tiempo' },
  { href: '#graduacion', label: 'Para ti' },
]

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) return

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.classList.add('no-scroll')

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.classList.remove('no-scroll')
    }
  }, [menuOpen])

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 900px)')

    const handleChange = (event) => {
      if (event.matches) {
        setMenuOpen(false)
      }
    }

    desktop.addEventListener('change', handleChange)

    return () => {
      desktop.removeEventListener('change', handleChange)
    }
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <div className="header-inner container">
        <a
          className="header-heart"
          href="#inicio"
          aria-label="Volver al inicio"
          onClick={closeMenu}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill="currentColor"
            />
          </svg>
        </a>

        <button
          type="button"
          className={`menu-toggle ${menuOpen ? 'is-open' : ''}`}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          aria-controls="main-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          id="main-menu"
          className={`main-menu ${menuOpen ? 'is-open' : ''}`}
          aria-label="Navegación principal"
        >
          <ul>
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={closeMenu}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header