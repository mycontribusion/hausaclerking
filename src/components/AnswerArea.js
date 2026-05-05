import React, { useState, useEffect } from 'react';

const AnswerArea = ({ text }) => {
    const [voices, setVoices] = useState([]);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isSupported, setIsSupported] = useState(true);

    useEffect(() => {
        if (!('speechSynthesis' in window)) {
            setIsSupported(false);
            return;
        }
        const loadVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            setVoices(availableVoices);
        };

        loadVoices();
        if ('speechSynthesis' in window) {
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }

        return () => {
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
            }
        };
    }, [text]);

    const handleSpeak = () => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);

            setTimeout(() => {
                const utterance = new SpeechSynthesisUtterance(text);

                // Try to find the best voice
                // 1. Exact match for Hausa Nigeria
                // 2. Any Hausa
                // 3. Any English (often good for phonetics if Hausa is missing)
                // 4. Default
                let selectedVoice = voices.find(v => v.lang === 'ha-NG') ||
                    voices.find(v => v.lang.includes('ha')) ||
                    voices.find(v => v.lang.includes('en-GB')) ||
                    voices.find(v => v.lang.includes('en'));

                if (selectedVoice) {
                    utterance.voice = selectedVoice;
                    utterance.lang = selectedVoice.lang;
                } else {
                    utterance.lang = 'ha-NG';
                }

                utterance.rate = 0.85; // Slightly slower for better clarity
                utterance.pitch = 1;

                utterance.onstart = () => setIsSpeaking(true);
                utterance.onend = () => setIsSpeaking(false);
                utterance.onerror = () => setIsSpeaking(false);

                window.speechSynthesis.speak(utterance);
            }, 100);
        } else {
            alert("Sorry, your browser doesn't support text-to-speech.");
        }
    };

    return (
        <div className='answer-area'>
            <p className={isSpeaking ? 'text-glow' : ''}>{text}</p>
            <button
                className={`audio-btn ${isSpeaking ? 'speaking' : ''}`}
                onClick={handleSpeak}
                disabled={isSpeaking || !isSupported}
            >
                {isSpeaking ? (
                    <>
                        <span className="wave-icon">
                            <span className="bar"></span>
                            <span className="bar"></span>
                            <span className="bar"></span>
                        </span>
                        Speaking...
                    </>
                ) : (
                    <>🔊 Listen</>
                )}
            </button>
            {!isSupported && (
                <p style={{ fontSize: '0.8rem', color: '#ef4444', marginTop: '0.5rem' }}>
                    ⚠️ Your browser does not support audio playback.
                </p>
            )}
        </div>
    );
};

export default AnswerArea;
