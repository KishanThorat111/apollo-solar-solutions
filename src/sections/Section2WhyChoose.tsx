import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import OptimizedImage from '../components/OptimizedImage';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Zap, DollarSign, FileText, Headphones } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  { icon: Zap, text: 'High-efficiency panels' },
  { icon: DollarSign, text: 'Transparent pricing' },
  { icon: FileText, text: 'End-to-end paperwork' },
  { icon: Headphones, text: 'Local support team' },
];

export default function Section2WhyChoose() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

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
        },
      });

      // ENTRANCE (0-30%)
      scrollTl
        .fromTo(panelRef.current, 
          { x: '50vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'none' }, 
          0
        )
        .fromTo(circleRef.current, 
          { x: '60vw', scale: 0.9, opacity: 0 }, 
          { x: 0, scale: 1, opacity: 1, ease: 'none' }, 
          0
        )
        .fromTo(labelRef.current, 
          { x: '-40vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'none' }, 
          0
        )
        .fromTo(headlineRef.current, 
          { x: '-40vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'none' }, 
          0.05
        )
        .fromTo(bodyRef.current, 
          { y: '30vh', opacity: 0 }, 
          { y: 0, opacity: 1, ease: 'none' }, 
          0.1
        )
        .fromTo(featuresRef.current?.children || [], 
          { y: '30vh', opacity: 0 }, 
          { y: 0, opacity: 1, stagger: 0.02, ease: 'none' }, 
          0.15
        )
        .fromTo(ctaRef.current, 
          { opacity: 0, y: 12 }, 
          { opacity: 1, y: 0, ease: 'none' }, 
          0.25
        );

      // EXIT (70-100%)
      scrollTl
        .fromTo(panelRef.current, 
          { x: 0, opacity: 1 }, 
          { x: '18vw', opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .fromTo(circleRef.current, 
          { x: 0, scale: 1, opacity: 1 }, 
          { x: '10vw', scale: 0.92, opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .fromTo([labelRef.current, headlineRef.current], 
          { x: 0, opacity: 1 }, 
          { x: '-6vw', opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .fromTo([bodyRef.current, featuresRef.current, ctaRef.current], 
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
      id="why-choose"
      className="relative w-screen h-screen overflow-hidden bg-apollo-offwhite"
    >
      {/* Diagonal Panel */}
      <div
        ref={panelRef}
        className="absolute right-0 top-0 w-[58vw] h-full diagonal-panel-right will-change-transform"
        style={{ backgroundColor: 'rgba(47, 142, 146, 0.12)' }}
      />

      {/* Circle Image */}
      <div
        ref={circleRef}
        className="absolute right-[-6vw] top-[16vh] w-[62vmin] h-[62vmin] min-w-[520px] min-h-[520px] max-w-[760px] max-h-[760px] circle-image will-change-transform"
      >
        <OptimizedImage
          src="/images/rooftop_panels.jpg"
          alt="Rooftop solar panels"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="absolute left-[8vw] top-[12vh]">
        {/* Label */}
        <span ref={labelRef} className="section-label will-change-transform">
          WHY CHOOSE US
        </span>

        {/* Headline */}
        <h2
          ref={headlineRef}
          className="mt-4 font-heading font-bold text-[clamp(34px,3.6vw,52px)] text-gray-900 leading-[1.0] max-w-[34vw] will-change-transform"
        >
          Built for performance.
          <br />
          Designed for peace of mind.
        </h2>

        {/* Body */}
        <p
          ref={bodyRef}
          className="mt-8 text-base lg:text-lg text-gray-600 leading-relaxed max-w-[30vw] will-change-transform"
        >
          From site survey to net metering, we handle the details—so you get a 
          system that lasts.
        </p>

        {/* Features Grid */}
        <div
          ref={featuresRef}
          className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 max-w-[34vw]"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-3 will-change-transform"
            >
              <div className="w-10 h-10 rounded-xl bg-apollo-teal/10 flex items-center justify-center flex-shrink-0">
                <feature.icon className="w-5 h-5 text-apollo-teal" />
              </div>
              <span className="text-sm font-medium text-gray-700">{feature.text}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <a
          ref={ctaRef}
          href="#services"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('#services');
          }}
          className="inline-flex items-center mt-10 text-apollo-teal font-medium hover:underline group will-change-transform"
        >
          Explore our services
          <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
}
