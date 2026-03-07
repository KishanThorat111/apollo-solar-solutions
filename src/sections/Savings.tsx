import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, IndianRupee, TrendingDown, Clock, Shield, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface CounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

function Counter({ end, suffix = '', prefix = '', duration = 1.5 }: CounterProps) {
  const [count, setCount] = useState(0);
  const counterRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const counter = counterRef.current;
    if (!counter || hasAnimated.current) return;

    const obj = { value: 0 };

    ScrollTrigger.create({
      trigger: counter,
      start: 'top 85%',
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;
        gsap.to(obj, {
          value: end,
          duration,
          ease: 'power2.out',
          onUpdate: () => setCount(Math.round(obj.value)),
        });
      },
      once: true,
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === counter) st.kill();
      });
    };
  }, [end, duration]);

  return (
    <span ref={counterRef}>
      {prefix}{count}{suffix}
    </span>
  );
}

const stats = [
  { 
    icon: TrendingDown, 
    value: 99, 
    suffix: '%', 
    label: 'Bill reduction',
    color: 'text-solar-emerald',
  },
  { 
    icon: Clock, 
    value: 6, 
    suffix: ' yrs', 
    label: 'Payback period',
    color: 'text-solar-gold',
  },
  { 
    icon: Shield, 
    value: 25, 
    suffix: ' yrs', 
    label: 'System lifespan',
    color: 'text-solar-emerald',
  },
];

export default function Savings() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const image = imageRef.current;

    if (!section || !content || !image) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        content.children,
        { x: -40, opacity: 0 },
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

      gsap.fromTo(
        image,
        { x: 40, opacity: 0 },
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
      className="section-padding bg-slate-50 overflow-hidden"
    >
      <div className="container-narrow">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left - Content */}
          <div ref={contentRef}>
            <span className="section-label text-xs sm:text-sm">SAVINGS & IMPACT</span>
            
            <h2 className="mt-3 sm:mt-4 mb-4 sm:mb-6 text-2xl sm:text-3xl lg:text-4xl">
              Real savings.
              <br />
              <span className="text-solar-emerald">Real impact.</span>
            </h2>
            
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 mb-6 sm:mb-10">
              Every kW installed reduces carbon like taking a car off the road—
              without changing how you live. Start saving from day one.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-6 sm:mb-10">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-3 sm:p-4 bg-white rounded-xl sm:rounded-2xl shadow-sm">
                  <stat.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.color} mx-auto mb-1 sm:mb-2`} />
                  <div className={`text-xl sm:text-2xl lg:text-3xl font-bold ${stat.color} mb-0.5 sm:mb-1`}>
                    <Counter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-[10px] sm:text-xs text-slate-600">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Subsidy Highlight */}
            <div className="bg-gradient-to-r from-solar-emerald/10 to-solar-gold/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-solar-emerald flex items-center justify-center flex-shrink-0">
                  <IndianRupee className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-solar-navy text-sm sm:text-base lg:text-lg">PM Surya Ghar Subsidy</div>
                  <div className="text-xs sm:text-sm text-slate-600">Government of India</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-3 sm:mb-4">
                <div className="text-center p-2 sm:p-3 bg-white rounded-lg">
                  <div className="font-bold text-solar-emerald text-sm sm:text-base">₹30,000</div>
                  <div className="text-[10px] sm:text-xs text-slate-500">1 kW</div>
                </div>
                <div className="text-center p-2 sm:p-3 bg-white rounded-lg">
                  <div className="font-bold text-solar-emerald text-sm sm:text-base">₹60,000</div>
                  <div className="text-[10px] sm:text-xs text-slate-500">2 kW</div>
                </div>
                <div className="text-center p-2 sm:p-3 bg-white rounded-lg">
                  <div className="font-bold text-solar-emerald text-sm sm:text-base">₹78,000</div>
                  <div className="text-[10px] sm:text-xs text-slate-500">3 kW</div>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600">
                <Check className="w-3 h-3 sm:w-4 sm:h-4 text-solar-emerald inline mr-1" />
                We handle all paperwork for subsidy application
              </p>
            </div>

            {/* CTA */}
            <button
              onClick={() => scrollToSection('#quote')}
              className="inline-flex items-center text-solar-emerald font-semibold text-sm sm:text-base hover:underline group"
            >
              See how much you can save
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Right - Image */}
          <div ref={imageRef} className="relative">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl">
              <img
                src="/images/solar_farm_indian.jpg"
                alt="Solar farm in India"
                className="w-full h-[250px] sm:h-[350px] lg:h-[450px] object-cover"
              />
            </div>
            
            {/* Floating Card */}
            <div className="absolute -bottom-4 sm:-bottom-6 -left-2 sm:-left-6 bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-card">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-solar-gold flex items-center justify-center">
                  <IndianRupee className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-solar-navy text-sm sm:text-base">₹50,000+</div>
                  <div className="text-[10px] sm:text-sm text-slate-500">Annual Savings</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
