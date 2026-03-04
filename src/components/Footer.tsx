import { useLanguage } from "../context/LanguageContext";

export default function Footer({ onAdminClick }: { onAdminClick: () => void }) {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-white border-t border-osl-charcoal/5 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
            <div className="flex items-center justify-center w-8 h-8 bg-osl-navy rounded-lg text-white">
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M3 19h18" />
                <path d="M5 19V10a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v9" />
                <path d="M16 7V4a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v3" />
                <path d="M9 14v5" />
                <circle cx="17" cy="12" r="2" />
              </svg>
            </div>
            <div className="font-bold text-xl tracking-tighter text-osl-navy">
              OSL <span className="text-osl-orange font-light">|</span> <span className="text-xs font-medium uppercase tracking-widest">On Stitch Line</span>
            </div>
          </div>
          <p className="text-xs text-muted">{t('footer.rights')}</p>
          <button 
            onClick={onAdminClick}
            className="text-[10px] text-osl-navy/20 hover:text-osl-navy transition-colors mt-2 uppercase tracking-widest font-bold"
          >
            Admin
          </button>
        </div>
        
        <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-osl-navy">
          <a href="#" className="hover:text-osl-orange transition-colors">{t('footer.privacy')}</a>
          <a href="#" className="hover:text-osl-orange transition-colors">{t('footer.terms')}</a>
          <a href="#" className="hover:text-osl-orange transition-colors">{t('footer.compliance')}</a>
        </div>

        <div className="text-center md:text-right">
          <p className="text-xs font-bold text-osl-navy uppercase tracking-widest mb-1">{t('footer.tagline1')}</p>
          <p className="text-[10px] text-muted italic">{t('footer.tagline2')}</p>
        </div>
      </div>
    </footer>
  );
}
