// =============================================================================
// Villa Template Configuration - Todo List App
// =============================================================================
// All site content is configured here. Components render nothing when their
// primary config fields are empty strings or empty arrays.
// =============================================================================

// -----------------------------------------------------------------------------
// Site Config
// -----------------------------------------------------------------------------
export interface SiteConfig {
  title: string;
  description: string;
  language: string;
  keywords: string;
  ogImage: string;
  canonical: string;
}

export const siteConfig: SiteConfig = {
  title: "GörevYap - Akıllı Görev Yönetimi",
  description: "Görevlerinizi organize edin, verimliliğinizi artırın. Modern ve kullanıcı dostu todo list uygulaması.",
  language: "tr",
  keywords: "todo list, görev yönetimi, verimlilik, organize, planlama",
  ogImage: `${import.meta.env.BASE_URL}images/og-image.jpg`,
  canonical: "https://gorevyap.com",
};

// -----------------------------------------------------------------------------
// Navigation Config
// -----------------------------------------------------------------------------
export interface NavDropdownItem {
  name: string;
  href: string;
}

export interface NavLink {
  name: string;
  href: string;
  icon: string;
  dropdown?: NavDropdownItem[];
}

export interface NavigationConfig {
  brandName: string;
  brandSubname: string;
  tagline: string;
  navLinks: NavLink[];
  ctaButtonText: string;
}

export const navigationConfig: NavigationConfig = {
  brandName: "GörevYap",
  brandSubname: "Productivity",
  tagline: "Akıllı Görev Yönetimi",
  navLinks: [
    { name: "Ana Sayfa", href: "#hero", icon: "Home" },
    { name: "Yorumlar", href: "#testimonials", icon: "Users" },
    { name: "İletişim", href: "#contact", icon: "Mail" },
  ],
  ctaButtonText: "Hemen Başla",
};

// -----------------------------------------------------------------------------
// Preloader Config
// -----------------------------------------------------------------------------
export interface PreloaderConfig {
  brandName: string;
  brandSubname: string;
  yearText: string;
}

export const preloaderConfig: PreloaderConfig = {
  brandName: "GörevYap",
  brandSubname: "Productivity",
  yearText: "Est. 2026",
};

// -----------------------------------------------------------------------------
// Hero Config
// -----------------------------------------------------------------------------
export interface HeroStat {
  value: number;
  suffix: string;
  label: string;
}

export interface HeroConfig {
  scriptText: string;
  mainTitle: string;
  ctaButtonText: string;
  ctaTarget: string;
  stats: HeroStat[];
  decorativeText: string;
  backgroundImage: string;
}

export const heroConfig: HeroConfig = {
  scriptText: "Verimliliğinizi Artırın",
  mainTitle: "Görevlerinizi\nKolayca Yönetin",
  ctaButtonText: "",
  ctaTarget: "#features",
  stats: [
    { value: 50000, suffix: "+", label: "Aktif Kullanıcı" },
    { value: 99, suffix: "%", label: "Memnuniyet" },
    { value: 24, suffix: "/7", label: "Destek" },
  ],
  decorativeText: "PRODUCTIVITY",
  backgroundImage: `${import.meta.env.BASE_URL}images/hero-banner.jpg`,
};

// -----------------------------------------------------------------------------
// Wine Showcase Config (Repurposed as Features)
// -----------------------------------------------------------------------------
export interface Wine {
  id: string;
  name: string;
  subtitle: string;
  year: string;
  image: string;
  filter: string;
  glowColor: string;
  description: string;
  tastingNotes: string;
  alcohol: string;
  temperature: string;
  aging: string;
  features?: WineFeature[];
  ctaText?: string;
  ctaLink?: string;
}

export interface WineFeature {
  icon: string;
  title: string;
  description: string;
}

export interface WineQuote {
  text: string;
  attribution: string;
  prefix: string;
}

export interface WineShowcaseConfig {
  scriptText: string;
  subtitle: string;
  mainTitle: string;
  wines: Wine[];
  features: WineFeature[];
  quote: WineQuote;
}

export const wineShowcaseConfig: WineShowcaseConfig = {
  scriptText: "Güçlü Özellikler",
  subtitle: "HER ŞEY KONTROLÜNÜZDE",
  mainTitle: "Kapsamlı Görev Yönetimi",
  wines: [
    {
      id: "basic",
      name: "Temel Plan",
      subtitle: "Bireysel Kullanım",
      year: "2026",
      image: `${import.meta.env.BASE_URL}images/temel-plan.png`,
      filter: "grayscale(1) brightness(1.5) contrast(1.1)",
      glowColor: "bg-emerald-500/20",
      description: "Günlük görevlerinizi kolayca organize edin. Basit ve etkili arayüz ile verimliliğinizi artırın.",
      tastingNotes: "Sınırsız görev ekleme, kategori oluşturma, temel hatırlatıcılar",
      alcohol: "Ücretsiz",
      temperature: "Anında",
      aging: "Süresiz",
      features: [
        { icon: "RefreshCw", title: "Anlık Senkronizasyon", description: "Tüm cihazlarınızda anında güncelleme" },
        { icon: "Clock", title: "Zaman Takibi", description: "Görevlerinize harcadığınız süreyi ölçün" },
        { icon: "CheckCircle", title: "Kolay Kullanım", description: "Sezgisel arayüz, sıfır öğrenme eğrisi" },
      ],
      ctaText: "Şimdi Başla",
      ctaLink: "/todo",
    },
    {
      id: "pro",
      name: "Pro Plan",
      subtitle: "Profesyoneller İçin",
      year: "2026",
      image: `${import.meta.env.BASE_URL}images/temel-plan.png`,
      filter: "",
      glowColor: "bg-blue-500/20",
      description: "İş hayatınızda maksimum verimlilik. Takvim entegrasyonu, raporlama ve gelişmiş analizler.",
      tastingNotes: "Takvim senkronizasyonu, detaylı raporlar, öncelik yönetimi",
      alcohol: "₺99/ay",
      temperature: "7/24",
      aging: "Yıllık",
      ctaText: "Satın Al",
      ctaLink: "#contact",
    },
    {
      id: "team",
      name: "Ekip Planı",
      subtitle: "Takım Çalışması",
      year: "2026",
      image: `${import.meta.env.BASE_URL}images/team-plan.png`,
      filter: "",
      glowColor: "bg-purple-500/20",
      description: "Takımınızla birlikte çalışın. Paylaşılan görevler, gerçek zamanlı güncellemeler ve işbirliği araçları.",
      tastingNotes: "Sınırsız üye, paylaşılan projeler, anlık bildirimler",
      alcohol: "₺299/ay",
      temperature: "Anlık",
      aging: "Ölçeklenebilir",
      features: [
        { icon: "Sparkles", title: "Akıllı Öneriler", description: "Yapay zeka destekli görev önceliklendirme" },
        { icon: "RefreshCw", title: "Anlık Senkronizasyon", description: "Tüm cihazlarınızda anında güncelleme" },
        { icon: "Clock", title: "Zaman Takibi", description: "Görevlerinize harcadığınız süreyi ölçün" },
        { icon: "CheckCircle", title: "Kolay Kullanım", description: "Sezgisel arayüz, sıfır öğrenme eğrisi" },
        { icon: "Github", title: "Git Entegrasyonu", description: "Git entegreli todo list sistemi ve webhook desteği" },
      ],
      ctaText: "İletişime Geç",
      ctaLink: "#contact",
    },
  ],
  features: [
    { icon: "Sparkles", title: "Akıllı Öneriler", description: "Yapay zeka destekli görev önceliklendirme" },
    { icon: "RefreshCw", title: "Anlık Senkronizasyon", description: "Tüm cihazlarınızda anında güncelleme" },
    { icon: "Clock", title: "Zaman Takibi", description: "Görevlerinize harcadığınız süreyi ölçün" },
    { icon: "CheckCircle", title: "Kolay Kullanım", description: "Sezgisel arayüz, sıfır öğrenme eğrisi" },
  ],
  quote: {
    text: "GörevYap ile işlerimi organize etmek çok kolaylaştı. Verimliliğim %40 arttı!",
    attribution: "Ahmet Yılmaz, Proje Yöneticisi",
    prefix: "Kullanıcı Yorumu",
  },
};

// -----------------------------------------------------------------------------
// Winery Carousel Config (Repurposed as How It Works)
// -----------------------------------------------------------------------------
export interface CarouselSlide {
  image: string;
  title: string;
  subtitle: string;
  area: string;
  unit: string;
  description: string;
}

export interface WineryCarouselConfig {
  scriptText: string;
  subtitle: string;
  mainTitle: string;
  locationTag: string;
  slides: CarouselSlide[];
}

export const wineryCarouselConfig: WineryCarouselConfig = {
  scriptText: "Kullanım Adımları",
  subtitle: "NASIL ÇALIŞIR",
  mainTitle: "3 Adımda Başlayın",
  locationTag: "Her Yerde, Her Zaman",
  slides: [
    {
      image: `${import.meta.env.BASE_URL}images/vineyard-1.jpg`,
      title: "Hesap Oluşturun",
      subtitle: "1. Adım",
      area: "30",
      unit: "saniye",
      description: "E-posta adresinizle hızlıca kaydolun veya sosyal medya hesaplarınızla giriş yapın. Kurulum sadece 30 saniye sürer.",
    },
    {
      image: `${import.meta.env.BASE_URL}images/vineyard-2.jpg`,
      title: "Görevlerinizi Ekleyin",
      subtitle: "2. Adım",
      area: "Sınırsız",
      unit: "görev",
      description: "Yapılacak işlerinizi listeleyin, kategorilere ayırın ve öncelikler belirleyin. Etiketlerle organize edin.",
    },
    {
      image: `${import.meta.env.BASE_URL}images/vineyard-3.jpg`,
      title: "Tamamlayın ve Kutlayın",
      subtitle: "3. Adım",
      area: "100",
      unit: "% verim",
      description: "Görevlerinizi tamamladıkça işaretleyin, ilerlemenizi görün ve başarılarınızı kutlayın. Motivasyonunuz artsın!",
    },
  ],
};

// -----------------------------------------------------------------------------
// Museum Config (Repurposed as Benefits)
// -----------------------------------------------------------------------------
export interface TimelineEvent {
  year: string;
  event: string;
}

export interface MuseumTabContent {
  title: string;
  description: string;
  highlight: string;
}

export interface MuseumTab {
  id: string;
  name: string;
  icon: string;
  image: string;
  content: MuseumTabContent;
}

export interface MuseumQuote {
  prefix: string;
  text: string;
  attribution: string;
}

export interface MuseumConfig {
  scriptText: string;
  subtitle: string;
  mainTitle: string;
  introText: string;
  timeline: TimelineEvent[];
  tabs: MuseumTab[];
  openingHours: string;
  openingHoursLabel: string;
  ctaButtonText: string;
  yearBadge: string;
  yearBadgeLabel: string;
  quote: MuseumQuote;
  founderPhotoAlt: string;
  founderPhoto: string;
}

export const museumConfig: MuseumConfig = {
  scriptText: "Neden Biz?",
  subtitle: "AVANTAJLARIMIZ",
  mainTitle: "Verimliliğinizi Artırın",
  introText: "GörevYap, modern insanın karmaşık hayatını basitleştirmek için tasarlandı. İster öğrenci, ister profesyonel, ister ev hanımı olun, görevlerinizi kontrol altına alın.",
  timeline: [
    { year: "2026", event: "Uygulama lansmanı" },
    { year: "50K+", event: "Aktif kullanıcı" },
    { year: "1M+", event: "Tamamlanan görev" },
    { year: "99%", event: "Memnuniyet oranı" },
  ],
  tabs: [
    {
      id: "productivity",
      name: "Verimlilik",
      icon: "History",
      image: `${import.meta.env.BASE_URL}images/museum-1.jpg`,
      content: {
        title: "Zamanınızı Verimli Kullanın",
        description: "Pomodoro tekniği entegrasyonu, odak modu ve dikkat dağıtıcı engelleme özellikleriyle maksimum verimlilik.",
        highlight: "Ortalama %40 verimlilik artışı",
      },
    },
    {
      id: "organization",
      name: "Organizasyon",
      icon: "BookOpen",
      image: `${import.meta.env.BASE_URL}images/museum-2.jpg`,
      content: {
        title: "Her Şey Düzenli",
        description: "Projeler, etiketler, öncelikler ve filtrelerle görevlerinizi istediğiniz şekilde organize edin.",
        highlight: "Sınırsız kategori ve etiket",
      },
    },
    {
      id: "collaboration",
      name: "İşbirliği",
      icon: "Award",
      image: `${import.meta.env.BASE_URL}images/museum-3.jpg`,
      content: {
        title: "Takım Çalışması",
        description: "Ekip üyelerinizle görev paylaşımı, yorumlar, dosya ekleri ve gerçek zamanlı bildirimler.",
        highlight: "Sınırsız ekip üyesi",
      },
    },
  ],
  openingHours: "7/24 Aktif",
  openingHoursLabel: "Destek",
  ctaButtonText: "Daha Fazla Bilgi",
  yearBadge: "2026",
  yearBadgeLabel: "Kuruluş",
  quote: {
    prefix: "Misyonumuz",
    text: "Herkesin hayatını daha organize ve verimli yaşamasına yardımcı olmak.",
    attribution: "GörevYap Ekibi",
  },
  founderPhotoAlt: "Kurucu Ekibimiz",
  founderPhoto: `${import.meta.env.BASE_URL}images/photo-retro.png`,
};

// -----------------------------------------------------------------------------
// News Config (Repurposed as Testimonials)
// -----------------------------------------------------------------------------
export interface NewsArticle {
  id: number;
  image: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
}

export interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating: number;
}

export interface StoryQuote {
  prefix: string;
  text: string;
  attribution: string;
}

export interface StoryTimelineItem {
  value: string;
  label: string;
}

export interface NewsConfig {
  scriptText: string;
  subtitle: string;
  mainTitle: string;
  viewAllText: string;
  readMoreText: string;
  articles: NewsArticle[];
  testimonialsScriptText: string;
  testimonialsSubtitle: string;
  testimonialsMainTitle: string;
  testimonials: Testimonial[];
  storyScriptText: string;
  storySubtitle: string;
  storyTitle: string;
  storyParagraphs: string[];
  storyTimeline: StoryTimelineItem[];
  storyQuote: StoryQuote;
  storyImage: string;
  storyImageCaption: string;
}

export const newsConfig: NewsConfig = {
  scriptText: "Blog",
  subtitle: "GÜNCEL İÇERİKLER",
  mainTitle: "Verimlilik İpuçları",
  viewAllText: "Tümünü Gör",
  readMoreText: "Devamını Oku",
  articles: [
    {
      id: 1,
      image: `${import.meta.env.BASE_URL}images/news-1.jpg`,
      title: "Pomodoro Tekniği Nedir?",
      excerpt: "Verimliliğinizi artıran zaman yönetimi tekniği hakkında bilmeniz gerekenler.",
      date: "15 Mart 2026",
      category: "Verimlilik",
    },
    {
      id: 2,
      image: `${import.meta.env.BASE_URL}images/news-2.jpg`,
      title: "Görev Önceliklendirme Sanatı",
      excerpt: "Önemli görevleri nasıl belirlersiniz ve zamanınızı en verimli şekilde kullanırsınız?",
      date: "10 Mart 2026",
      category: "Planlama",
    },
    {
      id: 3,
      image: `${import.meta.env.BASE_URL}images/news-3.jpg`,
      title: "Dijital Minimalizm",
      excerpt: "Daha az araçla daha fazla iş yapmanın yolları ve dijital düzenin önemi.",
      date: "5 Mart 2026",
      category: "Yaşam Tarzı",
    },
    {
      id: 4,
      image: `${import.meta.env.BASE_URL}images/news-4.jpg`,
      title: "Ekip Çalışması İpuçları",
      excerpt: "Uzaktan çalışma ortamında takım verimliliğini artırmanın stratejileri.",
      date: "1 Mart 2026",
      category: "İşbirliği",
    },
  ],
  testimonialsScriptText: "Kullanıcı Yorumları",
  testimonialsSubtitle: "MEMNUNİYET",
  testimonialsMainTitle: "Kullanıcılarımız Ne Diyor?",
  testimonials: [
    {
      name: "İrem Bektaş",
      role: "Öğrenci",
      text: "Sınav dönemlerinde GörevYap olmadan hayatımı düşünemiyorum. Ders programımı ve projelerimi çok kolay takip edebiliyorum.",
      rating: 5,
    },
    {
      name: "Adem Efekan Korkmaz",
      role: "Yazılım Geliştirici",
      text: "Jira'dan çok daha basit ve kullanıcı dostu. Küçük ekipler için mükemmel bir çözüm. Kesinlikle tavsiye ederim.",
      rating: 5,
    },
    {
      name: "2kai yazılım",
      role: "yazılım şirketi",
      text: "Takımımızın verimliliği %50 arttı. Artık kim ne yapıyor net görüyoruz. İletişim karmaşası tamamen ortadan kalktı.",
      rating: 5,
    },
  ],
  storyScriptText: "Hikayemiz",
  storySubtitle: "BİZ KİMİZ",
  storyTitle: "Organizasyon Tutkusu",
  storyParagraphs: [
    "GörevYap, kendi organizasyon sorunlarımızı çözmek için doğdu. Karmaşık uygulamaların aksine, basit ama güçlü bir araç istedik.",
    "2026'te küçük bir ekip olarak yola çıktık ve şimdi 50.000'den fazla kullanıcıya hizmet veriyoruz. Her gün gelişmeye devam ediyoruz.",
  ],
  storyTimeline: [
    { value: "50K+", label: "Kullanıcı" },
    { value: "1M+", label: "Görev" },
    { value: "99%", label: "Memnuniyet" },
  ],
  storyQuote: {
    prefix: "Vizyonumuz",
    text: "Dünyanın en kullanıcı dostu görev yönetim uygulaması olmak.",
    attribution: "GörevYap Ekibi",
  },
  storyImage: `${import.meta.env.BASE_URL}images/story.jpg`,
  storyImageCaption: "GörevYap Ekibi",
};

// -----------------------------------------------------------------------------
// Contact Form Config
// -----------------------------------------------------------------------------
export interface ContactInfoItem {
  icon: string;
  label: string;
  value: string;
  subtext: string;
}

export interface ContactFormFields {
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  visitDateLabel: string;
  visitorsLabel: string;
  visitorsOptions: string[];
  messageLabel: string;
  messagePlaceholder: string;
  submitText: string;
  submittingText: string;
  successMessage: string;
  errorMessage: string;
}

export interface ContactFormConfig {
  scriptText: string;
  subtitle: string;
  mainTitle: string;
  introText: string;
  contactInfoTitle: string;
  contactInfo: ContactInfoItem[];
  form: ContactFormFields;
  privacyNotice: string;
  formEndpoint: string;
}

export const contactFormConfig: ContactFormConfig = {
  scriptText: "Bize Ulaşın",
  subtitle: "İLETİŞİM",
  mainTitle: "Sorularınız mı Var?",
  introText: "Size yardımcı olmaktan mutluluk duyarız. Formu doldurun, en kısa sürede dönüş yapalım.",
  contactInfoTitle: "İletişim Bilgileri",
  contactInfo: [
    { icon: "MapPin", label: "Adres", value: "Elazığ, Türkiye", subtext: "Merkez Ofis" },
    { icon: "Phone", label: "Telefon", value: "+90 552 025 86 79", subtext: "7/24 Destek Hattı" },
    { icon: "Mail", label: "E-posta", value: "ademk8200@gmail.com", subtext: "Genel Sorular" },
    { icon: "Clock", label: "Çalışma Saatleri", value: "7/24", subtext: "Online Destek" },
  ],
  form: {
    nameLabel: "Adınız Soyadınız",
    namePlaceholder: "Adınızı girin",
    emailLabel: "E-posta Adresiniz",
    emailPlaceholder: "ornek@email.com",
    phoneLabel: "Telefon Numaranız",
    phonePlaceholder: "+90 5XX XXX XX XX",
    visitDateLabel: "Planlanan Başlangıç Tarihi",
    visitorsLabel: "Ekip Büyüklüğü",
    visitorsOptions: ["1 kişi", "2-5 kişi", "6-10 kişi", "10+ kişi"],
    messageLabel: "Mesajınız",
    messagePlaceholder: "Nasıl yardımcı olabiliriz?",
    submitText: "Gönder",
    submittingText: "Gönderiliyor...",
    successMessage: "Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.",
    errorMessage: "Bir hata oluştu. Lütfen tekrar deneyin.",
  },
  privacyNotice: "Formu göndererek gizlilik politikasını kabul etmiş olursunuz.",
  formEndpoint: "https://formspree.io/f/xojpeokk",
};

// -----------------------------------------------------------------------------
// Footer Config
// -----------------------------------------------------------------------------
export interface SocialLink {
  icon: string;
  label: string;
  href: string;
}

export interface FooterLink {
  name: string;
  href: string;
}

export interface FooterLinkGroup {
  title: string;
  links: FooterLink[];
}

export interface FooterContactItem {
  icon: string;
  text: string;
}

export interface FooterConfig {
  brandName: string;
  tagline: string;
  description: string;
  socialLinks: SocialLink[];
  linkGroups: FooterLinkGroup[];
  contactItems: FooterContactItem[];
  newsletterLabel: string;
  newsletterPlaceholder: string;
  newsletterButtonText: string;
  newsletterSuccessText: string;
  newsletterErrorText: string;
  newsletterEndpoint: string;
  copyrightText: string;
  legalLinks: string[];
  icpText: string;
  backToTopText: string;
  ageVerificationText: string;
}

export const footerConfig: FooterConfig = {
  brandName: "GörevYap",
  tagline: "Productivity",
  description: "Görevlerinizi organize edin, verimliliğinizi artırın. Modern ve kullanıcı dostu todo list uygulaması.",
  socialLinks: [
    { icon: "Instagram", label: "Instagram", href: "https://www.instagram.com/adeem._k?igsh=Y205NWdpczVnNWky" },
    { icon: "Facebook", label: "Facebook", href: "https://www.facebook.com/RTErdogan/?locale=tr_TR" },
    { icon: "Twitter", label: "Twitter", href: "https://www.youtube.com/shorts/RhOsRrFJCcg" },
    { icon: "Youtube", label: "Youtube", href: "https://youtu.be/dQw4w9WgXcQ?si=ds_mbKvpQXsL0R-J" },
  ],
  linkGroups: [
    {
      title: "Ürün",
      links: [
        { name: "Özellikler", href: "#features" },
        { name: "Fiyatlandırma", href: "#pricing" },
        { name: "Entegrasyonlar", href: "#" },
        { name: "Güncellemeler", href: "#" },
      ],
    },
    {
      title: "Şirket",
      links: [
        { name: "Hakkımızda", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Kariyer", href: "#" },
        { name: "Basın", href: "#" },
      ],
    },
  ],
  contactItems: [
    { icon: "MapPin", text: "Elazığ, Türkiye" },
    { icon: "Phone", text: "+90 552 025 86 79" },
    { icon: "Mail", text: "ademk8200@gmail.com" },
  ],
  newsletterLabel: "Bültenimize Abone Olun",
  newsletterPlaceholder: "E-posta adresiniz",
  newsletterButtonText: "Abone Ol",
  newsletterSuccessText: "Başarıyla abone oldunuz!",
  newsletterErrorText: "Bir hata oluştu. Lütfen tekrar deneyin.",
  newsletterEndpoint: "https://formspree.io/f/xojpeokk",
  copyrightText: "© 2026 GörevYap. Tüm hakları saklıdır.",
  legalLinks: ["Gizlilik Politikası", "Kullanım Koşulları", "Çerez Politikası"],
  icpText: "",
  backToTopText: "Yukarı Çık",
  ageVerificationText: "",
};

// -----------------------------------------------------------------------------
// Scroll To Top Config
// -----------------------------------------------------------------------------
export interface ScrollToTopConfig {
  ariaLabel: string;
}

export const scrollToTopConfig: ScrollToTopConfig = {
  ariaLabel: "Yukarı çık",
};

// -----------------------------------------------------------------------------
// Team Config
// -----------------------------------------------------------------------------
export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  description: string;
}

export interface TeamConfig {
  scriptText: string;
  subtitle: string;
  mainTitle: string;
  members: TeamMember[];
}

export const teamConfig: TeamConfig = {
  scriptText: "Ekibimiz",
  subtitle: "BİZ KİMİZ",
  mainTitle: "Ekip Üyelerimiz",
  members: [
    {
      id: 1,
      name: "İrem Bektaş",
      role: "Kurucu Ortak",
      image: `${import.meta.env.BASE_URL}images/team-1.jpg`,
      description: "Yenilikçi teknolojiler ve modern arayüzler geliştirerek GörevYap'ın temelini sağlamlaştırıyor.",
    },
    {
      id: 2,
      name: "Adem Efekan Korkmaz",
      role: "Kurucu Ortak",
      image: `${import.meta.env.BASE_URL}images/team-2.jpg`,
      description: "Kullanıcı deneyimine odaklanan yapısıyla ürünün herkes tarafından sezgisel olarak kullanılmasını sağlıyor.",
    }
  ]
};
