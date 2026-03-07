import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ClipboardCheck, PenTool, HardHat, FileCheck, Headphones } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: ClipboardCheck,
    title: 'Site Survey',
    description: 'We assess your roof, shading, and energy usage.',
  },
  {
    icon: PenTool,
    title: 'Custom Design',
    description: 'A system sized for your needs and local rules.',
  },
  {
    icon: HardHat,
    title: 'Installation',
    description: 'Professional team, clean workmanship, timely completion.',
  },
  {
    icon: FileCheck,
    title: 'Net Metering',
    description: 'We handle approvals and utility coordination.',
  },
  {
    icon: Headphones,
    title: 'Support',
    description: 'Monitoring, maintenance, and quick help when you need it.',
  },
];

export default function Section5Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(headerRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 0.5,
          },
        }
      );

      // Timeline line draw
      gsap.fromTo(lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          scrollTrigger: {
            trigger: stepsRef.current,
            start: 'top 70%',
            end: 'bottom 50%',
            scrub: 0.5,
          },
        }
      );

      // Step items animation
      const stepItems = stepsRef.current?.querySelectorAll('.step-item');
      stepItems?.forEach((item) => {
        gsap.fromTo(item,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              end: 'top 60%',
              scrub: 0.5,
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
      className="relative w-full py-24 bg-apollo-offwhite"
    >
      {/* Header */}
      <div ref={headerRef} className="text-center px-6">
        <span className="section-label">INSTALLATION PROCESS</span>
        <h2 className="mt-4 font-heading font-bold text-[clamp(34px,3.6vw,52px)] text-gray-900">
          From consultation to switch-on
        </h2>
      </div>

      {/* Timeline */}
      <div className="max-w-[900px] mx-auto mt-16 px-6">
        <div ref={stepsRef} className="relative">
          {/* Vertical Line */}
          <div
            ref={lineRef}
            className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-apollo-teal/30 origin-top"
            style={{ transformOrigin: 'top' }}
          />

          {/* Steps */}
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div
                key={index}
                className="step-item flex items-start gap-6 relative"
              >
                {/* Number Badge */}
                <div className="w-10 h-10 rounded-full bg-apollo-teal flex items-center justify-center flex-shrink-0 z-10">
                  <step.icon className="w-5 h-5 text-white" />
                </div>

                {/* Content */}
                <div className="pt-1">
                  <h3 className="font-heading font-semibold text-xl text-gray-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-gray-600 max-w-[500px]">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
