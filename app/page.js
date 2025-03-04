"use client"
import Link from "next/link"
import { ArrowRight} from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"

export default function CryptoReservePage() {
  return (
    <div className="dark min-h-screen bg-black text-white">

      <main>
        {/* HERO */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-900 via-blue-900 to-black" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-purple-700 blur-[120px] opacity-30" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <div className="inline-block px-3 py-1 mb-6 rounded-full bg-purple-900/50 border border-purple-700/50 text-sm">
                The Future of Digital Asset Reserves 
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-emerald-400">
                A Crypto Reserve is Coming
              </h1>
              <p className="text-xl text-gray-300 mb-8 font-bold">
                Take a look at the world's leading cryptocurrencies coming to a secure, stable, and accessible reserve.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div 
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.9 }}  
              >
                <Link href="/dashboard">
                  <Button className="bg-purple-900/50 border border-purple-700/50 text-white px-8 py-4 text-sm rounded-2xl transition">
                    Go to Dashboard <ArrowRight className="h-6 w-6" />
                  </Button>
                </Link>
              </motion.div>
              </div>
            </div>

            <div className="mt-16 grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8">
              {[
                { name: "Bitcoin", symbol: "BTC", logo: "/logos/Bitcoin.svg.png" },
                { name: "Ethereum", symbol: "ETH", logo: "/logos/ethereum.jpg" },
                { name: "Solana", symbol: "SOL", logo: "/logos/solanaNew.png" },
                { name: "XRP", symbol: "XRP", logo: "/logos/XRP.png.webp" },
                { name: "Cardano", symbol: "ADA", logo: "/logos/cardano.webp" },
              ].map((crypto) => (
                <motion.div
                  key={crypto.symbol}
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex flex-col items-center p-4 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-purple-700/50 transition-all"
                >
                  <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center mb-3 overflow-hidden">
                    <img src={crypto.logo} alt={crypto.name} className="w-full h-full object-contain" />
                  </div>
                  <span className="font-medium">{crypto.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="py-20 bg-gray-950">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">About The Crypto Reserve</h2>
              <p className="text-gray-300">
                The Crypto Reserve represents a paradigm shift in how we think about digital asset management and
                monetary policy in the decentralized world.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4 text-purple-400">A New Financial Paradigm</h3>
                <p className="text-gray-300 mb-6">
                  As traditional financial systems face unprecedented challenges, the Crypto Reserve emerges as a viable
                  alternative, combining the strengths of multiple blockchain networks into a cohesive, resilient
                  system.
                </p>
                <h3 className="text-2xl font-bold mb-4 text-purple-400">Balanced Portfolio Approach</h3>
                <p className="text-gray-300 mb-6">
                  By including Bitcoin, Ethereum, Solana, XRP, and Cardano, the reserve creates a balanced portfolio
                  that mitigates risk while maximizing potential for stability and growth.
                </p>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-lg opacity-70" />
                <div className="relative p-6 rounded-xl bg-gray-900 border border-gray-800">
                  <div className="flex justify-between items-center mb-6">
                    <h4 className="font-bold">Estimated Reserve Composition</h4>
                    <span className="text-sm text-gray-400">*Not Confirmed*</span>
                  </div>
                  {[
                    { name: "Bitcoin (BTC)", percentage: 40, color: "bg-orange-500" },
                    { name: "Ethereum (ETH)", percentage: 30, color: "bg-blue-500" },
                    { name: "Solana (SOL)", percentage: 15, color: "bg-purple-500" },
                    { name: "XRP", percentage: 10, color: "bg-blue-400" },
                    { name: "Cardano (ADA)", percentage: 5, color: "bg-blue-600" },
                  ].map((asset) => (
                    <div key={asset.name} className="mb-4">
                      <div className="flex justify-between mb-1">
                        <span>{asset.name}</span>
                        <span>{asset.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div className={`${asset.color} h-2 rounded-full`} style={{ width: `${asset.percentage}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

