import { useState } from "react";
import Buttons from "./Buttons";
import Feedback from "./Feedback";
import Header from "./components/Header";
import AnswerArea from "./components/AnswerArea";
import Navigation from "./components/Navigation";
import usePersistence from './hooks/usePersistence';
import useSearch from './hooks/useSearch';
import buttonsData from './buttonsData.json';

function HausaClerking() {
  const [showFeedback, setShowFeedback] = useState(false);
  const [buttonArea, setButtonArea] = useState('symptoms');
  const [symptomsId, setSymptomsId] = useState(1);
  const [answerArea, setAnswerArea] = useState('Hausa text are pronounced exactly as they are written');

  const toggleFeedback = () => {
    setShowFeedback(!showFeedback);
  };

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

  // Handlers
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

    // If not found (e.g. from global search result), search all
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

  const handleTabChange = (tab) => {
    setButtonArea(tab);
    setSearchQuery('');
  }

  // Derived Logic for passing to Buttons
  const isSearching = searchQuery.trim().length > 0;
  const globalSearchResults = isSearching ? getGlobalSearchResults() : [];
  const currentQuestions = buttonArea === 'questions' ? getFilteredQuestions(symptomsId) : [];

  return (
    <div className="appwin">
      <div style={{ position: "relative" }}>
        <Header onToggleFeedback={toggleFeedback} />
      </div>

      <main className="ansque">
        <AnswerArea text={answerArea} />

        <div className="buttons">
          <Navigation
            activeTab={buttonArea}
            onTabChange={handleTabChange}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onClearSearch={() => setSearchQuery('')}
          />

          <Buttons
            viewState={{
              buttonArea,
              isSearching,
              symptomsId
            }}
            data={{
              buttonsData,
              favorites,
              recentItems,
              globalSearchResults,
              currentQuestions
            }}
            actions={{
              enterCategory,
              showHausa,
              toggleFavorite,
              isFavorited,
              setButtonArea
            }}
          />
        </div>
      </main>

      {/* Feedback overlay */}
      {showFeedback && (
        <div className="feedback-overlay" onClick={toggleFeedback}>
          <div className="feedback-popup" onClick={(e) => e.stopPropagation()}>
            <Feedback />
            <button className="close-btn" onClick={toggleFeedback} aria-label="Close">
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HausaClerking;

