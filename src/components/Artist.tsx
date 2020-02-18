import { gql, useQuery } from '@apollo/client';
import React from 'react';

const GET_ARTIST_WITH_ALBUMS = gql`
  query getArtistWithAlbums($artistName: String!) {
    queryArtists(byName: $artistName) {
      name
      id
      image
      albums{
        id
        name
        image
      }
    }
  }
`;

export default function Artist() {
  const { data, loading, error } = useQuery(GET_ARTIST_WITH_ALBUMS, {
    variables: {
      artistName: 'DC Breaks'
    }
  })

  if (loading) { return <p>Loading...</p>; }
  if (error) { return <p>Error</p>; }

  const firstMatchingArtist = data.queryArtists?.[0];
  if (!firstMatchingArtist) { return <p>No matching artist found</p>; }

  return (
    <div style={{ backgroundColor: '#f1fff1', padding: '10px' }}>
      <h1>{ firstMatchingArtist.name }</h1>

      <h2>Albums</h2>
      <ul>
        {firstMatchingArtist.albums.map((album: any) => 
          <li key={album.id}>
            <div className="album">
              <img src={album.image} alt={album.name}></img>
              <div>{album.name}</div>
            </div>
          </li>
        )}
      </ul>
    </div>
  )
}