import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'

const SERVICES = [
  { num: '01', name: 'Voice Agents AI', desc: 'Agenți vocali inteligenți care sună exact ca oamenii. Automatizează apelurile, califică lead-urile și oferă suport 24/7.', path: '/voice-agents', icon: '🎙' },
  { num: '02', name: 'Website-uri Premium', desc: 'Site-uri care convertesc. Design modern, performanță ultra-rapidă și experiență impecabilă pe orice device.', path: '/servicii', icon: '✦' },
  { num: '03', name: 'AI & Automatizări', desc: 'Fluxuri inteligente care elimină munca repetitivă. Conectăm aplicațiile tale și automatizăm procesele critice.', path: '/ai-automatizari', icon: '⚡' },
  { num: '04', name: 'SEO & Content', desc: 'Strategie de conținut care te pune pe primul loc în căutări. Articole, optimizări și content care atrage.', path: '/seo', icon: '◎' },
]

const LOGOS = [
  'Meetings.ro', 'Casa Cartarum', 'Kashmir Luchiano',
  'Meetings.ro', 'Casa Cartarum', 'Kashmir Luchiano',
  'Meetings.ro', 'Casa Cartarum', 'Kashmir Luchiano',
]

export default function HomePage() {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])

  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight })
    }
    window.addEventListener('mousemove', onMouse)
    return () => window.removeEventListener('mousemove', onMouse)
  }, [])

  return (
    <div>
      {/* ────────────── HERO ────────────── */}
      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          padding: '6rem 2rem 4rem',
        }}
      >
        {/* Hero glow */}
        <div
          style={{
            position: 'absolute',
            top: '20%',
            left: `${30 + mousePos.x * 20}%`,
            width: '60vw',
            height: '60vw',
            background: 'radial-gradient(circle, rgba(74,144,255,0.08) 0%, transparent 60%)',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            transition: 'left 0.3s ease-out',
          }}
        />

        <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.8rem',
                fontWeight: 600,
                color: '#4A90FF',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                display: 'inline-block',
                border: '1px solid rgba(74,144,255,0.3)',
                borderRadius: '9999px',
                padding: '0.35rem 1rem',
                marginBottom: '2rem',
                background: 'rgba(74,144,255,0.06)',
              }}
            >
              Agenție Digitală Full-Service
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Kanit', sans-serif",
              fontSize: 'clamp(2.8rem, 8vw, 6rem)',
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: '-0.03em',
              marginBottom: '1.5rem',
            }}
          >
            Prezență digitală{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #4A90FF 0%, #7ab4ff 50%, #BBCCD7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              care generează
            </span>
            <br />
            rezultate reale.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              color: 'rgba(255,255,255,0.6)',
              maxWidth: '600px',
              lineHeight: 1.6,
              marginBottom: '2.5rem',
            }}
          >
            Website-uri premium, voice agents AI și automatizări inteligente — 
            construim tot ce ai nevoie ca să crești online.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
          >
            <Link
              to="/voice-agents"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 600,
                fontSize: '0.95rem',
                color: '#fff',
                background: 'linear-gradient(135deg, #4A90FF 0%, #357ABD 100%)',
                padding: '0.85rem 2rem',
                borderRadius: '9999px',
                textDecoration: 'none',
                boxShadow: '0 8px 30px rgba(74,144,255,0.3)',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              className="hover:scale-105"
            >
              Explorează Voice Agents
            </Link>
            <Link
              to="/portofoliu"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                fontSize: '0.95rem',
                color: 'rgba(255,255,255,0.8)',
                padding: '0.85rem 2rem',
                borderRadius: '9999px',
                textDecoration: 'none',
                border: '1px solid rgba(255,255,255,0.15)',
                transition: 'all 0.2s',
              }}
              className="hover:bg-white/5 hover:border-white/30"
            >
              Vezi portofoliul
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          style={{ opacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div
            style={{
              width: '1px',
              height: '40px',
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)',
              margin: '0 auto',
            }}
          />
        </motion.div>
      </section>

      {/* ────────────── MARQUEE ────────────── */}
      <section style={{ padding: '2rem 0', overflow: 'hidden' }}>
        <MarqueeRow items={LOGOS} />
      </section>

      {/* ────────────── SERVICES ────────────── */}
      <section style={{ padding: '6rem 2rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              fontFamily: "'Kanit', sans-serif",
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 700,
              marginBottom: '0.75rem',
            }}
          >
            Ce construim
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color: 'rgba(255,255,255,0.5)',
              fontSize: '1.05rem',
              marginBottom: '3rem',
            }}
          >
            Soluții complete pentru business-ul tău digital
          </motion.p>

          <div style={{ display: 'grid', gap: '1px', background: 'rgba(255,255,255,0.06)' }}>
            {SERVICES.map((s, i) => (
              <Link
                key={s.num}
                to={s.path}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1.5rem',
                    padding: '2rem 1.5rem',
                    background: 'rgba(255,255,255,0.02)',
                    transition: 'background 0.3s',
                    cursor: 'pointer',
                  }}
                  className="hover:bg-white/5"
                >
                  <span
                    style={{
                      fontFamily: "'Kanit', sans-serif",
                      fontSize: 'clamp(2rem, 6vw, 4rem)',
                      fontWeight: 800,
                      lineHeight: 1,
                      background: 'linear-gradient(180deg, rgba(74,144,255,0.3) 0%, transparent 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      flexShrink: 0,
                    }}
                  >
                    {s.num}
                  </span>
                  <div style={{ paddingTop: '0.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                      <span style={{ fontFamily: "'Kanit', sans-serif", fontSize: '1.25rem', fontWeight: 600 }}>
                        {s.name}
                      </span>
                    </div>
                    <p style={{
                      fontFamily: "'DM Sans', sans-serif",
                      color: 'rgba(255,255,255,0.45)',
                      fontSize: '0.9rem',
                      lineHeight: 1.5,
                    }}>
                      {s.desc}
                    </p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────── CTA ────────────── */}
      <section
        style={{
          padding: '8rem 2rem',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at center, rgba(74,144,255,0.06) 0%, transparent 60%)',
            pointerEvents: 'none',
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ position: 'relative', zIndex: 1 }}
        >
          <h2
            style={{
              fontFamily: "'Kanit', sans-serif",
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 700,
              marginBottom: '1rem',
            }}
          >
            Hai să construim{' '}
            <span style={{ background: 'linear-gradient(135deg, #4A90FF, #7ab4ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              ceva excepțional
            </span>
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            color: 'rgba(255,255,255,0.5)',
            fontSize: '1.05rem',
            marginBottom: '2rem',
          }}>
            Spune-ne despre proiectul tău și hai să transformăm viziunea în realitate
          </p>
          <a
            href="mailto:hello@kashmirdigital.org"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              fontSize: '1rem',
              color: '#fff',
              background: 'linear-gradient(135deg, #4A90FF 0%, #357ABD 100%)',
              padding: '1rem 2.5rem',
              borderRadius: '9999px',
              textDecoration: 'none',
              display: 'inline-block',
              boxShadow: '0 8px 30px rgba(74,144,255,0.3)',
            }}
            className="hover:scale-105 clickable"
          >
            Trimite un mesaj
          </a>
        </motion.div>
      </section>
    </div>
  )
}

function MarqueeRow({ items }: { items: string[] }) {
  return (
    <div
      style={{
        display: 'flex',
        gap: '3rem',
        animation: 'marquee 25s linear infinite',
        width: 'fit-content',
      }}
    >
      {items.map((name, i) => (
        <span
          key={i}
          style={{
            fontFamily: "'Kanit', sans-serif",
            fontSize: '1.1rem',
            fontWeight: 600,
            color: 'rgba(255,255,255,0.12)',
            whiteSpace: 'nowrap',
            letterSpacing: '0.1em',
          }}
        >
          {name} ✦
        </span>
      ))}
    </div>
  )
}