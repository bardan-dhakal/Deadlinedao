'use client';

import { motion } from 'framer-motion';
import {
  Lock,
  Camera,
  Zap,
  Award,
  TrendingUp,
  Shield,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Home() {
  return (
    <div className="bg-bg-primary">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container-max relative z-10">
          <motion.div
            initial="hidden"
            animate="show"
            variants={containerVariants}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Main Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              Put Your Money Where Your{' '}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Goals
              </span>{' '}
              Are
            </motion.h1>

            {/* Subheading */}
            <motion.p variants={itemVariants} className="text-xl text-gray-400 mb-6 max-w-2xl mx-auto leading-relaxed">
              Lock SOL to your deadline. AI validates your proof. Complete it? Get paid. Fail? Your money goes to winners.
            </motion.p>

            {/* Tagline */}
            <motion.p variants={itemVariants} className="text-sm text-gray-500 mb-10">
              Built with Solana, Snowflake Cortex AI, and Cloudflare for the OSU Hackathon 2025
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button className="btn-primary pulse-glow inline-flex items-center justify-center gap-2 px-8 py-3 text-base max-w-sm mx-auto sm:mx-0">
                Connect Wallet
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="btn-secondary inline-flex items-center justify-center px-8 py-3 text-base max-w-sm mx-auto sm:mx-0">
                Learn More
              </button>
            </motion.div>

            {/* Stats Bar */}
            <motion.div
              variants={itemVariants}
              className="glassmorphic-card max-w-2xl mx-auto p-6 border border-purple-500/30"
            >
              <div className="grid grid-cols-3 gap-4 md:gap-8">
                <div className="text-center">
                  <div className="text-4xl font-black text-solana-green mb-1">$0</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider flex items-center justify-center gap-1">
                    <span>🔥</span>
                    <span>Total Staked</span>
                  </div>
                </div>
                <div className="border-l border-r border-gray-700 text-center">
                  <div className="text-4xl font-black text-solana-green mb-1">0</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider flex items-center justify-center gap-1">
                    <span>⚡</span>
                    <span>Active Goals</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-black text-solana-green mb-1">0%</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider flex items-center justify-center gap-1">
                    <span>🏆</span>
                    <span>Success Rate</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-bg-card/30 border-y border-gray-900">
        <div className="container-max">
          <motion.div
            initial="hidden"
            whileInView="show"
            variants={containerVariants}
            viewport={{ once: true, margin: '-100px' }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.h2 variants={itemVariants} className="text-4xl font-bold mb-6">
              The Problem
            </motion.h2>
            <motion.div variants={itemVariants} className="mb-8">
              <span className="text-7xl font-black text-danger-red drop-shadow-lg">89%</span>
              <p className="text-xl text-gray-400 mt-4">
                of people <span className="text-white font-semibold">fail to achieve their goals</span>
              </p>
            </motion.div>
            <motion.p variants={itemVariants} className="text-lg text-gray-300 leading-relaxed">
              Traditional goal-tracking apps are <span className="text-white font-semibold">free</span>, so there's{' '}
              <span className="text-danger-red font-semibold">no real consequence</span> for giving up. Your broken promises cost you nothing.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20">
        <div className="container-max">
          <motion.div
            initial="hidden"
            whileInView="show"
            variants={containerVariants}
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-4xl font-bold mb-4">
              How It Works
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-gray-400 max-w-3xl mx-auto">
              Five simple steps from goal to reward. Real accountability powered by blockchain and AI.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            variants={containerVariants}
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
          >
            {[
              { step: 1, title: 'Stake SOL', desc: 'Lock your stake', icon: Lock, color: 'purple', bgColor: 'bg-purple-500/20', borderColor: 'border-l-4 border-l-purple-500' },
              { step: 2, title: 'Submit Proof', desc: 'Text + image', icon: Camera, color: 'blue', bgColor: 'bg-blue-500/20', borderColor: 'border-l-4 border-l-blue-500' },
              { step: 3, title: 'AI Validates', desc: '5-layer check', icon: Zap, color: 'cyan', bgColor: 'bg-cyan-500/20', borderColor: 'border-l-4 border-l-cyan-500', featured: true },
              { step: 4, title: 'Get Paid', desc: 'Instant payout', icon: TrendingUp, color: 'green', bgColor: 'bg-green-500/20', borderColor: 'border-l-4 border-l-green-500' },
              { step: 5, title: 'Redistribute', desc: 'To winners', icon: Award, color: 'orange', bgColor: 'bg-orange-500/20', borderColor: 'border-l-4 border-l-orange-500' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className={`glassmorphic-card p-6 text-center space-y-4 ${item.borderColor} ${item.featured ? 'ring-2 ring-cyan-500/50 transform lg:scale-105' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <div className={`w-8 h-8 rounded-full ${item.bgColor} flex items-center justify-center text-white text-sm font-bold`}>
                    {item.step}
                  </div>
                  {item.featured && <span className="text-xs font-bold text-solana-green bg-solana-green/20 px-2 py-1 rounded-full">⭐ Core</span>}
                </div>
                <div className={`w-16 h-16 rounded-full ${item.bgColor} flex items-center justify-center mx-auto`}>
                  <item.icon className="w-8 h-8 text-solana-green" />
                </div>
                <h4 className="text-lg font-semibold text-white">{item.title}</h4>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-bg-card/30 border-y border-gray-900">
        <div className="container-max">
          <motion.div
            initial="hidden"
            whileInView="show"
            variants={containerVariants}
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-4xl font-bold mb-4">
              Powered by Cutting-Edge Technology
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-gray-400 max-w-3xl mx-auto">
              Built on Solana, validated by Snowflake AI, secured by Cloudflare
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            variants={containerVariants}
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                title: '🤖 AI-Powered Validation',
                badge: 'PRIMARY',
                desc: '5-layer validation pipeline using Snowflake Cortex',
                features: ['Claude 3.5 Sonnet', 'Mistral Large', 'Fraud Detection', 'Quality Scoring'],
                stat: '87% auto-approval',
              },
              {
                title: '💰 Smart Redistribution',
                badge: 'SOLANA',
                desc: 'Fair economic model on blockchain',
                formula: 'Payout = Stake + (Stake/Winners) × Losers',
                example: '0.5 SOL → 0.83 SOL (+66%)',
                stat: '<1s payout',
              },
              {
                title: '☁️ Enterprise Security',
                badge: 'CLOUDFLARE',
                desc: 'Cloudflare R2 with presigned URLs',
                features: ['Direct uploads', '10MB limit', 'CDN delivery', 'Auto cleanup'],
                stat: '<100ms response',
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="glassmorphic-card p-8 space-y-4 border-t-2 border-t-cyan-500"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                  <span className="text-xs font-bold text-solana-green bg-solana-green/20 px-3 py-1 rounded-full">
                    {feature.badge}
                  </span>
                </div>
                <p className="text-sm text-gray-400">{feature.desc}</p>
                {feature.formula && (
                  <div className="bg-bg-primary/50 rounded p-3 font-mono text-xs text-solana-green">
                    {feature.formula}
                  </div>
                )}
                {feature.example && (
                  <p className="text-sm text-gray-300">
                    <span className="text-white font-semibold">Example:</span> {feature.example}
                  </p>
                )}
                {feature.features && (
                  <ul className="space-y-2 text-sm text-gray-400">
                    {feature.features.map((f) => (
                      <li key={f}>✓ {f}</li>
                    ))}
                  </ul>
                )}
                <div className="pt-4 border-t border-gray-700">
                  <p className="text-xs text-solana-green font-semibold">{feature.stat}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20">
        <div className="container-max">
          <motion.div
            initial="hidden"
            whileInView="show"
            variants={containerVariants}
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-4xl font-bold mb-4">
              Built With Industry Leaders
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-gray-400 max-w-3xl mx-auto">
              Combining the best blockchain, AI, and infrastructure technologies
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            variants={containerVariants}
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { name: 'Solana', desc: 'Lightning-fast blockchain', icon: '⚡' },
              { name: 'Snowflake', desc: 'AI & ML platform', icon: '🤖' },
              { name: 'Cloudflare', desc: 'Storage & CDN', icon: '☁️' },
              { name: 'Supabase', desc: 'PostgreSQL database', icon: '🗄️' },
            ].map((tech, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="card text-center p-6"
              >
                <div className="text-5xl mb-4">{tech.icon}</div>
                <h4 className="text-lg font-bold text-white mb-2">{tech.name}</h4>
                <p className="text-sm text-gray-400">{tech.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-b from-purple-500/5 via-transparent to-blue-500/5">
        <div className="container-max">
          <motion.div
            initial="hidden"
            whileInView="show"
            variants={containerVariants}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center space-y-8"
          >
            <motion.h2 variants={itemVariants} className="text-5xl font-bold">
              Stop Talking. Start Achieving.
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-gray-400">
              Real stakes. Real accountability. Real results. Your next goal is one click away.
            </motion.p>
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary pulse-glow inline-flex items-center gap-2 px-10 py-4 text-lg"
            >
              Connect Wallet
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
