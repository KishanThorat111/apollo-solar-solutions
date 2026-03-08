import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import OptimizedImage from '../components/OptimizedImage';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Home, Building2, Wrench, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Home,
    title: 'Residential Solar',
    description: 'Custom rooftop systems designed for maximum savings.',
    image: '/images/gallery_1.jpg',
  },
  {
    icon: Building2,
    title: 'Commercial Solar',
    description: 'Scalable installations with fast ROI and low maintenance.',
    image: '/images/gallery_2.jpg',
  },
  {
    icon: Wrench,
    title: 'Maintenance & Support',
    description: 'Annual checks, cleaning, and rapid repairs.',
    image: '/images/gallery_3.jpg',
  },
];

export default function Section3Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=140%',
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
        .fromTo(cardsRef.current?.children || [], 
          { x: '50vw', rotate: 2, opacity: 0 }, 
          { x: 0, rotate: 0, opacity: 1, stagger: 0.03, ease: 'none' }, 
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
        .fromTo(cardsRef.current, 
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
      id="services"
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
        <OptimizedImage
          src="/images/installer_portrait.jpg"
          alt="Solar technician"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content - Right Side */}
      <div className="absolute right-[8vw] top-[12vh] text-right">
        {/* Label */}
        <span ref={labelRef} className="section-label will-change-transform">
          OUR SERVICES
        </span>

        {/* Headline */}
        <h2
          ref={headlineRef}
          className="mt-4 font-heading font-bold text-[clamp(34px,3.6vw,52px)] text-gray-900 leading-[1.0] max-w-[32vw] ml-auto will-change-transform"
        >
          Solar solutions
          <br />
          tailored to you
        </h2>
      </div>

      {/* Service Cards */}
      <div
        ref={cardsRef}
        className="absolute right-[8vw] top-[40vh] w-[34vw] space-y-4"
      >
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-4 shadow-card flex items-center gap-4 will-change-transform hover:shadow-lg transition-shadow cursor-pointer group"
          >
            <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
              <OptimizedImage
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover transition-transform group-hover:scale-110"
              />
            </div>
            <div className="flex-1 text-left">
              <div className="flex items-center gap-2 mb-1">
                <service.icon className="w-4 h-4 text-apollo-teal" />
                <h3 className="font-heading font-semibold text-gray-900">
                  {service.title}
                </h3>
              </div>
              <p className="text-sm text-gray-600">{service.description}</p>
            </div>
            <ArrowRight className="w-5 h-5 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-apollo-teal" />
          </div>
        ))}
      </div>
    </section>
  );
}
