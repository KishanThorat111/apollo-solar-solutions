import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import OptimizedImage from '../components/OptimizedImage';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const categories = ['All', 'Residential', 'Commercial', 'Industrial'];

const galleryItems = [
  { 
    src: '/images/rooftop_indian.jpg', 
    category: 'Residential', 
    title: 'Residential Installation',
    location: 'Belagavi'
  },
  { 
    src: '/images/commercial_indian.jpg', 
    category: 'Commercial', 
    title: 'Commercial Complex',
    location: 'Hubli'
  },
  { 
    src: '/images/maintenance_indian.jpg', 
    category: 'Residential', 
    title: 'Panel Maintenance',
    location: 'Gokak'
  },
  { 
    src: '/images/industrial_indian.jpg', 
    category: 'Industrial', 
    title: 'Industrial Solar',
    location: 'Belagavi'
  },
  { 
    src: '/images/aerial_indian.jpg', 
    category: 'Residential', 
    title: 'Community Solar',
    location: 'Belagavi'
  },
  { 
    src: '/images/solar_farm_indian.jpg', 
    category: 'Industrial', 
    title: 'Solar Farm',
    location: 'Karnataka'
  },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const [activeFilter, setActiveFilter] = useState('All');

  const filteredItems = activeFilter === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;

    if (!section || !grid) return;

    const ctx = gsap.context(() => {
      const items = grid.querySelectorAll('.gallery-item');
      gsap.fromTo(
        items,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, [filteredItems]);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="section-padding bg-slate-50 overflow-hidden"
    >
      <div className="container-narrow">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="section-label text-xs sm:text-sm">PROJECT GALLERY</span>
          <h2 className="mt-3 sm:mt-4 mb-4 sm:mb-6 text-2xl sm:text-3xl lg:text-4xl">
            Installations that{' '}
            <span className="text-solar-emerald">perform</span>
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-slate-600">
            See our work across Belagavi and surrounding areas.
          </p>
        </div>

        {/* Filter Buttons - Scrollable on mobile */}
        <div className="flex justify-start sm:justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`flex-shrink-0 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                activeFilter === category
                  ? 'bg-solar-emerald text-white shadow-glow'
                  : 'bg-white text-slate-600 hover:bg-solar-emerald/10 hover:text-solar-emerald'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6"
        >
          {filteredItems.map((item, index) => (
            <div
              key={index}
              className={`gallery-item group relative rounded-xl sm:rounded-3xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer ${
                index === 3 ? 'col-span-2 sm:col-span-1' : ''
              }`}
            >
              <div className={`aspect-[4/3] overflow-hidden ${index === 3 ? 'sm:aspect-[4/3]' : ''}`}>
                <OptimizedImage
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-solar-navy/90 via-solar-navy/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="inline-block px-2 sm:px-3 py-0.5 sm:py-1 bg-solar-emerald/20 text-solar-emerald text-[10px] sm:text-xs font-medium rounded-full mb-1 sm:mb-2">
                  {item.category}
                </span>
                <h3 className="text-sm sm:text-lg font-bold text-white mb-0.5 sm:mb-1">{item.title}</h3>
                <p className="text-white/70 text-xs sm:text-sm">{item.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
