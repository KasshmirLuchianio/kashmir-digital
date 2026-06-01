import AnimatedHeading from './AnimatedHeading'
import FadeIn from './FadeIn'

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4'

export default function Hero() {
  return (
    <div className="relative w-full min-h-screen flex flex-col overflow-hidden bg-black">
      {/* Video background — raw, no overlay */}
      <video
        src={VIDEO_URL}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Content layer */}
      <div className="relative z-10 flex flex-col min-h-screen px-6 md:px-12 lg:px-16">

        {/* Navbar */}
        <div className="pt-6">
          <nav className="liquid-glass rounded-xl px-4 py-2 flex items-center justify-between">
            {/* Logo */}
            <span className="text-2xl font-semibold tracking-tight text-white">VEX</span>

            {/* Center links */}
            <div className="hidden md:flex items-center gap-8">
              {['Story', 'Investing', 'Building', 'Advisory'].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-sm text-white transition-colors duration-200 hover:text-gray-300"
                >
                  {link}
                </a>
              ))}
            </div>

            {/* CTA */}
            <button className="bg-white text-black px-6 py-2 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-gray-100">
              Start a Chat
            </button>
          </nav>
        </div>

        {/* Hero content — pushed to bottom */}
        <div className="flex-1 flex flex-col justify-end pb-12 lg:pb-16">
          <div className="lg:grid lg:grid-cols-2 lg:items-end">

            {/* Left column */}
            <div>
              <AnimatedHeading
                text={"Shaping tomorrow\nwith vision and action."}
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal mb-4 text-white"
                style={{ letterSpacing: '-0.04em' }}
                initialDelay={200}
                charDelay={30}
              />

              <FadeIn delay={800} duration={1000}>
                <p className="text-base md:text-lg text-gray-300 mb-5">
                  We back visionaries and craft ventures that define what comes next.
                </p>
              </FadeIn>

              <FadeIn delay={1200} duration={1000} className="flex flex-wrap gap-4">
                <button className="bg-white text-black px-8 py-3 rounded-lg font-medium transition-colors duration-200 hover:bg-gray-100">
                  Start a Chat
                </button>
                <button className="liquid-glass border border-white/20 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 hover:bg-white hover:text-black">
                  Explore Now
                </button>
              </FadeIn>
            </div>

            {/* Right column — tag */}
            <FadeIn delay={1400} duration={1000} className="flex items-end justify-start lg:justify-end mt-8 lg:mt-0">
              <div className="liquid-glass border border-white/20 px-6 py-3 rounded-xl">
                <span className="text-lg md:text-xl lg:text-2xl font-light text-white">
                  Investing. Building. Advisory.
                </span>
              </div>
            </FadeIn>

          </div>
        </div>
      </div>
    </div>
  )
}
