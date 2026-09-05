import React from 'react';

const formatSentence = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const QuestionList = ({
    questions,
    onSelectQuestion,
    onToggleFavorite,
    isFavorited,
    activeQuestionId = null,
    currentCategoryId = null,
    showCategoryBadge = false,
    emptyMessage = "No items found."
}) => {
    if (questions.length === 0) {
        return <div className="no-results">{emptyMessage}</div>;
    }

    return (
        <>
            {questions.map((item) => {
                // Determine unique key based on context
                const key = item.categoryId
                    ? `${item.categoryId}-${item.id}`
                    : item.id;

                const categoryId = item.categoryId || currentCategoryId;
                const isItemFavorited = isFavorited ? isFavorited(item.id, categoryId) : false;

                return (
                    <div
                        key={key}
                        role="button"
                        tabIndex={0}
                        onClick={() => onSelectQuestion(item.id, categoryId)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                onSelectQuestion(item.id, categoryId);
                            }
                        }}
                        className={`question-card ${showCategoryBadge ? 'search-result' : ''} ${item.id === activeQuestionId ? 'active' : ''}`}
                    >
                        {onToggleFavorite && (
                            <button
                                type="button"
                                className={`favorite-btn ${isItemFavorited ? 'favorited' : ''}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onToggleFavorite(item, categoryId);
                                }}
                                aria-label={isItemFavorited ? "Remove from favorites" : "Add to favorites"}
                            >
                                <svg
                                    className="star-svg"
                                    viewBox="0 0 24 24"
                                    width="15"
                                    height="15"
                                    fill={isItemFavorited ? "#facc15" : "none"}
                                    stroke={isItemFavorited ? "#facc15" : "currentColor"}
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                </svg>
                            </button>
                        )}

                        <span className="question-text">{formatSentence(item.eng)}</span>

                        {showCategoryBadge && item.categoryName && (
                            <span className="category-badge">{item.categoryName}</span>
                        )}
                    </div>
                );
            })}
        </>
    );
};

export default QuestionList;
