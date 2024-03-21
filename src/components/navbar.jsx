import React from 'react';
import spotifyLogo from '../images/Spotify_Icon_RGB_Green.png';

function Nav() {
    return (
        <div className="bg-gray-900 h-16 flex items-center justify-center">
            <a href='/'><img src={spotifyLogo} alt="Spotify Logo" className="w-8 h-8" /></a>
        </div>
    );
}

export default Nav;
