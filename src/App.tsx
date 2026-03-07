import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import './App.css';

// Sections
import Navigation from './sections/Navigation';
import ScrollProgress from './components/ScrollProgress';
import Hero from './sections/Hero';
import WhyChoose from './sections/WhyChoose';
import Services from './sections/Services';
import Savings from './sections/Savings';
import Process from './sections/Process';
import Testimonials from './sections/Testimonials';
import Quote from './sections/Quote';
import Gallery from './sections/Gallery';
import Contact from './sections/Contact';
import WhatsAppFloat from './components/WhatsAppFloat';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after page load
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('load', handleLoad);

    return () => {
      lenis.destroy();
      window.removeEventListener('load', handleLoad);
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <div className="relative bg-white">
      {/* Scroll Progress Indicator */}
      <ScrollProgress />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main Content */}
      <main className="relative">
        <Hero />
        <WhyChoose />
        <Services />
        <Savings />
        <Process />
        <Testimonials />
        <Quote />
        <Gallery />
        <Contact />
      </main>
      
      {/* WhatsApp Float Button */}
      <WhatsAppFloat />
    </div>
  );
}

export default App;
