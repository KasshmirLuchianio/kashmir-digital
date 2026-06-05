import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

const NAV_ITEMS = [
  { label: 'Acasă', path: '/' },
  { label: 'Servicii', path: '/servicii' },
  { label: 'Voice Agents', path: '/voice-agents' },
  { label: 'AI & Automatizări', path: '/ai-automatizari' },
  { label: 'Portofoliu', path: '/portofoliu' },
  { label: 'SEO & Content', path: '/seo' },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  return (
    <div style={{ background: '#050505', minHeight: '100vh', color: '#fff', position: 'relative', zIndex: 1 }}>
      {/* Navbar */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: scrolled ? '0.75rem 2rem' : '1.25rem 2rem',
          background: scrolled ? 'rgba(5,5,5,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : 'none',
          transition: 'all 0.4s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Link
          to="/"
          style={{
            fontFamily: "'Kanit', sans-serif",
            fontSize: '1.4rem',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            background: 'linear-gradient(180deg, #646973 0%, #BBCCD7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textDecoration: 'none',
          }}
        >
          Kashmir Digital<span style={{ color: '#4A90FF', WebkitTextFillColor: '#4A90FF' }}>.</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex" style={{ gap: '2rem' }}>
          {NAV_ITEMS.map(item => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.85rem',
                fontWeight: 500,
                color: location.pathname === item.path ? '#4A90FF' : 'rgba(255,255,255,0.7)',
                textDecoration: 'none',
                letterSpacing: '0.03em',
                transition: 'color 0.2s',
                position: 'relative',
              }}
              className="nav-link"
            >
              {item.label}
              {location.pathname === item.path && (
                <span
                  style={{
                    position: 'absolute',
                    bottom: -4,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: '#4A90FF',
                    borderRadius: '2px',
                  }}
                />
              )}
            </Link>
          ))}
        </div>

        <a
          href="mailto:hello@kashmirdigital.org"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.85rem',
            fontWeight: 600,
            color: '#fff',
            background: 'linear-gradient(135deg, #4A90FF 0%, #357ABD 100%)',
            padding: '0.6rem 1.5rem',
            borderRadius: '9999px',
            textDecoration: 'none',
            transition: 'transform 0.2s, box-shadow 0.2s',
            boxShadow: '0 4px 15px rgba(74,144,255,0.3)',
          }}
          className="hover:scale-105 clickable"
        >
          Hai să vorbim
        </a>

        {/* Hamburger */}
        <button
          className="lg:hidden"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            color: '#fff',
          }}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Meniu"
        >
          <div style={{ width: '24px', height: '16px', position: 'relative' }}>
            <span style={{
              display: 'block',
              width: '100%',
              height: '2px',
              background: '#fff',
              position: 'absolute',
              top: menuOpen ? '7px' : '0',
              transform: menuOpen ? 'rotate(45deg)' : 'none',
              transition: 'all 0.3s',
            }} />
            <span style={{
              display: 'block',
              width: '100%',
              height: '2px',
              background: '#fff',
              position: 'absolute',
              top: '7px',
              opacity: menuOpen ? 0 : 1,
              transition: 'opacity 0.2s',
            }} />
            <span style={{
              display: 'block',
              width: '100%',
              height: '2px',
              background: '#fff',
              position: 'absolute',
              top: menuOpen ? '7px' : '14px',
              transform: menuOpen ? 'rotate(-45deg)' : 'none',
              transition: 'all 0.3s',
            }} />
          </div>
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99,
          background: 'rgba(5,5,5,0.97)',
          backdropFilter: 'blur(20px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '2rem',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          transition: 'opacity 0.4s ease',
        }}
      >
        {NAV_ITEMS.map(item => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              fontFamily: "'Kanit', sans-serif",
              fontSize: '1.8rem',
              fontWeight: 600,
              color: location.pathname === item.path ? '#4A90FF' : '#fff',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
          >
            {item.label}
          </Link>
        ))}
        <a
          href="mailto:hello@kashmirdigital.org"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '1.1rem',
            fontWeight: 600,
            color: '#fff',
            background: '#4A90FF',
            padding: '0.8rem 2rem',
            borderRadius: '9999px',
            textDecoration: 'none',
            marginTop: '1rem',
          }}
        >
          Hai să vorbim
        </a>
      </div>

      {/* Main content */}
      <main style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          padding: '3rem 2rem',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <p style={{ fontFamily: "'DM Sans', sans-serif", color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>
          © {new Date().getFullYear()} Kashmir Digital. Toate drepturile rezervate.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1rem' }}>
          <a href="mailto:hello@kashmirdigital.org" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.2s' }}>
            hello@kashmirdigital.org
          </a>
        </div>
      </footer>
    </div>
  )
}