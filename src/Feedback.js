import { useState } from "react";
import "./Feedback.css";

function Feedback() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailtoLink = `mailto:ahmadmusa1114@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="feedback-container">
      <header>
        <h2>Feedback & Support</h2>
        <p>💡 Found a bug? Have suggestions? Share your thoughts below.</p>
      </header>

      <form onSubmit={handleSubmit} className="feedback-form">
        <div className="form-group">
          <label htmlFor="subject">Subject (optional)</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Enter subject (optional)"
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your feedback here..."
            required
          ></textarea>
        </div>

        <button type="submit" className="submit-btn">
          <span>📩 Send Feedback</span>
        </button>
      </form>
    </div>
  );
}

export default Feedback;
