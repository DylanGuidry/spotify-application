import React from 'react';
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS
import { useState, useEffect } from 'react';

function SearchBar() {
    const [searchInput, setSearchInput] = useState("");
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    function handleKeyDown(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit();
        }
    }

    function handleSubmit() {
        console.log('Search for:', searchInput);
    }

    return (
        <div className="flex items-center">
            <input
                className="bg-gray-200 rounded-l-lg px-10 py-2 focus:outline-none"
                type="text"
                placeholder="Search..."
                // value={searchInput}
                onClick={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button onClick={handleSubmit} className="bg-green-500 text-white rounded-r-lg px-10 py-2 ml-1 hover:bg-green-600">
                Search
            </button>
        </div>
    );
}

export default SearchBar;
