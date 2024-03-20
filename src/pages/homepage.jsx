import React from 'react';
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS
import SearchBar from '../components/searchbar';
import spotifyLogo from '../images/Spotify_Icon_RGB_Green.png';

function Homepage() {
    return (
        <div className="bg-gray-100 h-screen flex flex-col items-center justify-center">
            <div className="bg-gray-900 rounded-lg shadow-lg p-40 flex flex-col items-center">
                <h1 className="text-4xl mb-8 text-center font-bold">
                    <img src={spotifyLogo} alt="Spotify Logo" className="inline-block mr-2" style={{marginTop: '-0.15em'}} width={50} />
                    <span className="text-green-500">SPOTIFY NOOK</span>
                </h1>
                <SearchBar />
            </div>
        </div>
    );
}

export default Homepage;
