'use client';

import { useQuery } from '@tanstack/react-query';
import fetchCryptoPrices from '../lib/fetchCryptoPrices';

export default function Home() {
  const { data: cryptoData, isLoading, error, refetch } = useQuery({
    queryKey: ['cryptoPrices'],
    queryFn: fetchCryptoPrices,  
    refetchInterval: 60000,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data</p>;

  return (
    <div>
      <h1>Crypto Prices</h1>
      <button onClick={() => refetch()}>Refresh</button>
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
