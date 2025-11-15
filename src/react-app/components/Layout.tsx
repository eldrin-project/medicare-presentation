import { ReactNode, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { User, Building2, Hospital, Globe, ChevronDown, RotateCcw } from "lucide-react";
import "../App.css";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();
  const { lang, persona } = useParams<{ lang: string; persona: string }>();
  const { t, i18n } = useTranslation();
  const [showPersonaMenu, setShowPersonaMenu] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  useEffect(() => {
    // Set language from URL
    if (lang && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  useEffect(() => {
    // Close dropdowns when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".nav-dropdown")) {
        setShowPersonaMenu(false);
        setShowLanguageMenu(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

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
    <div className="app">
      {/* Navigation */}
      <nav className="nav">
        <div className="nav-content">
          <div className="logo" onClick={() => navigate(`/${lang}/${persona}`)}>
            <span className="logo-icon">⚕</span>
            <span className="logo-text">MediCare</span>
          </div>
          <div className="nav-links">
            {/* Persona Selector */}
            <div className="nav-dropdown">
              <button
                className="nav-dropdown-trigger"
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
                <div className="nav-dropdown-menu">
                  <button
                    className="nav-dropdown-item"
                    onClick={() => handlePersonaChange("patient")}
                  >
                    <User size={16} />
                    {t("personas.patient")}
                  </button>
                  <button
                    className="nav-dropdown-item"
                    onClick={() => handlePersonaChange("practice")}
                  >
                    <Building2 size={16} />
                    {t("personas.practice")}
                  </button>
                  <button
                    className="nav-dropdown-item"
                    onClick={() => handlePersonaChange("clinic")}
                  >
                    <Hospital size={16} />
                    {t("personas.clinic")}
                  </button>
                </div>
              )}
            </div>

            {/* Language Selector */}
            <div className="nav-dropdown">
              <button
                className="nav-dropdown-trigger"
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
                <div className="nav-dropdown-menu">
                  <button
                    className="nav-dropdown-item"
                    onClick={() => handleLanguageChange("en")}
                  >
                    {t("languages.en")}
                  </button>
                  <button
                    className="nav-dropdown-item"
                    onClick={() => handleLanguageChange("ro")}
                  >
                    {t("languages.ro")}
                  </button>
                  <button
                    className="nav-dropdown-item"
                    onClick={() => handleLanguageChange("ar")}
                  >
                    {t("languages.ar")}
                  </button>
                </div>
              )}
            </div>

            <button
              className="nav-reset-btn"
              onClick={handleResetPreferences}
              title="Reset preferences"
            >
              <RotateCcw size={16} />
            </button>

            <a href="#features">{t("nav.features")}</a>
            <a href="#solutions">{t("nav.solutions")}</a>
            <a href="#compliance">{t("nav.compliance")}</a>
            <a href="#contact" className="nav-cta">
              {t("nav.getStarted")}
            </a>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      {children}

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-main">
            <div className="footer-brand">
              <div className="logo">
                <span className="logo-icon">⚕</span>
                <span className="logo-text">MediCare</span>
              </div>
              <p className="footer-tagline">{t("footer.tagline")}</p>
            </div>
            <div className="footer-column">
              <h4>{t("footer.product.title")}</h4>
              <a href="#features">{t("footer.product.features")}</a>
              <a href="#solutions">{t("footer.product.solutions")}</a>
              <a href="#pricing">{t("footer.product.pricing")}</a>
              <a href="#integrations">{t("footer.product.integrations")}</a>
            </div>
            <div className="footer-column">
              <h4>{t("footer.company.title")}</h4>
              <a href="#about">{t("footer.company.about")}</a>
              <a href="#careers">{t("footer.company.careers")}</a>
              <a href="#blog">{t("footer.company.blog")}</a>
              <a href="#press">{t("footer.company.press")}</a>
            </div>
            <div className="footer-column">
              <h4>{t("footer.resources.title")}</h4>
              <a href="#docs">{t("footer.resources.docs")}</a>
              <a href="#api">{t("footer.resources.api")}</a>
              <a href="#support">{t("footer.resources.support")}</a>
              <a href="#status">{t("footer.resources.status")}</a>
            </div>
            <div className="footer-column">
              <h4>{t("footer.legal.title")}</h4>
              <a href="#privacy">{t("footer.legal.privacy")}</a>
              <a href="#terms">{t("footer.legal.terms")}</a>
              <a href="#compliance">{t("footer.legal.compliance")}</a>
              <a href="#security">{t("footer.legal.security")}</a>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-copyright">{t("footer.copyright")}</div>
            <div className="footer-social">
              <a href="#twitter" className="social-link">
                Twitter
              </a>
              <a href="#linkedin" className="social-link">
                LinkedIn
              </a>
              <a href="#github" className="social-link">
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
