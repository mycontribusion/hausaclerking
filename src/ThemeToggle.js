import { useState, useEffect } from 'react';

function ThemeToggle() {
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        // Load saved theme
        const savedTheme = localStorage.getItem('hausaTheme');
        if (savedTheme === 'light') {
            setIsDark(false);
            document.body.classList.add('light-mode');
        } else {
            setIsDark(true);
            document.body.classList.remove('light-mode');
        }
    }, []);

    const toggleTheme = () => {
        const newIsDark = !isDark;
        setIsDark(newIsDark);

        if (newIsDark) {
            document.body.classList.remove('light-mode');
            localStorage.setItem('hausaTheme', 'dark');
        } else {
            document.body.classList.add('light-mode');
            localStorage.setItem('hausaTheme', 'light');
        }
    };

    return (
        <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
        >
            {isDark ? '☀️' : '🌙'}
        </button>
    );
}

export default ThemeToggle;
