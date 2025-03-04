'use client';

{/** IMPORTS */}
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchCryptoPrices from "../lib/fetchCryptoPrices";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import newLoading from "@/public/newLoading.json";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import FuzzyText from "@/components/ui/TextAnimations/FuzzyText/FuzzyText";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // States for Fuzzy Text
  const [hoverIntensity, setHoverIntensity] = useState(0.5);
  const [enableHover, setEnableHover] = useState(true);

  // Fetch data via React Query
  const { data: cryptoAssets, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ["cryptoPrices"],
    queryFn: fetchCryptoPrices,
    staleTime: 0,
    cacheTime: 600000,
    refetchOnWindowFocus: false,
  });

  // If our state is loading initially, render our loading animation
  if (isLoading)
    return (
      <div className="fixed inset-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
        <Lottie animationData={newLoading} loop={true} style={{ width: "200px", height: "200px" }} />
      </div>
    );

  if (error) return <p className="text-white">Error fetching data</p>;

  /** Filtering function:
   *  Dynamically updates our map to display live results from searching
   *  Stores the STATE of the current text the user inputs (updates with every new keystroke)
   *  .filter() creates a new array containing only the matched elements from the user input
   * 
   *  @improvement : Could cache frequently searched cryptocurrencies for faster lookup
   *  However, in this case five elements is minisucle
   */
  const filteredAssets = cryptoAssets.filter(
    (asset) =>
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle refresh
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  };

  return (
    <div className="bg-black min-h-screen">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* NAVBAR */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">My Dashboard</h1>
        </div>

        {/* SEARCH BAR */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search for any cryptocurrency..."
            className="w-full p-3 rounded-xl bg-[#0D0D0D] text-white placeholder-zinc-400 border border-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-700"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* TABLE BEGINNING */}
        <Card className="bg-[#0D0D0D] border-zinc-800 rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl font-bold text-white">My Watchlist</CardTitle>

            {/* REFRESH BUTTON */}
            <motion.div 
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.9 }}  
            >
              <Button
                variant="outline"
                className="border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 px-3 py-1.5 flex items-center gap-2 rounded-2xl"
                onClick={handleRefresh}
                disabled={isRefreshing || isFetching}
              >
                <RefreshCw className={`w-4 h-4 ${(isRefreshing || isFetching) ? "animate-spin" : ""}`} />
                {isRefreshing || isFetching ? "Refreshing..." : "Refresh"}
              </Button>
            </motion.div>
          </CardHeader>

          <CardContent>
            {/* Loading overlay for refreshes */}
            {(isRefreshing || isFetching) && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-2xl z-10">
                <Lottie animationData={newLoading} loop={true} style={{ width: "200px", height: "200px" }} />
              </div>
            )}
            
            <div className="overflow-x-auto">
              <div className="min-w-[800px]">
                {/* TABLE HEADER */}
                <div className="grid grid-cols-5 text-sm text-zinc-400 py-2 border-b border-zinc-800">
                  <div className="px-6">Name</div>
                  <div className="px-6 text-right">Price</div>
                  <div className="px-6 text-right">Volume (24h)</div>
                  <div className="px-6 text-right">Market Cap</div>
                  <div className="px-6 text-right">24h Change</div>
                </div>

                {/* EMPTY STATE OR CRYPTO ASSETS */}
                {filteredAssets.length === 0 ? (
                  <div className="py-16 flex md:justify-center justify-start items-center col-span-5 w-full">
                    <div className="text-center">
                      <div className="text-2xl font-bold mb-4">
                        <FuzzyText 
                          baseIntensity={0.2} 
                          hoverIntensity={hoverIntensity} 
                          enableHover={enableHover}
                        >
                          404
                        </FuzzyText>
                      </div>
                      <p className="text-zinc-400">No cryptocurrencies found matching "{searchQuery}"</p>
                    </div>
                  </div>
                ) : (
                  filteredAssets.map((asset) => {
                    const isPositive = asset.price_change_percentage_24h >= 0;
                    return (
                      <div
                        key={asset.id + Math.random()} // Force re-render with new key
                        className="grid grid-cols-5 items-center py-4 border-b border-zinc-800 last:border-0"
                      >
                        {/* Name + Ticker */}
                        <div className="flex items-center gap-2 px-6">
                          <img
                            src={asset.image || "/placeholder.svg"}
                            alt={asset.name}
                            className="w-7 h-7 object-contain flex-shrink-0"
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder.svg";
                            }}
                          />
                          <div className="flex items-center gap-1 text-white whitespace-nowrap">
                            <span className="font-medium">{asset.name}</span>
                            <span className="text-zinc-400">• {asset.symbol.toUpperCase()}</span>
                          </div>
                        </div>

                        {/* Current Price */}
                        <div className="px-6 text-right font-medium whitespace-nowrap text-white">
                          ${asset.current_price.toLocaleString()}
                        </div>

                        {/* 24H Volume */}
                        <div className="px-6 text-right whitespace-nowrap text-white">
                          ${asset.total_volume.toLocaleString()}
                        </div>

                        {/* Market Cap */}
                        <div className="px-6 text-right whitespace-nowrap text-white">
                          ${asset.market_cap.toLocaleString()}
                        </div>

                        {/* 24H Price Change */}
                        <div className="px-6 text-right whitespace-nowrap">
                          <div className={`font-medium ${isPositive ? "text-green-400" : "text-red-400"}`}>
                            {isPositive ? "+" : "-"}${Math.abs(asset.price_change_24h).toLocaleString()}
                          </div>
                          <div className={`text-xs ${isPositive ? "text-green-400" : "text-red-400"}`}>
                            {isPositive ? "↑" : "↓"} {Math.abs(asset.price_change_percentage_24h).toFixed(2)}%
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
