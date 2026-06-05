import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'

const PROJECTS = [
  {
    num: '01',
    name: 'Meetings.ro',
    category: 'Produs Digital',
    href: 'https://meetings-ro.app',
    col1img1: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
    col1img2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
    col2img: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
  },
  {
    num: '02',
    name: 'Casa Cartarum',
    category: 'Website Premium',
    href: 'https://casacartarum.ro',
    col1img1: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
    col1img2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
    col2img: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
  },
  {
    num: '03',
    name: 'Kashmir Luchiano',
    category: 'Artist Platform',
    href: 'https://kashmirluchiano.com',
    col1img1: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
    col1img2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
    col2img: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
  },
]

function ProjectCard({ project, index, total }: { project: typeof PROJECTS[0]; index: number; total: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ['start end', 'end start'] })
  const targetScale = 1 - (total - 1 - index) * 0.03
  const scale = useTransform(scrollYProgress, [0, 1], [targetScale, 1])

  return (
    <div ref={cardRef} style={{ height: '85vh', position: 'relative' }}>
      <motion.div
        style={{
          scale,
          position: 'sticky',
          top: `calc(6rem + ${index * 28}px)`,
          background: '#0C0C0C',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 'clamp(24px,3vw,40px)',
          padding: 'clamp(1rem,2vw,2rem)',
          willChange: 'transform',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontFamily: "'Kanit', sans-serif", fontSize: 'clamp(2rem,5vw,4rem)', fontWeight: 800, color: 'rgba(255,255,255,0.15)', lineHeight: 1 }}>
              {project.num}
            </span>
            <div>
              <p style={{ color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: 'clamp(0.65rem,0.9vw,0.8rem)', fontFamily: "'DM Sans', sans-serif" }}>
                {project.category}
              </p>
              <p style={{ color: '#fff', fontSize: 'clamp(1rem,2vw,1.5rem)', fontWeight: 600, fontFamily: "'Kanit', sans-serif" }}>
                {project.name}
              </p>
            </div>
          </div>
          <a href={project.href} target="_blank" rel="noopener noreferrer"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '0.8rem',
              color: '#fff',
              background: 'rgba(255,255,255,0.1)',
              padding: '0.5rem 1rem',
              borderRadius: '9999px',
              textDecoration: 'none',
              transition: 'background 0.2s',
            }}
            className="hover:bg-white/20"
          >
            Vezi proiectul →
          </a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '40% 60%', gap: 'clamp(0.5rem,1vw,1rem)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.5rem,1vw,1rem)' }}>
            <img src={project.col1img1} alt="" style={{ width: '100%', height: 'clamp(120px,14vw,200px)', objectFit: 'cover', borderRadius: 'clamp(16px,3vw,40px)' }} />
            <img src={project.col1img2} alt="" style={{ width: '100%', height: 'clamp(140px,18vw,280px)', objectFit: 'cover', borderRadius: 'clamp(16px,3vw,40px)' }} />
          </div>
          <img src={project.col2img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'clamp(16px,3vw,40px)' }} />
        </div>
      </motion.div>
    </div>
  )
}

export default function PortofoliuPage() {
  return (
    <div style={{ paddingTop: '6rem' }}>
      <section style={{ padding: '4rem 2rem 6rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              fontFamily: "'Kanit', sans-serif",
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              marginBottom: '1rem',
            }}
          >
            Proiectele noastre
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color: 'rgba(255,255,255,0.5)',
              fontSize: '1.05rem',
              maxWidth: '500px',
              marginBottom: '4rem',
              lineHeight: 1.6,
            }}
          >
            Fiecare proiect e construit cu atenție la detalii și focus pe rezultate reale.
          </motion.p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {PROJECTS.map((p, i) => (
              <ProjectCard key={p.num} project={p} index={i} total={PROJECTS.length} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '4rem 2rem', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 style={{
            fontFamily: "'Kanit', sans-serif",
            fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
            fontWeight: 600,
            marginBottom: '1rem',
          }}>
            Următorul proiect poate fi al tău
          </h2>
          <Link to="/voice-agents"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              fontSize: '0.95rem',
              color: '#fff',
              background: 'linear-gradient(135deg, #4A90FF 0%, #357ABD 100%)',
              padding: '0.85rem 2rem',
              borderRadius: '9999px',
              textDecoration: 'none',
              display: 'inline-block',
              boxShadow: '0 8px 30px rgba(74,144,255,0.3)',
            }}
            className="hover:scale-105 clickable"
          >
            Explorează serviciile
          </Link>
        </motion.div>
      </section>
    </div>
  )
}