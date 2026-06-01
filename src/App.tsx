import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Hero from './components/Hero'
import ServiciiPage from './pages/ServiciiPage'
import PortofoliuPage from './pages/PortofoliuPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/servicii" element={<ServiciiPage />} />
        <Route path="/ai-agenti" element={<ServiciiPage variant="ai-agenti" />} />
        <Route path="/ai-automatizari" element={<ServiciiPage variant="ai-automatizari" />} />
        <Route path="/portofoliu" element={<PortofoliuPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
