import { useState } from "react";
import Buttons from "./Buttons";
import Feedback from "./Feedback";
import logo from './hclogo.jpg';
import "./HausaClerking.css"; // for styling

function HausaClerking() {
  const [showFeedback, setShowFeedback] = useState(false);

  const toggleFeedback = () => {
    setShowFeedback(!showFeedback);
  };

  return (
    <div className="appwin">
      <div className="twoheaders">
        <div className="img">
          <img src={logo} alt="logo" width="70px" height="70px" />
        </div>
        <div className="contactus" onClick={toggleFeedback}>
          Contact-us
        </div>
      </div>

      <div>
        <Buttons />
      </div>

      {/* Feedback overlay */}
      {showFeedback && (
        <div className="feedback-overlay">
          <div className="feedback-popup">
            <Feedback />
            <button className="close-btn" onClick={toggleFeedback}>
              ✖ Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HausaClerking;
