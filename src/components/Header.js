import React from 'react';
import ThemeToggle from '../ThemeToggle';
import logo from '../hclogo.jpg';

const Header = ({ onToggleFeedback }) => {
    return (
        <header className="twoheaders">
            <div className="header-brand">
                <h1 className="header-title">HausaClerking</h1>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <ThemeToggle />
                <button className="contactus" onClick={onToggleFeedback}>
                    <span style={{ fontSize: '0.8rem' }}>💬</span>
                </button>
            </div>
        </header>
    );
};

export default Header;
