import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function ArtistsInfo() {
    const { id } = useParams();
    const [artist, setArtist] = useState(null);
    const [relatedArtists, setRelatedArtists] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [tracks, setTracks] = useState({});

    useEffect(() => {
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
            const artistUrl = `https://api.spotify.com/v1/artists/${id}`;
            const relatedUrl = `https://api.spotify.com/v1/artists/${id}/related-artists`;
            const albumsUrl = `https://api.spotify.com/v1/artists/${id}/albums`;

            // Fetch artist info
            fetch(artistUrl, {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setArtist(data);
            })
            .catch(error => {
                console.error(error);
            });

            // Fetch related artists
            fetch(relatedUrl, {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            })
            .then(response => response.json())
            .then(data => {
                setRelatedArtists(data.artists.slice(0, 5)); // Show only the first 5 related artists
            })
            .catch(error => {
                console.error(error);
            });

            // Fetch artist's albums
            fetch(albumsUrl, {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            })
            .then(response => response.json())
            .then(data => {
                setAlbums(data.items);

                // Fetch tracks for each album
                data.items.forEach(album => {
                    fetch(`https://api.spotify.com/v1/albums/${album.id}/tracks`, {
                        headers: {
                            'Authorization': 'Bearer ' + accessToken
                        }
                    })
                    .then(response => response.json())
                    .then(tracksData => {
                        setTracks(prevState => ({
                            ...prevState,
                            [album.id]: tracksData.items
                        }));
                    })
                    .catch(error => {
                        console.error(error);
                    });
                });
            })
            .catch(error => {
                console.error(error);
            });
        })
        .catch(error => {
            console.error(error);
        });
    }, [id]);

    if (!artist) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold text-center">Artist Info</h1>
            <div className="mt-4 flex flex-col items-center">
                <img src={artist.images[0].url} alt={artist.name} className="w-32 h-32 rounded-full mb-4" />
                <div className="text-center">
                    <p className="text-xl font-bold">{artist.name}</p>
                    <p className="text-gray-600"><span className="font-bold">Followers:</span> {artist.followers.total}</p>
                    <p className="text-gray-600"><span className="font-bold">Genres:</span> {artist.genres.join(', ')}</p>
                </div>
                <h1 className="text-xl font-bold text-center mt-4">Popularity:</h1>
                <div className="w-full flex justify-center mt-4">
                    <div className="relative w-24 h-24">
                        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" title="Popularity">
                            <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-gray-200 dark:text-gray-700" strokeWidth="2"></circle>
                            <g className="origin-center transform -rotate-90">
                                <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-green-600 dark:text-blue-500" strokeWidth="2" strokeDasharray="100" strokeDashoffset={100 - artist.popularity}></circle>
                            </g>
                        </svg>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <span className="text-center text-sm font-bold text-gray-800 dark:text-white">{artist.popularity}%</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-8">
                <h2 className="text-xl font-bold mb-4 text-center">Albums</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {albums.map((album, index) => (
                        <Link key={index} to={`/album/${album.id}`} className="block border border-gray-200 rounded shadow-md hover:shadow-lg transition duration-300">
                            <img src={album.images[0].url} alt={album.name} className="w-full h-48 object-cover mb-2" />
                            <p className="text-md font-bold text-center">{album.name}</p>
                            <ol className="list-decimal list-inside m-3">
                                {tracks[album.id] && tracks[album.id].map((track, index) => (
                                    <li key={index} className="text-xs">{track.name}</li>
                                ))}
                            </ol>
                        </Link>
                    ))}
                </div>
            </div>
            <div className="mt-8">
                <h2 className="text-xl font-bold mb-4 text-center">Related Artists</h2>
                <div className="flex flex-wrap justify-center">
                    {relatedArtists.map((relatedArtist, index) => (
                        <Link key={index} to={`/search/${relatedArtist.id}`} className="flex flex-col items-center m-4" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                            <img src={relatedArtist.images[0].url} alt={relatedArtist.name} className="w-24 h-24 rounded-full mb-2 cursor-pointer" />
                            <p className="text-center">{relatedArtist.name}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
    
}

export default ArtistsInfo;
