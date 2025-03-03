'use client';

import dynamic from "next/dynamic"
import { useQuery } from '@tanstack/react-query';
import fetchCryptoPrices from '../lib/fetchCryptoPrices';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import loadingAnimation from "@/public/loadingAnimation.json";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import { Button } from '@/components/ui/button';

export default function Dashboard() {
  const { data: cryptoAssets, isLoading, error } = useQuery({
    queryKey: ['cryptoPrices'],
    queryFn: fetchCryptoPrices,
    refetchInterval: 60000, 
  });

  if (isLoading) return  (
      <div className="flex justify-center items-center py-6">
        <Lottie animationData={loadingAnimation} loop={true} className="h-24 w-24" />
      </div>
    )
  if (error) return <p>Error fetching data</p>;

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>

      {/* Assets */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xl font-bold">My Watchlist</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-[800px]"> {/* Set a minimum width to ensure columns don't compress too much */}
              {/* Table Header */}
              <div className="grid grid-cols-5 text-sm text-zinc-400 py-2 border-b border-zinc-800">
                <div className="px-6">Name</div>
                <div className="px-6 text-right">Price</div>
                <div className="px-6 text-right">Volume (24h)</div>
                <div className="px-6 text-right">Market Cap</div>
                <div className="px-6 text-right">24h Change</div>
              </div>

              {/* Table Content */}
              {cryptoAssets.map((asset) => {
                const isPositive = asset.price_change_percentage_24h >= 0;
                return (
                  <div
                    key={asset.id}
                    className="grid grid-cols-5 items-center py-4 border-b border-zinc-800 last:border-0"
                  >
                    {/* Name, Symbol, and Logo */}
                    <div className="flex items-center gap-2 px-6">
                      <img
                        src={asset.image || '/placeholder.svg'}
                        alt={asset.name}
                        className="w-6 h-6 object-contain flex-shrink-0"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder.svg';
                        }}
                      />
                      <div className="min-w-0">
                        <div className="font-medium whitespace-nowrap">{asset.name}</div>
                        <div className="text-zinc-400 text-xs whitespace-nowrap">• {asset.symbol.toUpperCase()}</div>
                      </div>
                    </div>

                    {/* Current Price */}
                    <div className="px-6 text-right font-medium whitespace-nowrap">
                      ${asset.current_price.toLocaleString()}
                    </div>

                    {/* 24h Volume */}
                    <div className="px-6 text-right whitespace-nowrap">
                      ${asset.total_volume.toLocaleString()}
                    </div>

                    {/* Market Cap */}
                    <div className="px-6 text-right whitespace-nowrap">
                      ${asset.market_cap.toLocaleString()}
                    </div>

                    {/* 24h Change */}
                    <div className="px-6 text-right whitespace-nowrap">
                      <div className={`font-medium ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                        {isPositive ? '+' : '-'}${Math.abs(asset.price_change_24h).toLocaleString()}
                      </div>
                      <div className={`text-xs ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                        {isPositive ? '↑' : '↓'} {Math.abs(asset.price_change_percentage_24h).toFixed(2)}%
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );  
}
