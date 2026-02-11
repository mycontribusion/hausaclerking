import React from 'react';
import ThemeToggle from '../ThemeToggle';
import logo from '../hclogo.jpg';

const Header = ({ onToggleFeedback }) => {
    return (
        <header className="twoheaders">
            <div className="img">
                <img src={logo} alt="Hausa Clerking Logo" className="header-logo" />
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <ThemeToggle />
                <button className="contactus" onClick={onToggleFeedback}>
                    <span style={{ fontSize: '0.9rem' }}>💬</span>
                </button>
            </div>
        </header>
    );
};

export default Header;
