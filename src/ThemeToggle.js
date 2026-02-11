import { useState, useEffect } from 'react';

function ThemeToggle() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        // Load saved theme
        const savedTheme = localStorage.getItem('hausaTheme');
        if (savedTheme === 'dark') {
            setIsDark(true);
            document.body.classList.add('dark-mode');
        }
    }, []);

    const toggleTheme = () => {
        const newIsDark = !isDark;
        setIsDark(newIsDark);

        if (newIsDark) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('hausaTheme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
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
