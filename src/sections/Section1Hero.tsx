import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import OptimizedImage from '../components/OptimizedImage';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield, TrendingUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Section1Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);

  // Auto-play entrance animation on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Initial states
      gsap.set(panelRef.current, { x: '-40vw', opacity: 0 });
      gsap.set(circleRef.current, { scale: 0.85, opacity: 0 });
      gsap.set(headlineRef.current?.children || [], { y: 24, opacity: 0 });
      gsap.set([subheadRef.current, ctaRef.current, pillsRef.current], { y: 14, opacity: 0 });

      // Entrance sequence
      tl.to(panelRef.current, { x: 0, opacity: 1, duration: 0.8 }, 0)
        .to(circleRef.current, { scale: 1, opacity: 1, duration: 0.8 }, 0.1)
        .to(headlineRef.current?.children || [], { y: 0, opacity: 1, duration: 0.6, stagger: 0.08 }, 0.3)
        .to(subheadRef.current, { y: 0, opacity: 1, duration: 0.5 }, 0.5)
        .to(ctaRef.current, { y: 0, opacity: 1, duration: 0.5 }, 0.6)
        .to(pillsRef.current, { y: 0, opacity: 1, duration: 0.5 }, 0.7);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set(panelRef.current, { x: 0, opacity: 1 });
            gsap.set(circleRef.current, { x: 0, scale: 1, opacity: 1 });
            gsap.set(headlineRef.current, { x: 0, opacity: 1 });
            gsap.set([subheadRef.current, ctaRef.current, pillsRef.current], { y: 0, opacity: 1 });
          },
        },
      });

      // EXIT phase (70-100%)
      scrollTl
        .fromTo(panelRef.current, 
          { x: 0, opacity: 1 }, 
          { x: '-18vw', opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .fromTo(circleRef.current, 
          { x: 0, scale: 1, opacity: 1 }, 
          { x: '-10vw', scale: 0.92, opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .fromTo(headlineRef.current, 
          { x: 0, opacity: 1 }, 
          { x: '-8vw', opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .fromTo([subheadRef.current, ctaRef.current, pillsRef.current], 
          { y: 0, opacity: 1 }, 
          { y: '10vh', opacity: 0, ease: 'power2.in', stagger: 0.02 }, 
          0.75
        );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-screen h-screen overflow-hidden bg-apollo-offwhite"
    >
      {/* Diagonal Panel */}
      <div
        ref={panelRef}
        className="absolute left-0 top-0 w-[62vw] h-full diagonal-panel-left will-change-transform"
        style={{ backgroundColor: 'rgba(47, 142, 146, 0.12)' }}
      />

      {/* Circle Image */}
      <div
        ref={circleRef}
        className="absolute left-[18vw] top-[14vh] w-[62vmin] h-[62vmin] min-w-[520px] min-h-[520px] max-w-[760px] max-h-[760px] circle-image will-change-transform"
      >
        <OptimizedImage
          src="/images/hero_sun.jpg"
          alt="Solar energy"
          className="w-full h-full object-cover"
          priority
        />
      </div>

      {/* Content */}
      <div className="absolute left-[8vw] top-[18vh] max-w-[34vw]">
        {/* Headline */}
        <div ref={headlineRef} className="space-y-1">
          <h1 className="font-heading font-bold text-[clamp(44px,5vw,72px)] text-gray-900 leading-[0.95]">
            Powering
          </h1>
          <h1 className="font-heading font-bold text-[clamp(44px,5vw,72px)] text-gray-900 leading-[0.95]">
            a Greener
          </h1>
          <h1 className="font-heading font-bold text-[clamp(44px,5vw,72px)] text-apollo-teal leading-[0.95]">
            Future
          </h1>
        </div>

        {/* Subheadline */}
        <p
          ref={subheadRef}
          className="mt-8 text-base lg:text-lg text-gray-600 leading-relaxed max-w-[30vw]"
        >
          Affordable solar solutions for homes and businesses—expert installation, 
          honest pricing, and end-to-end support.
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="mt-8 flex flex-wrap gap-4">
          <Button
            onClick={() => scrollToSection('#quote')}
            className="bg-apollo-teal hover:bg-apollo-teal/90 text-white rounded-xl px-6 py-6 text-base font-medium group"
          >
            Get a Free Quote
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button
            onClick={() => scrollToSection('#gallery')}
            variant="outline"
            className="border-2 border-apollo-teal text-apollo-teal hover:bg-apollo-teal/10 rounded-xl px-6 py-6 text-base font-medium"
          >
            View Projects
          </Button>
        </div>

        {/* Value Pills */}
        <div ref={pillsRef} className="mt-12 flex flex-wrap gap-3">
          <div className="value-pill">
            <Zap className="w-4 h-4 mr-2" />
            Save up to 90% on bills
          </div>
          <div className="value-pill">
            <Shield className="w-4 h-4 mr-2" />
            25-year warranty
          </div>
          <div className="value-pill">
            <TrendingUp className="w-4 h-4 mr-2" />
            Net metering support
          </div>
        </div>
      </div>

      {/* Floating Stats Cards */}
      <div className="absolute right-[8vw] bottom-[15vh] hidden xl:block">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 shadow-card animate-float">
          <div className="text-3xl font-heading font-bold text-apollo-teal">500+</div>
          <div className="text-sm text-gray-600">Installations</div>
        </div>
      </div>
      
      <div className="absolute right-[16vw] bottom-[25vh] hidden xl:block">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 shadow-card animate-float" style={{ animationDelay: '1s' }}>
          <div className="text-3xl font-heading font-bold text-apollo-teal">₹2Cr+</div>
          <div className="text-sm text-gray-600">Saved for Clients</div>
        </div>
      </div>
    </section>
  );
}
