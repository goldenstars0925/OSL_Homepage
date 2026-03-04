import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";

interface NetworkNode {
  title: string;
  image: string;
  pos: string;
}

export default function Network() {
  const { t } = useLanguage();
  const [nodes, setNodes] = useState<NetworkNode[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("osl_network_nodes");
    if (saved) {
      setNodes(JSON.parse(saved));
    } else {
      setNodes([
        { 
          title: t('net.factories'), 
          image: "https://images.unsplash.com/photo-1741176505800-caaa3a52631a?w=600&auto=format&fit=crop&q=60",
          pos: "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
        },
        { 
          title: t('net.mills'), 
          image: "https://images.unsplash.com/photo-1660980041852-230420b8f99f?w=600&auto=format&fit=crop&q=60",
          pos: "right-0 top-1/2 translate-x-1/2 -translate-y-1/2"
        },
        { 
          title: t('net.suppliers'), 
          image: "https://images.pexels.com/photos/4614233/pexels-photo-4614233.jpeg",
          pos: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2"
        },
        { 
          title: t('net.logistics'), 
          image: "https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg",
          pos: "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2"
        },
      ]);
    }
  }, [t]);

  return (
    <section id="network" className="section-padding bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="heading-md mb-4">{t('net.title')}</h2>
          <p className="text-muted max-w-4xl mx-auto">
            {t('net.subtitle')}
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto aspect-square md:aspect-[16/9] flex items-center justify-center">
          {/* Connection Lines SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 450">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6b705c" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#6b705c" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#6b705c" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            
            {/* Animated Lines from Center to Nodes */}
            <motion.line 
              x1="400" y1="225" x2="400" y2="50" 
              stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="8 8"
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            <motion.line 
              x1="400" y1="225" x2="700" y2="225" 
              stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="8 8"
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
            />
            <motion.line 
              x1="400" y1="225" x2="400" y2="400" 
              stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="8 8"
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut", delay: 0.4 }}
            />
            <motion.line 
              x1="400" y1="225" x2="100" y2="225" 
              stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="8 8"
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut", delay: 0.6 }}
            />
          </svg>

          {/* Central Hub */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="relative w-48 h-48 rounded-full bg-osl-navy flex items-center justify-center text-white z-20 shadow-[0_0_50px_rgba(107,112,92,0.3)] border-8 border-white"
          >
            <div className="text-center">
              <div className="font-bold text-4xl tracking-tighter">OSL</div>
              <div className="text-[10px] uppercase tracking-[0.2em] opacity-70 font-medium">{t('net.hub')}</div>
            </div>
            
            {/* Pulse Effect */}
            <div className="absolute inset-0 rounded-full bg-osl-navy animate-ping opacity-20 -z-10" />
          </motion.div>

          {/* Network Nodes */}
          {nodes.map((node, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + idx * 0.2, type: "spring" }}
              className={`absolute ${node.pos} z-30 group`}
            >
              <div className="relative">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden border-4 border-white shadow-xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                  <img 
                    src={node.image} 
                    alt={node.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-osl-navy/20 group-hover:bg-transparent transition-colors" />
                </div>
                
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <span className="text-[10px] md:text-xs font-bold text-osl-navy uppercase tracking-widest bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm border border-osl-navy/10">
                    {node.title}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-32 grid md:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 bg-osl-beige/50 rounded-2xl border border-osl-navy/5 hover:bg-osl-beige transition-colors"
          >
            <h4 className="font-bold text-osl-navy mb-3 uppercase tracking-wider text-sm">{t('net.card1.title')}</h4>
            <p className="text-sm text-muted leading-relaxed">{t('net.card1.text')}</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-8 bg-osl-beige/50 rounded-2xl border border-osl-navy/5 hover:bg-osl-beige transition-colors"
          >
            <h4 className="font-bold text-osl-navy mb-3 uppercase tracking-wider text-sm">{t('net.card2.title')}</h4>
            <p className="text-sm text-muted leading-relaxed">{t('net.card2.text')}</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-8 bg-osl-beige/50 rounded-2xl border border-osl-navy/5 hover:bg-osl-beige transition-colors"
          >
            <h4 className="font-bold text-osl-navy mb-3 uppercase tracking-wider text-sm">{t('net.card3.title')}</h4>
            <p className="text-sm text-muted leading-relaxed">{t('net.card3.text')}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

