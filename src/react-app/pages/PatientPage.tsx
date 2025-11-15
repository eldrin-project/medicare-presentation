import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Calendar, Shield, Smartphone, Video, ShieldCheck, Lock, CheckCircle } from "lucide-react";
import "../App.css";

function PatientPage() {
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
    <div className="page-content">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg">
          <img
            src="/hero-banner-image.jpg"
            alt="Healthcare professionals collaborating"
            className="hero-image"
          />
          <div className="hero-overlay"></div>
          <div className="grid-overlay"></div>
        </div>
        <div className="hero-content" style={{ transform: `translateY(${scrollY * 0.3}px)` }}>
          <div className="hero-badge">
            <span className="badge-dot"></span>
            {t('hero.badge')}
          </div>
          <h1 className="hero-title">
            {t('hero.title')}
            <span className="gradient-text"> {t('hero.titleGradient')}</span>
          </h1>
          <p className="hero-subtitle">
            {t('hero.subtitle')}
          </p>
          <div className="hero-ctas">
            <a
              href="https://staging-medicare.eldrin.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              {t('hero.ctaPrimary')}
              <span className="btn-icon">→</span>
            </a>
            <button className="btn btn-secondary">
              {t('hero.ctaSecondary')}
              <span className="btn-icon">▶</span>
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <div className="stat-number">{t('hero.stats.launchQuarter')}</div>
              <div className="stat-label">{t('hero.stats.launchLabel')}</div>
            </div>
            <div className="stat">
              <div className="stat-number">{t('hero.stats.demoAvailable')}</div>
              <div className="stat-label">{t('hero.stats.demoLabel')}</div>
            </div>
            <div className="stat">
              <div className="stat-number">{t('hero.stats.earlyAccessStatus')}</div>
              <div className="stat-label">{t('hero.stats.earlyAccessLabel')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="section-header">
          <span className="section-badge">{t('features.badge')}</span>
          <h2 className="section-title">{t('features.title')}</h2>
          <p className="section-subtitle">
            {t('features.subtitle')}
          </p>
        </div>
        <div className="features-grid">
          <div className="feature-card" style={{ animationDelay: "0.1s" }}>
            <div className="feature-icon">
              <Calendar size={48} strokeWidth={1.5} />
            </div>
            <h3 className="feature-title">{t('features.scheduling.title')}</h3>
            <p className="feature-description">
              {t('features.scheduling.description')}
            </p>
            <div className="feature-tags">
              <span className="tag">Real-time sync</span>
              <span className="tag">SMS/Email alerts</span>
            </div>
          </div>
          <div className="feature-card" style={{ animationDelay: "0.2s" }}>
            <div className="feature-icon">
              <Shield size={48} strokeWidth={1.5} />
            </div>
            <h3 className="feature-title">{t('features.security.title')}</h3>
            <p className="feature-description">
              {t('features.security.description')}
            </p>
            <div className="feature-tags">
              <span className="tag">AES-256</span>
              <span className="tag">Zero-trust</span>
            </div>
          </div>
          <div className="feature-card" style={{ animationDelay: "0.3s" }}>
            <div className="feature-icon">
              <Smartphone size={48} strokeWidth={1.5} />
            </div>
            <h3 className="feature-title">{t('features.multiPlatform.title')}</h3>
            <p className="feature-description">
              {t('features.multiPlatform.description')}
            </p>
            <div className="feature-tags">
              <span className="tag">Offline mode</span>
              <span className="tag">PWA ready</span>
            </div>
          </div>
          <div className="feature-card" style={{ animationDelay: "0.4s" }}>
            <div className="feature-icon">
              <Video size={48} strokeWidth={1.5} />
            </div>
            <h3 className="feature-title">{t('features.telemedicine.title')}</h3>
            <p className="feature-description">
              {t('features.telemedicine.description')}
            </p>
            <div className="feature-tags">
              <span className="tag">WebRTC</span>
              <span className="tag">HD quality</span>
            </div>
          </div>
        </div>
      </section>

      {/* Patient-Specific Solutions Section */}
      <section className="solutions" id="solutions">
        <div className="section-header">
          <span className="section-badge">{t('solutions.badge')}</span>
          <h2 className="section-title">{t('solutions.patient.title')}</h2>
        </div>
        <div className="solutions-content">
          <div className="solution-panel fade-in">
            <div className="solution-visual">
              <div className="visual-placeholder patient-visual">
                <div className="phone-mockup">
                  <div className="phone-screen">
                    <div className="mock-header"></div>
                    <div className="mock-content">
                      <div className="mock-card"></div>
                      <div className="mock-card"></div>
                      <div className="mock-card small"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="solution-details">
              <h3>{t('solutions.patient.title')}</h3>
              <p className="solution-intro">
                {t('solutions.patient.intro')}
              </p>
              <ul className="solution-features">
                {(t('solutions.patient.features', { returnObjects: true }) as string[]).map((feature, index) => (
                  <li key={index}>
                    <span className="check-icon">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="compliance" id="compliance">
        <div className="compliance-content">
          <div className="compliance-badge">
            <div className="shield-icon">
              <ShieldCheck size={48} strokeWidth={2} />
            </div>
            <div className="compliance-text">
              <span className="compliance-title">{t('compliance.badge')}</span>
              <span className="compliance-subtitle">{t('compliance.badgeSubtitle')}</span>
            </div>
          </div>
          <h2 className="compliance-heading">
            {t('compliance.title')}
          </h2>
          <p className="compliance-description">
            {t('compliance.description')}
          </p>
          <div className="compliance-grid">
            <div className="compliance-item">
              <div className="compliance-icon">🇪🇺</div>
              <div className="compliance-label">{t('compliance.items.gdpr.label')}</div>
              <div className="compliance-detail">{t('compliance.items.gdpr.detail')}</div>
            </div>
            <div className="compliance-item">
              <div className="compliance-icon">🇺🇸</div>
              <div className="compliance-label">{t('compliance.items.hipaa.label')}</div>
              <div className="compliance-detail">{t('compliance.items.hipaa.detail')}</div>
            </div>
            <div className="compliance-item">
              <div className="compliance-icon compliance-icon-svg">
                <Lock size={40} strokeWidth={2} />
              </div>
              <div className="compliance-label">{t('compliance.items.soc2.label')}</div>
              <div className="compliance-detail">{t('compliance.items.soc2.detail')}</div>
            </div>
            <div className="compliance-item">
              <div className="compliance-icon compliance-icon-svg">
                <CheckCircle size={40} strokeWidth={2} />
              </div>
              <div className="compliance-label">{t('compliance.items.iso.label')}</div>
              <div className="compliance-detail">{t('compliance.items.iso.detail')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="cta-content">
          <h2 className="cta-title">{t('cta.title')}</h2>
          <p className="cta-subtitle">
            {t('cta.subtitle')}
          </p>
          <div className="cta-buttons">
            <a
              href="https://staging-medicare.eldrin.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-large"
            >
              {t('cta.ctaPrimary')}
              <span className="btn-icon">→</span>
            </a>
            <button className="btn btn-secondary btn-large">
              {t('cta.ctaSecondary')}
            </button>
          </div>
          <div className="cta-note">
            {t('cta.note')}
          </div>
        </div>
      </section>
    </div>
  );
}

export default PatientPage;
