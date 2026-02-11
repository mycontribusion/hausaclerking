import React from 'react';

const QuestionList = ({
    questions,
    onSelectQuestion,
    onToggleFavorite,
    isFavorited,
    currentCategoryId = null,
    showCategoryBadge = false,
    emptyMessage = "No items found."
}) => {
    if (questions.length === 0) {
        return <div className="no-results">{emptyMessage}</div>;
    }

    return (
        <>
            {questions.map((item, index) => {
                // Determine unique key based on context
                const key = item.categoryId
                    ? `${item.categoryId}-${item.id}`
                    : item.id;

                // Determine category ID to use for favoritism check
                const categoryId = item.categoryId || currentCategoryId;
                const isItemFavorited = isFavorited(item.id, categoryId);

                return (
                    <button
                        key={key}
                        onClick={() => onSelectQuestion(item.id, categoryId)}
                        className={`question-card ${showCategoryBadge ? 'search-result' : ''}`}
                    >
                        <span className="question-text">{item.eng}</span>

                        {showCategoryBadge && item.categoryName && (
                            <span className="category-badge">{item.categoryName}</span>
                        )}

                        <button
                            className={`favorite-btn ${isItemFavorited ? 'favorited' : ''}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                onToggleFavorite(item, categoryId);
                            }}
                            aria-label={isItemFavorited ? "Remove from favorites" : "Add to favorites"}
                        >
                            {isItemFavorited ? '⭐' : '☆'}
                        </button>
                    </button>
                );
            })}
        </>
    );
};

export default QuestionList;
