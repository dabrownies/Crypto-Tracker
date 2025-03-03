'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import fetchCryptoPrices from '../lib/fetchCryptoPrices';

export default function Home() {
  const { data: cryptoData, isLoading, error, refetch } = useQuery({
    queryKey: ['cryptoPrices'],
    queryFn: fetchCryptoPrices,  
    refetchInterval: 60000,
  });

  const [isCooldown, setIsCooldown] = useState(false);

  /** Handle Refresh Button
   *  refetches the data from the API on click so long as the cooldown is not true
   *  every time a refresh is made, the cooldown state prevents further refreshes for 3 seconds
   *  this prevents users from overloading requests
   */
  const handleRefresh = () => {
    if (!isCooldown) {
      refetch();
      setIsCooldown(true);
      setTimeout(() => setIsCooldown(false), 3000); // Cooldown for 3 sec
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data</p>;

  return (
    <div>
      <h1>Crypto Prices</h1>
      <button onClick={handleRefresh} disabled={isCooldown}>
        {isCooldown ? 'Refreshing...' : 'Refresh'}
      </button>
      <ul>
        {cryptoData.map((coin) => (
          <li key={coin.id}>
            {coin.name} ({coin.symbol.toUpperCase()}): ${coin.current_price}
          </li>
        ))}
      </ul>
    </div>
  );
}
