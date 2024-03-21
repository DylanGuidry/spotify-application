import './App.css';
import React from 'react';
import Homepage from './pages/homepage.jsx';
import AlbumInfo from './pages/albuminfo.jsx'; // Assuming you have a component for displaying album info
import ArtistInfo from './pages/artistinfo.jsx'; // Assuming you have a component for displaying artist info
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/search/:id" element={<ArtistInfo />} />
        <Route path="/album/:id" element={<AlbumInfo />} />
      </Routes>
    </Router>
  );
}

export default App;
