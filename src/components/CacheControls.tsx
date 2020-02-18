import { useApolloClient } from '@apollo/client';
import React from 'react';

export default function CacheControls() {
  const { cache } = useApolloClient();

  const evictAttacks = () => {
    // cache.evict('Pokemon:UG9rZW1vbjowMjU=', 'attacks')
  }

  return (
    <div>
      <button></button>
    </div>
  )
}
