import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ko';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [customTranslations, setCustomTranslations] = useState<Record<Language, Record<string, string>>>(translations);

  React.useEffect(() => {
    const saved = localStorage.getItem('osl_translations');
    if (saved) {
      setCustomTranslations(JSON.parse(saved));
    }
  }, []);

  // Simple translation helper
  const t = (key: string) => {
    return customTranslations[language][key] || translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// We will populate this as we go
export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.services': 'Services',
    'nav.capability': 'Capability',
    'nav.quality': 'Quality',
    'nav.network': 'Network',
    'nav.contact': 'Contact',
    'nav.inquiry': 'Inquiry',
    
    // Hero
    'hero.badge': 'Reliable Production Partner',
    'hero.title': 'Building Reliable',
    'hero.title.italic': 'Garment Production',
    'hero.description': 'OSL provides end-to-end garment production solutions from development to final delivery. Your production infrastructure, seamlessly connected.',
    'hero.cta.inquiry': 'Request Inquiry',
    'hero.cta.capability': 'Explore Our Capability',
    
    // About
    'about.title': 'Who We Are',
    'about.description1': 'OSL is a garment production partner specializing in knit and woven manufacturing. We provide structured production infrastructure tailored to global brands, acting as a vital hub between buyers and factories.',
    'about.description2': 'Our expertise lies in managing the complexities of the garment supply chain, ensuring that quality and reliability are woven into every stitch.',
    'about.mission': 'Mission',
    'about.mission.text': 'To deliver reliable, scalable, and quality-driven garment production.',
    'about.vision': 'Vision',
    'about.vision.text': 'To be the global benchmark for structured garment production infrastructure.',
    
    // Capability
    'cap.title': 'Production Capability',
    'cap.subtitle': 'Full capability in Knit, Woven, Printing, and specialized Washing processes.',
    'cap.knit': 'Knit',
    'cap.woven': 'Woven',
    'cap.print': 'Print',
    'cap.washing': 'Washing',
    
    // Network
    'net.title': 'Production Network',
    'net.subtitle': 'A flexible manufacturing network designed for scalability and precision, with OSL at the core of every connection.',
    'net.hub': 'Central Hub',
    'net.factories': 'Sewing factories',
    'net.mills': 'Fabric Mills',
    'net.suppliers': 'Trim Suppliers',
    'net.logistics': 'Logistics Hub',
    'net.card1.title': 'Specialized Vendors',
    'net.card1.text': 'We curate a network of factories specialized in specific garment categories to ensure the highest quality for every product type.',
    'net.card2.title': 'Material Sourcing',
    'net.card2.text': 'Direct relationships with top-tier fabric mills and trim suppliers allow us to maintain strict control over raw material quality and lead times.',
    'net.card3.title': 'Global Logistics',
    'net.card3.text': 'Our integrated logistics hub ensures seamless coordination for international shipping, customs clearance, and final door-to-door delivery.',
    
    // Services
    'services.title': 'Our Services',
    'services.subtitle': 'Comprehensive garment production solutions tailored to your brand\'s specific needs.',
    'services.oem.title': 'OEM Production',
    'services.oem.item1': 'Development support',
    'services.oem.item2': 'Material sourcing',
    'services.oem.item3': 'Pattern & sample',
    'services.oem.item4': 'Bulk production',
    'services.mgmt.title': 'Production Management',
    'services.mgmt.item1': 'Vendor coordination',
    'services.mgmt.item2': 'Timeline control',
    'services.mgmt.item3': 'Risk management',
    'services.mgmt.item4': 'Cost optimization',
    'services.support.title': 'End-to-End Support',
    'services.support.item1': 'Inspection',
    'services.support.item2': 'Shipping coordination',
    'services.support.item3': 'Final delivery management',

    // Quality
    'quality.title': 'Quality Control',
    'quality.quote': '"Quality is not inspected at the end. It is built into every stage of production."',
    'quality.description': 'Our quality assurance system is designed to minimize defect rates and ensure consistency across all production batches.',
    'quality.step1.title': 'Pre-production & Inline Inspection',
    'quality.step1.text': 'Continuous monitoring during the production process to catch issues early.',
    'quality.step2.title': 'AQL Standard',
    'quality.step2.text': 'Strict adherence to international Acceptable Quality Level standards.',
    'quality.step3.title': 'Final Inspection',
    'quality.step3.text': '100% inspection capability ensuring every piece meets brand requirements.',

    // Contact
    'contact.title': 'Get in Touch',
    'contact.subtitle': 'Ready to start your next production? Our team is here to help you navigate the complexities of garment manufacturing.',
    'contact.email.label': 'Email',
    'contact.location.label': 'Location',
    'contact.location.value': 'Seoul, Republic of Korea',
    'contact.response': 'Business inquiry response within 24 hrs',
    'contact.form.name': 'Full Name',
    'contact.form.email': 'Email Address',
    'contact.form.company': 'Company',
    'contact.form.message': 'Message',
    'contact.form.send': 'Send Inquiry',
    // Footer
    'footer.rights': '© 2026 OSL On Stitch Line. All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.compliance': 'Compliance',
    'footer.tagline1': 'Precision in Every Line',
    'footer.tagline2': 'Crafting Quality, Creating Trends',
  },
  ko: {
    // Navbar
    'nav.home': '홈',
    'nav.about': '회사소개',
    'nav.services': '서비스',
    'nav.capability': '생산능력',
    'nav.quality': '품질관리',
    'nav.network': '네트워크',
    'nav.contact': '문의하기',
    'nav.inquiry': '문의하기',

    // Hero
    'hero.badge': '신뢰할 수 있는 생산 파트너',
    'hero.title': 'Building Reliable',
    'hero.title.italic': 'Garment Production',
    'hero.description': 'OSL은 개발부터 최종 배송까지 end-to-end 의류 생산 솔루션을 제공합니다. 귀사의 생산 인프라가 원활하게 연결됩니다.',
    'hero.cta.inquiry': '문의하기',
    'hero.cta.capability': '생산능력 확인하기',

    // About
    'about.title': 'Who We Are',
    'about.description1': 'OSL은 니트 및 우븐 제조를 전문으로 하는 의류 생산 파트너입니다. 글로벌 브랜드에 최적화된 체계적인 생산 인프라를 제공하며, 바이어와 공장을 연결하는 핵심 허브 역할을 수행합니다.',
    'about.description2': '당사의 전문성은 의류 공급망의 복잡한 과정을 효율적으로 관리하는 데 있으며, 모든 공정에 품질과 신뢰를 한 땀 한 땀 담아냅니다.',
    'about.mission': 'Mission',
    'about.mission.text': '신뢰할 수 있고 확장 가능하며 품질 중심의 의류 생산을 제공합니다.',
    'about.vision': 'Vision',
    'about.vision.text': '구조화된 의류 생산 인프라의 글로벌 벤치마크가 되는 것입니다.',

    // Capability
    'cap.title': 'Production Capability',
    'cap.subtitle': '니트, 우븐, 프린팅 및 특수 워싱 공정에 대한 완벽한 생산 능력을 갖추고 있습니다.',
    'cap.knit': '니트',
    'cap.woven': '우븐',
    'cap.print': '프린트',
    'cap.washing': '워싱',

    // Network
    'net.title': 'Production Network',
    'net.subtitle': '확장성과 정밀함을 위해 설계된 유연한 제조 네트워크로, OSL이 모든 연결의 중심에 있습니다.',
    'net.hub': 'Central Hub',
    'net.factories': 'Sewing factories',
    'net.mills': 'Fabric Mills',
    'net.suppliers': 'Trim Suppliers',
    'net.logistics': 'Logistics Hub',
    'net.card1.title': '전문 벤더',
    'net.card1.text': '각 의류 카테고리에 특화된 공장 네트워크를 큐레이션하여 모든 제품 유형에 대해 최고의 품질을 보장합니다.',
    'net.card2.title': '자재 소싱',
    'net.card2.text': '최고급 원단 밀 및 부자재 공급업체와의 직접적인 관계를 통해 원자재 품질과 리드 타임을 엄격하게 관리합니다.',
    'net.card3.title': '글로벌 물류',
    'net.card3.text': '통합 물류 허브를 통해 국제 배송, 통관 및 최종 도어 투 도어 배송을 위한 원활한 조율을 보장합니다.',

    // Services
    'services.title': 'Our Services',
    'services.subtitle': '귀하의 브랜드 특성에 맞춘 포괄적인 의류 생산 솔루션을 제공합니다.',
    'services.oem.title': 'OEM 생산',
    'services.oem.item1': '개발 지원',
    'services.oem.item2': '자재 소싱',
    'services.oem.item3': '패턴 및 샘플 제작',
    'services.oem.item4': '대량 생산',
    'services.mgmt.title': '생산 관리',
    'services.mgmt.item1': '벤더 조율',
    'services.mgmt.item2': '일정 관리',
    'services.mgmt.item3': '리스크 관리',
    'services.mgmt.item4': '비용 최적화',
    'services.support.title': 'end-to-end 지원',
    'services.support.item1': '검수',
    'services.support.item2': '배송 조율',
    'services.support.item3': '최종 배송 관리',

    // Quality
    'quality.title': 'Quality Control',
    'quality.quote': '"Quality is not inspected at the end. It is built into every stage of production."',
    'quality.description': '우리의 품질 보증 시스템은 불량률을 최소화하고 모든 생산 배치에서 일관성을 보장하도록 설계되었습니다.',
    'quality.step1.title': 'Pre-production & Inline Inspection',
    'quality.step1.text': '문제를 조기에 발견하기 위해 생산 공정 중에 지속적인 모니터링을 실시합니다.',
    'quality.step2.title': 'AQL Standard',
    'quality.step2.text': '국제적인 합격 품질 수준(AQL) 표준을 엄격히 준수합니다.',
    'quality.step3.title': 'Final Inspection',
    'quality.step3.text': '모든 제품이 브랜드 요구 사항을 충족하도록 100% 검사 능력을 갖추고 있습니다.',

    // Contact
    'contact.title': '문의하기',
    'contact.subtitle': '다음 생산 프로젝트를 시작할 준비가 되셨나요? 저희 팀은 의류 제조의 복잡한 과정을 안내해 드립니다.',
    'contact.email.label': '이메일',
    'contact.location.label': '위치',
    'contact.location.value': '대한민국 서울',
    'contact.response': '24시간 이내에 비즈니스 문의에 답변해 드립니다',
    'contact.form.name': '성함',
    'contact.form.email': '이메일 주소',
    'contact.form.company': '회사명',
    'contact.form.message': '메시지',
    'contact.form.send': '문의 보내기',
    // Footer
    'footer.rights': '© 2026 OSL On Stitch Line. 모든 권리 보유.',
    'footer.privacy': '개인정보 처리방침',
    'footer.terms': '이용약관',
    'footer.compliance': '컴플라이언스',
    'footer.tagline1': '모든 선에 정밀함을 담다',
    'footer.tagline2': '품질을 만들고, 트렌드를 창조합니다',
  }
};
