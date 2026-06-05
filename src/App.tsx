import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Layout from './components/Layout'
import CursorFollower from './components/CursorFollower'
import ParticleBackground from './components/three/ParticleBackground'
import HomePage from './pages/HomePage'
import ServiciiPage from './pages/ServiciiPage'
import VoiceAgentsPage from './pages/VoiceAgentsPage'
import PortofoliuPage from './pages/PortofoliuPage'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/servicii" element={<ServiciiPage />} />
          <Route path="/voice-agents" element={<VoiceAgentsPage />} />
          <Route path="/portofoliu" element={<PortofoliuPage />} />
          <Route path="/seo" element={<ServiciiPage />} />
          <Route path="/ai-automatizari" element={<ServiciiPage />} />
          <Route path="/video-editing" element={<ServiciiPage />} />
          <Route path="/sound-engineering" element={<ServiciiPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <CursorFollower />
      <ParticleBackground />
      <Layout>
        <AnimatedRoutes />
      </Layout>
    </BrowserRouter>
  )
}