import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { User, Building2, Hospital, Globe } from "lucide-react";

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
    if (onPersonaSelect) {
      onPersonaSelect(persona);
    }
  };

  const handleLanguageSelect = (lang: string) => {
    setSelectedLanguage(lang);
    if (onLanguageSelect) {
      onLanguageSelect(lang);
    }
  };

  const handleSkip = () => {
    navigate("/en/patient");
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-8">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FAFAF9] to-[#E8F4F5] overflow-hidden">
        {/* Gradient Orb 1 */}
        <div className="absolute w-[600px] h-[600px] -top-[200px] -right-[100px] rounded-full bg-[radial-gradient(circle,rgba(0,217,255,0.3)_0%,transparent_70%)] animate-[float_15s_ease-in-out_infinite]"></div>
        {/* Gradient Orb 2 */}
        <div className="absolute w-[500px] h-[500px] -bottom-[150px] -left-[50px] rounded-full bg-[radial-gradient(circle,rgba(13,106,108,0.3)_0%,transparent_70%)] animate-[float_15s_ease-in-out_infinite] [animation-delay:-5s]"></div>
        {/* Grid Overlay */}
        <div
          className="absolute inset-0 opacity-100"
          style={{
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="max-w-[700px] w-full relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-3 font-[family-name:var(--font-display)] font-extrabold text-2xl text-primary cursor-pointer">
            <span className="text-3xl">⚕</span>
            <span>MediCare</span>
          </div>
          <button
            onClick={handleSkip}
            className="font-[family-name:var(--font-body)] font-semibold text-[0.95rem] text-[#8B95A5] bg-transparent border-0 cursor-pointer px-4 py-2 transition-colors duration-300 hover:text-primary"
          >
            {t('wizard.skip')}
          </button>
        </div>

        {step === 1 ? (
          <div className="bg-white/90 backdrop-blur-[20px] rounded-3xl p-12 shadow-[0_12px_48px_rgba(0,0,0,0.16)] border border-[#0D6A6C]/10 animate-fade-in">
            <div className="text-[0.85rem] font-semibold text-accent uppercase tracking-[1px] mb-6">
              {t('wizard.step1.indicator')}
            </div>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3rem)] font-extrabold text-navy mb-4 leading-[1.2]">
              {t('wizard.step1.title')}
            </h1>
            <p className="text-[1.15rem] text-[#8B95A5] mb-12 leading-[1.6]">
              {t('wizard.step1.subtitle')}
            </p>

            <div className="flex flex-col gap-4 mb-8">
              {/* English Option */}
              <button
                className={`flex items-center gap-6 bg-white border-2 rounded-2xl p-7 cursor-pointer transition-all duration-300 text-left w-full relative overflow-hidden hover:border-accent hover:translate-x-1 hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-gradient-to-b before:from-accent before:to-primary before:scale-y-0 before:transition-transform before:duration-300 hover:before:scale-y-100 ${
                  selectedLanguage === "en"
                    ? "border-primary bg-gradient-to-br from-accent/5 to-primary/5 shadow-[0_4px_16px_rgba(13,106,108,0.15)] before:scale-y-100"
                    : "border-[#0D6A6C]/15"
                }`}
                onClick={() => handleLanguageSelect("en")}
              >
                <div
                  className={`flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-2xl transition-all duration-300 ${
                    selectedLanguage === "en"
                      ? "bg-gradient-to-br from-primary to-primary-light text-white shadow-[0_4px_16px_rgba(0,217,255,0.3)]"
                      : "bg-gradient-to-br from-accent/10 to-primary/15 text-primary"
                  }`}
                >
                  <Globe size={40} strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-navy mb-2 leading-[1.3]">
                    English
                  </h3>
                  <p className="text-[0.95rem] text-[#8B95A5] leading-[1.5] m-0">
                    Use the platform in English
                  </p>
                </div>
                <div
                  className={`flex-shrink-0 w-8 h-8 flex items-center justify-center bg-accent rounded-full text-white font-bold text-xl transition-all duration-300 ${
                    selectedLanguage === "en"
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-50"
                  }`}
                >
                  {selectedLanguage === "en" && "✓"}
                </div>
              </button>

              {/* Romanian Option */}
              <button
                className={`flex items-center gap-6 bg-white border-2 rounded-2xl p-7 cursor-pointer transition-all duration-300 text-left w-full relative overflow-hidden hover:border-accent hover:translate-x-1 hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-gradient-to-b before:from-accent before:to-primary before:scale-y-0 before:transition-transform before:duration-300 hover:before:scale-y-100 ${
                  selectedLanguage === "ro"
                    ? "border-primary bg-gradient-to-br from-accent/5 to-primary/5 shadow-[0_4px_16px_rgba(13,106,108,0.15)] before:scale-y-100"
                    : "border-[#0D6A6C]/15"
                }`}
                onClick={() => handleLanguageSelect("ro")}
              >
                <div
                  className={`flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-2xl transition-all duration-300 ${
                    selectedLanguage === "ro"
                      ? "bg-gradient-to-br from-primary to-primary-light text-white shadow-[0_4px_16px_rgba(0,217,255,0.3)]"
                      : "bg-gradient-to-br from-accent/10 to-primary/15 text-primary"
                  }`}
                >
                  <Globe size={40} strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-navy mb-2 leading-[1.3]">
                    Română
                  </h3>
                  <p className="text-[0.95rem] text-[#8B95A5] leading-[1.5] m-0">
                    Folosește platforma în limba română
                  </p>
                </div>
                <div
                  className={`flex-shrink-0 w-8 h-8 flex items-center justify-center bg-accent rounded-full text-white font-bold text-xl transition-all duration-300 ${
                    selectedLanguage === "ro"
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-50"
                  }`}
                >
                  {selectedLanguage === "ro" && "✓"}
                </div>
              </button>

              {/* Arabic Option */}
              <button
                className={`flex items-center gap-6 bg-white border-2 rounded-2xl p-7 cursor-pointer transition-all duration-300 text-left w-full relative overflow-hidden hover:border-accent hover:translate-x-1 hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-gradient-to-b before:from-accent before:to-primary before:scale-y-0 before:transition-transform before:duration-300 hover:before:scale-y-100 ${
                  selectedLanguage === "ar"
                    ? "border-primary bg-gradient-to-br from-accent/5 to-primary/5 shadow-[0_4px_16px_rgba(13,106,108,0.15)] before:scale-y-100"
                    : "border-[#0D6A6C]/15"
                }`}
                onClick={() => handleLanguageSelect("ar")}
              >
                <div
                  className={`flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-2xl transition-all duration-300 ${
                    selectedLanguage === "ar"
                      ? "bg-gradient-to-br from-primary to-primary-light text-white shadow-[0_4px_16px_rgba(0,217,255,0.3)]"
                      : "bg-gradient-to-br from-accent/10 to-primary/15 text-primary"
                  }`}
                >
                  <Globe size={40} strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-navy mb-2 leading-[1.3]">
                    العربية
                  </h3>
                  <p className="text-[0.95rem] text-[#8B95A5] leading-[1.5] m-0">
                    استخدم المنصة باللغة العربية
                  </p>
                </div>
                <div
                  className={`flex-shrink-0 w-8 h-8 flex items-center justify-center bg-accent rounded-full text-white font-bold text-xl transition-all duration-300 ${
                    selectedLanguage === "ar"
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-50"
                  }`}
                >
                  {selectedLanguage === "ar" && "✓"}
                </div>
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white/90 backdrop-blur-[20px] rounded-3xl p-12 shadow-[0_12px_48px_rgba(0,0,0,0.16)] border border-[#0D6A6C]/10 animate-fade-in">
            <div className="text-[0.85rem] font-semibold text-accent uppercase tracking-[1px] mb-6">
              {t('wizard.step2.indicator')}
            </div>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,3rem)] font-extrabold text-navy mb-4 leading-[1.2]">
              {t('wizard.step2.title')}
            </h1>
            <p className="text-[1.15rem] text-[#8B95A5] mb-12 leading-[1.6]">
              {t('wizard.step2.subtitle')}
            </p>

            <div className="flex flex-col gap-4 mb-8">
              {/* Patient Option */}
              <button
                className={`flex items-center gap-6 bg-white border-2 rounded-2xl p-7 cursor-pointer transition-all duration-300 text-left w-full relative overflow-hidden hover:border-accent hover:translate-x-1 hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-gradient-to-b before:from-accent before:to-primary before:scale-y-0 before:transition-transform before:duration-300 hover:before:scale-y-100 ${
                  selectedPersona === "patient"
                    ? "border-primary bg-gradient-to-br from-accent/5 to-primary/5 shadow-[0_4px_16px_rgba(13,106,108,0.15)] before:scale-y-100"
                    : "border-[#0D6A6C]/15"
                }`}
                onClick={() => handlePersonaSelect("patient")}
              >
                <div
                  className={`flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-2xl transition-all duration-300 ${
                    selectedPersona === "patient"
                      ? "bg-gradient-to-br from-primary to-primary-light text-white shadow-[0_4px_16px_rgba(0,217,255,0.3)]"
                      : "bg-gradient-to-br from-accent/10 to-primary/15 text-primary"
                  }`}
                >
                  <User size={40} strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-navy mb-2 leading-[1.3]">
                    {t('wizard.step2.patient.title')}
                  </h3>
                  <p className="text-[0.95rem] text-[#8B95A5] leading-[1.5] m-0">
                    {t('wizard.step2.patient.description')}
                  </p>
                </div>
                <div
                  className={`flex-shrink-0 w-8 h-8 flex items-center justify-center bg-accent rounded-full text-white font-bold text-xl transition-all duration-300 ${
                    selectedPersona === "patient"
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-50"
                  }`}
                >
                  {selectedPersona === "patient" && "✓"}
                </div>
              </button>

              {/* Practice Option */}
              <button
                className={`flex items-center gap-6 bg-white border-2 rounded-2xl p-7 cursor-pointer transition-all duration-300 text-left w-full relative overflow-hidden hover:border-accent hover:translate-x-1 hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-gradient-to-b before:from-accent before:to-primary before:scale-y-0 before:transition-transform before:duration-300 hover:before:scale-y-100 ${
                  selectedPersona === "practice"
                    ? "border-primary bg-gradient-to-br from-accent/5 to-primary/5 shadow-[0_4px_16px_rgba(13,106,108,0.15)] before:scale-y-100"
                    : "border-[#0D6A6C]/15"
                }`}
                onClick={() => handlePersonaSelect("practice")}
              >
                <div
                  className={`flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-2xl transition-all duration-300 ${
                    selectedPersona === "practice"
                      ? "bg-gradient-to-br from-primary to-primary-light text-white shadow-[0_4px_16px_rgba(0,217,255,0.3)]"
                      : "bg-gradient-to-br from-accent/10 to-primary/15 text-primary"
                  }`}
                >
                  <Building2 size={40} strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-navy mb-2 leading-[1.3]">
                    {t('wizard.step2.practice.title')}
                  </h3>
                  <p className="text-[0.95rem] text-[#8B95A5] leading-[1.5] m-0">
                    {t('wizard.step2.practice.description')}
                  </p>
                </div>
                <div
                  className={`flex-shrink-0 w-8 h-8 flex items-center justify-center bg-accent rounded-full text-white font-bold text-xl transition-all duration-300 ${
                    selectedPersona === "practice"
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-50"
                  }`}
                >
                  {selectedPersona === "practice" && "✓"}
                </div>
              </button>

              {/* Clinic Option */}
              <button
                className={`flex items-center gap-6 bg-white border-2 rounded-2xl p-7 cursor-pointer transition-all duration-300 text-left w-full relative overflow-hidden hover:border-accent hover:translate-x-1 hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-gradient-to-b before:from-accent before:to-primary before:scale-y-0 before:transition-transform before:duration-300 hover:before:scale-y-100 ${
                  selectedPersona === "clinic"
                    ? "border-primary bg-gradient-to-br from-accent/5 to-primary/5 shadow-[0_4px_16px_rgba(13,106,108,0.15)] before:scale-y-100"
                    : "border-[#0D6A6C]/15"
                }`}
                onClick={() => handlePersonaSelect("clinic")}
              >
                <div
                  className={`flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-2xl transition-all duration-300 ${
                    selectedPersona === "clinic"
                      ? "bg-gradient-to-br from-primary to-primary-light text-white shadow-[0_4px_16px_rgba(0,217,255,0.3)]"
                      : "bg-gradient-to-br from-accent/10 to-primary/15 text-primary"
                  }`}
                >
                  <Hospital size={40} strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-navy mb-2 leading-[1.3]">
                    {t('wizard.step2.clinic.title')}
                  </h3>
                  <p className="text-[0.95rem] text-[#8B95A5] leading-[1.5] m-0">
                    {t('wizard.step2.clinic.description')}
                  </p>
                </div>
                <div
                  className={`flex-shrink-0 w-8 h-8 flex items-center justify-center bg-accent rounded-full text-white font-bold text-xl transition-all duration-300 ${
                    selectedPersona === "clinic"
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-50"
                  }`}
                >
                  {selectedPersona === "clinic" && "✓"}
                </div>
              </button>
            </div>

            <button
              onClick={handleBack}
              className="w-full font-[family-name:var(--font-body)] font-semibold text-[1.1rem] px-8 py-5 bg-white text-primary border-2 border-primary rounded-2xl cursor-pointer transition-all duration-300 hover:bg-primary hover:text-white hover:-translate-y-0.5"
            >
              {t('wizard.step2.back')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Wizard;
