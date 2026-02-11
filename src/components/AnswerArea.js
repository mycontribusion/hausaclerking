import React from 'react';

const AnswerArea = ({ text }) => {
    return (
        <div className='answer-area'>
            <p>{text}</p>
            <button className="audio-btn" onClick={() => alert('Audio files will be available soon, Insha\'Allah!')}>
                🔊 Audio
            </button>
        </div>
    );
};

export default AnswerArea;
