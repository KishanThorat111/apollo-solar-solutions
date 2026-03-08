import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import OptimizedImage from '../components/OptimizedImage';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin, Clock, Sun, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Section9Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Headline + body animation
      gsap.fromTo([headlineRef.current, bodyRef.current],
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 0.5,
          },
        }
      );

      // Contact details stagger
      const contactItems = contactRef.current?.querySelectorAll('.contact-item');
      contactItems?.forEach((item) => {
        gsap.fromTo(item,
          { x: -20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              end: 'top 65%',
              scrub: 0.5,
            },
          }
        );
      });

      // CTA animation
      gsap.fromTo(ctaRef.current,
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 85%',
            end: 'top 70%',
            scrub: 0.5,
          },
        }
      );

      // Circle image
      gsap.fromTo(circleRef.current,
        { scale: 0.92, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          scrollTrigger: {
            trigger: circleRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 0.5,
          },
        }
      );

      // Footer
      gsap.fromTo(footerRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
            end: 'top 80%',
            scrub: 0.5,
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
      className="relative w-full bg-apollo-navy text-white"
    >
      {/* Main Content */}
      <div className="relative py-24 px-6 lg:px-[8vw]">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            {/* Headline */}
            <h2
              ref={headlineRef}
              className="font-heading font-bold text-[clamp(34px,3.6vw,52px)] leading-[1.0] will-change-transform"
            >
              Ready to switch
              <br />
              <span className="text-apollo-teal">to solar?</span>
            </h2>

            {/* Body */}
            <p
              ref={bodyRef}
              className="mt-6 text-lg text-white/80 leading-relaxed max-w-md will-change-transform"
            >
              Call or message us. We'll answer your questions and schedule a 
              free site survey.
            </p>

            {/* Contact Details */}
            <div ref={contactRef} className="mt-10 space-y-5">
              <div className="contact-item flex items-center gap-4 will-change-transform">
                <div className="w-12 h-12 rounded-xl bg-apollo-teal/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-apollo-teal" />
                </div>
                <div>
                  <div className="text-sm text-white/60">Phone</div>
                  <div className="font-medium">7676166629, 7204030568</div>
                </div>
              </div>

              <div className="contact-item flex items-center gap-4 will-change-transform">
                <div className="w-12 h-12 rounded-xl bg-apollo-teal/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-apollo-teal" />
                </div>
                <div>
                  <div className="text-sm text-white/60">Email</div>
                  <div className="font-medium">hello@apollosolar.in</div>
                </div>
              </div>

              <div className="contact-item flex items-center gap-4 will-change-transform">
                <div className="w-12 h-12 rounded-xl bg-apollo-teal/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-apollo-teal" />
                </div>
                <div>
                  <div className="text-sm text-white/60">Address</div>
                  <div className="font-medium">
                    Behind Kothiwale Hospital, Gondhali Galli,
                    <br />
                    Belagavi, Karnataka
                  </div>
                </div>
              </div>

              <div className="contact-item flex items-center gap-4 will-change-transform">
                <div className="w-12 h-12 rounded-xl bg-apollo-teal/20 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-apollo-teal" />
                </div>
                <div>
                  <div className="text-sm text-white/60">Hours</div>
                  <div className="font-medium">Mon - Sat: 9:00 AM - 6:00 PM</div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div ref={ctaRef} className="mt-10 will-change-transform">
              <Button
                className="bg-apollo-teal hover:bg-apollo-teal/90 text-white rounded-xl px-8 py-6 text-base font-medium group"
                onClick={() => window.open('tel:7676166629')}
              >
                Request a Call
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          {/* Right - Circle Image */}
          <div className="hidden lg:flex justify-end">
            <div
              ref={circleRef}
              className="w-[56vmin] h-[56vmin] min-w-[400px] min-h-[400px] max-w-[600px] max-h-[600px] circle-image will-change-transform"
            >
              <OptimizedImage
                src="/images/closing_sun.jpg"
                alt="Solar energy"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        ref={footerRef}
        className="border-t border-white/10 py-8 px-6 lg:px-[8vw] will-change-transform"
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-apollo-teal flex items-center justify-center">
              <Sun className="w-5 h-5 text-white" />
            </div>
            <span className="font-heading font-bold text-white">
              Apollo Solar Solutions
            </span>
          </div>

          {/* Copyright */}
          <div className="text-sm text-white/60 text-center">
            © {new Date().getFullYear()} Apollo Solar Solutions. All rights reserved.
          </div>

          {/* Links */}
          <div className="flex gap-6">
            <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#" className="text-sm text-white/60 hover:text-white transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>

      {/* WhatsApp Float Button */}
      <a
        href="https://wa.me/917676166629"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[100] w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform animate-pulse-glow"
      >
        <svg
          className="w-7 h-7 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </section>
  );
}
