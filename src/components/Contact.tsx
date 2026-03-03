import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, MapPin, Send, CheckCircle2 } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function Contact() {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch("https://formspree.io/f/xnjbkbbz", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setIsSubmitted(true);
        // Reset after some time
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        alert("Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section id="contact" className="section-padding bg-osl-beige">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-md mb-6">{t('contact.title')}</h2>
            <p className="text-muted mb-10 leading-relaxed">
              {t('contact.subtitle')}
            </p>

            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-osl-accent shadow-sm">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-osl-navy">{t('contact.email.label')}</h4>
                  <p className="text-muted">onstitchline@gmail.com</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-osl-accent shadow-sm">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-osl-navy">{t('contact.location.label')}</h4>
                  <p className="text-muted">{t('contact.location.value')}</p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-osl-navy text-osl-beige rounded-3xl inline-block shadow-xl shadow-osl-navy/10">
              <p className="text-xs font-bold uppercase tracking-widest">{t('contact.response')}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-10 rounded-[3rem] shadow-2xl shadow-osl-navy/5 border border-osl-navy/5 relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6" 
                  onSubmit={handleSubmit}
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-osl-navy/40 ml-2">{t('contact.form.name')}</label>
                      <input 
                        required
                        name="name"
                        type="text" 
                        className="w-full px-6 py-4 rounded-2xl bg-osl-beige/30 border border-osl-navy/5 focus:border-osl-accent outline-none transition-colors" 
                        placeholder="John Doe" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-osl-navy/40 ml-2">{t('contact.form.email')}</label>
                      <input 
                        required
                        name="email"
                        type="email" 
                        className="w-full px-6 py-4 rounded-2xl bg-osl-beige/30 border border-osl-navy/5 focus:border-osl-accent outline-none transition-colors" 
                        placeholder="john@company.com" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-osl-navy/40 ml-2">{t('contact.form.company')}</label>
                    <input 
                      name="company"
                      type="text" 
                      className="w-full px-6 py-4 rounded-2xl bg-osl-beige/30 border border-osl-navy/5 focus:border-osl-accent outline-none transition-colors" 
                      placeholder="Your Brand Name" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-osl-navy/40 ml-2">{t('contact.form.message')}</label>
                    <textarea 
                      required
                      name="message"
                      rows={4} 
                      className="w-full px-6 py-4 rounded-2xl bg-osl-beige/30 border border-osl-navy/5 focus:border-osl-accent outline-none transition-colors resize-none" 
                      placeholder="Tell us about your project..."
                    ></textarea>
                  </div>
                  <button 
                    disabled={isSubmitting}
                    className={`w-full py-5 bg-osl-navy text-white rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-osl-accent transition-all shadow-xl shadow-osl-navy/10 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <>
                        {t('contact.form.send')}
                        <Send size={16} />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-12"
                >
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-osl-navy mb-4">Thank You!</h3>
                  <p className="text-muted max-w-xs mx-auto">
                    Your inquiry has been sent successfully. We will get back to you shortly.
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="mt-8 text-xs font-bold uppercase tracking-widest text-osl-accent hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
