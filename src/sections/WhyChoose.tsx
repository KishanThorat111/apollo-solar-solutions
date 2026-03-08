import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Zap, DollarSign, FileText, Headphones, Star } from 'lucide-react';
import OptimizedImage from '../components/OptimizedImage';

gsap.registerPlugin(ScrollTrigger);

const features = [
  { icon: Zap, text: 'High-efficiency panels' },
  { icon: DollarSign, text: 'Transparent pricing' },
  { icon: FileText, text: 'End-to-end paperwork' },
  { icon: Headphones, text: 'Local support team' },
];

const certifications = [
  'MNRE Approved',
  'ISO Certified',
  'BIS Certified',
];

export default function WhyChoose() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;

    if (!section || !image || !content) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        image,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        content.children,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
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
      className="section-padding bg-slate-50 overflow-hidden"
    >
      <div className="container-narrow">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left - Image */}
          <div ref={imageRef} className="relative order-2 lg:order-1">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl">
              <OptimizedImage
                src="/images/technician_indian.jpg"
                alt="Indian solar technician"
                className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
              />
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-4 sm:-bottom-6 -right-2 sm:-right-6 bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-card">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-solar-emerald/10 flex items-center justify-center">
                  <Star className="w-5 h-5 sm:w-6 sm:h-6 text-solar-emerald fill-solar-emerald" />
                </div>
                <div>
                  <div className="font-bold text-solar-navy text-sm sm:text-base">10+ Years</div>
                  <div className="text-xs sm:text-sm text-slate-500">Experience</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div ref={contentRef} className="order-1 lg:order-2">
            <span className="section-label text-xs sm:text-sm">WHY CHOOSE US</span>
            
            <h2 className="mt-3 sm:mt-4 mb-4 sm:mb-6 text-2xl sm:text-3xl lg:text-4xl">
              Built for performance.
              <br />
              <span className="text-solar-emerald">Designed for peace of mind.</span>
            </h2>
            
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 mb-6 sm:mb-8">
              From site survey to net metering, we handle the details—so you get a 
              system that lasts. Our certified professionals ensure quality at every step.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-solar-emerald/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 text-solar-emerald" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-slate-700">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
              {certifications.map((cert, index) => (
                <span
                  key={index}
                  className="badge-emerald text-[10px] sm:text-xs px-2 sm:px-3 py-1"
                >
                  {cert}
                </span>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={() => scrollToSection('#services')}
              className="inline-flex items-center text-solar-emerald font-semibold text-sm sm:text-base hover:underline group"
            >
              Explore our services
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
