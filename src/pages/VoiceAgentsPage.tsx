import { motion } from 'framer-motion'

const FEATURES = [
  { title: 'Apeluri 24/7', desc: 'Agentul răspunde non-stop, chiar și când dormi. Fiecare apel e preluat instant.', icon: '🔄' },
  { title: 'Vocifera Naturală', desc: 'Sună exact ca un om. Inflexiuni, pauze naturale, accent românesc perfect.', icon: '🎯' },
  { title: 'Calificare Lead-uri', desc: 'Identifică clienții interesați, programează demo-uri și trimite datele în CRM.', icon: '📊' },
  { title: 'Programări Auto', desc: 'Rezervări automate în calendar. Clientul spune data, agentul confirmă instant.', icon: '📅' },
  { title: 'Multi-Limbă', desc: 'Vorbește română, engleză, franceză — perfect, fără accent robotic.', icon: '🌐' },
  { title: 'Rapoarte Detaliate', desc: 'Primești statistici: câte apeluri, câte conversii, durată medie, scor lead.', icon: '📈' },
]

const USE_CASES = [
  {
    title: 'Restaurante',
    desc: 'Preia comenzi, confirmă rezervări, răspunde la întrebări despre meniu și program.',
    price: 'de la 299 lei/lună',
  },
  {
    title: 'Clinici Medicale',
    desc: 'Programează consultații, trimite remindere, răspunde la întrebări frecvente.',
    price: 'de la 399 lei/lună',
  },
  {
    title: 'Hoteluri & Pensiuni',
    desc: 'Confirmă rezervări, răspunde la întrebări despre facilități, prețuri și disponibilitate.',
    price: 'de la 349 lei/lună',
  },
  {
    title: 'E-Commerce',
    desc: 'Suport clienți, status comandă, întrebări produse — 24/7 fără intervale de așteptare.',
    price: 'de la 249 lei/lună',
  },
]

const HOW_IT_WORKS = [
  { step: '01', title: 'Configurezi', desc: 'Îi spui ce să facă — orar, prețuri, întrebări frecvente. Noi îl antrenăm.' },
  { step: '02', title: 'Conectezi', desc: 'Îl legi de numărul tău de telefon existent sau de unul nou. 5 minute.' },
  { step: '03', title: 'Activezi', desc: 'Agentul preia apelurile. Tu primești rapoarte și lead-uri calificate.' },
  { step: '04', title: 'Optimizezi', desc: 'Analizăm conversațiile și îmbunătățim continuu răspunsurile.' },
]

export default function VoiceAgentsPage() {
  return (
    <div style={{ paddingTop: '6rem' }}>
      {/* ─── HERO ─── */}
      <section style={{ padding: '4rem 2rem 6rem', textAlign: 'center', position: 'relative' }}>
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80vw',
          height: '80vw',
          background: 'radial-gradient(circle, rgba(74,144,255,0.06) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
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
              marginBottom: '1.5rem',
              background: 'rgba(74,144,255,0.06)',
            }}
          >
            Voice Agents AI
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              fontFamily: "'Kanit', sans-serif",
              fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              marginBottom: '1.5rem',
            }}
          >
            Un agent care sună{' '}
            <span style={{
              background: 'linear-gradient(135deg, #4A90FF 0%, #7ab4ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              exact ca tine
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '1.1rem',
              color: 'rgba(255,255,255,0.6)',
              maxWidth: '600px',
              margin: '0 auto 2.5rem',
              lineHeight: 1.6,
            }}
          >
            Agenți vocali AI care preiau apelurile, califică lead-urile și programează clienții — 
            non-stop, în română naturală, fără timpi de așteptare.
          </motion.p>

          <motion.a
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
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
            Programează un demo
          </motion.a>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section style={{ padding: '4rem 2rem 6rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontFamily: "'Kanit', sans-serif",
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 700,
              marginBottom: '0.75rem',
              textAlign: 'center',
            }}
          >
            De ce voice agents?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color: 'rgba(255,255,255,0.5)',
              fontSize: '1rem',
              textAlign: 'center',
              marginBottom: '3rem',
            }}
          >
            Nu mai pierde apeluri. Nu mai plăti operatori. Automatizează complet comunicarea telefonică.
          </motion.p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1px', background: 'rgba(255,255,255,0.06)', borderRadius: '16px', overflow: 'hidden' }}>
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                style={{
                  padding: '2rem',
                  background: 'rgba(255,255,255,0.02)',
                }}
              >
                <div style={{ fontSize: '1.8rem', marginBottom: '0.75rem' }}>{f.icon}</div>
                <h3 style={{
                  fontFamily: "'Kanit', sans-serif",
                  fontSize: '1.15rem',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                }}>
                  {f.title}
                </h3>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: 'rgba(255,255,255,0.45)',
                  fontSize: '0.9rem',
                  lineHeight: 1.5,
                }}>
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section style={{ padding: '4rem 2rem 6rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontFamily: "'Kanit', sans-serif",
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 700,
              marginBottom: '3rem',
              textAlign: 'center',
            }}
          >
            Cum funcționează
          </motion.h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'rgba(255,255,255,0.06)', borderRadius: '16px', overflow: 'hidden' }}>
            {HOW_IT_WORKS.map((h, i) => (
              <motion.div
                key={h.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1.5rem',
                  padding: '2rem',
                  background: 'rgba(255,255,255,0.02)',
                }}
              >
                <span style={{
                  fontFamily: "'Kanit', sans-serif",
                  fontSize: '2.5rem',
                  fontWeight: 800,
                  lineHeight: 1,
                  background: 'linear-gradient(180deg, rgba(74,144,255,0.4) 0%, transparent 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  flexShrink: 0,
                }}>
                  {h.step}
                </span>
                <div>
                  <h3 style={{
                    fontFamily: "'Kanit', sans-serif",
                    fontSize: '1.15rem',
                    fontWeight: 600,
                    marginBottom: '0.35rem',
                  }}>
                    {h.title}
                  </h3>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    color: 'rgba(255,255,255,0.45)',
                    fontSize: '0.9rem',
                    lineHeight: 1.5,
                  }}>
                    {h.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── USE CASES ─── */}
      <section style={{ padding: '4rem 2rem 6rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontFamily: "'Kanit', sans-serif",
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 700,
              marginBottom: '0.75rem',
              textAlign: 'center',
            }}
          >
            Pentru orice business
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color: 'rgba(255,255,255,0.5)',
              fontSize: '1rem',
              textAlign: 'center',
              marginBottom: '3rem',
            }}
          >
            Soluții personalizate pentru industria ta
          </motion.p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            {USE_CASES.map((uc, i) => (
              <motion.div
                key={uc.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                style={{
                  padding: '2rem',
                  borderRadius: '16px',
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.02)',
                  transition: 'border-color 0.3s, background 0.3s',
                }}
                className="hover:border-blue-500/30 hover:bg-white/[0.04]"
              >
                <h3 style={{
                  fontFamily: "'Kanit', sans-serif",
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  marginBottom: '0.5rem',
                }}>
                  {uc.title}
                </h3>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: 'rgba(255,255,255,0.45)',
                  fontSize: '0.85rem',
                  lineHeight: 1.5,
                  marginBottom: '1rem',
                }}>
                  {uc.desc}
                </p>
                <span style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: '#4A90FF',
                }}>
                  {uc.price}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section style={{ padding: '6rem 2rem', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 style={{
            fontFamily: "'Kanit', sans-serif",
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 700,
            marginBottom: '1rem',
          }}>
            Gata să automatizezi apelurile?
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            color: 'rgba(255,255,255,0.5)',
            fontSize: '1rem',
            marginBottom: '2rem',
          }}>
            Primești un demo gratuit în 24h. Fără contract, fără risc.
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
            Vreau demo gratuit
          </a>
        </motion.div>
      </section>
    </div>
  )
}