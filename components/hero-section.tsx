"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Loader2 } from "lucide-react"
import { WalletButton } from "@/components/WalletButton"
import { useWallet } from "@solana/wallet-adapter-react"
import { useRouter } from "next/navigation"

interface PlatformStats {
  totalStaked: string;
  activeGoals: number;
  successRate: string;
  totalUsers: number;
  totalGoals: number;
}

export function HeroSection() {
  const [stats, setStats] = useState([
    { icon: "🔥", label: "Total Staked", value: "0 SOL" },
    { icon: "⚡", label: "Active Goals", value: "0" },
    { icon: "🏆", label: "Success Rate", value: "0%" },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/platform-stats');
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.stats) {
            setStats([
              { icon: "🔥", label: "Total Staked", value: `${data.stats.totalStaked} SOL` },
              { icon: "⚡", label: "Active Goals", value: `${data.stats.activeGoals}` },
              { icon: "🏆", label: "Success Rate", value: `${data.stats.successRate}%` },
            ]);
          }
        }
      } catch (error) {
        console.error('Error fetching platform stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    // Refresh stats every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="absolute bottom-20 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-8">
            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-6xl font-bold leading-tight"
            >
              <span className="text-white">Put Your Money Where Your </span>
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Goals
              </span>
              <span className="text-white"> Are</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-400 max-w-3xl mx-auto"
            >
              Lock SOL to your deadline. AI validates your proof. Complete it? Get paid. Fail? Your money goes to
              winners.
            </motion.p>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-sm text-gray-500"
            >
              Built with Solana, Snowflake Cortex AI, and Cloudflare for the OSU Hackathon 2025
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
              <WalletButton className="relative overflow-hidden bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 text-white font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 border-0 rounded-xl px-8 py-6 text-lg" />

              <a
                href="#how-it-works"
                className="border-2 border-purple-400/50 text-purple-300 hover:bg-purple-500/10 hover:border-purple-400 transition-all duration-300 rounded-xl px-8 py-6 text-lg font-semibold bg-transparent inline-block"
              >
                Learn More
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-16 pt-8"
            >
              <div
                className="relative overflow-hidden rounded-2xl border border-white/10 backdrop-blur-xl p-8"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.03)" }}
              >
                {loading ? (
                  <div className="flex justify-center items-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-purple-400" />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {stats.map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                        className="text-center space-y-2"
                      >
                        <div className="text-3xl mb-2">{stat.icon}</div>
                        <div className="text-4xl font-black text-white">{stat.value}</div>
                        <div className="text-sm text-gray-400">{stat.label}</div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
