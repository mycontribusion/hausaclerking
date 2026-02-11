import React from 'react';
import SearchBar from '../SearchBar';

const Navigation = ({ activeTab, onTabChange, searchQuery, onSearchChange, onClearSearch }) => {
    const isSearching = searchQuery.trim().length > 0;

    return (
        <div className="tab-nav">
            <div className="tab-group">
                <button
                    className={`tab-btn ${activeTab === 'symptoms' && !isSearching ? 'active' : ''}`}
                    onClick={() => { onTabChange('symptoms'); }}
                    aria-label="Categories"
                    title="Categories"
                >
                    📚
                </button>
                <button
                    className={`tab-btn ${activeTab === 'favorites' && !isSearching ? 'active' : ''}`}
                    onClick={() => { onTabChange('favorites'); }}
                    aria-label="Favorites"
                    title="Favorites"
                >
                    ⭐
                </button>
                <button
                    className={`tab-btn ${activeTab === 'recent' && !isSearching ? 'active' : ''}`}
                    onClick={() => { onTabChange('recent'); }}
                    aria-label="Recent"
                    title="Recent"
                >
                    🕒
                </button>
            </div>
            <SearchBar
                searchQuery={searchQuery}
                onSearchChange={onSearchChange}
                onClear={onClearSearch}
            />
        </div>
    );
};

export default Navigation;
