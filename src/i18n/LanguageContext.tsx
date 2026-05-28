import { createContext, PropsWithChildren, useContext, useMemo, useState } from "react";

export type LanguageCode = "fr" | "en" | "es" | "ar" | "zh" | "ja" | "vi" | "ko";

type TranslationKey =
  | "app.results"
  | "app.providerDetail"
  | "app.assistant"
  | "home.kicker"
  | "home.title"
  | "home.subtitle"
  | "home.amount"
  | "home.fromCountry"
  | "home.toCountry"
  | "home.sendCurrency"
  | "home.receiveCurrency"
  | "home.compare"
  | "results.simulation"
  | "results.assistant"
  | "results.estimatedRefreshing"
  | "results.localRate"
  | "results.disclaimer"
  | "results.datePrefix"
  | "results.updatedRate"
  | "offer.received"
  | "offer.fees"
  | "offer.viewOffer"
  | "currency.autoDetected"
  | "country.available"
  | "country.search"
  | "country.emptyTitle"
  | "country.emptyText"
  | "language.title";

type LanguageContextValue = {
  language: LanguageCode;
  setLanguage: (language: LanguageCode) => void;
  t: (key: TranslationKey, values?: Record<string, string | number>) => string;
};

export const languages: Array<{ code: LanguageCode; label: string; nativeLabel: string }> = [
  { code: "fr", label: "Français", nativeLabel: "Français" },
  { code: "en", label: "English", nativeLabel: "English" },
  { code: "es", label: "Espagnol", nativeLabel: "Español" },
  { code: "ar", label: "Arabe", nativeLabel: "العربية" },
  { code: "zh", label: "Chinois", nativeLabel: "中文" },
  { code: "ja", label: "Japonais", nativeLabel: "日本語" },
  { code: "vi", label: "Vietnamien", nativeLabel: "Tiếng Việt" },
  { code: "ko", label: "Coréen", nativeLabel: "한국어" }
];

const translations: Record<LanguageCode, Record<TranslationKey, string>> = {
  fr: {
    "app.results": "Résultats",
    "app.providerDetail": "Détail prestataire",
    "app.assistant": "Assistant IA",
    "home.kicker": "Comparateur fintech international",
    "home.title": "Envoyez plus, payez moins.",
    "home.subtitle": "Comparez les frais, les taux et les délais avant de choisir votre prestataire.",
    "home.amount": "Montant à envoyer",
    "home.fromCountry": "Pays de départ",
    "home.toCountry": "Pays de destination",
    "home.sendCurrency": "Devise envoyée",
    "home.receiveCurrency": "Devise reçue",
    "home.compare": "Comparer",
    "results.simulation": "Simulation",
    "results.assistant": "Assistant",
    "results.estimatedRefreshing": "Taux estimé, actualisation en cours",
    "results.localRate": "Taux indicatif local utilisé",
    "results.disclaimer": "Taux actualisé ou estimé selon disponibilité. Frais prestataires estimés.",
    "results.datePrefix": " le ",
    "results.updatedRate": "Taux mis à jour via {source}{date}",
    "offer.received": "Reçu",
    "offer.fees": "Frais",
    "offer.viewOffer": "Voir l'offre",
    "currency.autoDetected": "Devise détectée automatiquement",
    "country.available": "{count} pays disponibles",
    "country.search": "Rechercher un pays, une devise...",
    "country.emptyTitle": "Aucun pays trouvé",
    "country.emptyText": "Essayez avec le nom du pays, son code ou sa devise.",
    "language.title": "Langue"
  },
  en: {
    "app.results": "Results",
    "app.providerDetail": "Provider details",
    "app.assistant": "AI assistant",
    "home.kicker": "International fintech comparison",
    "home.title": "Send more, pay less.",
    "home.subtitle": "Compare fees, rates, and delivery times before choosing a provider.",
    "home.amount": "Amount to send",
    "home.fromCountry": "Sending country",
    "home.toCountry": "Destination country",
    "home.sendCurrency": "Send currency",
    "home.receiveCurrency": "Receive currency",
    "home.compare": "Compare",
    "results.simulation": "Simulation",
    "results.assistant": "Assistant",
    "results.estimatedRefreshing": "Estimated rate, updating",
    "results.localRate": "Local indicative rate used",
    "results.disclaimer": "Rate updated or estimated depending on availability. Provider fees are estimated.",
    "results.datePrefix": " on ",
    "results.updatedRate": "Rate updated via {source}{date}",
    "offer.received": "Received",
    "offer.fees": "Fees",
    "offer.viewOffer": "View offer",
    "currency.autoDetected": "Currency detected automatically",
    "country.available": "{count} countries available",
    "country.search": "Search country or currency...",
    "country.emptyTitle": "No country found",
    "country.emptyText": "Try a country name, code, or currency.",
    "language.title": "Language"
  },
  es: {
    "app.results": "Resultados",
    "app.providerDetail": "Detalle del proveedor",
    "app.assistant": "Asistente IA",
    "home.kicker": "Comparador fintech internacional",
    "home.title": "Envia mas, paga menos.",
    "home.subtitle": "Compara comisiones, tipos de cambio y plazos antes de elegir proveedor.",
    "home.amount": "Importe a enviar",
    "home.fromCountry": "Pais de origen",
    "home.toCountry": "Pais de destino",
    "home.sendCurrency": "Moneda enviada",
    "home.receiveCurrency": "Moneda recibida",
    "home.compare": "Comparar",
    "results.simulation": "Simulacion",
    "results.assistant": "Asistente",
    "results.estimatedRefreshing": "Tipo estimado, actualizando",
    "results.localRate": "Tipo indicativo local utilizado",
    "results.disclaimer": "Tipo actualizado o estimado segun disponibilidad. Comisiones de proveedores estimadas.",
    "results.datePrefix": " el ",
    "results.updatedRate": "Tipo actualizado via {source}{date}",
    "offer.received": "Recibido",
    "offer.fees": "Comisiones",
    "offer.viewOffer": "Ver oferta",
    "currency.autoDetected": "Moneda detectada automaticamente",
    "country.available": "{count} paises disponibles",
    "country.search": "Buscar pais o moneda...",
    "country.emptyTitle": "No se encontro ningun pais",
    "country.emptyText": "Prueba con el nombre, codigo o moneda.",
    "language.title": "Idioma"
  },
  ar: {
    "app.results": "النتائج",
    "app.providerDetail": "تفاصيل المزود",
    "app.assistant": "المساعد الذكي",
    "home.kicker": "مقارنة تحويلات دولية",
    "home.title": "ارسل اكثر وادفع اقل.",
    "home.subtitle": "قارن الرسوم واسعار الصرف ومدة التحويل قبل اختيار المزود.",
    "home.amount": "المبلغ المراد ارساله",
    "home.fromCountry": "بلد الارسال",
    "home.toCountry": "بلد الاستلام",
    "home.sendCurrency": "عملة الارسال",
    "home.receiveCurrency": "عملة الاستلام",
    "home.compare": "قارن",
    "results.simulation": "محاكاة",
    "results.assistant": "المساعد",
    "results.estimatedRefreshing": "سعر تقديري، جار التحديث",
    "results.localRate": "تم استخدام سعر محلي تقديري",
    "results.disclaimer": "السعر محدث او تقديري حسب التوفر. رسوم المزودين تقديرية.",
    "results.datePrefix": " بتاريخ ",
    "results.updatedRate": "تم تحديث السعر عبر {source}{date}",
    "offer.received": "المبلغ المستلم",
    "offer.fees": "الرسوم",
    "offer.viewOffer": "عرض العرض",
    "currency.autoDetected": "تم تحديد العملة تلقائيا",
    "country.available": "{count} دولة متاحة",
    "country.search": "ابحث عن بلد او عملة...",
    "country.emptyTitle": "لم يتم العثور على بلد",
    "country.emptyText": "جرب اسم البلد او الرمز او العملة.",
    "language.title": "اللغة"
  },
  zh: {
    "app.results": "结果",
    "app.providerDetail": "服务商详情",
    "app.assistant": "AI 助手",
    "home.kicker": "国际金融科技比较工具",
    "home.title": "多汇一点，少花一点。",
    "home.subtitle": "在选择服务商前，比较费用、汇率和到账时间。",
    "home.amount": "汇款金额",
    "home.fromCountry": "汇出国家",
    "home.toCountry": "收款国家",
    "home.sendCurrency": "汇出货币",
    "home.receiveCurrency": "收款货币",
    "home.compare": "比较",
    "results.simulation": "模拟",
    "results.assistant": "助手",
    "results.estimatedRefreshing": "估算汇率，正在更新",
    "results.localRate": "已使用本地参考汇率",
    "results.disclaimer": "汇率会根据可用情况更新或估算。服务商费用为估算值。",
    "results.datePrefix": " 于 ",
    "results.updatedRate": "汇率已通过 {source} 更新{date}",
    "offer.received": "到账",
    "offer.fees": "费用",
    "offer.viewOffer": "查看优惠",
    "currency.autoDetected": "货币已自动识别",
    "country.available": "{count} 个国家可用",
    "country.search": "搜索国家或货币...",
    "country.emptyTitle": "未找到国家",
    "country.emptyText": "请尝试输入国家名称、代码或货币。",
    "language.title": "语言"
  },
  ja: {
    "app.results": "結果",
    "app.providerDetail": "送金サービス詳細",
    "app.assistant": "AIアシスタント",
    "home.kicker": "国際送金比較ツール",
    "home.title": "より多く届けて、手数料は少なく。",
    "home.subtitle": "送金サービスを選ぶ前に、手数料、為替レート、到着時間を比較できます。",
    "home.amount": "送金額",
    "home.fromCountry": "送金元の国",
    "home.toCountry": "送金先の国",
    "home.sendCurrency": "送金通貨",
    "home.receiveCurrency": "受取通貨",
    "home.compare": "比較する",
    "results.simulation": "シミュレーション",
    "results.assistant": "アシスタント",
    "results.estimatedRefreshing": "推定レートを表示中、更新しています",
    "results.localRate": "ローカル参考レートを使用中",
    "results.disclaimer": "為替レートは利用状況により更新または推定されます。サービス手数料は推定です。",
    "results.datePrefix": " ",
    "results.updatedRate": "{source} でレート更新済み{date}",
    "offer.received": "受取額",
    "offer.fees": "手数料",
    "offer.viewOffer": "オファーを見る",
    "currency.autoDetected": "通貨は自動検出されました",
    "country.available": "{count} か国が利用可能",
    "country.search": "国または通貨を検索...",
    "country.emptyTitle": "国が見つかりません",
    "country.emptyText": "国名、コード、通貨で検索してください。",
    "language.title": "言語"
  },
  vi: {
    "app.results": "Kết quả",
    "app.providerDetail": "Chi tiết nhà cung cấp",
    "app.assistant": "Trợ lý AI",
    "home.kicker": "Công cụ so sánh chuyển tiền quốc tế",
    "home.title": "Gửi nhiều hơn, trả ít hơn.",
    "home.subtitle": "So sánh phí, tỷ giá và thời gian nhận tiền trước khi chọn nhà cung cấp.",
    "home.amount": "Số tiền gửi",
    "home.fromCountry": "Quốc gia gửi",
    "home.toCountry": "Quốc gia nhận",
    "home.sendCurrency": "Tiền gửi",
    "home.receiveCurrency": "Tiền nhận",
    "home.compare": "So sánh",
    "results.simulation": "Mô phỏng",
    "results.assistant": "Trợ lý",
    "results.estimatedRefreshing": "Tỷ giá ước tính, đang cập nhật",
    "results.localRate": "Đang dùng tỷ giá tham khảo nội bộ",
    "results.disclaimer": "Tỷ giá được cập nhật hoặc ước tính tùy theo dữ liệu khả dụng. Phí nhà cung cấp là ước tính.",
    "results.datePrefix": " ngày ",
    "results.updatedRate": "Tỷ giá được cập nhật qua {source}{date}",
    "offer.received": "Nhận được",
    "offer.fees": "Phí",
    "offer.viewOffer": "Xem ưu đãi",
    "currency.autoDetected": "Tiền tệ được tự động nhận diện",
    "country.available": "Có {count} quốc gia",
    "country.search": "Tìm quốc gia hoặc tiền tệ...",
    "country.emptyTitle": "Không tìm thấy quốc gia",
    "country.emptyText": "Hãy thử tên quốc gia, mã hoặc tiền tệ.",
    "language.title": "Ngôn ngữ"
  },
  ko: {
    "app.results": "결과",
    "app.providerDetail": "제공업체 상세",
    "app.assistant": "AI 도우미",
    "home.kicker": "국제 송금 비교 도구",
    "home.title": "더 많이 보내고, 더 적게 내세요.",
    "home.subtitle": "제공업체를 선택하기 전에 수수료, 환율, 도착 시간을 비교하세요.",
    "home.amount": "보낼 금액",
    "home.fromCountry": "보내는 국가",
    "home.toCountry": "받는 국가",
    "home.sendCurrency": "보내는 통화",
    "home.receiveCurrency": "받는 통화",
    "home.compare": "비교하기",
    "results.simulation": "시뮬레이션",
    "results.assistant": "도우미",
    "results.estimatedRefreshing": "예상 환율, 업데이트 중",
    "results.localRate": "로컬 참고 환율 사용",
    "results.disclaimer": "환율은 사용 가능한 데이터에 따라 업데이트되거나 추정됩니다. 제공업체 수수료는 추정치입니다.",
    "results.datePrefix": " ",
    "results.updatedRate": "{source}를 통해 환율 업데이트됨{date}",
    "offer.received": "수취액",
    "offer.fees": "수수료",
    "offer.viewOffer": "제안 보기",
    "currency.autoDetected": "통화가 자동으로 감지되었습니다",
    "country.available": "{count}개 국가 이용 가능",
    "country.search": "국가 또는 통화 검색...",
    "country.emptyTitle": "국가를 찾을 수 없습니다",
    "country.emptyText": "국가명, 코드 또는 통화로 검색해 보세요.",
    "language.title": "언어"
  }
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function interpolate(template: string, values?: Record<string, string | number>) {
  if (!values) {
    return template;
  }

  return Object.entries(values).reduce(
    (result, [key, value]) => result.replace(`{${key}}`, String(value)),
    template
  );
}

export function LanguageProvider({ children }: PropsWithChildren) {
  const [language, setLanguage] = useState<LanguageCode>("fr");

  const value = useMemo<LanguageContextValue>(() => ({
    language,
    setLanguage,
    t: (key, values) => interpolate(translations[language][key] ?? translations.fr[key], values)
  }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }

  return context;
}
