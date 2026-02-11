import React from 'react';

const categoryIcons = {
    'greetings': '👋',
    'biodata': '📋',
    'fever': '🤒',
    'cough': '😷',
    'pain': '😫',
    'swelling': '🦵',
    'CNS': '🧠',
    'RS': '🫁',
    'GIT': '🤢',
    'CVS': '❤️',
    'GUS': '🩺'
};

const CategoryList = ({ categories, onSelectCategory }) => {
    if (categories.length === 0) {
        return <div className="no-results">No categories found.</div>;
    }

    return (
        <>
            {categories.map((item) => (
                <button
                    key={item.id}
                    onClick={() => onSelectCategory(item.id)}
                    className="category-card"
                >
                    <span className="category-icon">{categoryIcons[item.eng] || '✨'}</span>
                    <span className="category-label">{item.eng}</span>
                </button>
            ))}
        </>
    );
};

export default CategoryList;
