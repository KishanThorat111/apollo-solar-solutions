import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ClipboardCheck, PenTool, HardHat, FileCheck, Headphones, Wrench } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: ClipboardCheck,
    title: 'Site Survey',
    description: 'We assess your roof, shading, and energy usage to design the perfect system.',
    duration: 'Day 1',
  },
  {
    icon: PenTool,
    title: 'Custom Design',
    description: 'A system sized for your needs with 3D visualization.',
    duration: 'Day 2-3',
  },
  {
    icon: HardHat,
    title: 'Installation',
    description: 'Professional team, clean workmanship, timely completion.',
    duration: 'Day 4-7',
  },
  {
    icon: FileCheck,
    title: 'Net Metering',
    description: 'We handle all approvals and utility coordination.',
    duration: 'Day 8-15',
  },
  {
    icon: Wrench,
    title: '5 Years Maintenance',
    description: 'Comprehensive maintenance package included for 5 years.',
    duration: 'Included',
  },
  {
    icon: Headphones,
    title: 'Lifetime Support',
    description: 'Monitoring, maintenance, and quick help when needed.',
    duration: 'Ongoing',
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stepsContainer = stepsRef.current;

    if (!section || !stepsContainer) return;

    const ctx = gsap.context(() => {
      const stepItems = stepsContainer.querySelectorAll('.step-item');
      stepItems.forEach((item) => {
        gsap.fromTo(
          item,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="section-padding bg-white overflow-hidden"
    >
      <div className="container-narrow">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <span className="section-label text-xs sm:text-sm">INSTALLATION PROCESS</span>
          <h2 className="mt-3 sm:mt-4 mb-4 sm:mb-6 text-2xl sm:text-3xl lg:text-4xl">
            From consultation to{' '}
            <span className="text-solar-emerald">switch-on</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-slate-600">
            Our streamlined process ensures a hassle-free experience from 
            start to finish.
          </p>
        </div>

        {/* Timeline */}
        <div ref={stepsRef} className="relative max-w-3xl mx-auto">
          {/* Vertical Line - Hidden on mobile */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-solar-emerald to-solar-gold -translate-x-1/2" />

          {/* Steps */}
          <div className="space-y-6 sm:space-y-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`step-item relative flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 ${
                  index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                }`}
              >
                {/* Content Card */}
                <div className={`flex-1 w-full ${index % 2 === 0 ? 'sm:text-right' : 'sm:text-left'}`}>
                  <div className="bg-slate-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:bg-solar-emerald/5 transition-colors">
                    <div className={`flex items-center gap-2 mb-2 ${index % 2 === 0 ? 'sm:justify-end' : ''}`}>
                      <span className="text-xs sm:text-sm font-medium text-solar-emerald bg-solar-emerald/10 px-2 sm:px-3 py-1 rounded-full">
                        {step.duration}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold text-solar-navy mb-1 sm:mb-2">{step.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600">{step.description}</p>
                  </div>
                </div>

                {/* Icon - Center on desktop */}
                <div className="relative z-10 w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-solar-emerald to-solar-emerald-700 flex items-center justify-center shadow-lg flex-shrink-0 mx-0 sm:mx-0">
                  <step.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>

                {/* Spacer for alternating layout on desktop */}
                <div className="hidden sm:block flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
