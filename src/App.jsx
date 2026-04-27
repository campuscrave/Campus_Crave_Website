import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { initAnalytics } from './lib/analytics'
import ExpoDashboard from './pages/ExpoDashboard'
import PitchPage from './pages/PitchPage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
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
import DoorDashIntro from './components/DoorDashIntro'

export default function App() {
  return (
    <Routes>
      <Route path="/expo/dashboard" element={<ExpoDashboard />} />
      <Route path="/pitch" element={<PitchWithIntro />} />
      <Route path="*" element={<MarketingSite />} />
    </Routes>
  )
}

// /pitch — DoorDash parody intro sits on top of the demo.
// PitchPage is mounted underneath immediately so the CampusCrave splash
// glows through the fade-out. introVisible is passed down so PitchPage
// suspends its own SPACE handler while the intro is covering the screen.
function PitchWithIntro() {
  const [introVisible, setIntroVisible] = useState(true)

  return (
    <>
      <PitchPage introVisible={introVisible} />
      {introVisible && <DoorDashIntro onComplete={() => setIntroVisible(false)} />}
    </>
  )
}

function MarketingSite() {
  useEffect(() => {
    if (window.location.pathname === '/') {
      const cleanup = initAnalytics()
      return cleanup
    }
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
    </>
  )
}
