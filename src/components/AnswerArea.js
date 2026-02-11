import React from 'react';

const AnswerArea = ({ text }) => {
    const handleSpeak = () => {
        if ('speechSynthesis' in window) {
            // Cancel any ongoing speech
            window.speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'ha-NG'; // Hausa (Nigeria) locale

            // Optional: Adjust rate/pitch if needed
            utterance.rate = 0.9;
            utterance.pitch = 1;

            window.speechSynthesis.speak(utterance);
        } else {
            alert("Sorry, your browser doesn't support text-to-speech.");
        }
    };

    return (
        <div className='answer-area'>
            <p>{text}</p>
            <button className="audio-btn" onClick={handleSpeak}>
                🔊 Listen (AI)
            </button>
        </div>
    );
};

export default AnswerArea;
