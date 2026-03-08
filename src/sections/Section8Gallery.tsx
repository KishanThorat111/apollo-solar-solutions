import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import OptimizedImage from '../components/OptimizedImage';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Badge } from '@/components/ui/badge';

gsap.registerPlugin(ScrollTrigger);

const categories = ['All', 'Residential', 'Commercial', 'Industrial'];

const galleryItems = [
  { src: '/images/gallery_1.jpg', category: 'Residential', title: 'Residential Installation' },
  { src: '/images/gallery_2.jpg', category: 'Commercial', title: 'Commercial Complex' },
  { src: '/images/gallery_3.jpg', category: 'Residential', title: 'Installation Process' },
  { src: '/images/gallery_4.jpg', category: 'Industrial', title: 'Solar Farm' },
  { src: '/images/gallery_5.jpg', category: 'Residential', title: 'Modern Villa' },
  { src: '/images/gallery_6.jpg', category: 'Commercial', title: 'Factory Installation' },
];

export default function Section8Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const [activeFilter, setActiveFilter] = useState('All');

  const filteredItems = activeFilter === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(headerRef.current,
        { y: 20, opacity: 0 },
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

      // Filters animation
      gsap.fromTo(filtersRef.current,
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: filtersRef.current,
            start: 'top 80%',
            end: 'top 60%',
            scrub: 0.5,
          },
        }
      );

      // Grid items animation
      const gridItems = gridRef.current?.querySelectorAll('.gallery-item');
      gridItems?.forEach((item) => {
        gsap.fromTo(item,
          { scale: 0.96, opacity: 0 },
          {
            scale: 1,
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
    }, section);

    return () => ctx.revert();
  }, [filteredItems]);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative w-full py-24 bg-apollo-offwhite"
    >
      {/* Header */}
      <div ref={headerRef} className="text-center px-6">
        <span className="section-label">PROJECT GALLERY</span>
        <h2 className="mt-4 font-heading font-bold text-[clamp(34px,3.6vw,52px)] text-gray-900">
          Installations that perform
        </h2>
      </div>

      {/* Filter Chips */}
      <div
        ref={filtersRef}
        className="flex justify-center gap-3 mt-8 px-6 flex-wrap"
      >
        {categories.map((category) => (
          <Badge
            key={category}
            variant={activeFilter === category ? 'default' : 'outline'}
            className={`cursor-pointer px-4 py-2 text-sm rounded-full transition-all ${
              activeFilter === category
                ? 'bg-apollo-teal text-white hover:bg-apollo-teal/90'
                : 'border-apollo-teal/30 text-gray-700 hover:bg-apollo-teal/10'
            }`}
            onClick={() => setActiveFilter(category)}
          >
            {category}
          </Badge>
        ))}
      </div>

      {/* Masonry Grid */}
      <div
        ref={gridRef}
        className="mt-12 px-6 lg:px-[6vw] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {filteredItems.map((item, index) => (
          <div
            key={index}
            className={`gallery-item relative group overflow-hidden rounded-2xl cursor-pointer ${
              index === 3 ? 'md:col-span-2 lg:col-span-2' : ''
            }`}
          >
            <div className={`relative overflow-hidden ${index === 3 ? 'aspect-[21/9]' : 'aspect-[4/3]'}`}>
              <OptimizedImage
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {/* Title */}
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-xs text-white/80 uppercase tracking-wider">
                  {item.category}
                </span>
                <h3 className="font-heading font-semibold text-white text-lg">
                  {item.title}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
