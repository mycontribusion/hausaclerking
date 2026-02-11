import CategoryList from './components/CategoryList';
import QuestionList from './components/QuestionList';

function Buttons({ viewState, data, actions }) {
    const { buttonArea, isSearching, symptomsId } = viewState;
    const { buttonsData, favorites, recentItems, globalSearchResults, currentQuestions } = data;
    const { enterCategory, showHausa, toggleFavorite, isFavorited, setButtonArea } = actions;

    return (
        <div className='cqdiv'>
            {isSearching ? (
                /* Global Search Results */
                <QuestionList
                    questions={globalSearchResults}
                    onSelectQuestion={showHausa}
                    onToggleFavorite={toggleFavorite}
                    isFavorited={isFavorited}
                    showCategoryBadge={true}
                    emptyMessage="No results found."
                />
            ) : (
                /* Tab Content */
                <>
                    {buttonArea === 'symptoms' && (
                        <CategoryList
                            categories={buttonsData}
                            onSelectCategory={enterCategory}
                        />
                    )}

                    {buttonArea === 'questions' && (
                        <QuestionList
                            questions={currentQuestions}
                            onSelectQuestion={showHausa}
                            onToggleFavorite={toggleFavorite}
                            isFavorited={isFavorited}
                            currentCategoryId={symptomsId}
                        />
                    )}

                    {buttonArea === 'favorites' && (
                        <QuestionList
                            questions={favorites}
                            onSelectQuestion={showHausa}
                            onToggleFavorite={toggleFavorite}
                            isFavorited={isFavorited}
                            showCategoryBadge={true}
                            emptyMessage="No favorites yet. Tap the ☆ icon to add phrases!"
                        />
                    )}

                    {buttonArea === 'recent' && (
                        <QuestionList
                            questions={recentItems}
                            onSelectQuestion={showHausa}
                            onToggleFavorite={toggleFavorite}
                            isFavorited={isFavorited}
                            showCategoryBadge={true}
                            emptyMessage="No recent phrases yet."
                        />
                    )}
                </>
            )}
        </div>
    );
}

export default Buttons;