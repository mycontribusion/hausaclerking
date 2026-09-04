import { useState, useEffect } from 'react';
import buttonsData from '../buttonsData.json';

const usePersistence = () => {
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

    const toggleFavorite = (question, categoryId) => {
        // Find category name if not provided in question object
        let categoryName = question.categoryName;
        if (!categoryName) {
            const category = buttonsData.find(c => c.id === categoryId);
            categoryName = category ? category.eng : '';
        }

        const favoriteItem = { ...question, categoryId, categoryName };
        const isFavorited = favorites.some(fav => fav.id === question.id && fav.categoryId === categoryId);

        if (isFavorited) {
            setFavorites(favorites.filter(fav => !(fav.id === question.id && fav.categoryId === categoryId)));
        } else {
            setFavorites([...favorites, favoriteItem]);
        }
    };

    const addToRecent = (item) => {
        // Prevent duplicates at the top, move to top if exists
        const filteredRecent = recentItems.filter(r => !(r.id === item.id && r.categoryId === item.categoryId));
        const newRecent = [item, ...filteredRecent].slice(0, 10);
        setRecentItems(newRecent);
    };

    const isFavorited = (questionId, categoryId) => {
        return favorites.some(fav => fav.id === questionId && fav.categoryId === categoryId);
    };

    return {
        favorites,
        recentItems,
        toggleFavorite,
        addToRecent,
        isFavorited
    };
};

export default usePersistence;
