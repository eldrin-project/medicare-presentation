import { useState } from "react";
import { User, Building2, Hospital, Globe, ArrowRight } from "lucide-react";
import "./Wizard.css";

interface WizardProps {
  onComplete: (persona: string, language: string) => void;
}

function Wizard({ onComplete }: WizardProps) {
  const [step, setStep] = useState(1);
  const [selectedPersona, setSelectedPersona] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");

  const handlePersonaSelect = (persona: string) => {
    setSelectedPersona(persona);
  };

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
  };

  const handleNext = () => {
    if (step === 1 && selectedPersona) {
      setStep(2);
    }
  };

  const handleComplete = () => {
    if (selectedPersona && selectedLanguage) {
      onComplete(selectedPersona, selectedLanguage);
    }
  };

  const handleSkip = () => {
    onComplete("patient", "en");
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
            Skip for now
          </button>
        </div>

        {step === 1 ? (
          <div className="wizard-step fade-in">
            <div className="wizard-step-indicator">Step 1 of 2</div>
            <h1 className="wizard-title">Who are you?</h1>
            <p className="wizard-subtitle">
              Select your role to personalize your experience
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
                  <h3 className="wizard-option-title">Patient</h3>
                  <p className="wizard-option-description">
                    I'm looking for healthcare management for personal use
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
                    Small Private Practice
                  </h3>
                  <p className="wizard-option-description">
                    I run a private practice and need practice management tools
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
                  <h3 className="wizard-option-title">Clinic</h3>
                  <p className="wizard-option-description">
                    I represent a clinic or hospital seeking enterprise
                    solutions
                  </p>
                </div>
                <div className="wizard-option-check">
                  {selectedPersona === "clinic" && "✓"}
                </div>
              </button>
            </div>

            <button
              className="wizard-next-btn"
              onClick={handleNext}
              disabled={!selectedPersona}
            >
              Continue
              <ArrowRight size={20} />
            </button>
          </div>
        ) : (
          <div className="wizard-step fade-in">
            <div className="wizard-step-indicator">Step 2 of 2</div>
            <h1 className="wizard-title">Choose your language</h1>
            <p className="wizard-subtitle">
              Select your preferred language for the best experience
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

            <div className="wizard-actions">
              <button className="wizard-back-btn" onClick={() => setStep(1)}>
                Back
              </button>
              <button
                className="wizard-next-btn"
                onClick={handleComplete}
                disabled={!selectedLanguage}
              >
                Get Started
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
