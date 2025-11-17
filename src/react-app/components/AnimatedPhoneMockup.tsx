import { useEffect, useState } from 'react';
import './AnimatedPhoneMockup.css';

interface AnimatedPhoneMockupProps {
  screenshot: string;
  toolbar?: string;
  alt?: string;
}

function AnimatedPhoneMockup({ screenshot, toolbar, alt = 'App preview' }: AnimatedPhoneMockupProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation when component mounts
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`phone-mockup-container ${isVisible ? 'visible' : ''}`}>
      {/* Ambient glow effect */}
      <div className="phone-glow"></div>

      {/* Phone frame */}
      <div className="phone-frame">
        {/* Phone notch */}
        <div className="phone-notch">
          <div className="notch-camera"></div>
          <div className="notch-speaker"></div>
        </div>

        {/* Phone screen with scrolling content */}
        <div className="phone-screen">
          {/* Sticky toolbar */}
          {toolbar && (
            <div className="phone-toolbar">
              <img src={toolbar} alt="App navigation" />
            </div>
          )}

          <div className="scrolling-screenshot">
            <img src={screenshot} alt={alt} />
          </div>
        </div>

        {/* Phone button (side power button) */}
        <div className="phone-button"></div>
      </div>
    </div>
  );
}

export default AnimatedPhoneMockup;
