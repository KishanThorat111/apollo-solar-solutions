import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Check, Phone, Mail, MapPin, IndianRupee, Upload } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Quote() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bill: '',
    message: '',
    billImage: null as File | null,
  });
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    const section = sectionRef.current;
    const form = formRef.current;
    const info = infoRef.current;

    if (!section || !form || !info) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        form,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: form,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        info.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: info,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, billImage: file });
      setFileName(file.name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form data including the bill image will be sent to contact@apollosolarsolutions.in
    setIsSubmitted(true);
  };

  return (
    <section
      ref={sectionRef}
      id="quote"
      className="section-padding bg-white overflow-hidden"
    >
      <div className="container-narrow">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left - Form */}
          <div ref={formRef}>
            <span className="section-label text-xs sm:text-sm">GET A QUOTE</span>
            
            <h2 className="mt-3 sm:mt-4 mb-4 sm:mb-6 text-2xl sm:text-3xl lg:text-4xl">
              Get your{' '}
              <span className="text-solar-emerald">personalized quote</span>
            </h2>
            
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 mb-6 sm:mb-8">
              Tell us about your usage. We'll reply with a clear estimate 
              within 24 hours.
            </p>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5 sm:mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="input-apollo text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5 sm:mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Your phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="input-apollo text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5 sm:mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input-apollo text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5 sm:mb-2">
                    Monthly Electricity Bill *
                  </label>
                  <select
                    required
                    value={formData.bill}
                    onChange={(e) => setFormData({ ...formData, bill: e.target.value })}
                    className="input-apollo text-sm"
                  >
                    <option value="">Select your bill range</option>
                    <option value="below-1000">Below ₹1,000</option>
                    <option value="1000-3000">₹1,000 - ₹3,000</option>
                    <option value="3000-5000">₹3,000 - ₹5,000</option>
                    <option value="5000-10000">₹5,000 - ₹10,000</option>
                    <option value="above-10000">Above ₹10,000</option>
                  </select>
                </div>

                {/* Bill Upload */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5 sm:mb-2">
                    Upload Current Bill (Optional)
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleFileChange}
                      className="hidden"
                      id="bill-upload"
                    />
                    <label
                      htmlFor="bill-upload"
                      className="flex items-center gap-3 p-3 sm:p-4 border-2 border-dashed border-slate-200 rounded-xl cursor-pointer hover:border-solar-emerald hover:bg-solar-emerald/5 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-solar-emerald/10 flex items-center justify-center">
                        <Upload className="w-5 h-5 text-solar-emerald" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-600 truncate">
                          {fileName || 'Click to upload your electricity bill'}
                        </p>
                        <p className="text-xs text-slate-400">JPG, PNG or PDF (max 5MB)</p>
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1.5 sm:mb-2">
                    Message (Optional)
                  </label>
                  <textarea
                    placeholder="Tell us about your requirements..."
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="input-apollo resize-none text-sm"
                  />
                </div>

                <button type="submit" className="btn-primary w-full py-3.5 sm:py-4 text-sm sm:text-base">
                  Get My Quote
                  <Send className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                <p className="text-[10px] sm:text-xs text-slate-500 text-center">
                  We respect your privacy. No spam, ever.
                </p>
              </form>
            ) : (
              <div className="bg-solar-emerald/5 rounded-2xl sm:rounded-3xl p-6 sm:p-10 text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-solar-emerald flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Check className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-solar-navy mb-2 sm:mb-3">
                  Thank You!
                </h3>
                <p className="text-sm sm:text-base text-slate-600">
                  We've received your request. Our team will contact you within 24 hours.
                </p>
              </div>
            )}
          </div>

          {/* Right - Contact Info */}
          <div ref={infoRef} className="space-y-4 sm:space-y-6">
            {/* Contact Card */}
            <div className="bg-gradient-to-br from-solar-emerald to-solar-emerald-700 rounded-2xl sm:rounded-3xl p-5 sm:p-8 text-white">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Contact Us</h3>
              
              <div className="space-y-4 sm:space-y-5">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-white/20 flex items-center justify-center">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <div className="text-white/70 text-xs sm:text-sm">Call us</div>
                    <div className="font-semibold text-sm sm:text-base">7676166629, 7022804286</div>
                  </div>
                </div>

                <a href="mailto:contact@apollosolarsolutions.in" className="flex items-center gap-3 sm:gap-4 group">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <div className="text-white/70 text-xs sm:text-sm">Email us</div>
                    <div className="font-semibold text-sm sm:text-base">contact@apollosolarsolutions.in</div>
                  </div>
                </a>

                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-white/20 flex items-center justify-center">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <div className="text-white/70 text-xs sm:text-sm">Visit us</div>
                    <div className="font-semibold text-sm sm:text-base">
                      Behind Kothiwale Hospital,
                      <br />
                      Gondhali Galli, Belagavi
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Subsidy Info */}
            <div className="bg-solar-gold/10 rounded-2xl sm:rounded-3xl p-5 sm:p-8 border-2 border-solar-gold/20">
              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-solar-gold flex items-center justify-center">
                  <IndianRupee className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-solar-navy text-sm sm:text-base">PM Surya Ghar Subsidy</h4>
                  <p className="text-xs sm:text-sm text-slate-600">Government of India</p>
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
          </div>
        </div>
      </div>
    </section>
  );
}
