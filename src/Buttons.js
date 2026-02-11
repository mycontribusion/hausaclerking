import { useState } from 'react';
import usePersistence from './hooks/usePersistence';
import useSearch from './hooks/useSearch';
import CategoryList from './components/CategoryList';
import QuestionList from './components/QuestionList';
import SearchBar from './SearchBar';
import buttonsData from './buttonsData.json';

function Buttons() {
    const [buttonArea, setButtonArea] = useState('symptoms');
    const [symptomsId, setSymptomsId] = useState(1);
    const [answerArea, setAnswerArea] = useState('Hausa text are pronounced exactly as they are written');

    // Hooks
    const {
        favorites,
        recentItems,
        toggleFavorite,
        addToRecent,
        isFavorited
    } = usePersistence();

    const {
        searchQuery,
        setSearchQuery,
        getGlobalSearchResults,
        getFilteredQuestions,
    } = useSearch(favorites, recentItems);

    const showHausa = (questionId, categoryId = symptomsId) => {
        // Find the question and category
        let question;
        let categoryName;

        // Try to find in the current category first (optimization)
        const currentCategory = buttonsData.find(c => c.id === categoryId);
        if (currentCategory) {
            question = currentCategory.questions.find(q => q.id === questionId);
            categoryName = currentCategory.eng;
        }

        // If not found (e.g. from global search result where categoryId might differ), search all
        if (!question) {
            for (const cat of buttonsData) {
                const q = cat.questions.find(q => q.id === questionId);
                if (q) {
                    question = q;
                    categoryName = cat.eng;
                    break;
                }
            }
        }

        if (question) {
            setAnswerArea(question.hausa);
            addToRecent({ ...question, categoryId, categoryName });
        }
    };

    const enterCategory = (categoryId) => {
        setButtonArea('questions');
        setSymptomsId(categoryId);
        setSearchQuery('');
    };

    // Derived Logic
    const isSearching = searchQuery.trim().length > 0;
    const globalSearchResults = isSearching ? getGlobalSearchResults() : [];

    return (
        <section className='ansque'>
            <div className='answer-area'>
                <p>{answerArea}</p>
                <button className="audio-btn" onClick={() => alert('Audio files will be available soon, Insha\'Allah!')}>
                    🔊 Audio
                </button>
            </div>
            <div className='buttons'>
                {/* Tab Navigation with Search */}
                <div className="tab-nav">
                    <div className="tab-group">
                        <button
                            className={`tab-btn ${buttonArea === 'symptoms' && !isSearching ? 'active' : ''}`}
                            onClick={() => { setButtonArea('symptoms'); setSearchQuery(''); }}
                            aria-label="Categories"
                            title="Categories"
                        >
                            📚
                        </button>
                        <button
                            className={`tab-btn ${buttonArea === 'favorites' && !isSearching ? 'active' : ''}`}
                            onClick={() => { setButtonArea('favorites'); setSearchQuery(''); }}
                            aria-label="Favorites"
                            title="Favorites"
                        >
                            ⭐
                        </button>
                        <button
                            className={`tab-btn ${buttonArea === 'recent' && !isSearching ? 'active' : ''}`}
                            onClick={() => { setButtonArea('recent'); setSearchQuery(''); }}
                            aria-label="Recent"
                            title="Recent"
                        >
                            🕒
                        </button>
                    </div>
                    <SearchBar
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                        onClear={() => setSearchQuery('')}
                    />
                </div>

                {/* Content Area */}
                <div className='cqdiv'>
                    {isSearching ? (
                        /* Global Search Results */
                        <QuestionList
                            questions={globalSearchResults}
                            onSelectQuestion={showHausa}
                            onToggleFavorite={toggleFavorite}
                            isFavorited={isFavorited}
                            showCategoryBadge={true}
                            emptyMessage={`No results found for "${searchQuery}"`}
                        />
                    ) : (
                        /* Tab Content */
                        <>
                            {buttonArea === 'symptoms' && (
                                <CategoryList
                                    categories={buttonsData} // We are showing all categories here, filtering only applies if searching which is handled above
                                    onSelectCategory={enterCategory}
                                />
                            )}

                            {buttonArea === 'questions' && (
                                <>
                                    <button
                                        className="back-btn"
                                        onClick={() => setButtonArea('symptoms')}
                                        style={{ marginBottom: '10px', padding: '5px 10px', cursor: 'pointer' }}
                                    >
                                        ← Back to Categories
                                    </button>
                                    <QuestionList
                                        questions={getFilteredQuestions(symptomsId)}
                                        onSelectQuestion={showHausa}
                                        onToggleFavorite={toggleFavorite}
                                        isFavorited={isFavorited}
                                        currentCategoryId={symptomsId}
                                    />
                                </>
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
            </div>
        </section>
    );
}

export default Buttons;