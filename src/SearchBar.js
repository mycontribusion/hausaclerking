import './SearchBar.css';

function SearchBar({ searchQuery, onSearchChange, onClear }) {
    return (
        <div className="search-container">
            <div className="search-wrapper">
                <span className="search-icon">🔍</span>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search phrases..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
                {searchQuery && (
                    <button className="search-clear" onClick={onClear} aria-label="Clear search">
                        ✕
                    </button>
                )}
            </div>
        </div>
    );
}

export default SearchBar;
