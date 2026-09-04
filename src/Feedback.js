import "./Feedback.css";

function Feedback() {
  return (
    <div className="feedback-container">
      <header>
        <h2>Connect with Developer</h2>
        <p>💡 Found a bug or have suggestions? Reach out directly!</p>
      </header>

      <div className="contact-links" style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1rem" }}>
        <a
          href="mailto:ahmadmusamuhd@gmail.com"
          className="submit-btn"
          style={{ textDecoration: 'none', textAlign: 'center', display: 'block' }}
        >
          <span>📧 Send an Email</span>
        </a>

        <a
          href="https://wa.me/2347030061764"
          target="_blank"
          rel="noopener noreferrer"
          className="submit-btn"
          style={{ textDecoration: 'none', textAlign: 'center', display: 'block', background: '#25D366' }}
        >
          <span>📱 Chat on WhatsApp</span>
        </a>

        <a
          href="https://www.linkedin.com/in/ahmad-m-musa-b93587156/"
          target="_blank"
          rel="noopener noreferrer"
          className="submit-btn"
          style={{ textDecoration: 'none', textAlign: 'center', display: 'block', background: '#0077b5' }}
        >
          <span>💼 Connect on LinkedIn</span>
        </a>
      </div>
    </div>
  );
}

export default Feedback;
