import React from 'react';
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS
import SearchBar from '../components/searchbar';
import spotifyLogo from '../images/Spotify_Icon_RGB_Green.png';

const clientId = '8f8ae68895644b68bf7b431a73bef6ac';
const clientSecret = '767e143614b5498fa36527569454ce19';
const tokenEndpoint = 'https://accounts.spotify.com/api/token';

fetch(tokenEndpoint, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
    },
    body: 'grant_type=client_credentials'
})
.then(response => response.json())
.then(data => {
    const accessToken = data.access_token;
    const apiUrl = 'https://api.spotify.com/v1/search?q=the%20beatles&type=album,track,artist&market=US&limit=10&offset=5';

    fetch(apiUrl, {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
})
.catch(error => console.error(error));


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
