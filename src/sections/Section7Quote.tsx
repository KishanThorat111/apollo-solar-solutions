import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import OptimizedImage from '../components/OptimizedImage';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Send, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Section7Quote() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bill: '',
    message: '',
  });

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0-30%)
      scrollTl
        .fromTo(panelRef.current, 
          { x: '50vw', opacity: 0 }, 
          { x: 0, opacity: 1, ease: 'none' }, 
          0
        )
        .fromTo(circleRef.current, 
          { x: '60vw', scale: 0.9, opacity: 0 }, 
          { x: 0, scale: 1, opacity: 1, ease: 'none' }, 
          0
        )
        .fromTo([headlineRef.current, subheadRef.current], 
          { x: '-40vw', opacity: 0 }, 
          { x: 0, opacity: 1, stagger: 0.02, ease: 'none' }, 
          0.05
        )
        .fromTo(formRef.current, 
          { y: '40vh', opacity: 0 }, 
          { y: 0, opacity: 1, ease: 'none' }, 
          0.1
        );

      // EXIT (70-100%)
      scrollTl
        .fromTo(panelRef.current, 
          { x: 0, opacity: 1 }, 
          { x: '18vw', opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .fromTo(circleRef.current, 
          { x: 0, scale: 1, opacity: 1 }, 
          { x: '10vw', scale: 0.92, opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .fromTo([headlineRef.current, subheadRef.current], 
          { x: 0, opacity: 1 }, 
          { x: '-6vw', opacity: 0, ease: 'power2.in' }, 
          0.7
        )
        .fromTo(formRef.current, 
          { y: 0, opacity: 1 }, 
          { y: '12vh', opacity: 0, ease: 'power2.in' }, 
          0.75
        );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section
      ref={sectionRef}
      id="quote"
      className="relative w-screen h-screen overflow-hidden bg-apollo-offwhite"
    >
      {/* Diagonal Panel */}
      <div
        ref={panelRef}
        className="absolute right-0 top-0 w-[58vw] h-full diagonal-panel-right will-change-transform"
        style={{ backgroundColor: 'rgba(47, 142, 146, 0.12)' }}
      />

      {/* Circle Image */}
      <div
        ref={circleRef}
        className="absolute right-[-6vw] top-[16vh] w-[62vmin] h-[62vmin] min-w-[520px] min-h-[520px] max-w-[760px] max-h-[760px] circle-image will-change-transform"
      >
        <OptimizedImage
          src="/images/sunny_field.jpg"
          alt="Solar field"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="absolute left-[8vw] top-[16vh]">
        {/* Headline */}
        <h2
          ref={headlineRef}
          className="font-heading font-bold text-[clamp(34px,3.6vw,52px)] text-gray-900 leading-[1.0] max-w-[34vw] will-change-transform"
        >
          Get your
          <br />
          <span className="text-apollo-teal">personalized quote</span>
        </h2>

        {/* Subheadline */}
        <p
          ref={subheadRef}
          className="mt-6 text-base lg:text-lg text-gray-600 leading-relaxed max-w-[30vw] will-change-transform"
        >
          Tell us a little about your usage. We'll reply with a clear estimate 
          and next steps.
        </p>

        {/* Form Card */}
        <div
          ref={formRef}
          className="mt-8 w-[34vw] bg-white rounded-2xl p-6 shadow-card will-change-transform"
        >
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Name
                  </label>
                  <Input
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="rounded-xl border-gray-200 focus:border-apollo-teal focus:ring-apollo-teal"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">
                    Phone
                  </label>
                  <Input
                    type="tel"
                    placeholder="Your phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="rounded-xl border-gray-200 focus:border-apollo-teal focus:ring-apollo-teal"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="rounded-xl border-gray-200 focus:border-apollo-teal focus:ring-apollo-teal"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Monthly Electricity Bill
                </label>
                <Select
                  value={formData.bill}
                  onValueChange={(value) => setFormData({ ...formData, bill: value })}
                >
                  <SelectTrigger className="rounded-xl border-gray-200 focus:border-apollo-teal focus:ring-apollo-teal">
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="below-1000">Below ₹1,000</SelectItem>
                    <SelectItem value="1000-3000">₹1,000 - ₹3,000</SelectItem>
                    <SelectItem value="3000-5000">₹3,000 - ₹5,000</SelectItem>
                    <SelectItem value="5000-10000">₹5,000 - ₹10,000</SelectItem>
                    <SelectItem value="above-10000">Above ₹10,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Message (Optional)
                </label>
                <Textarea
                  placeholder="Tell us about your requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="rounded-xl border-gray-200 focus:border-apollo-teal focus:ring-apollo-teal min-h-[80px]"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-apollo-teal hover:bg-apollo-teal/90 text-white rounded-xl py-6 font-medium group"
              >
                Get My Quote
                <Send className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>

              <p className="text-xs text-gray-500 text-center">
                We respect your privacy. No spam.
              </p>
            </form>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-heading font-semibold text-xl text-gray-900 mb-2">
                Thank You!
              </h3>
              <p className="text-gray-600">
                We've received your request. Our team will contact you within 24 hours.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
