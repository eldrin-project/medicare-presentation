import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Calendar, Shield, Smartphone, Video, ShieldCheck, Lock, CheckCircle } from "lucide-react";
import AnimatedPhoneMockup from "../components/AnimatedPhoneMockup";

function PracticePage() {
  const { t } = useTranslation();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="min-h-[600px] sm:min-h-[700px] lg:min-h-screen flex items-center justify-center relative overflow-hidden pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-14 lg:pb-16 px-4 sm:px-6 lg:px-8">
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/hero-banner-image.jpg"
            alt="Healthcare professionals collaborating"
            className="absolute inset-0 w-full h-full object-cover object-center animate-slow-zoom"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/75 via-primary-light/65 to-accent/40 z-[1]"></div>
          {/* Grid Overlay */}
          <div
            className="absolute inset-0 z-[2] opacity-100"
            style={{
              backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }}
          ></div>
        </div>

        {/* Content */}
        <div
          className="max-w-[900px] text-center relative z-10 animate-fade-in-up"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-[20px] border border-white/30 px-6 py-2.5 rounded-full text-sm font-semibold text-white mb-8 shadow-[0_4px_16px_rgba(0,0,0,0.2)] animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse-slow"></span>
            {t('practice.hero.badge')}
          </div>

          {/* Title */}
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(3rem,7vw,5.5rem)] font-extrabold leading-[1.1] mb-6 text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.3)] animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            {t('practice.hero.title')}
            <span className="bg-gradient-to-br from-accent-light to-white bg-clip-text text-transparent"> {t('practice.hero.titleGradient')}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-[clamp(1.1rem,2vw,1.35rem)] leading-[1.7] text-white/95 drop-shadow-[0_2px_12px_rgba(0,0,0,0.3)] mb-12 max-w-[700px] mx-auto animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            {t('practice.hero.subtitle')}
          </p>

          {/* CTAs */}
          <div className="flex gap-5 justify-center flex-wrap mb-16 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <a
              href="https://demo-medicare.eldrin.io/login"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 font-[family-name:var(--font-body)] font-semibold text-base px-8 py-4 bg-white text-primary rounded-2xl transition-all duration-300 relative overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            >
              <span className="relative z-10">{t('practice.hero.ctaPrimary')}</span>
              <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">→</span>
              <span className="absolute top-1/2 left-1/2 w-0 h-0 rounded-full bg-white/20 -translate-x-1/2 -translate-y-1/2 transition-all duration-600 group-hover:w-[300px] group-hover:h-[300px]"></span>
            </a>
            <button className="group inline-flex items-center gap-2 font-[family-name:var(--font-body)] font-semibold text-base px-8 py-4 bg-white/15 text-white border-2 border-white rounded-2xl backdrop-blur-[10px] transition-all duration-300 relative overflow-hidden hover:bg-white/25 hover:-translate-y-0.5">
              <span className="relative z-10">{t('practice.hero.ctaSecondary')}</span>
              <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">▶</span>
              <span className="absolute top-1/2 left-1/2 w-0 h-0 rounded-full bg-white/20 -translate-x-1/2 -translate-y-1/2 transition-all duration-600 group-hover:w-[300px] group-hover:h-[300px]"></span>
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-16 justify-center flex-wrap animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="text-center">
              <div className="font-[family-name:var(--font-display)] text-[2.5rem] font-extrabold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.3)] leading-none mb-2">
                {t('practice.hero.stats.launchQuarter')}
              </div>
              <div className="text-[0.95rem] text-white/90 font-medium">
                {t('practice.hero.stats.launchLabel')}
              </div>
            </div>
            <div className="text-center">
              <div className="font-[family-name:var(--font-display)] text-[2.5rem] font-extrabold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.3)] leading-none mb-2">
                {t('practice.hero.stats.betaPractices')}
              </div>
              <div className="text-[0.95rem] text-white/90 font-medium">
                {t('practice.hero.stats.practicesLabel')}
              </div>
            </div>
            <div className="text-center">
              <div className="font-[family-name:var(--font-display)] text-[2.5rem] font-extrabold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.3)] leading-none mb-2">
                {t('practice.hero.stats.support')}
              </div>
              <div className="text-[0.95rem] text-white/90 font-medium">
                {t('practice.hero.stats.supportLabel')}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-20 lg:py-32 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto relative" id="features">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <span className="inline-block text-sm font-bold tracking-[2px] text-accent mb-3 sm:mb-4 uppercase">
            {t('practice.features.badge')}
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,5vw,3.5rem)] font-extrabold text-navy mb-3 sm:mb-4 leading-[1.2]">
            {t('practice.features.title')}
          </h2>
          <p className="text-lg sm:text-xl text-[#8B95A5] max-w-[600px] mx-auto">
            {t('practice.features.subtitle')}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
          {/* Feature Card 1 */}
          <div className="group bg-white/70 backdrop-blur-[20px] border border-[#0D6A6C]/10 rounded-3xl p-6 sm:p-8 lg:p-10 transition-all duration-400 relative overflow-hidden animate-fade-in-up hover:-translate-y-2 hover:shadow-[0_12px_48px_rgba(0,0,0,0.16)] hover:border-accent before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:bg-gradient-to-r before:from-accent before:to-primary-light before:scale-x-0 before:origin-left before:transition-transform before:duration-400 hover:before:scale-x-100" style={{ animationDelay: "0.1s" }}>
            <div className="mb-6 inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-accent/10 to-primary-light/15 rounded-[20px] text-primary transition-all duration-400 relative group-hover:-translate-y-1 group-hover:scale-105 group-hover:text-white group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-primary-light group-hover:shadow-[0_8px_24px_rgba(0,217,255,0.3)]">
              <Calendar size={48} strokeWidth={1.5} />
            </div>
            <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-navy mb-4">
              {t('practice.features.scheduling.title')}
            </h3>
            <p className="text-base leading-[1.7] text-[#8B95A5] mb-6">
              {t('practice.features.scheduling.description')}
            </p>
            <div className="flex gap-3 flex-wrap">
              <span className="text-xs font-semibold px-3.5 py-1.5 bg-gradient-to-br from-accent/10 to-primary/10 border border-accent/30 rounded-[20px] text-primary">
                Real-time sync
              </span>
              <span className="text-xs font-semibold px-3.5 py-1.5 bg-gradient-to-br from-accent/10 to-primary/10 border border-accent/30 rounded-[20px] text-primary">
                SMS/Email alerts
              </span>
            </div>
          </div>

          {/* Feature Card 2 */}
          <div className="group bg-white/70 backdrop-blur-[20px] border border-[#0D6A6C]/10 rounded-3xl p-6 sm:p-8 lg:p-10 transition-all duration-400 relative overflow-hidden animate-fade-in-up hover:-translate-y-2 hover:shadow-[0_12px_48px_rgba(0,0,0,0.16)] hover:border-accent before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:bg-gradient-to-r before:from-accent before:to-primary-light before:scale-x-0 before:origin-left before:transition-transform before:duration-400 hover:before:scale-x-100" style={{ animationDelay: "0.2s" }}>
            <div className="mb-6 inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-accent/10 to-primary-light/15 rounded-[20px] text-primary transition-all duration-400 relative group-hover:-translate-y-1 group-hover:scale-105 group-hover:text-white group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-primary-light group-hover:shadow-[0_8px_24px_rgba(0,217,255,0.3)]">
              <Shield size={48} strokeWidth={1.5} />
            </div>
            <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-navy mb-4">
              {t('practice.features.security.title')}
            </h3>
            <p className="text-base leading-[1.7] text-[#8B95A5] mb-6">
              {t('practice.features.security.description')}
            </p>
            <div className="flex gap-3 flex-wrap">
              <span className="text-xs font-semibold px-3.5 py-1.5 bg-gradient-to-br from-accent/10 to-primary/10 border border-accent/30 rounded-[20px] text-primary">
                AES-256
              </span>
              <span className="text-xs font-semibold px-3.5 py-1.5 bg-gradient-to-br from-accent/10 to-primary/10 border border-accent/30 rounded-[20px] text-primary">
                Zero-trust
              </span>
            </div>
          </div>

          {/* Feature Card 3 */}
          <div className="group bg-white/70 backdrop-blur-[20px] border border-[#0D6A6C]/10 rounded-3xl p-6 sm:p-8 lg:p-10 transition-all duration-400 relative overflow-hidden animate-fade-in-up hover:-translate-y-2 hover:shadow-[0_12px_48px_rgba(0,0,0,0.16)] hover:border-accent before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:bg-gradient-to-r before:from-accent before:to-primary-light before:scale-x-0 before:origin-left before:transition-transform before:duration-400 hover:before:scale-x-100" style={{ animationDelay: "0.3s" }}>
            <div className="mb-6 inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-accent/10 to-primary-light/15 rounded-[20px] text-primary transition-all duration-400 relative group-hover:-translate-y-1 group-hover:scale-105 group-hover:text-white group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-primary-light group-hover:shadow-[0_8px_24px_rgba(0,217,255,0.3)]">
              <Smartphone size={48} strokeWidth={1.5} />
            </div>
            <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-navy mb-4">
              {t('practice.features.multiPlatform.title')}
            </h3>
            <p className="text-base leading-[1.7] text-[#8B95A5] mb-6">
              {t('practice.features.multiPlatform.description')}
            </p>
            <div className="flex gap-3 flex-wrap">
              <span className="text-xs font-semibold px-3.5 py-1.5 bg-gradient-to-br from-accent/10 to-primary/10 border border-accent/30 rounded-[20px] text-primary">
                Offline mode
              </span>
              <span className="text-xs font-semibold px-3.5 py-1.5 bg-gradient-to-br from-accent/10 to-primary/10 border border-accent/30 rounded-[20px] text-primary">
                PWA ready
              </span>
            </div>
          </div>

          {/* Feature Card 4 */}
          <div className="group bg-white/70 backdrop-blur-[20px] border border-[#0D6A6C]/10 rounded-3xl p-6 sm:p-8 lg:p-10 transition-all duration-400 relative overflow-hidden animate-fade-in-up hover:-translate-y-2 hover:shadow-[0_12px_48px_rgba(0,0,0,0.16)] hover:border-accent before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[3px] before:bg-gradient-to-r before:from-accent before:to-primary-light before:scale-x-0 before:origin-left before:transition-transform before:duration-400 hover:before:scale-x-100" style={{ animationDelay: "0.4s" }}>
            <div className="mb-6 inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-accent/10 to-primary-light/15 rounded-[20px] text-primary transition-all duration-400 relative group-hover:-translate-y-1 group-hover:scale-105 group-hover:text-white group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-primary-light group-hover:shadow-[0_8px_24px_rgba(0,217,255,0.3)]">
              <Video size={48} strokeWidth={1.5} />
            </div>
            <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-navy mb-4">
              {t('practice.features.telemedicine.title')}
            </h3>
            <p className="text-base leading-[1.7] text-[#8B95A5] mb-6">
              {t('practice.features.telemedicine.description')}
            </p>
            <div className="flex gap-3 flex-wrap">
              <span className="text-xs font-semibold px-3.5 py-1.5 bg-gradient-to-br from-accent/10 to-primary/10 border border-accent/30 rounded-[20px] text-primary">
                WebRTC
              </span>
              <span className="text-xs font-semibold px-3.5 py-1.5 bg-gradient-to-br from-accent/10 to-primary/10 border border-accent/30 rounded-[20px] text-primary">
                HD quality
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Practice-Specific Solutions Section */}
      <section className="py-12 sm:py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-navy to-[#1F2937] text-white" id="solutions">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <span className="inline-block text-sm font-bold tracking-[2px] text-accent-light mb-3 sm:mb-4 uppercase">
            {t('practice.solutions.badge')}
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,5vw,3.5rem)] font-extrabold text-white mb-4 leading-[1.2]">
            {t('practice.solutions.title')}
          </h2>
        </div>

        {/* Solution Panel */}
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-16 items-center animate-fade-in">
          {/* Visual - Phone Mockup */}
          <div className="flex items-center justify-center">
            <AnimatedPhoneMockup
              screenshot="/mobile-screenshots/home-page-mobile-en.webp"
              toolbar="/mobile-screenshots/home-page-mobile-toolbar-en.webp"
              alt="MediCare practice app interface"
            />
          </div>

          {/* Details */}
          <div>
            <h3 className="font-[family-name:var(--font-display)] text-[2rem] font-bold mb-4 text-white">
              {t('practice.solutions.title')}
            </h3>
            <p className="text-[1.15rem] text-white/80 mb-8 leading-[1.7]">
              {t('practice.solutions.intro')}
            </p>
            <ul className="flex flex-col gap-4">
              {(t('practice.solutions.features', { returnObjects: true }) as string[]).map((feature, index) => (
                <li key={index} className="flex items-start gap-4 text-[1.05rem] text-white/90 leading-[1.6]">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-gradient-to-br from-accent to-primary-light rounded-full text-white font-bold flex-shrink-0 mt-0.5 text-sm">
                    ✓
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="py-12 sm:py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-[#FAFAF9]" id="compliance">
        <div className="max-w-[1000px] mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 bg-gradient-to-br from-accent/10 to-primary-light/10 border-2 border-accent rounded-[24px] sm:rounded-[32px] px-6 sm:px-10 py-4 sm:py-6 mb-6 sm:mb-8 lg:mb-12">
            <div className="flex items-center justify-center text-primary">
              <ShieldCheck size={40} strokeWidth={2} className="sm:w-12 sm:h-12" />
            </div>
            <div className="text-center sm:text-left">
              <span className="block font-[family-name:var(--font-display)] text-lg sm:text-xl font-bold text-navy leading-[1.2]">
                {t('practice.compliance.badge')}
              </span>
              <span className="block text-[0.85rem] sm:text-[0.95rem] text-[#8B95A5]">
                {t('practice.compliance.badgeSubtitle')}
              </span>
            </div>
          </div>

          {/* Heading */}
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,5vw,3.5rem)] font-extrabold text-navy mb-4 sm:mb-5 lg:mb-6 leading-[1.2]">
            {t('practice.compliance.title')}
          </h2>

          {/* Description */}
          <p className="text-lg sm:text-xl leading-[1.8] text-[#8B95A5] mb-8 sm:mb-12 lg:mb-16 max-w-[800px] mx-auto">
            {t('practice.compliance.description')}
          </p>

          {/* Compliance Grid */}
          <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6 sm:gap-8 mt-6 sm:mt-8 lg:mt-12">
            {/* GDPR */}
            <div className="bg-white border-2 border-[#0D6A6C]/10 rounded-3xl px-6 py-8 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-[0_4px_24px_rgba(0,0,0,0.12)]">
              <div className="text-[2.5rem] mb-4">🇪🇺</div>
              <div className="font-[family-name:var(--font-display)] text-[1.1rem] font-bold text-navy mb-2">
                {t('practice.compliance.items.gdpr.label')}
              </div>
              <div className="text-[0.9rem] text-[#8B95A5]">
                {t('practice.compliance.items.gdpr.detail')}
              </div>
            </div>

            {/* HIPAA */}
            <div className="bg-white border-2 border-[#0D6A6C]/10 rounded-3xl px-6 py-8 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-[0_4px_24px_rgba(0,0,0,0.12)]">
              <div className="text-[2.5rem] mb-4">🇺🇸</div>
              <div className="font-[family-name:var(--font-display)] text-[1.1rem] font-bold text-navy mb-2">
                {t('practice.compliance.items.hipaa.label')}
              </div>
              <div className="text-[0.9rem] text-[#8B95A5]">
                {t('practice.compliance.items.hipaa.detail')}
              </div>
            </div>

            {/* SOC 2 */}
            <div className="bg-white border-2 border-[#0D6A6C]/10 rounded-3xl px-6 py-8 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-[0_4px_24px_rgba(0,0,0,0.12)]">
              <div className="flex items-center justify-center text-primary mb-4">
                <Lock size={40} strokeWidth={2} />
              </div>
              <div className="font-[family-name:var(--font-display)] text-[1.1rem] font-bold text-navy mb-2">
                {t('practice.compliance.items.soc2.label')}
              </div>
              <div className="text-[0.9rem] text-[#8B95A5]">
                {t('practice.compliance.items.soc2.detail')}
              </div>
            </div>

            {/* ISO */}
            <div className="bg-white border-2 border-[#0D6A6C]/10 rounded-3xl px-6 py-8 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-[0_4px_24px_rgba(0,0,0,0.12)]">
              <div className="flex items-center justify-center text-primary mb-4">
                <CheckCircle size={40} strokeWidth={2} />
              </div>
              <div className="font-[family-name:var(--font-display)] text-[1.1rem] font-bold text-navy mb-2">
                {t('practice.compliance.items.iso.label')}
              </div>
              <div className="text-[0.9rem] text-[#8B95A5]">
                {t('practice.compliance.items.iso.detail')}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary to-primary-light relative overflow-hidden">
        {/* Floating Orb Effect */}
        <div className="absolute -top-1/2 -right-1/5 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,217,255,0.3)_0%,transparent_70%)] animate-[float_15s_ease-in-out_infinite]"></div>

        {/* Content */}
        <div className="max-w-[800px] mx-auto text-center relative z-10">
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,5vw,3.5rem)] font-extrabold text-white mb-4 leading-[1.2]">
            {t('practice.cta.title')}
          </h2>
          <p className="text-[1.3rem] text-white/90 mb-12 leading-[1.6]">
            {t('practice.cta.subtitle')}
          </p>

          {/* Buttons */}
          <div className="flex gap-6 justify-center flex-wrap mb-8">
            <a
              href="https://demo-medicare.eldrin.io/login"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 font-[family-name:var(--font-body)] font-semibold text-[1.1rem] px-10 py-5 bg-white text-primary rounded-2xl transition-all duration-300 relative overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 hover:scale-105 hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)]"
            >
              <span className="relative z-10">{t('practice.cta.ctaPrimary')}</span>
              <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">→</span>
              <span className="absolute top-1/2 left-1/2 w-0 h-0 rounded-full bg-white/20 -translate-x-1/2 -translate-y-1/2 transition-all duration-600 group-hover:w-[300px] group-hover:h-[300px]"></span>
            </a>
            <button className="group inline-flex items-center gap-2 font-[family-name:var(--font-body)] font-semibold text-[1.1rem] px-10 py-5 bg-white/10 text-white border-2 border-white rounded-2xl backdrop-blur-[10px] transition-all duration-300 relative overflow-hidden hover:bg-white/20 hover:-translate-y-0.5">
              <span className="relative z-10">{t('practice.cta.ctaSecondary')}</span>
              <span className="absolute top-1/2 left-1/2 w-0 h-0 rounded-full bg-white/20 -translate-x-1/2 -translate-y-1/2 transition-all duration-600 group-hover:w-[300px] group-hover:h-[300px]"></span>
            </button>
          </div>

          {/* Note */}
          <div className="text-[0.95rem] text-white/80">
            {t('practice.cta.note')}
          </div>
        </div>
      </section>
    </div>
  );
}

export default PracticePage;
