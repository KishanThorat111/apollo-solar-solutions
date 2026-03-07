import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Section6Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

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
          { x: '-50vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'none' }, 
          0
        )
        .fromTo(circleRef.current, 
          { x: '-60vw', scale: 0.9, opacity: 0 }, 
          { x: 0, scale: 1, opacity: 1, ease: 'none' }, 
          0
        )
        .fromTo([labelRef.current, headlineRef.current], 
          { x: '40vw', opacity: 0 }, 
          { x: 0, opacity: 1, stagger: 0.02, ease: 'none' }, 
          0.05
        )
        .fromTo(cardRef.current, 
          { x: '50vw', rotate: 1, opacity: 0 }, 
          { x: 0, rotate: 0, opacity: 1, ease: 'none' }, 
          0.1
        );

      // EXIT (70-100%)
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
        .fromTo([labelRef.current, headlineRef.current], 
          { x: 0, opacity: 1 }, 
          { x: '6vw', opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .fromTo(cardRef.current, 
          { y: 0, opacity: 1 }, 
          { y: '12vh', opacity: 0, ease: 'power2.in' }, 
          0.75
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative w-screen h-screen overflow-hidden bg-apollo-offwhite"
    >
      {/* Diagonal Panel */}
      <div
        ref={panelRef}
        className="absolute left-0 top-0 w-[60vw] h-full diagonal-panel-left will-change-transform"
        style={{ backgroundColor: 'rgba(47, 142, 146, 0.12)' }}
      />

      {/* Circle Image */}
      <div
        ref={circleRef}
        className="absolute left-[16vw] top-[14vh] w-[62vmin] h-[62vmin] min-w-[520px] min-h-[520px] max-w-[760px] max-h-[760px] circle-image will-change-transform"
      >
        <img
          src="/images/homeowner_portrait.jpg"
          alt="Happy homeowners"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content - Right Side */}
      <div className="absolute right-[8vw] top-[12vh] text-right">
        {/* Label */}
        <span ref={labelRef} className="section-label will-change-transform">
          CUSTOMER STORIES
        </span>

        {/* Headline */}
        <h2
          ref={headlineRef}
          className="mt-4 font-heading font-bold text-[clamp(34px,3.6vw,52px)] text-gray-900 leading-[1.0] max-w-[32vw] ml-auto will-change-transform"
        >
          Trusted by homeowners
          <br />
          & businesses
        </h2>
      </div>

      {/* Testimonial Card */}
      <div
        ref={cardRef}
        className="absolute right-[8vw] top-[40vh] w-[34vw] bg-white rounded-2xl p-8 shadow-card will-change-transform"
      >
        {/* Quote Icon */}
        <Quote className="w-10 h-10 text-apollo-teal/20 mb-4" />

        {/* Quote Text */}
        <p className="text-lg text-gray-700 leading-relaxed">
          "Apollo Solar made the process simple—from paperwork to switch-on. 
          Our bills dropped immediately. The team was professional and 
          completed the installation ahead of schedule."
        </p>

        {/* Stars */}
        <div className="flex gap-1 mt-6">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-apollo-teal text-apollo-teal" />
          ))}
        </div>

        {/* Author */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="font-heading font-semibold text-gray-900">
            Rohit & Anjali K.
          </div>
          <div className="text-sm text-gray-500">
            Residential installation, Belagavi
          </div>
        </div>
      </div>
    </section>
  );
}
