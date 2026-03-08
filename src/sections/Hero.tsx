import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import OptimizedImage from '../components/OptimizedImage';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Zap, Shield, TrendingUp, Award, Battery, FileCheck, Wrench } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const additionalFeatures = [
  { icon: Battery, text: 'Energy Banking' },
  { icon: TrendingUp, text: 'Energy Sell' },
  { icon: FileCheck, text: 'HT/LT Licensing' },
  { icon: Wrench, text: 'Solar Plant Maintenance' },
];

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const stats = statsRef.current;

    if (!section || !content || !stats) return;

    const ctx = gsap.context(() => {
      // Content fade up on load - smooth and fast
      gsap.fromTo(
        content.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          delay: 0.2,
        }
      );

      // Stats fade up
      gsap.fromTo(
        stats.children,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          delay: 0.5,
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
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-solar-emerald/5"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-10 w-72 h-72 bg-solar-emerald/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-solar-gold/10 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="container-narrow relative z-10 pt-28 sm:pt-32 lg:pt-36 pb-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Content */}
          <div ref={contentRef} className="text-center lg:text-left">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-solar-emerald/10 rounded-full mb-5 sm:mb-6">
              <Award className="w-4 h-4 text-solar-emerald" />
              <span className="text-xs sm:text-sm font-medium text-solar-emerald-700">
                Belagavi's #1 Solar Installer
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-solar-navy mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] leading-tight">
              Powering a{' '}
              <span className="text-solar-emerald">Greener</span> Future
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-600 mb-3 sm:mb-4 max-w-lg mx-auto lg:mx-0">
              Premium solar solutions for residential, commercial, and farming sectors 
              in Belagavi. Expert installation with PM Surya Ghar subsidy up to ₹78,000.
            </p>

            {/* Additional Services */}
            <p className="text-sm sm:text-base text-slate-500 mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0">
              We also provide energy banking, energy sell, HT/LT licensing, and 
              maintenance for solar power plants.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8 justify-center lg:justify-start">
              <button
                onClick={() => scrollToSection('#quote')}
                className="btn-primary text-sm sm:text-base py-3.5 sm:py-4"
              >
                Get Free Quote
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={() => scrollToSection('#gallery')}
                className="btn-outline text-sm sm:text-base py-3.5 sm:py-4"
              >
                View Projects
              </button>
            </div>

            {/* Value Pills - Mobile Scrollable */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3 mb-4">
              <div className="value-pill text-xs sm:text-sm">
                <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
                Save 90% on bills
              </div>
              <div className="value-pill text-xs sm:text-sm">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
                25-year warranty
              </div>
              <div className="value-pill text-xs sm:text-sm hidden sm:inline-flex">
                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                Net metering
              </div>
            </div>

            {/* Additional Features Pills */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2">
              {additionalFeatures.map((feature, index) => (
                <div key={index} className="value-pill text-[10px] sm:text-xs bg-solar-gold/10 text-solar-gold-700 border-solar-gold/20">
                  <feature.icon className="w-3 h-3" />
                  {feature.text}
                </div>
              ))}
            </div>
          </div>

          {/* Right - Stats Cards */}
          <div ref={statsRef} className="hidden sm:block">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-card animate-float">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-solar-emerald mb-1">100+</div>
                <div className="text-xs sm:text-sm text-slate-600">Installations</div>
              </div>
              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-card animate-float" style={{ animationDelay: '0.5s' }}>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-solar-emerald mb-1">₹10Cr+</div>
                <div className="text-xs sm:text-sm text-slate-600">Client Savings</div>
              </div>
              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-card animate-float" style={{ animationDelay: '1s' }}>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-solar-gold mb-1">₹78K</div>
                <div className="text-xs sm:text-sm text-slate-600">Govt Subsidy</div>
              </div>
              <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-card animate-float" style={{ animationDelay: '1.5s' }}>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-solar-emerald mb-1">4.9</div>
                <div className="text-xs sm:text-sm text-slate-600">Rating</div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="mt-4 sm:mt-6 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl">
              <OptimizedImage
                src="/images/hero_indian_solar.jpg"
                alt="Solar panels on Indian homes"
                className="w-full h-40 sm:h-48 lg:h-56 object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Mobile Stats Row */}
        <div className="sm:hidden mt-8 grid grid-cols-4 gap-2">
          <div className="bg-white rounded-xl p-3 text-center shadow-card">
            <div className="text-lg font-bold text-solar-emerald">100+</div>
            <div className="text-[10px] text-slate-600">Installs</div>
          </div>
          <div className="bg-white rounded-xl p-3 text-center shadow-card">
            <div className="text-lg font-bold text-solar-emerald">₹10Cr+</div>
            <div className="text-[10px] text-slate-600">Savings</div>
          </div>
          <div className="bg-white rounded-xl p-3 text-center shadow-card">
            <div className="text-lg font-bold text-solar-gold">₹78K</div>
            <div className="text-[10px] text-slate-600">Govt Subsidy</div>
          </div>
          <div className="bg-white rounded-xl p-3 text-center shadow-card">
            <div className="text-lg font-bold text-solar-emerald">4.9</div>
            <div className="text-[10px] text-slate-600">Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
}
