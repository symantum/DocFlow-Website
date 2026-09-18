import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import HashScroll from './HashScroll'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <HashScroll />
      <Navbar />
      {/* Hero page gets no top padding (hero is full-screen with its own pt) */}
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
