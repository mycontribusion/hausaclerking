import logo from './hclogo.jpg';
import './WelcomePage.css';

function WelcomePage({ openApp }) {
    return (
        <div className="welcome-screen" onClick={openApp}>
            <header className="welcome-header">
                <h1>Hausa Clerking</h1>
            </header>
            <div className="welcome-logo">
                <img src={logo} alt="Hausa Clerking Logo" />
            </div>
            <footer className="welcome-footer">
                <p id="foot">Tap anywhere to begin</p>
            </footer>
        </div>
    );
}

export default WelcomePage;