import { ReactNode, useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { User, Building2, Hospital, Globe, ChevronDown, RotateCcw, Menu, X } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();
  const { lang, persona } = useParams<{ lang: string; persona: string }>();
  const { t, i18n } = useTranslation();
  const [showPersonaMenu, setShowPersonaMenu] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    // Set language from URL
    if (lang && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  useEffect(() => {
    // Close dropdowns and mobile menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      // Close persona/language dropdowns if clicking outside
      if (!target.closest(".nav-dropdown")) {
        setShowPersonaMenu(false);
        setShowLanguageMenu(false);
      }

      // Close mobile menu if clicking outside (but not the button itself)
      if (!target.closest(".mobile-nav-container")) {
        setShowMobileMenu(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setShowMobileMenu(false);
  }, [lang, persona]);

  const handlePersonaChange = (newPersona: string) => {
    localStorage.setItem("persona", newPersona);
    navigate(`/${lang}/${newPersona}`);
    setShowPersonaMenu(false);
  };

  const handleLanguageChange = (newLang: string) => {
    localStorage.setItem("language", newLang);
    navigate(`/${newLang}/${persona}`);
    i18n.changeLanguage(newLang);
    setShowLanguageMenu(false);
  };

  const handleResetPreferences = () => {
    localStorage.removeItem("persona");
    localStorage.removeItem("language");
    navigate("/");
  };

  const getPersonaLabel = () => {
    switch (persona) {
      case "patient":
        return t("personas.patient");
      case "practice":
        return t("personas.practice");
      case "clinic":
        return t("personas.clinic");
      default:
        return t("personas.patient");
    }
  };

  const getPersonaIcon = () => {
    switch (persona) {
      case "patient":
        return <User size={16} />;
      case "practice":
        return <Building2 size={16} />;
      case "clinic":
        return <Hospital size={16} />;
      default:
        return <User size={16} />;
    }
  };

  const getLanguageLabel = () => {
    switch (lang) {
      case "en":
        return "EN";
      case "ro":
        return "RO";
      case "ar":
        return "AR";
      default:
        return "EN";
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[1000] bg-[#FAFAF9]/80 backdrop-blur-[20px] border-b border-[#0D6A6C]/10 transition-all duration-300">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-5">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div
              className="flex items-center gap-2 sm:gap-3 font-[family-name:var(--font-display)] font-extrabold text-xl sm:text-2xl text-primary cursor-pointer"
              onClick={() => navigate(`/${lang}/${persona}`)}
            >
              <span className="text-[1.5rem] sm:text-[2rem]">⚕</span>
              <span>MediCare</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex gap-6 xl:gap-10 items-center">
              {/* Persona Selector */}
              <div className="nav-dropdown relative">
                <button
                  className="flex items-center gap-2 font-[family-name:var(--font-body)] font-semibold text-[0.95rem] text-navy bg-transparent border-none cursor-pointer px-4 py-2 rounded-lg transition-all duration-300 hover:bg-[#0D6A6C]/5 hover:text-accent"
                  onClick={() => {
                    setShowPersonaMenu(!showPersonaMenu);
                    setShowLanguageMenu(false);
                  }}
                >
                  {getPersonaIcon()}
                  <span>{getPersonaLabel()}</span>
                  <ChevronDown size={16} />
                </button>
                {showPersonaMenu && (
                  <div className="absolute top-[calc(100%+0.5rem)] left-0 bg-white border border-[#0D6A6C]/10 rounded-2xl shadow-[0_12px_48px_rgba(0,0,0,0.16)] min-w-[200px] z-[1000] overflow-hidden animate-fade-in-down">
                    <button
                      className={`flex items-center gap-3 w-full font-[family-name:var(--font-body)] font-medium text-[0.95rem] border-none px-5 py-3.5 cursor-pointer transition-all duration-200 text-left hover:bg-gradient-to-br from-accent/5 to-primary/5 ${
                        persona === "patient"
                          ? "bg-gradient-to-br from-accent/10 to-primary/10 text-accent font-semibold"
                          : "bg-transparent text-navy hover:text-accent"
                      }`}
                      onClick={() => handlePersonaChange("patient")}
                    >
                      <User size={16} />
                      {t("personas.patient")}
                    </button>
                    <button
                      className={`flex items-center gap-3 w-full font-[family-name:var(--font-body)] font-medium text-[0.95rem] border-none px-5 py-3.5 cursor-pointer transition-all duration-200 text-left hover:bg-gradient-to-br from-accent/5 to-primary/5 ${
                        persona === "practice"
                          ? "bg-gradient-to-br from-accent/10 to-primary/10 text-accent font-semibold"
                          : "bg-transparent text-navy hover:text-accent"
                      }`}
                      onClick={() => handlePersonaChange("practice")}
                    >
                      <Building2 size={16} />
                      {t("personas.practice")}
                    </button>
                    <button
                      className={`flex items-center gap-3 w-full font-[family-name:var(--font-body)] font-medium text-[0.95rem] border-none px-5 py-3.5 cursor-pointer transition-all duration-200 text-left hover:bg-gradient-to-br from-accent/5 to-primary/5 ${
                        persona === "clinic"
                          ? "bg-gradient-to-br from-accent/10 to-primary/10 text-accent font-semibold"
                          : "bg-transparent text-navy hover:text-accent"
                      }`}
                      onClick={() => handlePersonaChange("clinic")}
                    >
                      <Hospital size={16} />
                      {t("personas.clinic")}
                    </button>
                  </div>
                )}
              </div>

              {/* Language Selector */}
              <div className="nav-dropdown relative">
                <button
                  className="flex items-center gap-2 font-[family-name:var(--font-body)] font-semibold text-[0.95rem] text-navy bg-transparent border-none cursor-pointer px-4 py-2 rounded-lg transition-all duration-300 hover:bg-[#0D6A6C]/5 hover:text-accent"
                  onClick={() => {
                    setShowLanguageMenu(!showLanguageMenu);
                    setShowPersonaMenu(false);
                  }}
                >
                  <Globe size={16} />
                  <span>{getLanguageLabel()}</span>
                  <ChevronDown size={16} />
                </button>
                {showLanguageMenu && (
                  <div className="absolute top-[calc(100%+0.5rem)] left-0 bg-white border border-[#0D6A6C]/10 rounded-2xl shadow-[0_12px_48px_rgba(0,0,0,0.16)] min-w-[200px] z-[1000] overflow-hidden animate-fade-in-down">
                    <button
                      className="flex items-center gap-3 w-full font-[family-name:var(--font-body)] font-medium text-[0.95rem] text-navy bg-transparent border-none px-5 py-3.5 cursor-pointer transition-all duration-200 text-left hover:bg-gradient-to-br from-accent/5 to-primary/5 hover:text-accent"
                      onClick={() => handleLanguageChange("en")}
                    >
                      {t("languages.en")}
                    </button>
                    <button
                      className="flex items-center gap-3 w-full font-[family-name:var(--font-body)] font-medium text-[0.95rem] text-navy bg-transparent border-none px-5 py-3.5 cursor-pointer transition-all duration-200 text-left hover:bg-gradient-to-br from-accent/5 to-primary/5 hover:text-accent"
                      onClick={() => handleLanguageChange("ro")}
                    >
                      {t("languages.ro")}
                    </button>
                    <button
                      className="flex items-center gap-3 w-full font-[family-name:var(--font-body)] font-medium text-[0.95rem] text-navy bg-transparent border-none px-5 py-3.5 cursor-pointer transition-all duration-200 text-left hover:bg-gradient-to-br from-accent/5 to-primary/5 hover:text-accent"
                      onClick={() => handleLanguageChange("ar")}
                    >
                      {t("languages.ar")}
                    </button>
                  </div>
                )}
              </div>

              <button
                className="bg-gradient-to-br from-accent/10 to-primary/10 border border-accent/40 text-primary rounded-lg p-2 cursor-pointer flex items-center justify-center transition-all duration-300 hover:bg-gradient-to-br hover:from-accent/20 hover:to-primary/20 hover:border-accent hover:text-accent hover:rotate-[-15deg] hover:shadow-[0_4px_12px_rgba(0,217,255,0.2)]"
                onClick={handleResetPreferences}
                title="Reset preferences"
              >
                <RotateCcw size={16} />
              </button>

              <a href="#features" className="font-[family-name:var(--font-body)] font-semibold text-[0.95rem] text-navy no-underline transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-accent after:to-primary-light after:transition-all after:duration-300 hover:text-accent hover:after:w-full">{t("nav.features")}</a>
              <a href="#solutions" className="font-[family-name:var(--font-body)] font-semibold text-[0.95rem] text-navy no-underline transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-accent after:to-primary-light after:transition-all after:duration-300 hover:text-accent hover:after:w-full">{t("nav.solutions")}</a>
              <a href="#compliance" className="font-[family-name:var(--font-body)] font-semibold text-[0.95rem] text-navy no-underline transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-accent after:to-primary-light after:transition-all after:duration-300 hover:text-accent hover:after:w-full">{t("nav.compliance")}</a>
              <Link to={`/${lang}/blog`} className="font-[family-name:var(--font-body)] font-semibold text-[0.95rem] text-navy no-underline transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-accent after:to-primary-light after:transition-all after:duration-300 hover:text-accent hover:after:w-full">{t("nav.blog")}</Link>
              <a href="#contact" className="bg-gradient-to-br from-primary to-primary-light text-white px-7 py-3 rounded-3xl transition-all duration-300 font-[family-name:var(--font-body)] font-semibold text-[0.95rem] no-underline hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(13,106,108,0.3)]">
                {t("nav.getStarted")}
              </a>
            </div>

            {/* Mobile Menu Container - wraps button and menu */}
            <div className="mobile-nav-container lg:hidden">
              <button
                className="p-2 rounded-lg text-navy hover:bg-[#0D6A6C]/5 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMobileMenu(!showMobileMenu);
                }}
                aria-label="Toggle menu"
              >
                {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {showMobileMenu && (
            <div className="mobile-nav-container lg:hidden mt-4 pb-4 border-t border-[#0D6A6C]/10 pt-4 animate-fade-in-down">
              <div className="flex flex-col gap-4">
                {/* Mobile Persona Selector */}
                <div className="nav-dropdown relative">
                  <button
                    className="flex items-center justify-between w-full font-[family-name:var(--font-body)] font-semibold text-[0.95rem] text-navy bg-transparent border-none cursor-pointer px-4 py-3 rounded-lg transition-all duration-300 hover:bg-[#0D6A6C]/5 hover:text-accent"
                    onClick={() => {
                      setShowPersonaMenu(!showPersonaMenu);
                      setShowLanguageMenu(false);
                    }}
                  >
                    <div className="flex items-center gap-2">
                      {getPersonaIcon()}
                      <span>{getPersonaLabel()}</span>
                    </div>
                    <ChevronDown size={16} className={`transition-transform ${showPersonaMenu ? 'rotate-180' : ''}`} />
                  </button>
                  {showPersonaMenu && (
                    <div className="mt-2 bg-white border border-[#0D6A6C]/10 rounded-2xl shadow-lg overflow-hidden">
                      <button
                        className={`flex items-center gap-3 w-full font-[family-name:var(--font-body)] font-medium text-[0.95rem] border-none px-5 py-3.5 cursor-pointer transition-all duration-200 text-left hover:bg-gradient-to-br from-accent/5 to-primary/5 ${
                          persona === "patient"
                            ? "bg-gradient-to-br from-accent/10 to-primary/10 text-accent font-semibold"
                            : "bg-transparent text-navy hover:text-accent"
                        }`}
                        onClick={() => handlePersonaChange("patient")}
                      >
                        <User size={16} />
                        {t("personas.patient")}
                      </button>
                      <button
                        className={`flex items-center gap-3 w-full font-[family-name:var(--font-body)] font-medium text-[0.95rem] border-none px-5 py-3.5 cursor-pointer transition-all duration-200 text-left hover:bg-gradient-to-br from-accent/5 to-primary/5 ${
                          persona === "practice"
                            ? "bg-gradient-to-br from-accent/10 to-primary/10 text-accent font-semibold"
                            : "bg-transparent text-navy hover:text-accent"
                        }`}
                        onClick={() => handlePersonaChange("practice")}
                      >
                        <Building2 size={16} />
                        {t("personas.practice")}
                      </button>
                      <button
                        className={`flex items-center gap-3 w-full font-[family-name:var(--font-body)] font-medium text-[0.95rem] border-none px-5 py-3.5 cursor-pointer transition-all duration-200 text-left hover:bg-gradient-to-br from-accent/5 to-primary/5 ${
                          persona === "clinic"
                            ? "bg-gradient-to-br from-accent/10 to-primary/10 text-accent font-semibold"
                            : "bg-transparent text-navy hover:text-accent"
                        }`}
                        onClick={() => handlePersonaChange("clinic")}
                      >
                        <Hospital size={16} />
                        {t("personas.clinic")}
                      </button>
                    </div>
                  )}
                </div>

                {/* Mobile Language Selector */}
                <div className="nav-dropdown relative">
                  <button
                    className="flex items-center justify-between w-full font-[family-name:var(--font-body)] font-semibold text-[0.95rem] text-navy bg-transparent border-none cursor-pointer px-4 py-3 rounded-lg transition-all duration-300 hover:bg-[#0D6A6C]/5 hover:text-accent"
                    onClick={() => {
                      setShowLanguageMenu(!showLanguageMenu);
                      setShowPersonaMenu(false);
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <Globe size={16} />
                      <span>{getLanguageLabel()}</span>
                    </div>
                    <ChevronDown size={16} className={`transition-transform ${showLanguageMenu ? 'rotate-180' : ''}`} />
                  </button>
                  {showLanguageMenu && (
                    <div className="mt-2 bg-white border border-[#0D6A6C]/10 rounded-2xl shadow-lg overflow-hidden">
                      <button
                        className="flex items-center gap-3 w-full font-[family-name:var(--font-body)] font-medium text-[0.95rem] text-navy bg-transparent border-none px-5 py-3.5 cursor-pointer transition-all duration-200 text-left hover:bg-gradient-to-br from-accent/5 to-primary/5 hover:text-accent"
                        onClick={() => handleLanguageChange("en")}
                      >
                        {t("languages.en")}
                      </button>
                      <button
                        className="flex items-center gap-3 w-full font-[family-name:var(--font-body)] font-medium text-[0.95rem] text-navy bg-transparent border-none px-5 py-3.5 cursor-pointer transition-all duration-200 text-left hover:bg-gradient-to-br from-accent/5 to-primary/5 hover:text-accent"
                        onClick={() => handleLanguageChange("ro")}
                      >
                        {t("languages.ro")}
                      </button>
                      <button
                        className="flex items-center gap-3 w-full font-[family-name:var(--font-body)] font-medium text-[0.95rem] text-navy bg-transparent border-none px-5 py-3.5 cursor-pointer transition-all duration-200 text-left hover:bg-gradient-to-br from-accent/5 to-primary/5 hover:text-accent"
                        onClick={() => handleLanguageChange("ar")}
                      >
                        {t("languages.ar")}
                      </button>
                    </div>
                  )}
                </div>

                {/* Mobile Reset Button */}
                <button
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-br from-accent/10 to-primary/10 border border-accent/40 text-primary rounded-lg px-4 py-3 cursor-pointer transition-all duration-300 font-[family-name:var(--font-body)] font-semibold text-[0.95rem] hover:bg-gradient-to-br hover:from-accent/20 hover:to-primary/20 hover:border-accent hover:text-accent"
                  onClick={handleResetPreferences}
                >
                  <RotateCcw size={16} />
                  <span>Reset Preferences</span>
                </button>

                {/* Mobile Nav Links */}
                <div className="flex flex-col gap-2 pt-2 border-t border-[#0D6A6C]/10">
                  <a
                    href="#features"
                    className="font-[family-name:var(--font-body)] font-semibold text-[0.95rem] text-navy no-underline px-4 py-3 rounded-lg transition-all duration-300 hover:bg-[#0D6A6C]/5 hover:text-accent"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    {t("nav.features")}
                  </a>
                  <a
                    href="#solutions"
                    className="font-[family-name:var(--font-body)] font-semibold text-[0.95rem] text-navy no-underline px-4 py-3 rounded-lg transition-all duration-300 hover:bg-[#0D6A6C]/5 hover:text-accent"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    {t("nav.solutions")}
                  </a>
                  <a
                    href="#compliance"
                    className="font-[family-name:var(--font-body)] font-semibold text-[0.95rem] text-navy no-underline px-4 py-3 rounded-lg transition-all duration-300 hover:bg-[#0D6A6C]/5 hover:text-accent"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    {t("nav.compliance")}
                  </a>
                  <Link
                    to={`/${lang}/blog`}
                    className="font-[family-name:var(--font-body)] font-semibold text-[0.95rem] text-navy no-underline px-4 py-3 rounded-lg transition-all duration-300 hover:bg-[#0D6A6C]/5 hover:text-accent"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    {t("nav.blog")}
                  </Link>
                  <a
                    href="#contact"
                    className="bg-gradient-to-br from-primary to-primary-light text-white px-7 py-3 rounded-3xl transition-all duration-300 font-[family-name:var(--font-body)] font-semibold text-[0.95rem] no-underline text-center hover:shadow-[0_8px_24px_rgba(13,106,108,0.3)]"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    {t("nav.getStarted")}
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Page Content */}
      {children}

      {/* Footer */}
      <footer className="bg-navy text-white py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1400px] mx-auto">
          {/* Brand Section - Compact on mobile */}
          <div className="mb-8 sm:mb-12 pb-6 sm:pb-8 border-b border-white/10">
            <div className="flex items-center gap-2.5 font-[family-name:var(--font-display)] font-extrabold text-xl sm:text-2xl text-white mb-3">
              <span className="text-[1.75rem] sm:text-[2rem]">⚕</span>
              <span>MediCare</span>
            </div>
            <p className="text-white/70 leading-relaxed text-sm sm:text-base max-w-[280px] sm:max-w-[340px]">{t("footer.tagline")}</p>
          </div>

          {/* Links Grid - 2 columns on mobile, responsive on larger screens */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8 sm:gap-x-10 lg:gap-12 mb-8 sm:mb-12 pb-8 sm:pb-12 border-b border-white/10">
            {/* Product Column */}
            <div>
              <h4 className="font-[family-name:var(--font-display)] text-sm sm:text-base font-bold mb-3 sm:mb-4 text-white">{t("footer.product.title")}</h4>
              <div className="flex flex-col gap-2 sm:gap-2.5">
                <a href="#features" className="text-white/70 no-underline transition-colors duration-300 text-[0.85rem] sm:text-[0.95rem] hover:text-accent-light">{t("footer.product.features")}</a>
                <a href="#solutions" className="text-white/70 no-underline transition-colors duration-300 text-[0.85rem] sm:text-[0.95rem] hover:text-accent-light">{t("footer.product.solutions")}</a>
                <a href="#pricing" className="text-white/70 no-underline transition-colors duration-300 text-[0.85rem] sm:text-[0.95rem] hover:text-accent-light">{t("footer.product.pricing")}</a>
                <a href="#integrations" className="text-white/70 no-underline transition-colors duration-300 text-[0.85rem] sm:text-[0.95rem] hover:text-accent-light">{t("footer.product.integrations")}</a>
              </div>
            </div>

            {/* Company Column */}
            <div>
              <h4 className="font-[family-name:var(--font-display)] text-sm sm:text-base font-bold mb-3 sm:mb-4 text-white">{t("footer.company.title")}</h4>
              <div className="flex flex-col gap-2 sm:gap-2.5">
                <a href="#about" className="text-white/70 no-underline transition-colors duration-300 text-[0.85rem] sm:text-[0.95rem] hover:text-accent-light">{t("footer.company.about")}</a>
                <a href="#careers" className="text-white/70 no-underline transition-colors duration-300 text-[0.85rem] sm:text-[0.95rem] hover:text-accent-light">{t("footer.company.careers")}</a>
                <Link to={`/${lang}/blog`} className="text-white/70 no-underline transition-colors duration-300 text-[0.85rem] sm:text-[0.95rem] hover:text-accent-light">{t("footer.company.blog")}</Link>
                <a href="#press" className="text-white/70 no-underline transition-colors duration-300 text-[0.85rem] sm:text-[0.95rem] hover:text-accent-light">{t("footer.company.press")}</a>
              </div>
            </div>

            {/* Resources Column */}
            <div>
              <h4 className="font-[family-name:var(--font-display)] text-sm sm:text-base font-bold mb-3 sm:mb-4 text-white">{t("footer.resources.title")}</h4>
              <div className="flex flex-col gap-2 sm:gap-2.5">
                <a href="#docs" className="text-white/70 no-underline transition-colors duration-300 text-[0.85rem] sm:text-[0.95rem] hover:text-accent-light">{t("footer.resources.docs")}</a>
                <a href="#api" className="text-white/70 no-underline transition-colors duration-300 text-[0.85rem] sm:text-[0.95rem] hover:text-accent-light">{t("footer.resources.api")}</a>
                <a href="#support" className="text-white/70 no-underline transition-colors duration-300 text-[0.85rem] sm:text-[0.95rem] hover:text-accent-light">{t("footer.resources.support")}</a>
                <a href="#status" className="text-white/70 no-underline transition-colors duration-300 text-[0.85rem] sm:text-[0.95rem] hover:text-accent-light">{t("footer.resources.status")}</a>
              </div>
            </div>

            {/* Legal Column */}
            <div>
              <h4 className="font-[family-name:var(--font-display)] text-sm sm:text-base font-bold mb-3 sm:mb-4 text-white">{t("footer.legal.title")}</h4>
              <div className="flex flex-col gap-2 sm:gap-2.5">
                <a href="#privacy" className="text-white/70 no-underline transition-colors duration-300 text-[0.85rem] sm:text-[0.95rem] hover:text-accent-light">{t("footer.legal.privacy")}</a>
                <a href="#terms" className="text-white/70 no-underline transition-colors duration-300 text-[0.85rem] sm:text-[0.95rem] hover:text-accent-light">{t("footer.legal.terms")}</a>
                <a href="#compliance" className="text-white/70 no-underline transition-colors duration-300 text-[0.85rem] sm:text-[0.95rem] hover:text-accent-light">{t("footer.legal.compliance")}</a>
                <a href="#security" className="text-white/70 no-underline transition-colors duration-300 text-[0.85rem] sm:text-[0.95rem] hover:text-accent-light">{t("footer.legal.security")}</a>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4 sm:gap-6">
            <div className="text-white/60 text-xs sm:text-sm text-center sm:text-left">{t("footer.copyright")}</div>
            <div className="flex gap-5 sm:gap-8">
              <a href="#twitter" className="text-white/70 no-underline text-[0.85rem] sm:text-[0.95rem] transition-colors duration-300 hover:text-accent-light">
                Twitter
              </a>
              <a href="#linkedin" className="text-white/70 no-underline text-[0.85rem] sm:text-[0.95rem] transition-colors duration-300 hover:text-accent-light">
                LinkedIn
              </a>
              <a href="#github" className="text-white/70 no-underline text-[0.85rem] sm:text-[0.95rem] transition-colors duration-300 hover:text-accent-light">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
