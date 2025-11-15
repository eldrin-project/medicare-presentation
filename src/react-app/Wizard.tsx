import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { User, Building2, Hospital, Globe, ArrowRight } from "lucide-react";
import "./Wizard.css";

interface WizardProps {
  step?: number;
  language?: string;
  onLanguageSelect?: (language: string) => void;
  onPersonaSelect?: (persona: string) => void;
}

function Wizard({ step = 1, language, onLanguageSelect, onPersonaSelect }: WizardProps) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [selectedPersona, setSelectedPersona] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");

  // Initialize i18n with the provided language for step 2
  useEffect(() => {
    if (step === 2 && language) {
      i18n.changeLanguage(language);
    }
  }, [step, language, i18n]);

  const handlePersonaSelect = (persona: string) => {
    setSelectedPersona(persona);
  };

  const handleLanguageSelect = (lang: string) => {
    setSelectedLanguage(lang);
  };

  const handleNext = () => {
    if (step === 1 && selectedLanguage && onLanguageSelect) {
      onLanguageSelect(selectedLanguage);
    }
  };

  const handleComplete = () => {
    if (selectedPersona && onPersonaSelect) {
      onPersonaSelect(selectedPersona);
    }
  };

  const handleSkip = () => {
    navigate("/en/patient");
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="wizard-container">
      <div className="wizard-background">
        <div className="gradient-orb wizard-orb-1"></div>
        <div className="gradient-orb wizard-orb-2"></div>
        <div className="grid-overlay"></div>
      </div>

      <div className="wizard-content">
        <div className="wizard-header">
          <div className="logo">
            <span className="logo-icon">⚕</span>
            <span className="logo-text">MediCare</span>
          </div>
          <button className="wizard-skip" onClick={handleSkip}>
            {t('wizard.skip')}
          </button>
        </div>

        {step === 1 ? (
          <div className="wizard-step fade-in">
            <div className="wizard-step-indicator">{t('wizard.step1.indicator')}</div>
            <h1 className="wizard-title">{t('wizard.step1.title')}</h1>
            <p className="wizard-subtitle">
              {t('wizard.step1.subtitle')}
            </p>

            <div className="wizard-options">
              <button
                className={`wizard-option ${
                  selectedLanguage === "en" ? "selected" : ""
                }`}
                onClick={() => handleLanguageSelect("en")}
              >
                <div className="wizard-option-icon">
                  <Globe size={40} strokeWidth={1.5} />
                </div>
                <div className="wizard-option-content">
                  <h3 className="wizard-option-title">English</h3>
                  <p className="wizard-option-description">
                    Use the platform in English
                  </p>
                </div>
                <div className="wizard-option-check">
                  {selectedLanguage === "en" && "✓"}
                </div>
              </button>

              <button
                className={`wizard-option ${
                  selectedLanguage === "ro" ? "selected" : ""
                }`}
                onClick={() => handleLanguageSelect("ro")}
              >
                <div className="wizard-option-icon">
                  <Globe size={40} strokeWidth={1.5} />
                </div>
                <div className="wizard-option-content">
                  <h3 className="wizard-option-title">Română</h3>
                  <p className="wizard-option-description">
                    Folosește platforma în limba română
                  </p>
                </div>
                <div className="wizard-option-check">
                  {selectedLanguage === "ro" && "✓"}
                </div>
              </button>

              <button
                className={`wizard-option ${
                  selectedLanguage === "ar" ? "selected" : ""
                }`}
                onClick={() => handleLanguageSelect("ar")}
              >
                <div className="wizard-option-icon">
                  <Globe size={40} strokeWidth={1.5} />
                </div>
                <div className="wizard-option-content">
                  <h3 className="wizard-option-title">العربية</h3>
                  <p className="wizard-option-description">
                    استخدم المنصة باللغة العربية
                  </p>
                </div>
                <div className="wizard-option-check">
                  {selectedLanguage === "ar" && "✓"}
                </div>
              </button>
            </div>

            <button
              className="wizard-next-btn"
              onClick={handleNext}
              disabled={!selectedLanguage}
            >
              {t('wizard.step1.continue')}
              <ArrowRight size={20} />
            </button>
          </div>
        ) : (
          <div className="wizard-step fade-in">
            <div className="wizard-step-indicator">{t('wizard.step2.indicator')}</div>
            <h1 className="wizard-title">{t('wizard.step2.title')}</h1>
            <p className="wizard-subtitle">
              {t('wizard.step2.subtitle')}
            </p>

            <div className="wizard-options">
              <button
                className={`wizard-option ${
                  selectedPersona === "patient" ? "selected" : ""
                }`}
                onClick={() => handlePersonaSelect("patient")}
              >
                <div className="wizard-option-icon">
                  <User size={40} strokeWidth={1.5} />
                </div>
                <div className="wizard-option-content">
                  <h3 className="wizard-option-title">{t('wizard.step2.patient.title')}</h3>
                  <p className="wizard-option-description">
                    {t('wizard.step2.patient.description')}
                  </p>
                </div>
                <div className="wizard-option-check">
                  {selectedPersona === "patient" && "✓"}
                </div>
              </button>

              <button
                className={`wizard-option ${
                  selectedPersona === "practice" ? "selected" : ""
                }`}
                onClick={() => handlePersonaSelect("practice")}
              >
                <div className="wizard-option-icon">
                  <Building2 size={40} strokeWidth={1.5} />
                </div>
                <div className="wizard-option-content">
                  <h3 className="wizard-option-title">
                    {t('wizard.step2.practice.title')}
                  </h3>
                  <p className="wizard-option-description">
                    {t('wizard.step2.practice.description')}
                  </p>
                </div>
                <div className="wizard-option-check">
                  {selectedPersona === "practice" && "✓"}
                </div>
              </button>

              <button
                className={`wizard-option ${
                  selectedPersona === "clinic" ? "selected" : ""
                }`}
                onClick={() => handlePersonaSelect("clinic")}
              >
                <div className="wizard-option-icon">
                  <Hospital size={40} strokeWidth={1.5} />
                </div>
                <div className="wizard-option-content">
                  <h3 className="wizard-option-title">{t('wizard.step2.clinic.title')}</h3>
                  <p className="wizard-option-description">
                    {t('wizard.step2.clinic.description')}
                  </p>
                </div>
                <div className="wizard-option-check">
                  {selectedPersona === "clinic" && "✓"}
                </div>
              </button>
            </div>

            <div className="wizard-actions">
              <button className="wizard-back-btn" onClick={handleBack}>
                {t('wizard.step2.back')}
              </button>
              <button
                className="wizard-next-btn"
                onClick={handleComplete}
                disabled={!selectedPersona}
              >
                {t('wizard.step2.getStarted')}
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Wizard;
