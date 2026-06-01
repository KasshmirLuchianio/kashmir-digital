import { Link } from 'react-router-dom'
import AnimatedHeading from './AnimatedHeading'
import FadeIn from './FadeIn'

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4'

const NAV_LINKS = [
  { label: 'Despre', to: '/#despre' },
  { label: 'Servicii', to: '/servicii' },
  { label: 'Portofoliu', to: '/portofoliu' },
  { label: 'Contact', to: '/#contact' },
]

export default function Hero() {
  return (
    <div className="relative w-full min-h-screen flex flex-col overflow-hidden bg-black">
      <video
        src={VIDEO_URL}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="relative z-10 flex flex-col min-h-screen px-6 md:px-12 lg:px-16">
        <div className="pt-6">
          <nav className="liquid-glass rounded-xl px-4 py-2 flex items-center justify-between">
            <Link to="/" className="text-2xl font-semibold tracking-tight text-white no-underline">
              Kashmir Digital
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map(({ label, to }) => (
                <Link
                  key={label}
                  to={to}
                  className="text-sm text-white transition-colors duration-200 hover:text-gray-300 no-underline"
                >
                  {label}
                </Link>
              ))}
            </div>

            <Link
              to="/servicii"
              className="bg-white text-black px-6 py-2 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-gray-100 no-underline"
            >
              Hai să vorbim
            </Link>
          </nav>
        </div>

        <div className="flex-1 flex flex-col justify-end pb-12 lg:pb-16">
          <div className="lg:grid lg:grid-cols-2 lg:items-end">
            <div>
              <AnimatedHeading
                text={"Prezență digitală\ncare generează rezultate."}
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal mb-4 text-white"
                style={{ letterSpacing: '-0.04em' }}
                initialDelay={200}
                charDelay={30}
              />

              <FadeIn delay={800} duration={1000}>
                <p className="text-base md:text-lg text-gray-300 mb-5">
                  Website-uri premium, agenți AI și content de conversie — totul sub un singur acoperiș.
                </p>
              </FadeIn>

              <FadeIn delay={1200} duration={1000} className="flex flex-wrap gap-4">
                <Link
                  to="/servicii"
                  className="bg-white text-black px-8 py-3 rounded-lg font-medium transition-colors duration-200 hover:bg-gray-100 no-underline"
                >
                  Hai să vorbim
                </Link>
                <Link
                  to="/portofoliu"
                  className="liquid-glass border border-white/20 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 hover:bg-white hover:text-black no-underline"
                >
                  Vezi proiectele
                </Link>
              </FadeIn>
            </div>

            <FadeIn delay={1400} duration={1000} className="flex items-end justify-start lg:justify-end mt-8 lg:mt-0">
              <div className="liquid-glass border border-white/20 px-6 py-3 rounded-xl">
                <span className="text-lg md:text-xl lg:text-2xl font-light text-white">
                  Web. AI. Content.
                </span>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  )
}
