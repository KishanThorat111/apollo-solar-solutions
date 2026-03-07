import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, MapPin, Clock, Sun, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;

    if (!section || !content) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        content.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: content,
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
      id="contact"
      className="bg-solar-navy text-white overflow-hidden"
    >
      {/* Main Content */}
      <div className="section-padding">
        <div className="container-narrow">
          <div ref={contentRef} className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Left - CTA */}
            <div>
              <h2 className="text-white mb-4 sm:mb-6 text-2xl sm:text-3xl lg:text-4xl">
                Ready to switch
                <br />
                <span className="text-solar-emerald">to solar?</span>
              </h2>
              
              <p className="text-sm sm:text-base lg:text-lg text-slate-300 mb-8 sm:mb-10 max-w-md">
                Call or message us. We'll answer your questions and schedule a 
                free site survey at your convenience.
              </p>

              {/* Contact Details */}
              <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
                <div className="flex items-center gap-3 sm:gap-4 group hover:bg-white/5 p-3 sm:p-4 rounded-xl transition-colors">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-solar-emerald/20 flex items-center justify-center">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-solar-emerald" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-slate-400 text-xs sm:text-sm">Phone</div>
                    <div className="flex flex-col sm:flex-row sm:gap-3">
                      <a href="tel:7676166629" className="font-semibold text-sm sm:text-base lg:text-lg hover:text-solar-emerald transition-colors">
                        7676166629
                      </a>
                      <a href="tel:7022804286" className="font-semibold text-sm sm:text-base lg:text-lg hover:text-solar-emerald transition-colors">
                        7022804286
                      </a>
                    </div>
                  </div>
                </div>

                <a 
                  href="mailto:contact@apollosolarsolutions.in" 
                  className="flex items-center gap-3 sm:gap-4 group hover:bg-white/5 p-3 sm:p-4 rounded-xl transition-colors"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-solar-emerald/20 flex items-center justify-center group-hover:bg-solar-emerald transition-colors">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-solar-emerald group-hover:text-white" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-slate-400 text-xs sm:text-sm">Email</div>
                    <div className="font-semibold text-sm sm:text-base lg:text-lg">contact@apollosolarsolutions.in</div>
                  </div>
                </a>

                <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-solar-emerald/20 flex items-center justify-center">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-solar-emerald" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-slate-400 text-xs sm:text-sm">Address</div>
                    <div className="font-semibold text-sm sm:text-base">
                      Behind Kothiwale Hospital,
                      <br />
                      Gondhali Galli, Belagavi, Karnataka
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-solar-emerald/20 flex items-center justify-center">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-solar-emerald" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-slate-400 text-xs sm:text-sm">Working Hours</div>
                    <div className="font-semibold text-sm sm:text-base">Mon - Sat: 9:00 AM - 6:00 PM</div>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <a 
                href="tel:7676166629"
                className="btn-secondary inline-flex text-sm sm:text-base py-3.5 sm:py-4"
              >
                Request a Call
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>

            {/* Right - Image */}
            <div className="relative">
              <div className="rounded-2xl sm:rounded-3xl overflow-hidden h-[250px] sm:h-[350px] lg:h-full min-h-[300px] lg:min-h-[400px]">
                <img
                  src="/images/aerial_indian.jpg"
                  alt="Solar installations in Belagavi"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-solar-navy/80 to-transparent" />
              </div>
              
              {/* Stats Overlay */}
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 grid grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-solar-emerald">100+</div>
                  <div className="text-xs sm:text-sm text-slate-300">Installations</div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-3 sm:p-4">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-solar-gold">₹10Cr+</div>
                  <div className="text-xs sm:text-sm text-slate-300">Client Savings</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-6 sm:py-8">
        <div className="container-narrow">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
            {/* Logo */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-solar-emerald to-solar-emerald-700 flex items-center justify-center">
                <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div>
                <span className="font-bold text-white text-sm sm:text-base lg:text-lg">Apollo Solar Solutions</span>
                <p className="text-[10px] sm:text-xs text-slate-400">Belagavi's #1 Solar Installer</p>
              </div>
            </div>

            {/* Copyright */}
            <div className="text-xs sm:text-sm text-slate-400 text-center">
              © {new Date().getFullYear()} Apollo Solar Solutions. All rights reserved.
            </div>

            {/* Links */}
            <div className="flex gap-4 sm:gap-6">
              <a href="#" className="text-xs sm:text-sm text-slate-400 hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="text-xs sm:text-sm text-slate-400 hover:text-white transition-colors">
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}
