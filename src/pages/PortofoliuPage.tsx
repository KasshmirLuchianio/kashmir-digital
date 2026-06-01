import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import FadeInMotion from '../components/jack/FadeInMotion'
import Magnet from '../components/jack/Magnet'
import AnimatedText from '../components/jack/AnimatedText'
import ContactButton from '../components/jack/ContactButton'
import LiveProjectButton from '../components/jack/LiveProjectButton'

/* ─── Data ──────────────────────────────────────────────────────── */

const NAV_LINKS = ['Despre', 'Prețuri', 'Proiecte', 'Contact']

const MARQUEE_GIFS = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
]

const SERVICES = [
  { num: '01', name: 'Web Design & Dev', desc: 'Website-uri premium, landing pages și aplicații web optimizate pentru conversie, cu design modern și experiență de utilizator impecabilă.' },
  { num: '02', name: 'Agenți AI', desc: 'Agenți conversaționali inteligenți care califică lead-uri, răspund clienților și automatizează interacțiunile — non-stop, 24/7.' },
  { num: '03', name: 'Automatizări', desc: 'Fluxuri de lucru automate conectate la aplicațiile tale. Elimini munca repetitivă și te concentrezi pe ce contează cu adevărat.' },
  { num: '04', name: 'SEO & Content', desc: 'Strategie de conținut, optimizare pentru motoarele de căutare și crearea de materiale care atrag și convertesc publicul tău.' },
  { num: '05', name: 'Video Production', desc: 'Reclame video, content pentru social media și producții vizuale de înaltă calitate care transformă atenția în rezultate.' },
]

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
    href: '#',
    col1img1: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
    col1img2: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
    col2img: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
  },
]

const PORTRAIT = 'https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png'

/* ─── Sections ───────────────────────────────────────────────────── */

function HeroSection() {
  return (
    <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', overflowX: 'clip', background: '#0C0C0C' }}>
      {/* Navbar */}
      <FadeInMotion delay={0} y={-20}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', padding: 'clamp(1rem,2vw,2rem) clamp(1.5rem,3vw,2.5rem)', paddingTop: 'clamp(1.5rem,3vw,2rem)' }}>
          {NAV_LINKS.map((link, i) => (
            <a key={link} href={i === 3 ? '/servicii' : '#'}
              style={{ color: '#D7E2EA', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', textDecoration: 'none', fontFamily: "'Kanit', sans-serif', transition: 'opacity 0.2s" }}
              className="text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity">
              {link}
            </a>
          ))}
        </nav>
      </FadeInMotion>

      {/* Heading */}
      <div style={{ overflow: 'hidden' }}>
        <FadeInMotion delay={0.15} y={40}>
          <h1
            className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw]"
            style={{ marginTop: 'clamp(1.5rem,4vw,3rem)', paddingLeft: 'clamp(1.5rem,3vw,2.5rem)', fontFamily: "'Kanit', sans-serif" }}
          >
            Kashmir Digital
          </h1>
        </FadeInMotion>
      </div>

      {/* Bottom bar */}
      <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', padding: 'clamp(1rem,2vw,1.5rem) clamp(1.5rem,3vw,2.5rem)' }}
        className="pb-7 sm:pb-8 md:pb-10">
        <FadeInMotion delay={0.35} y={20}>
          <p style={{
            color: '#D7E2EA', fontWeight: 300, textTransform: 'uppercase', letterSpacing: '0.06em',
            lineHeight: 1.4, fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)', fontFamily: "'Kanit', sans-serif",
          }}
            className="max-w-[160px] sm:max-w-[220px] md:max-w-[260px]">
            o agenție digitală care construiește prezențe online premium
          </p>
        </FadeInMotion>
        <FadeInMotion delay={0.5} y={20}>
          <ContactButton />
        </FadeInMotion>
      </div>

      {/* Portrait */}
      <FadeInMotion delay={0.6} y={30} style={{
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
      }}
        className="top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0">
        <Magnet padding={150} strength={3} activeTransition="transform 0.3s ease-out" inactiveTransition="transform 0.6s ease-in-out">
          <img
            src={PORTRAIT}
            alt="Kashmir Digital"
            className="w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px]"
            style={{ display: 'block' }}
          />
        </Magnet>
      </FadeInMotion>
    </section>
  )
}

function MarqueeSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const sectionTop = window.scrollY + rect.top
      const o = (window.scrollY - sectionTop + window.innerHeight) * 0.3
      setOffset(o)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const row1 = [...MARQUEE_GIFS.slice(0, 11), ...MARQUEE_GIFS.slice(0, 11), ...MARQUEE_GIFS.slice(0, 11)]
  const row2 = [...MARQUEE_GIFS.slice(11), ...MARQUEE_GIFS.slice(11), ...MARQUEE_GIFS.slice(11)]

  const tile: React.CSSProperties = { width: 420, height: 270, flexShrink: 0, borderRadius: '1rem', objectFit: 'cover' }

  return (
    <section ref={sectionRef} style={{ background: '#0C0C0C', overflow: 'hidden' }}
      className="pt-24 sm:pt-32 md:pt-40 pb-10">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div style={{ display: 'flex', gap: '0.75rem', transform: `translateX(${offset - 200}px)`, willChange: 'transform' }}>
          {row1.map((src, i) => <img key={i} src={src} alt="" style={tile} loading="lazy" />)}
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', transform: `translateX(${-(offset - 200)}px)`, willChange: 'transform' }}>
          {row2.map((src, i) => <img key={i} src={src} alt="" style={tile} loading="lazy" />)}
        </div>
      </div>
    </section>
  )
}

function AboutSection() {
  const decor: React.CSSProperties = { position: 'absolute' }
  return (
    <section style={{ background: '#0C0C0C', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}
      className="px-5 sm:px-8 md:px-10 py-20">
      {/* Decorative images */}
      <FadeInMotion delay={0.1} x={-80} y={0} duration={0.9} style={{ ...decor, top: '4%', left: 'clamp(1%,4%,4%)' }}>
        <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png" alt="" className="w-[120px] sm:w-[160px] md:w-[210px]" />
      </FadeInMotion>
      <FadeInMotion delay={0.25} x={-80} y={0} duration={0.9} style={{ ...decor, bottom: '8%', left: 'clamp(3%,10%,10%)' }}>
        <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png" alt="" className="w-[100px] sm:w-[140px] md:w-[180px]" />
      </FadeInMotion>
      <FadeInMotion delay={0.15} x={80} y={0} duration={0.9} style={{ ...decor, top: '4%', right: 'clamp(1%,4%,4%)' }}>
        <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png" alt="" className="w-[120px] sm:w-[160px] md:w-[210px]" />
      </FadeInMotion>
      <FadeInMotion delay={0.3} x={80} y={0} duration={0.9} style={{ ...decor, bottom: '8%', right: 'clamp(3%,10%,10%)' }}>
        <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png" alt="" className="w-[130px] sm:w-[170px] md:w-[220px]" />
      </FadeInMotion>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative', zIndex: 1 }}
        className="gap-10 sm:gap-14 md:gap-16">
        <FadeInMotion delay={0} y={40}>
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)', fontFamily: "'Kanit', sans-serif" }}>
            Despre noi
          </h2>
        </FadeInMotion>

        <AnimatedText
          text="Cu peste trei ani de experiență în design digital și automatizări AI, ne concentrăm pe website-uri premium, agenți inteligenți și content care convertesc. Lucrăm cu afaceri care vor să se distingă și să crească. Hai să construim ceva de excepție împreună!"
          style={{
            color: '#D7E2EA', fontWeight: 500, lineHeight: 1.6,
            maxWidth: '560px', fontSize: 'clamp(1rem, 2vw, 1.35rem)',
            fontFamily: "'Kanit', sans-serif",
          }}
        />

        <div style={{ marginTop: 'clamp(1rem,2vw,1.5rem)' }} className="mt-16 sm:mt-20 md:mt-24">
          <ContactButton />
        </div>
      </div>
    </section>
  )
}

function ServicesSection() {
  return (
    <section style={{ background: '#fff', color: '#0C0C0C' }}
      className="rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
      <h2 className="font-black uppercase text-center"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)', marginBottom: 'clamp(3rem,6vw,7rem)', fontFamily: "'Kanit', sans-serif", color: '#0C0C0C' }}>
        Servicii
      </h2>

      <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
        {SERVICES.map((s, i) => (
          <FadeInMotion key={s.num} delay={i * 0.1} y={20}>
            <div style={{
              display: 'flex', alignItems: 'flex-start', gap: '1.5rem',
              padding: 'clamp(1.5rem,2.5vw,3rem) 0',
              borderTop: i === 0 ? 'none' : '1px solid rgba(12,12,12,0.15)',
            }}>
              <span className="font-black"
                style={{ fontSize: 'clamp(3rem, 10vw, 140px)', lineHeight: 1, color: '#0C0C0C', flexShrink: 0, fontFamily: "'Kanit', sans-serif" }}>
                {s.num}
              </span>
              <div style={{ paddingTop: '0.5rem' }}>
                <p className="font-medium uppercase"
                  style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)', marginBottom: '0.5rem', fontFamily: "'Kanit', sans-serif", color: '#0C0C0C' }}>
                  {s.name}
                </p>
                <p className="font-light leading-relaxed"
                  style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)', opacity: 0.6, maxWidth: '42rem', fontFamily: "'Kanit', sans-serif", color: '#0C0C0C' }}>
                  {s.desc}
                </p>
              </div>
            </div>
          </FadeInMotion>
        ))}
      </div>
    </section>
  )
}

function ProjectCard({ project, index, total }: { project: typeof PROJECTS[0]; index: number; total: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ['start end', 'end start'] })
  const targetScale = 1 - (total - 1 - index) * 0.03
  const scale = useTransform(scrollYProgress, [0, 1], [targetScale, 1])

  const imgRound = 'clamp(24px, 4vw, 60px)'
  return (
    <div ref={cardRef} style={{ height: '85vh', position: 'relative' }}>
      <motion.div
        style={{
          scale,
          position: 'sticky',
          top: `calc(6rem + ${index * 28}px)`,
          background: '#0C0C0C',
          border: '2px solid #D7E2EA',
          borderRadius: 'clamp(24px,5vw,60px)',
          padding: 'clamp(1rem,2vw,2rem)',
          willChange: 'transform',
        }}
      >
        {/* Top row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span className="font-black" style={{ fontSize: 'clamp(2rem,6vw,5rem)', color: '#D7E2EA', lineHeight: 1, fontFamily: "'Kanit', sans-serif" }}>
              {project.num}
            </span>
            <div>
              <p style={{ color: '#D7E2EA', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: 'clamp(0.7rem,1vw,0.9rem)', fontFamily: "'Kanit', sans-serif" }}>
                {project.category}
              </p>
              <p className="font-medium" style={{ color: '#D7E2EA', fontSize: 'clamp(1rem,2.5vw,2rem)', fontFamily: "'Kanit', sans-serif" }}>
                {project.name}
              </p>
            </div>
          </div>
          <LiveProjectButton href={project.href} />
        </div>

        {/* Image grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '40% 60%', gap: 'clamp(0.5rem,1vw,1rem)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(0.5rem,1vw,1rem)' }}>
            <img src={project.col1img1} alt="" style={{ width: '100%', height: 'clamp(130px,16vw,230px)', objectFit: 'cover', borderRadius: imgRound }} />
            <img src={project.col1img2} alt="" style={{ width: '100%', height: 'clamp(160px,22vw,340px)', objectFit: 'cover', borderRadius: imgRound }} />
          </div>
          <img src={project.col2img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: imgRound }} />
        </div>
      </motion.div>
    </div>
  )
}

function ProjectsSection() {
  return (
    <section style={{ background: '#0C0C0C', position: 'relative', zIndex: 10 }}
      className="rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 px-5 sm:px-8 md:px-10 pt-20 pb-20">
      <h2 className="hero-heading font-black uppercase tracking-tight leading-none text-center mb-16"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)', fontFamily: "'Kanit', sans-serif" }}>
        Proiecte
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.num} project={p} index={i} total={PROJECTS.length} />
        ))}
      </div>
    </section>
  )
}

/* ─── Page ───────────────────────────────────────────────────────── */

export default function PortofoliuPage() {
  return (
    <div style={{ background: '#0C0C0C', fontFamily: "'Kanit', sans-serif", overflowX: 'clip' }}>
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
    </div>
  )
}
