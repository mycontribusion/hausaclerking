import React, { useState, useEffect } from 'react';

const AnswerArea = ({ text }) => {
    const [isSpeaking, setIsSpeaking] = useState(false);

    // Cancel speech when component unmounts or text changes
    useEffect(() => {
        return () => {
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
            }
        };
    }, [text]);

    const handleSpeak = () => {
        if ('speechSynthesis' in window) {
            // Cancel any ongoing speech
            window.speechSynthesis.cancel();
            setIsSpeaking(false);

            // Small delay to ensure the previous utterance is fully canceled
            setTimeout(() => {
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.lang = 'ha-NG'; // Hausa (Nigeria) locale

                // Attempt to find a native Nigerian/Hausa voice or default
                const voices = window.speechSynthesis.getVoices();
                const hausaVoice = voices.find(v => v.lang.includes('ha') || v.lang.includes('NG'));
                if (hausaVoice) utterance.voice = hausaVoice;

                utterance.rate = 0.9; // Slightly slower for clarity
                utterance.pitch = 1;

                utterance.onstart = () => setIsSpeaking(true);
                utterance.onend = () => setIsSpeaking(false);
                utterance.onerror = (e) => {
                    console.error("TTS Error:", e);
                    setIsSpeaking(false);
                };

                window.speechSynthesis.speak(utterance);

                // Fallback polling for browsers where events don't fire reliably
                setIsSpeaking(true);
                const checkInterval = setInterval(() => {
                    if (!window.speechSynthesis.speaking) {
                        setIsSpeaking(false);
                        clearInterval(checkInterval);
                    }
                }, 100);

            }, 50);
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
                disabled={isSpeaking}
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
                    <>🔊 Listen (AI)</>
                )}
            </button>
        </div>
    );
};

export default AnswerArea;
