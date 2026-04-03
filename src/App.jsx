import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AiFloat from './components/AiFloat'
import Hero from './sections/Hero'
import Problem from './sections/Problem'
import HowItWorks from './sections/HowItWorks'
import CraveDollars from './sections/CraveDollars'
import AppPreview from './sections/AppPreview'
import Partners from './sections/Partners'
import Founders from './sections/Founders'
import Vision from './sections/Vision'
import CTA from './sections/CTA'

export default function App() {
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 80)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )
    reveals.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <CraveDollars />
        <AppPreview />
        <Partners />
        <Founders />
        <Vision />
        <CTA />
      </main>
      <Footer />
      <AiFloat />
    </>
  )
}
