import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS
import { useNavigate } from 'react-router-dom';

function SearchBar() {
    const [searchInput, setSearchInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

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
        navigate(`/search/${searchInput}`); // Navigate to search page with query
        setSearchInput(""); // Clear input field
        setSuggestions([]); // Clear suggestions
    }

    // Handle suggestion click
    function handleSuggestionClick(suggestion) {
        setSearchInput(suggestion.name); // Fill input with clicked suggestion
        navigate(`/search/${suggestion.id}`); // Navigate to artist info page
        setSuggestions([]); // Clear suggestions
    }

    return (
        <div className="relative">
            {/* // Input field */}
            <input
                className="bg-gray-200 rounded-lg px-4 py-2 focus:outline-none w-100"
                type="text"
                placeholder="Search Artists..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleKeyDown}
            />
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
