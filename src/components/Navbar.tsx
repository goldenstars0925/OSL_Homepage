import { motion } from "motion/react";
import { Menu, X, Globe } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { name: t('nav.home'), href: "#home" },
    { name: t('nav.about'), href: "#about" },
    { name: t('nav.services'), href: "#services" },
    { name: t('nav.capability'), href: "#capability" },
    { name: t('nav.quality'), href: "#quality" },
    { name: t('nav.network'), href: "#network" },
    { name: t('nav.contact'), href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-osl-beige/90 backdrop-blur-sm z-50 border-b border-osl-navy/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-osl-navy rounded-xl text-white shadow-lg shadow-osl-navy/20">
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <path d="M3 19h18" />
              <path d="M5 19V10a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v9" />
              <path d="M16 7V4a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v3" />
              <path d="M9 14v5" />
              <circle cx="17" cy="12" r="2" />
            </svg>
          </div>
          <div className="font-semibold text-2xl tracking-tighter text-osl-navy">
            OSL <span className="text-osl-accent font-light">|</span> <span className="text-xs font-medium uppercase tracking-widest opacity-60">On Stitch Line</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-bold uppercase tracking-widest text-osl-navy/70 hover:text-osl-accent transition-colors"
            >
              {link.name}
            </a>
          ))}
          
          {/* Language Switcher */}
          <div className="flex items-center gap-2 border-l border-osl-navy/10 pl-6 ml-2">
            <Globe size={14} className="text-osl-navy/40" />
            <button 
              onClick={() => setLanguage('ko')}
              className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${language === 'ko' ? 'text-osl-navy' : 'text-osl-navy/30 hover:text-osl-navy/60'}`}
            >
              Kor
            </button>
            <span className="text-[10px] text-osl-navy/20">/</span>
            <button 
              onClick={() => setLanguage('en')}
              className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${language === 'en' ? 'text-osl-navy' : 'text-osl-navy/30 hover:text-osl-navy/60'}`}
            >
              Eng
            </button>
          </div>

          <a
            href="#contact"
            className="bg-osl-navy text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-osl-accent transition-all shadow-lg shadow-osl-navy/10"
          >
            {t('nav.inquiry')}
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
            <button onClick={() => setLanguage('ko')} className={language === 'ko' ? 'text-osl-navy' : 'text-osl-navy/30'}>Kor</button>
            <span className="text-osl-navy/20">/</span>
            <button onClick={() => setLanguage('en')} className={language === 'en' ? 'text-osl-navy' : 'text-osl-navy/30'}>Eng</button>
          </div>
          <button className="text-osl-navy" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-b border-osl-charcoal/5 px-6 py-8 flex flex-col gap-6"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-lg font-medium text-osl-charcoal"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </motion.div>
      )}
    </nav>
  );
}
