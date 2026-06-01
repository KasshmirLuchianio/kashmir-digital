import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const SENSITIVITY = 0.8
const VIDEO_URL = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4'
const EMAIL = 'hello@kashmirdigital.org'

const VARIANTS = {
  default: {
    intro: ['Bun venit în zona noastră de servicii,', 'Kashmir Digital — Agenție Full Service'],
    typewriter: 'Construim mai mult decât website-uri. Creăm experiențe digitale care vând, automatizează și cresc afaceri 24/7.',
    pills: ['Website Premium', 'Agenți AI', 'Automatizări', 'Content & SEO'],
  },
  'ai-agenti': {
    intro: ['Agenți AI care lucrează non-stop,', 'Kashmir Digital — Inteligență Artificială Aplicată'],
    typewriter: 'Agenții noștri AI răspund clienților, califică lead-urile și automatizează conversațiile — oricând, oriunde.',
    pills: ['Voice Agents', 'Chatboți AI', 'Lead Calificare', 'Integrare CRM'],
  },
  'ai-automatizari': {
    intro: ['Automatizări care elimină munca repetitivă,', 'Kashmir Digital — Fluxuri Inteligente'],
    typewriter: 'Conectăm aplicațiile tale și automatizăm procesele manuale. Tu te concentrezi pe business, noi pe automatizare.',
    pills: ['n8n Workflows', 'Make / Zapier', 'API Integrări', 'Raportare Auto'],
  },
}

function useTypewriter(text: string, speed = 38, startDelay = 600) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    setDisplayed('')
    setDone(false)
    let idx = 0
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        idx++
        setDisplayed(text.slice(0, idx))
        if (idx >= text.length) {
          clearInterval(interval)
          setDone(true)
        }
      }, speed)
      return () => clearInterval(interval)
    }, startDelay)
    return () => clearTimeout(timeout)
  }, [text, speed, startDelay])

  return { displayed, done }
}

interface Props {
  variant?: 'default' | 'ai-agenti' | 'ai-automatizari'
}

const NAV_LINKS = [
  { label: 'Acasă', to: '/' },
  { label: 'Servicii', to: '/servicii' },
  { label: 'Portofoliu', to: '/portofoliu' },
  { label: 'Contact', to: '/#contact' },
]

export default function ServiciiPage({ variant = 'default' }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const prevXRef = useRef<number | null>(null)
  const targetTimeRef = useRef(0)
  const seekingRef = useRef(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [pillsVisible, setPillsVisible] = useState(false)
  const [copied, setCopied] = useState(false)

  const content = VARIANTS[variant]
  const { displayed, done } = useTypewriter(content.typewriter, 38, 600)

  useEffect(() => {
    const t = setTimeout(() => setPillsVisible(true), 400)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleSeeked = () => {
      seekingRef.current = false
      if (video.currentTime !== targetTimeRef.current) {
        video.currentTime = targetTimeRef.current
        seekingRef.current = true
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (prevXRef.current === null) {
        prevXRef.current = e.clientX
        return
      }
      const delta = e.clientX - prevXRef.current
      prevXRef.current = e.clientX
      if (!video.duration) return
      const offset = (delta / window.innerWidth) * SENSITIVITY * video.duration
      targetTimeRef.current = Math.max(0, Math.min(video.duration, targetTimeRef.current + offset))
      if (!seekingRef.current) {
        video.currentTime = targetTimeRef.current
        seekingRef.current = true
      }
    }

    video.addEventListener('seeked', handleSeeked)
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      video.removeEventListener('seeked', handleSeeked)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const handleCopy = () => {
    navigator.clipboard.writeText(EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const pillBase: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '9999px',
    fontSize: 'clamp(13px, 1.5vw, 15px)',
    padding: '0.3em 1.25rem',
    margin: '0.2em',
    marginBottom: '0.4em',
    whiteSpace: 'nowrap',
    fontFamily: 'var(--font-body)',
    cursor: 'pointer',
    transition: 'background 0.2s, color 0.2s',
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#000', overflowX: 'hidden' }}>
      {/* Video */}
      <video
        ref={videoRef}
        src={VIDEO_URL}
        muted
        playsInline
        preload="auto"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: '70% center',
        }}
      />

      {/* Navbar */}
      <nav
        style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 10 }}
        className="px-5 sm:px-8 py-4 sm:py-5 flex justify-between items-center"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Link to="/" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(18px, 2.5vw, 26px)', letterSpacing: '-0.02em', color: '#fff', textDecoration: 'none' }}>
            Kashmir Digital®
          </Link>
          <span style={{ fontSize: 'clamp(22px, 3vw, 30px)', color: '#fff', userSelect: 'none', letterSpacing: '-0.02em' }}>
            ✳︎
          </span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex" style={{ gap: '2rem' }}>
          {NAV_LINKS.map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              style={{ fontFamily: 'var(--font-body)', fontSize: '20px', color: '#fff', textDecoration: 'none' }}
              className="hover:opacity-60 transition-opacity"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <a
          href={`mailto:${EMAIL}`}
          style={{ fontFamily: 'var(--font-body)', fontSize: '20px', color: '#fff', textDecoration: 'underline', textUnderlineOffset: '2px' }}
          className="hidden md:block hover:opacity-60 transition-opacity"
        >
          Contactează-ne
        </a>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col cursor-pointer p-1"
          style={{ gap: '5px', background: 'none', border: 'none' }}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Meniu"
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display: 'block',
              width: '24px',
              height: '2px',
              background: '#fff',
              transition: 'all 0.3s',
              transform: menuOpen && i === 0 ? 'rotate(45deg) translateY(7px)'
                : menuOpen && i === 2 ? 'rotate(-45deg) translateY(-7px)' : 'none',
              opacity: menuOpen && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile overlay */}
      <div
        className="md:hidden"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9,
          background: 'rgba(0,0,0,0.95)',
          backdropFilter: 'blur(4px)',
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingLeft: '2rem',
          gap: '2rem',
        }}
      >
        {NAV_LINKS.map(({ label, to }) => (
          <Link
            key={label}
            to={to}
            style={{ fontFamily: 'var(--font-body)', fontSize: '32px', fontWeight: 500, color: '#fff', textDecoration: 'none' }}
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </Link>
        ))}
        <a
          href={`mailto:${EMAIL}`}
          style={{ fontFamily: 'var(--font-body)', fontSize: '32px', fontWeight: 500, color: '#fff', textDecoration: 'underline' }}
        >
          Contactează-ne
        </a>
      </div>

      {/* Hero section */}
      <section
        style={{ position: 'relative', zIndex: 1, height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
        className="justify-end pb-12 md:justify-center md:pb-0 px-5 sm:px-8 md:px-10"
      >
        <div style={{ maxWidth: '600px', position: 'relative', zIndex: 10 }}>
          {/* Blurred intro */}
          <p style={{
            pointerEvents: 'none',
            userSelect: 'none',
            marginBottom: '1.5rem',
            fontSize: 'clamp(18px, 4vw, 26px)',
            lineHeight: 1.3,
            fontWeight: 400,
            color: '#fff',
            filter: 'blur(4px)',
            fontFamily: 'var(--font-body)',
          }}>
            {content.intro[0]}<br />{content.intro[1]}
          </p>

          {/* Typewriter */}
          <p style={{
            color: '#fff',
            marginBottom: '1.5rem',
            fontSize: 'clamp(18px, 4vw, 26px)',
            lineHeight: 1.35,
            fontWeight: 400,
            minHeight: '54px',
            fontFamily: 'var(--font-body)',
          }}>
            {displayed}
            {!done && <span className="blink-cursor" style={{ display: 'inline-block', width: '2px', height: '1.1em', background: '#fff', verticalAlign: 'middle', marginLeft: '2px' }} />}
          </p>

          {/* Pills */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            opacity: pillsVisible ? 1 : 0,
            transform: pillsVisible ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.4s ease, transform 0.4s ease',
          }}>
            {content.pills.map(label => (
              <button
                key={label}
                style={{ ...pillBase, background: 'white', color: 'black', border: '1px solid rgba(0,0,0,0.1)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#000'; (e.currentTarget as HTMLButtonElement).style.color = '#fff' }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#fff'; (e.currentTarget as HTMLButtonElement).style.color = '#000' }}
              >
                {label}
              </button>
            ))}
            {/* Email pill */}
            <button
              onClick={handleCopy}
              style={{ ...pillBase, background: 'transparent', color: 'white', border: '1px solid rgba(255,255,255,0.6)', gap: '0.5rem' }}
              onMouseEnter={e => { const el = e.currentTarget; el.style.background = '#fff'; el.style.color = '#000' }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.background = 'transparent'; el.style.color = '#fff' }}
            >
              {copied ? 'Copiat! ✓' : `Scrie-ne: ${EMAIL}`}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                <rect x="4" y="0" width="8" height="8" rx="1" />
                <rect x="0" y="4" width="8" height="8" rx="1" opacity="0.5" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
