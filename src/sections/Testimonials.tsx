import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "Apollo Solar made the process simple—from paperwork to switch-on. Our electricity bills dropped by 80% in the first month itself. Highly recommended!",
    author: "Ashok Patil",
    role: "Homeowner, Belagavi",
    rating: 5,
    image: "/images/family_indian.jpg",
  },
  {
    quote: "Professional team, quality installation, and excellent after-sales service. The PM Surya Ghar subsidy was handled smoothly. Best investment for our home.",
    author: "Basavaraj Patil",
    role: "Homeowner, Belagavi",
    rating: 5,
    image: "/images/rooftop_indian.jpg",
  },
  {
    quote: "We installed a 10kW system for our factory. The ROI has been fantastic, and the team is always responsive for any maintenance needs.",
    author: "Subhash Nandhi",
    role: "Homeowner, Belagavi",
    rating: 5,
    image: "/images/industrial_indian.jpg",
  },
];

const stats = [
  { value: '100+', label: 'Happy Customers' },
  { value: '4.9/5', label: 'Average Rating' },
  { value: '50kW+', label: 'Solar Installed' },
  { value: '98%', label: 'Satisfaction' },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;

    if (!section || !cards) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards.children,
        { y: 30, opacity: 0 },
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

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="section-padding bg-slate-50 overflow-hidden"
    >
      <div className="container-narrow">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <span className="section-label text-xs sm:text-sm">CUSTOMER STORIES</span>
          <h2 className="mt-3 sm:mt-4 mb-4 sm:mb-6 text-2xl sm:text-3xl lg:text-4xl">
            Trusted by homeowners{' '}
            <span className="text-solar-emerald">& businesses</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-slate-600">
            See what our customers in Belagavi and surrounding areas have to say.
          </p>
        </div>

        {/* Desktop Grid */}
        <div ref={cardsRef} className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-card hover:shadow-card-hover transition-all duration-300"
            >
              {/* Quote Icon */}
              <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-solar-emerald/20 mb-3 sm:mb-4" />

              {/* Rating */}
              <div className="flex gap-1 mb-3 sm:mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-solar-gold text-solar-gold" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm sm:text-base text-slate-700 mb-4 sm:mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-slate-100">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold text-solar-navy text-sm sm:text-base">{testimonial.author}</div>
                  <div className="text-xs sm:text-sm text-slate-500">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="sm:hidden relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-300"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0 px-1"
                >
                  <div className="bg-white rounded-2xl p-5 shadow-card">
                    <Quote className="w-8 h-8 text-solar-emerald/20 mb-3" />
                    <div className="flex gap-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-solar-gold text-solar-gold" />
                      ))}
                    </div>
                    <p className="text-sm text-slate-700 mb-4 leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img
                          src={testimonial.image}
                          alt={testimonial.author}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-solar-navy text-sm">{testimonial.author}</div>
                        <div className="text-xs text-slate-500">{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5 text-solar-navy" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === activeIndex ? 'bg-solar-emerald' : 'bg-slate-300'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center"
            >
              <ChevronRight className="w-5 h-5 text-solar-navy" />
            </button>
          </div>
        </div>

        {/* Trust Stats */}
        <div className="mt-10 sm:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl shadow-sm">
              <div className="text-2xl sm:text-3xl font-bold text-solar-emerald mb-1">{stat.value}</div>
              <div className="text-xs sm:text-sm text-slate-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
