import { useState } from "react";
import Buttons from "./Buttons";
import Feedback from "./Feedback";
import ThemeToggle from "./ThemeToggle";
import logo from './hclogo.jpg';

function HausaClerking() {
  const [showFeedback, setShowFeedback] = useState(false);

  const toggleFeedback = () => {
    setShowFeedback(!showFeedback);
  };

  return (
    <div className="appwin">
      <header className="twoheaders">
        <div className="img">
          <img src={logo} alt="Hausa Clerking Logo" className="header-logo" />
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <ThemeToggle />
          <button className="contactus" onClick={toggleFeedback}>
            <span style={{ fontSize: '1.1rem' }}>💬</span>
          </button>
        </div>
      </header>

      <main className="main-content"><p></p>
        <Buttons />
      </main>

      {/* Feedback overlay */}
      {showFeedback && (
        <div className="feedback-overlay" onClick={toggleFeedback}>
          <div className="feedback-popup" onClick={(e) => e.stopPropagation()}>
            <Feedback />
            <button className="close-btn" onClick={toggleFeedback} aria-label="Close">
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HausaClerking;
