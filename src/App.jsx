import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import About from './pages/About'
import Contact from './pages/Contact'
import Courses from './pages/Courses'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Products from './pages/Products'
import Publications from './pages/Publications'
import Services from './pages/Services'
import Privacy from './pages/Privacy'
import InterestForm from './components/forms/InterestForm'
import { LanguageProvider } from './i18n/LanguageContext'
import './App.css'

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/servicios" element={<Services />} />
            <Route path="/cursos" element={<Courses />} />
            <Route path="/productos" element={<Products />} />
            <Route path="/products" element={<Navigate to="/productos" replace />} />
            <Route path="/publicaciones" element={<Publications />} />
            <Route path="/nosotros" element={<About />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/privacidad" element={<Privacy />} />
            <Route path="/interes" element={<InterestForm />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </LanguageProvider>
  )
}
