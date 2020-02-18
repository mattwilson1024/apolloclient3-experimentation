import { gql, useQuery } from '@apollo/client';
import React from 'react';

const GET_POKEMON_DETAILS = gql`
  query getPokemonDetails($name: String!) {
    pokemon(name: $name) {
      id
      number
      name
      attacks {
        special {
          name
          type
          damage
        }
      }
    }
  }
`;

export default function PokemonDetails() {
  const { data, loading, error } = useQuery(GET_POKEMON_DETAILS, {
    variables: {
      name: 'Pikachu'
    }
  })

  if (loading) { return <p>Loading...</p>; }
  if (error) { return <p>Error</p>; }

  return (
    <div style={{ backgroundColor: '#eee', padding: '10px' }}>
      <h1>{ data.pokemon.name }</h1>

      <h2>Special Attacks</h2>
      <ul>
        {data.pokemon.attacks.special.map((attack: any) => 
          <li key={attack.name}>{attack.name} / {attack.type}: {attack.damage} damage</li>
        )}
      </ul>
    </div>
  )
}
