import React, { useState, useEffect } from 'react';

function SearchBar() {
    const [searchInput, setSearchInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (searchInput.trim() === "") {
            setSuggestions([]);
            return;
        }

        // Fetch suggestions from Spotify API
        const clientId = '8f8ae68895644b68bf7b431a73bef6ac';
        const clientSecret = '767e143614b5498fa36527569454ce19';
        const tokenEndpoint = 'https://accounts.spotify.com/api/token';

        // Fetch access token
        fetch(tokenEndpoint, {
            method: 'POST',
            headers: {
                // Encode client ID and client secret
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
            },
            body: 'grant_type=client_credentials'
        })
        .then(response => response.json())
        .then(data => {
            const accessToken = data.access_token;
            const apiUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchInput)}&type=artist&market=US&limit=5`;

            fetch(apiUrl, {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            })
            .then(response => response.json())
            .then(data => {
                setSuggestions(data.artists.items);
            })
            .catch(error => {
                setError(error);
            });
        })
        .catch(error => {
            setError(error);
        });
    }, [searchInput]);

    // Handle Enter key press
    function handleKeyDown(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit();
        }
    }

    // Handle form submission
    function handleSubmit() {
        console.log('Search for:', searchInput);
    }

    // Handle suggestion click
    function handleSuggestionClick(suggestion) {
        setSearchInput(suggestion.name); // Fill input with clicked suggestion
        setSuggestions([]); // Clear suggestions
    }

    return (
        <div className="relative">
            {/* // Input field */}
            <input
                className="bg-gray-200 rounded-l-lg px-4 py-2 focus:outline-none w-64"
                type="text"
                placeholder="Search..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button onClick={handleSubmit} className="bg-green-500 text-white rounded-r-lg px-4 py-2 ml-1 hover:bg-green-600">
                Search
            </button>
            {/* // Display suggestions if there are any */}
            {suggestions.length > 0 && (
                // Display suggestions in a dropdown
                <div className="absolute bg-white border border-gray-300 rounded mt-1 w-64 shadow-md">
                    {suggestions.map(artist => (
                        // Handle suggestion click
                        // Fill input with clicked suggestion
                        <div key={artist.id} className="p-2 cursor-pointer hover:bg-gray-100" onClick={() => handleSuggestionClick(artist)}>
                            {artist.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SearchBar;
