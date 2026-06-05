import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const ALL_SERVICES = [
  {
    num: '01',
    name: 'Voice Agents AI',
    tagline: 'Un call center întreg într-un singur agent AI',
    desc: 'Agenți vocali care sună natural în română, preiau apeluri 24/7, califică lead-uri și programează clienți. Reduci costurile cu 80% și nu mai pierzi niciun apel.',
    features: ['Vocifera românească naturală', 'Programări automate', 'Calificare lead-uri AI', 'Rapoarte săptămânale'],
    path: '/voice-agents',
  },
  {
    num: '02',
    name: 'Website-uri Premium',
    tagline: 'Site-uri care arată de milioane și convertesc ca atare',
    desc: 'Design personalizat, performanță ultra-rapidă, optimizat SEO și construit pentru conversie. Fiecare pixel e gândit să-ți aducă clienți.',
    features: ['Design unic premium', 'Viteză < 1s încărcare', 'Optimizare SEO', 'Panou administrare'],
    path: '/servicii',
  },
  {
    num: '03',
    name: 'AI & Automatizări',
    tagline: 'Munca repetitivă dispare. Tu te concentrezi pe business.',
    desc: 'Conectăm aplicațiile tale și automatizăm procesele manuale cu n8n, Make și API-uri personalizate. Fluxuri inteligente care lucrează pentru tine non-stop.',
    features: ['n8n Workflows', 'Integrări API', 'Raportare automată', 'CRM sync'],
    path: '/ai-automatizari',
  },
  {
    num: '04',
    name: 'SEO & Content',
    tagline: 'Apară primul în Google. Acolo unde clienții te caută.',
    desc: 'Strategie completă de conținut și optimizare pentru motoarele de căutare. Articole, optimizări on-page și content care atrage trafic organic.',
    features: ['Audit SEO complet', 'Optimizare on-page', 'Content strategy', 'Link building'],
    path: '/seo',
  },
  {
    num: '05',
    name: 'Video Production',
    tagline: 'Content vizual care oprește scroll-ul',
    desc: 'Reclame video, content pentru social media și producții vizuale de înaltă calitate. De la concept la livrare, totul într-un singur loc.',
    features: ['Reclame video', 'Social media content', 'Produse vizuale', 'Animații 3D'],
    path: '/video-editing',
  },
  {
    num: '06',
    name: 'Sound Engineering',
    tagline: 'Sunetul care definește brandul tău',
    desc: 'Producție audio profesională, voice AI branding, jingle-uri și peisaje sonore pentru campanii și produse digitale.',
    features: ['Voice AI branding', 'Producție audio', 'Jingle-uri', 'Sound design'],
    path: '/sound-engineering',
  },
]

export default function ServiciiPage() {
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
              letterSpacing: '-0.03em',
              marginBottom: '1rem',
            }}
          >
            Tot ce ai nevoie,{' '}
            <span style={{
              background: 'linear-gradient(135deg, #4A90FF 0%, #7ab4ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              într-un singur loc
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color: 'rgba(255,255,255,0.5)',
              fontSize: '1.05rem',
              maxWidth: '600px',
              marginBottom: '3rem',
              lineHeight: 1.6,
            }}
          >
            De la voice agents AI și website-uri premium, la automatizări și content — 
            oferim un ecosistem digital complet pentru business-ul tău.
          </motion.p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'rgba(255,255,255,0.06)', borderRadius: '20px', overflow: 'hidden' }}>
            {ALL_SERVICES.map((s, i) => (
              <Link key={s.num} to={s.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.06 }}
                  style={{
                    padding: '2.5rem 2rem',
                    background: 'rgba(255,255,255,0.02)',
                    transition: 'background 0.3s',
                  }}
                  className="hover:bg-white/[0.04]"
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', flexWrap: 'wrap' }}>
                    <span style={{
                      fontFamily: "'Kanit', sans-serif",
                      fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                      fontWeight: 800,
                      lineHeight: 1,
                      background: 'linear-gradient(180deg, rgba(74,144,255,0.3) 0%, transparent 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      flexShrink: 0,
                    }}>
                      {s.num}
                    </span>
                    <div style={{ flex: 1, minWidth: '200px' }}>
                      <h2 style={{
                        fontFamily: "'Kanit', sans-serif",
                        fontSize: '1.3rem',
                        fontWeight: 600,
                        marginBottom: '0.25rem',
                      }}>
                        {s.name}
                      </h2>
                      <p style={{
                        fontFamily: "'DM Sans', sans-serif",
                        color: 'rgba(74,144,255,0.6)',
                        fontSize: '0.85rem',
                        fontWeight: 500,
                        marginBottom: '0.5rem',
                      }}>
                        {s.tagline}
                      </p>
                      <p style={{
                        fontFamily: "'DM Sans', sans-serif",
                        color: 'rgba(255,255,255,0.45)',
                        fontSize: '0.85rem',
                        lineHeight: 1.5,
                        marginBottom: '0.75rem',
                      }}>
                        {s.desc}
                      </p>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {s.features.map(f => (
                          <span key={f} style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: '0.75rem',
                            color: 'rgba(255,255,255,0.4)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '9999px',
                            padding: '0.2rem 0.75rem',
                          }}>
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}