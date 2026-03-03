import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

export default function Capability() {
  const { t } = useLanguage();
  
  const capabilities = [
    {
      category: t('cap.knit'),
      items: ["Jersey", "Fleece", "Rib", "Activewear", "Loungewear"],
      image: "https://images.pexels.com/photos/6373302/pexels-photo-6373302.jpeg"
    },
    {
      category: t('cap.woven'),
      items: ["Shirts", "Pants", "Outerwear", "Workwear", "Technical garments"],
      image: "https://images.pexels.com/photos/6616675/pexels-photo-6616675.jpeg"
    },
    {
      category: t('cap.print'),
      items: ["Screen Print", "Digital Print", "Sublimation", "Embroidery"],
      image: "https://images.unsplash.com/photo-1663433541063-ddab084d1126?w=600&auto=format&fit=crop&q=60"
    },
    {
      category: t('cap.washing'),
      items: ["Garment Wash", "Enzyme Wash", "Stone Wash", "Bleach Wash", "Softener Wash"],
      image: "https://plus.unsplash.com/premium_photo-1755534537396-fa433624ca2f?w=600&auto=format&fit=crop&q=60"
    }
  ];

  return (
    <section id="capability" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <div className="max-w-2xl">
            <h2 className="heading-md mb-4">{t('cap.title')}</h2>
            <p className="text-muted">
              {t('cap.subtitle')}
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {capabilities.map((cap, idx) => (
            <motion.div
              key={cap.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6">
                <img
                  src={cap.image}
                  alt={cap.category}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="text-xl font-bold text-osl-navy mb-4 flex items-center gap-3">
                {cap.category}
                <div className="h-px flex-1 bg-osl-charcoal/10" />
              </h3>
              <div className="flex flex-wrap gap-2">
                {cap.items.map(item => (
                  <span key={item} className="px-3 py-1.5 bg-osl-beige rounded-full text-[11px] font-semibold text-osl-navy uppercase tracking-wider">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
