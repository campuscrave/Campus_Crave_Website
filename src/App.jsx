import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { initAnalytics } from './lib/analytics'
import ExpoDashboard from './pages/ExpoDashboard'
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
import IDShowcase from './sections/IDShowcase'
import CraveAI from './components/CraveAI'

export default function App() {
  return (
    <Routes>
      <Route path="/expo/dashboard" element={<ExpoDashboard />} />
      <Route path="*" element={<MarketingSite />} />
    </Routes>
  )
}

class ExpoErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error, info) { console.error('ExpoModal crashed:', error, info); }
  render() {
    if (this.state.hasError) {
      return <div style={{padding:'2rem',textAlign:'center',color:'#0C0118'}}>
        <p>Something went wrong. Please refresh the page.</p>
        <button onClick={() => window.location.reload()} style={{marginTop:'1rem',padding:'10px 20px',background:'#6B21A8',color:'white',border:'none',borderRadius:'8px',cursor:'pointer'}}>Refresh</button>
      </div>;
    }
    return this.props.children;
  }
}

function MarketingSite() {
  const [expoModalOpen, setExpoModalOpen] = useState(false)

  useEffect(() => {
    if (window.location.pathname === '/') {
      const cleanup = initAnalytics()
      return cleanup
    }
  }, [])

  useEffect(() => {
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
        <IDShowcase />
        <CraveDollars />
        <AppPreview />
        <Partners />
        <Founders />
        <Vision />
        <CTA />
      </main>
      <Footer />
      <CraveAI />
      <ExpoErrorBoundary>
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
      </ExpoErrorBoundary>
    </>
  )
}

