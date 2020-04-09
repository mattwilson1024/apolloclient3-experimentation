import './App.css';

import { useApolloClient } from '@apollo/client';
import React, { useState } from 'react';

import Artist from './components/Artist';

function App() {
  const { cache } = useApolloClient();
  const [ showArtistInfo, setShowArtistInfo ] = useState(true);

  const artistId = '4D5VLxuFvZ058Z5S8YmE47'; // for the sake of this demo, we'll use artist "DC Breaks" with a fixed ID

  const toggleArtistComponent = () => {
    setShowArtistInfo(!showArtistInfo);
  }

  const evictAlbums = () => {
    cache.evict(`Artist:${artistId}`, 'albums');
  }

  const evictAlbumsAndGC = () => {
    cache.evict(`Artist:${artistId}`, 'albums');
    // cache.evict(`ROOT_QUERY`, `queryArtists`);
    cache.gc();
  }

  return (
    <div className="App">
      
      <div className="toolbar">
        <h1>Apollo Client 3 Cache Experimentation</h1>
        <button onClick={toggleArtistComponent}>Show/hide artist component</button>
        <button onClick={evictAlbums}>Evict DC Breaks -> albums</button>
        <button onClick={evictAlbumsAndGC}>Evict DC Breaks -> albums AND garbage collect</button>
      </div>
      
      {showArtistInfo && <Artist />}
      
    </div>
  );
}

export default App;
