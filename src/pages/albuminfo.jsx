import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Nav from '../components/navbar';

function AlbumInfo() {
    const { id } = useParams();
    const [album, setAlbum] = useState(null);
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true); // Initially set to true
    const [error, setError] = useState(null);
    const [accessToken, setAccessToken] = useState(null);

    useEffect(() => {
        const clientId = '8f8ae68895644b68bf7b431a73bef6ac';
        const clientSecret = '767e143614b5498fa36527569454ce19';
        const tokenEndpoint = 'https://accounts.spotify.com/api/token';

        // Fetch access token
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
            setAccessToken(accessToken);

            // Fetch album details
            fetch(`https://api.spotify.com/v1/albums/${id}`, {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            })
            .then(response => response.json())
            .then(data => {
                setAlbum(data);
                setLoading(false); // Set loading to false after successful fetch
            })
            .catch(error => {
                setError(error);
                setLoading(false); // Set loading to false on error
            });

            // Fetch album tracks
            fetch(`https://api.spotify.com/v1/albums/${id}/tracks`, {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            })
            .then(response => response.json())
            .then(data => {
                setSongs(data.items);
            })
            .catch(error => {
                setError(error);
            });
        })
        .catch(error => {
            setError(error);
        });
    }, [id]);

    return (
        <div className="p-4 m-0 bg-gray-100">
            <Nav />
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {album && songs && (
                <div className="p-8 flex flex-col items-center">
                <img src={album.images[0].url} alt={album.name} className="rounded-lg mb-4 shadow-lg" />
                    <h1 className="text-4xl mb-4 text-center font-bold">{album.name}</h1>
                    <p className="text-xl mb-4 text-center">{album.artists.map(artist => artist.name).join(', ')}</p>
                    <p className="text-lg text-center font-bold mb-10">{album.release_date}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {songs.map((song, index) => (
                            <div key={song.id} className="flex flex-col items-center border-2 border-gray-200 rounded shadow-md hover:shadow-lg hover:border-green-500 transition duration-300 p-4">
                                {song.preview_url ? (
                                    <audio controls className="w-full mt-2">
                                        <source src={song.preview_url} type="audio/mpeg" />
                                        Your browser does not support the audio element.
                                    </audio>
                                ) : (
                                    <p className="text-sm text-gray-500 text-center">Audio preview not available</p>
                                )}
                                <p className="text-md font-bold text-center">{index + 1}. {song.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default AlbumInfo;
