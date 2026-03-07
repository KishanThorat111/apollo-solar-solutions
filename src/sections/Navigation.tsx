import { useState, useEffect } from 'react';
import { Menu, X, Sun, Phone } from 'lucide-react';

const navItems = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#why-choose' },
  { label: 'Services', href: '#services' },
  { label: 'Subsidy', href: '#savings' },
  { label: 'Projects', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop & Mobile Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm py-2 sm:py-3'
            : 'bg-transparent py-3 sm:py-5'
        }`}
      >
        <div className="container-narrow">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#hero');
              }}
              className="flex items-center gap-2 sm:gap-3 group"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-solar-emerald-500 to-solar-emerald-700 flex items-center justify-center transition-transform group-hover:scale-110">
                <Sun className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className={`font-bold text-sm sm:text-base lg:text-lg transition-colors text-solar-navy leading-tight`}>
                  Apollo Solar
                </span>
                <span className={`text-[10px] sm:text-xs text-slate-500 leading-tight`}>
                  Solutions
                </span>
              </div>
            </a>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className="text-sm font-medium text-slate-600 hover:text-solar-emerald transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-solar-emerald transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* CTA Buttons - Desktop */}
            <div className="hidden lg:flex items-center gap-3">
              <div className="flex flex-col items-end text-right">
                <a
                  href="tel:7676166629"
                  className="text-sm font-medium text-slate-600 hover:text-solar-emerald transition-colors"
                >
                  7676166629
                </a>
                <a
                  href="tel:7022804286"
                  className="text-xs text-slate-400 hover:text-solar-emerald transition-colors"
                >
                  7022804286
                </a>
              </div>
              <button
                onClick={() => scrollToSection('#quote')}
                className="btn-primary text-sm py-2.5 px-5"
              >
                Get Quote
              </button>
            </div>

            {/* Mobile CTA + Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <a
                href="tel:7676166629"
                className="w-10 h-10 rounded-full bg-solar-emerald/10 flex items-center justify-center"
              >
                <Phone className="w-5 h-5 text-solar-emerald" />
              </a>
              <button
                className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-solar-navy" />
                ) : (
                  <Menu className="w-5 h-5 text-solar-navy" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[99] lg:hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'visible' : 'invisible'
        }`}
      >
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Menu Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-[280px] bg-white shadow-2xl transition-transform duration-300 ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full pt-20 pb-6 px-6">
            {/* Nav Links */}
            <div className="flex-1 space-y-1">
              {navItems.map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className="block py-3 px-4 text-lg font-semibold text-solar-navy hover:text-solar-emerald hover:bg-solar-emerald/5 rounded-xl transition-colors"
                  style={{ 
                    animationDelay: `${index * 50}ms`,
                    animation: isMobileMenuOpen ? 'slideInRight 0.3s ease-out forwards' : 'none'
                  }}
                >
                  {item.label}
                </a>
              ))}
            </div>
            
            {/* CTA Section */}
            <div className="pt-6 border-t border-slate-100 space-y-4">
              <div className="space-y-2">
                <a
                  href="tel:7676166629"
                  className="flex items-center gap-3 py-2 text-solar-emerald font-semibold"
                >
                  <Phone className="w-5 h-5" />
                  7676166629
                </a>
                <a
                  href="tel:7022804286"
                  className="flex items-center gap-3 py-2 text-slate-500 text-sm"
                >
                  <Phone className="w-4 h-4" />
                  7022804286
                </a>
              </div>
              <button
                onClick={() => scrollToSection('#quote')}
                className="w-full btn-primary py-4"
              >
                Get Free Quote
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}
