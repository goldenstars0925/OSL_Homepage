import { motion } from "motion/react";
import { Factory, Settings, Truck } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function Services() {
  const { t } = useLanguage();
  
  const services = [
    {
      title: t('services.oem.title'),
      icon: <Factory className="text-osl-orange" size={32} />,
      items: [
        t('services.oem.item1'),
        t('services.oem.item2'),
        t('services.oem.item3'),
        t('services.oem.item4')
      ],
    },
    {
      title: t('services.mgmt.title'),
      icon: <Settings className="text-osl-orange" size={32} />,
      items: [
        t('services.mgmt.item1'),
        t('services.mgmt.item2'),
        t('services.mgmt.item3'),
        t('services.mgmt.item4')
      ],
    },
    {
      title: t('services.support.title'),
      icon: <Truck className="text-osl-orange" size={32} />,
      items: [
        t('services.support.item1'),
        t('services.support.item2'),
        t('services.support.item3')
      ],
    },
  ];

  return (
    <section id="services" className="section-padding bg-osl-beige">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="heading-md mb-4">{t('services.title')}</h2>
          <p className="text-muted max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-10 rounded-2xl shadow-sm border border-osl-charcoal/5 hover:shadow-md transition-shadow"
            >
              <div className="mb-6">{service.icon}</div>
              <h3 className="text-xl font-bold text-osl-navy mb-6">{service.title}</h3>
              <ul className="space-y-3">
                {service.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-muted text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-osl-orange" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
