import { useState, useEffect } from 'react';
import buttonsData from './buttonsData.json';
import SearchBar from './SearchBar';

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
    'UGS': '🩺'
};

function Buttons() {
    const [buttonArea, setButtonArea] = useState('symptoms');
    const [symptomsId, setSymptomsId] = useState(1);
    const [answerArea, setAnswerArea] = useState('Hausa text are pronounced exactly as they are written');
    const [searchQuery, setSearchQuery] = useState('');
    const [favorites, setFavorites] = useState([]);
    const [recentItems, setRecentItems] = useState([]);

    // Load favorites and recent from localStorage
    useEffect(() => {
        const savedFavorites = localStorage.getItem('hausaFavorites');
        const savedRecent = localStorage.getItem('hausaRecent');
        if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
        if (savedRecent) setRecentItems(JSON.parse(savedRecent));
    }, []);

    // Save favorites to localStorage
    useEffect(() => {
        localStorage.setItem('hausaFavorites', JSON.stringify(favorites));
    }, [favorites]);

    // Save recent to localStorage
    useEffect(() => {
        localStorage.setItem('hausaRecent', JSON.stringify(recentItems));
    }, [recentItems]);

    const showHausa = (qposition, categoryId = symptomsId) => {
        let question = buttonsData[categoryId - 1].questions.find(q => q.id === qposition);
        if (question) {
            setAnswerArea(question.hausa);
            addToRecent({ ...question, categoryId, categoryName: buttonsData[categoryId - 1].eng });
        }
    };

    const enterCategory = (position) => {
        setButtonArea('questions');
        setSymptomsId(position);
        setSearchQuery('');
    };

    const goBack = () => {
        setButtonArea('symptoms');
        setAnswerArea('Hausa text are pronounced exactly as they are written');
        setSearchQuery('');
    };

    const toggleFavorite = (question, categoryId) => {
        const favoriteItem = { ...question, categoryId, categoryName: buttonsData[categoryId - 1].eng };
        const isFavorited = favorites.some(fav => fav.id === question.id && fav.categoryId === categoryId);

        if (isFavorited) {
            setFavorites(favorites.filter(fav => !(fav.id === question.id && fav.categoryId === categoryId)));
        } else {
            setFavorites([...favorites, favoriteItem]);
        }
    };

    const addToRecent = (item) => {
        const newRecent = [item, ...recentItems.filter(r => !(r.id === item.id && r.categoryId === item.categoryId))].slice(0, 10);
        setRecentItems(newRecent);
    };

    const isFavorited = (questionId, categoryId) => {
        return favorites.some(fav => fav.id === questionId && fav.categoryId === categoryId);
    };

    // Filter questions based on search
    const getFilteredQuestions = () => {
        if (!searchQuery.trim()) {
            return buttonsData[symptomsId - 1].questions;
        }
        return buttonsData[symptomsId - 1].questions.filter(q =>
            q.eng.toLowerCase().includes(searchQuery.toLowerCase()) ||
            q.hausa.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    // Search across all categories
    const getSearchResults = () => {
        if (!searchQuery.trim()) return [];

        const results = [];
        buttonsData.forEach(category => {
            category.questions.forEach(question => {
                if (
                    question.eng.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    question.hausa.toLowerCase().includes(searchQuery.toLowerCase())
                ) {
                    results.push({
                        ...question,
                        categoryId: category.id,
                        categoryName: category.eng
                    });
                }
            });
        });
        return results;
    };

    // Filter categories based on search
    const getFilteredCategories = () => {
        if (!searchQuery.trim()) {
            return buttonsData;
        }
        return buttonsData.filter(category =>
            category.eng.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    // Filter favorites based on search
    const getFilteredFavorites = () => {
        if (!searchQuery.trim()) {
            return favorites;
        }
        return favorites.filter(item =>
            item.eng.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.hausa.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    // Filter recent items based on search
    const getFilteredRecent = () => {
        if (!searchQuery.trim()) {
            return recentItems;
        }
        return recentItems.filter(item =>
            item.eng.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.hausa.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
        );
    };

    const filteredCategories = getFilteredCategories();
    const filteredFavorites = getFilteredFavorites();
    const filteredRecentItems = getFilteredRecent();

    const symptomsButtons = filteredCategories.map((item) => (
        <button key={item.id} onClick={() => enterCategory(item.id)} className="category-card">
            <span className="category-icon">{categoryIcons[item.eng] || '✨'}</span>
            <span className="category-label">{item.eng}</span>
        </button>
    ));

    const filteredQuestions = getFilteredQuestions();
    const searchResults = getSearchResults();

    const questionButtons = filteredQuestions.map((qItem) => (
        <button key={qItem.id} onClick={() => showHausa(qItem.id)} className="question-card">
            <span className="question-text">{qItem.eng}</span>
            <button
                className={`favorite-btn ${isFavorited(qItem.id, symptomsId) ? 'favorited' : ''}`}
                onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(qItem, symptomsId);
                }}
                aria-label="Toggle favorite"
            >
                {isFavorited(qItem.id, symptomsId) ? '⭐' : '☆'}
            </button>
        </button>
    ));

    const searchResultButtons = searchResults.map((item) => (
        <button key={`${item.categoryId}-${item.id}`} onClick={() => showHausa(item.id, item.categoryId)} className="question-card search-result">
            <span className="question-text">{item.eng}</span>
            <span className="category-badge">{item.categoryName}</span>
            <button
                className={`favorite-btn ${isFavorited(item.id, item.categoryId) ? 'favorited' : ''}`}
                onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(item, item.categoryId);
                }}
                aria-label="Toggle favorite"
            >
                {isFavorited(item.id, item.categoryId) ? '⭐' : '☆'}
            </button>
        </button>
    ));

    const favoriteButtons = filteredFavorites.map((item) => (
        <button key={`fav-${item.categoryId}-${item.id}`} onClick={() => showHausa(item.id, item.categoryId)} className="question-card">
            <span className="question-text">{item.eng}</span>
            <span className="category-badge">{item.categoryName}</span>
            <button
                className="favorite-btn favorited"
                onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(item, item.categoryId);
                }}
                aria-label="Remove favorite"
            >
                ⭐
            </button>
        </button>
    ));

    const recentButtons = filteredRecentItems.map((item, index) => (
        <button key={`recent-${index}`} onClick={() => showHausa(item.id, item.categoryId)} className="question-card">
            <span className="question-text">{item.eng}</span>
            <span className="category-badge">{item.categoryName}</span>
            <button
                className={`favorite-btn ${isFavorited(item.id, item.categoryId) ? 'favorited' : ''}`}
                onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(item, item.categoryId);
                }}
                aria-label="Toggle favorite"
            >
                {isFavorited(item.id, item.categoryId) ? '⭐' : '☆'}
            </button>
        </button>
    ));

    return (
        <section className='ansque'>
            <div className='answer-area'>
                <p>{answerArea}</p>
                <button className="audio-btn" onClick={() => alert('Audio files will be available soon, Insha\'Allah!')}>
                    🔊 Audio
                </button>
            </div>
            <div className='buttons'>
                {/* Tab Navigation with Search - All on one line */}
                <div className="tab-nav">
                    <div className="tab-group">
                        <button
                            className={`tab-btn ${buttonArea === 'symptoms' ? 'active' : ''}`}
                            onClick={() => { setButtonArea('symptoms'); setSearchQuery(''); }}
                            aria-label="Categories"
                            title="Categories"
                        >
                            📚
                        </button>
                        <button
                            className={`tab-btn ${buttonArea === 'favorites' ? 'active' : ''}`}
                            onClick={() => { setButtonArea('favorites'); setSearchQuery(''); }}
                            aria-label="Favorites"
                            title="Favorites"
                        >
                            ⭐
                        </button>
                        <button
                            className={`tab-btn ${buttonArea === 'recent' ? 'active' : ''}`}
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
                {buttonArea === 'symptoms' && (
                    <div className='cqdiv'>
                        {symptomsButtons.length > 0 ? (
                            symptomsButtons
                        ) : (
                            <div className="no-results">No categories found for "{searchQuery}"</div>
                        )}
                    </div>
                )}

                {buttonArea === 'questions' && (
                    <div className='cqdiv'>
                        {searchQuery.trim() ? (
                            searchResultButtons.length > 0 ? (
                                searchResultButtons
                            ) : (
                                <div className="no-results">No results found for "{searchQuery}"</div>
                            )
                        ) : (
                            questionButtons
                        )}
                    </div>
                )}

                {buttonArea === 'favorites' && (
                    <div className='cqdiv'>
                        {favoriteButtons.length > 0 ? (
                            favoriteButtons
                        ) : (
                            searchQuery.trim() ? (
                                <div className="no-results">No favorites found for "{searchQuery}"</div>
                            ) : (
                                <div className="no-results">No favorites yet. Tap the ☆ icon to add phrases!</div>
                            )
                        )}
                    </div>
                )}

                {buttonArea === 'recent' && (
                    <div className='cqdiv'>
                        {recentButtons.length > 0 ? (
                            recentButtons
                        ) : (
                            searchQuery.trim() ? (
                                <div className="no-results">No recent items found for "{searchQuery}"</div>
                            ) : (
                                <div className="no-results">No recent phrases yet.</div>
                            )
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}

export default Buttons;