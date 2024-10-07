import './App.css';
import React from 'react';
import Homepage from './pages/homepage.jsx';
import AlbumInfo from './pages/albuminfo.jsx'; // Component for displaying album info
import ArtistInfo from './pages/artistinfo.jsx'; // Component for displaying artist info
import { Routes, Route } from 'react-router-dom'; // Importing Routes and Route

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/search/:id" element={<ArtistInfo />} />
      <Route path="/album/:id" element={<AlbumInfo />} />
    </Routes>
  );
}

export default App;
