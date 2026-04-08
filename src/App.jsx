import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ExpoModal from './components/ExpoModal'
import Hero from './sections/Hero'
import Problem from './sections/Problem'
import HowItWorks from './sections/HowItWorks'
import CraveDollars from './sections/CraveDollars'
import AppPreview from './sections/AppPreview'
import Partners from './sections/Partners'
import Founders from './sections/Founders'
import Vision from './sections/Vision'
import CTA from './sections/CTA'
import PhoneShowcase from './sections/PhoneShowcase'
import CraveAI from './components/CraveAI'

export default function App() {
  const [expoModalOpen, setExpoModalOpen] = useState(false)

  useEffect(() => {
    // Always clear dismissed state on fresh page load
    // so the popup appears on every refresh as intended
    sessionStorage.removeItem('cc_modal_dismissed')
    setTimeout(() => setExpoModalOpen(true), 2500)

    window.openExpoModal = () => setExpoModalOpen(true)

    const handleHash = () => {
      if (window.location.hash === '#order') {
        setExpoModalOpen(true)
        window.history.replaceState(null, '', window.location.pathname)
      }
    }
    handleHash()
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <PhoneShowcase />
        <CraveDollars />
        <AppPreview />
        <Partners />
        <Founders />
        <Vision />
        <CTA />
      </main>
      <Footer />
      <CraveAI />
      <ExpoModal
        isOpen={expoModalOpen}
        onClose={() => {
          sessionStorage.setItem('cc_modal_dismissed', 'true')
          setExpoModalOpen(false)
        }}
        onOrderComplete={() => {
          sessionStorage.setItem('cc_modal_dismissed', 'true')
          setExpoModalOpen(false)
        }}
      />
    </>
  )
}
