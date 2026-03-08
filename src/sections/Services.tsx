import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Home, Building2, Wrench, ArrowRight, Sun, Droplets } from 'lucide-react';
import OptimizedImage from '../components/OptimizedImage';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Home,
    title: 'Residential Solar',
    description: 'Custom rooftop systems designed for maximum savings. Perfect for homes in Belagavi.',
    image: '/images/rooftop_indian.jpg',
    features: ['3-10 kW', 'Net Metering', '25-Year Warranty'],
  },
  {
    icon: Building2,
    title: 'Commercial & Industrial',
    description: 'Scalable installations with fast ROI for businesses and industries.',
    image: '/images/commercial_indian.jpg',
    features: ['10-100 kW', 'Tax Benefits', 'AMC Available'],
  },
  {
    icon: Wrench,
    title: 'Maintenance',
    description: 'Annual checks, cleaning, and rapid repairs to keep your system at peak.',
    image: '/images/maintenance_indian.jpg',
    features: ['Panel Cleaning', 'Performance Check', 'Quick Repairs'],
  },
  {
    icon: Droplets,
    title: 'Solar Pumping Systems',
    description: 'Agricultural solar pumps for irrigation and water supply needs.',
    image: '/images/solar_farm_indian.jpg',
    features: ['Agricultural', 'Water Supply', 'Energy Efficient'],
  },
  {
    icon: Sun,
    title: 'KUSMB & KREDL Projects',
    description: 'Government project installations with complete documentation support.',
    image: '/images/aerial_indian.jpg',
    features: ['Govt Projects', 'Documentation', 'Full Support'],
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;

    if (!section || !cards) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards.children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cards,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="section-padding bg-white overflow-hidden"
    >
      <div className="container-narrow">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <span className="section-label text-xs sm:text-sm">OUR SERVICES</span>
          <h2 className="mt-3 sm:mt-4 mb-4 sm:mb-6 text-2xl sm:text-3xl lg:text-4xl">
            Solar solutions{' '}
            <span className="text-solar-emerald">tailored to you</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-slate-600">
            From residential rooftops to commercial installations, we provide 
            end-to-end solar solutions with expert support.
          </p>
        </div>

        {/* Service Cards */}
        <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-44 sm:h-48 overflow-hidden">
                <OptimizedImage
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-white/90 backdrop-blur flex items-center justify-center">
                    <service.icon className="w-5 h-5 sm:w-6 sm:h-6 text-solar-emerald" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-solar-navy mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-600 mb-3 sm:mb-4 line-clamp-2">
                  {service.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                  {service.features.map((feature, fIndex) => (
                    <span
                      key={fIndex}
                      className="text-[10px] sm:text-xs font-medium px-2 sm:px-3 py-1 bg-slate-100 text-slate-600 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <button className="inline-flex items-center text-solar-emerald font-semibold text-xs sm:text-sm group/btn">
                  Learn more
                  <ArrowRight className="ml-1 w-3 h-3 sm:w-4 sm:h-4 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
