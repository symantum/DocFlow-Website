import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import ProductsPage from './pages/ProductsPage'
import TechnologyPage from './pages/TechnologyPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/"           element={<HomePage />} />
        <Route path="/services"   element={<ServicesPage />} />
        <Route path="/products"   element={<ProductsPage />} />
        <Route path="/technology" element={<TechnologyPage />} />
        <Route path="/about"      element={<AboutPage />} />
        <Route path="/contact"    element={<ContactPage />} />
      </Route>
    </Routes>
  )
}
