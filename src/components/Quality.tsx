import { motion } from "motion/react";
import { ShieldCheck, Search, CheckCircle2 } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function Quality() {
  const { t } = useLanguage();
  
  const steps = [
    {
      title: t('quality.step1.title'),
      desc: t('quality.step1.text'),
      icon: <Search size={24} />
    },
    {
      title: t('quality.step2.title'),
      desc: t('quality.step2.text'),
      icon: <ShieldCheck size={24} />
    },
    {
      title: t('quality.step3.title'),
      desc: t('quality.step3.text'),
      icon: <CheckCircle2 size={24} />
    }
  ];

  return (
    <section id="quality" className="section-padding bg-osl-navy text-osl-beige">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-semibold mb-8">{t('quality.title')}</h2>
            <blockquote className="text-2xl font-light italic text-osl-orange/80 mb-10 leading-relaxed">
              {t('quality.quote')}
            </blockquote>
            <p className="text-osl-beige/60 mb-12">
              {t('quality.description')}
            </p>
            
            <div className="space-y-8">
              {steps.map((step, idx) => (
                <div key={idx} className="flex gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-osl-orange shrink-0">
                    {step.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">{step.title}</h4>
                    <p className="text-sm text-osl-beige/50">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            <div className="space-y-6">
              <img src="https://images.unsplash.com/photo-1673201230274-c4dbd20c3f79?w=600&auto=format&fit=crop&q=60" className="rounded-3xl w-full object-cover h-64 shadow-2xl" referrerPolicy="no-referrer" />
              <img src="https://plus.unsplash.com/premium_photo-1765841918701-79a877196f29?w=600&auto=format&fit=crop&q=60" className="rounded-3xl w-full object-cover h-40 shadow-2xl" referrerPolicy="no-referrer" />
            </div>
            <div className="space-y-6 pt-12">
              <img src="https://plus.unsplash.com/premium_photo-1677695578759-5ae6ed633d75?w=600&auto=format&fit=crop&q=60" className="rounded-3xl w-full object-cover h-40 shadow-2xl" referrerPolicy="no-referrer" />
              <img src="https://plus.unsplash.com/premium_photo-1664303810352-447468aa3266?w=600&auto=format&fit=crop&q=60" className="rounded-3xl w-full object-cover h-64 shadow-2xl" referrerPolicy="no-referrer" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
