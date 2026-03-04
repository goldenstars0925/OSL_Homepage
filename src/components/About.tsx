import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

export default function About() {
  const { t } = useLanguage();
  const [imageUrl, setImageUrl] = useState("https://images.pexels.com/photos/4614195/pexels-photo-4614195.jpeg");

  useEffect(() => {
    const saved = localStorage.getItem("osl_general_assets");
    if (saved) {
      const assets = JSON.parse(saved);
      if (assets.aboutImage) setImageUrl(assets.aboutImage);
    }
  }, []);
  
  return (
    <section id="about" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-row-2 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-md mb-8">{t('about.title')}</h2>
            <p className="text-lg text-muted leading-relaxed mb-6">
              {t('about.description1')}
            </p>
            <p className="text-lg text-muted leading-relaxed mb-10">
              {t('about.description2')}
            </p>
 
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-osl-navy mb-2">{t('about.mission')}</h4>
                <p className="text-sm text-muted">{t('about.mission.text')}</p>
              </div>
              <div>
                <h4 className="font-bold text-osl-navy mb-2">{t('about.vision')}</h4>
                <p className="text-sm text-muted">{t('about.vision.text')}</p>
              </div>
            </div>
          </motion.div>
 
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={imageUrl}
                alt="OSL Tailoring Details"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
