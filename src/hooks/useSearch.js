import { useState } from 'react';
import buttonsData from '../buttonsData.json';

const useSearch = (favorites, recentItems) => {
    const [searchQuery, setSearchQuery] = useState('');

    // Normalize string for case-insensitive search
    const normalize = (str) => str ? str.toLowerCase() : '';

    // Search across all categories (Global Search)
    const getGlobalSearchResults = () => {
        if (!searchQuery.trim()) return [];

        const results = [];
        const query = normalize(searchQuery);

        buttonsData.forEach(category => {
            if (category.questions) {
                category.questions.forEach(question => {
                    if (
                        normalize(question.eng).includes(query) ||
                        normalize(question.hausa).includes(query)
                    ) {
                        results.push({
                            ...question,
                            categoryId: category.id,
                            categoryName: category.eng
                        });
                    }
                });
            }
        });
        return results;
    };

    // Filter categories based on search
    const getFilteredCategories = () => {
        if (!searchQuery.trim()) {
            return buttonsData;
        }
        const query = normalize(searchQuery);
        return buttonsData.filter(category =>
            normalize(category.eng).includes(query)
        );
    };

    // Filter questions within a specific category
    const getFilteredQuestions = (categoryId) => {
        const category = buttonsData.find(c => c.id === categoryId);
        if (!category) return [];

        if (!searchQuery.trim()) {
            return category.questions;
        }
        const query = normalize(searchQuery);
        return category.questions.filter(q =>
            normalize(q.eng).includes(query) ||
            normalize(q.hausa).includes(query)
        );
    };

    // Filter favorites based on search
    const getFilteredFavorites = () => {
        if (!searchQuery.trim()) {
            return favorites;
        }
        const query = normalize(searchQuery);
        return favorites.filter(item =>
            normalize(item.eng).includes(query) ||
            normalize(item.hausa).includes(query) ||
            normalize(item.categoryName).includes(query)
        );
    };

    // Filter recent items based on search
    const getFilteredRecent = () => {
        if (!searchQuery.trim()) {
            return recentItems;
        }
        const query = normalize(searchQuery);
        return recentItems.filter(item =>
            normalize(item.eng).includes(query) ||
            normalize(item.hausa).includes(query) ||
            normalize(item.categoryName).includes(query)
        );
    };

    return {
        searchQuery,
        setSearchQuery,
        getGlobalSearchResults,
        getFilteredCategories,
        getFilteredQuestions,
        getFilteredFavorites,
        getFilteredRecent
    };
};

export default useSearch;
