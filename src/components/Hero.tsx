import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();
  const [videoUrl, setVideoUrl] = useState("https://videos.pexels.com/video-files/6460113/6460113-hd_1920_1080_25fps.mp4");

  useEffect(() => {
    const saved = localStorage.getItem("osl_general_assets");
    if (saved) {
      const assets = JSON.parse(saved);
      if (assets.heroVideo) setVideoUrl(assets.heroVideo);
    }
  }, []);
  
  return (
    <section id="home" className="relative h-screen flex items-center overflow-hidden bg-osl-beige">
      {/* Single Background Video for a cleaner, more impactful look */}
      <div className="absolute inset-0 z-0">
        <video
          key={videoUrl} // Force re-render when URL changes
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-80"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
        {/* Subtle darkening for better text contrast */}
        <div className="absolute inset-0 bg-black/40" />
      </div>
      
      {/* Sharper Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/20 border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-osl-orange animate-pulse" />
            {t('hero.badge')}
          </div>
          <h1 className="text-5xl md:text-7xl font-semibold text-white leading-[1.1] mb-8">
            {t('hero.title')} <br />
            <span className="italic">{t('hero.title.italic')}</span>
          </h1>
          <p className="text-xl text-white/90 mb-12 leading-relaxed max-w-2xl font-light">
            {t('hero.description')}
          </p>
          <div className="flex flex-wrap gap-5">
            <a
              href="#contact"
              className="bg-osl-navy text-white px-10 py-4 rounded-full font-semibold flex items-center gap-2 hover:bg-osl-accent transition-all group shadow-xl shadow-osl-navy/10"
            >
              {t('hero.cta.inquiry')}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#capability"
              className="bg-white/20 border border-white/30 text-white px-10 py-4 rounded-full font-semibold hover:bg-white hover:text-osl-navy transition-all backdrop-blur-md"
            >
              {t('hero.cta.capability')}
            </a>
          </div>
        </motion.div>
      </div>

      {/* Decorative Stitch Line */}
      <div className="absolute bottom-12 left-0 w-full h-px border-t border-dashed border-osl-navy/20 z-20" />
    </section>
  );
}
