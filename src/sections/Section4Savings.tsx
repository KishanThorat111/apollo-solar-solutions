import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '90%', label: 'Reduction in electricity bills' },
  { value: '3-5', label: 'Years typical payback period' },
  { value: '25+', label: 'Years system lifespan' },
];

export default function Section4Savings() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const noteRef = useRef<HTMLParagraphElement>(null);
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
        .fromTo(headlineRef.current, 
          { x: '-40vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'none' }, 
          0.05
        )
        .fromTo(statsRef.current?.children || [], 
          { y: '30vh', opacity: 0 }, 
          { y: 0, opacity: 1, stagger: 0.03, ease: 'none' }, 
          0.1
        )
        .fromTo([noteRef.current, ctaRef.current], 
          { y: '18vh', opacity: 0 }, 
          { y: 0, opacity: 1, stagger: 0.02, ease: 'none' }, 
          0.2
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
        .fromTo(headlineRef.current, 
          { x: 0, opacity: 1 }, 
          { x: '-6vw', opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .fromTo([statsRef.current, noteRef.current, ctaRef.current], 
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
      id="savings"
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
        <img
          src="/images/aerial_solar_field.jpg"
          alt="Solar farm aerial view"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="absolute left-[8vw] top-[16vh]">
        {/* Headline */}
        <h2
          ref={headlineRef}
          className="font-heading font-bold text-[clamp(34px,3.6vw,52px)] text-gray-900 leading-[1.0] max-w-[34vw] will-change-transform"
        >
          Real savings.
          <br />
          <span className="text-apollo-teal">Real impact.</span>
        </h2>

        {/* Stats */}
        <div
          ref={statsRef}
          className="mt-12 grid grid-cols-3 gap-6 max-w-[36vw]"
        >
          {stats.map((stat, index) => (
            <div key={index} className="will-change-transform">
              <div className="w-2 h-2 rounded-full bg-apollo-teal mb-3" />
              <div className="font-heading font-bold text-[clamp(28px,2.5vw,40px)] text-gray-900">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Environmental Note */}
        <p
          ref={noteRef}
          className="mt-12 text-base lg:text-lg text-gray-600 leading-relaxed max-w-[32vw] will-change-transform"
        >
          Every kW installed reduces carbon like taking a car off the road—
          without changing how you live.
        </p>

        {/* CTA */}
        <a
          ref={ctaRef}
          href="#quote"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('#quote');
          }}
          className="inline-flex items-center mt-8 text-apollo-teal font-medium hover:underline group will-change-transform"
        >
          See how much you can save
          <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
}
