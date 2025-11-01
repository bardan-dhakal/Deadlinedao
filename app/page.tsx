'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Lock, Camera, Zap, Award, ArrowRight, Gauge, TrendingUp, Shield } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Home() {
  return (
    <div className="bg-defi min-h-screen">
      {/* Hero Section */}
      <section className="section-padding relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-transparent pointer-events-none" />

        <div className="container-max relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            {/* Left content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="text-heading-xl text-white"
                >
                  Put Your Money Where Your{' '}
                  <span className="text-gradient">Goals</span> Are
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-subheading"
                >
                  Lock SOL to your deadline. AI validates your proof. Complete it? Get paid. Fail?
                  Your money goes to winners.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="text-sm text-text-muted"
                >
                  Built with Solana, Snowflake Cortex AI, and Cloudflare for the OSU Hackathon
                  2025
                </motion.p>
              </div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <button className="btn-primary pulse-glow w-full sm:w-auto flex items-center justify-center gap-2">
                  Connect Wallet
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="btn-secondary w-full sm:w-auto">Learn More</button>
              </motion.div>

              {/* Stats Bar */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="grid grid-cols-3 gap-4 pt-8 border-t border-text-muted/20"
              >
                <div className="space-y-1">
                  <div className="text-stat text-solana-green">$0</div>
                  <div className="text-xs text-text-muted">Total Staked</div>
                </div>
                <div className="space-y-1">
                  <div className="text-stat text-solana-green">0</div>
                  <div className="text-xs text-text-muted">Active Goals</div>
                </div>
                <div className="space-y-1">
                  <div className="text-stat text-solana-green">0%</div>
                  <div className="text-xs text-text-muted">Success Rate</div>
                </div>
              </motion.div>
            </div>

            {/* Right - Animated Visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="hidden lg:flex flex-col items-center justify-center gap-8"
            >
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg"
              >
                <Lock className="w-10 h-10 text-white" />
              </motion.div>

              <div className="h-12 text-solana-green text-2xl">↓</div>

              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                className="w-20 h-20 rounded-full bg-gradient-to-br from-solana-green to-emerald-500 flex items-center justify-center shadow-lg"
              >
                <Zap className="w-10 h-10 text-black" />
              </motion.div>

              <div className="h-12 text-solana-green text-2xl">↓</div>

              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg"
              >
                <Award className="w-10 h-10 text-white" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="section-padding bg-bg-card/30 border-y border-text-muted/10">
        <div className="container-max">
          <motion.div
            initial="hidden"
            whileInView="show"
            variants={containerVariants}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={itemVariants} className="space-y-6">
              <h2 className="text-heading-lg text-white">
                The Problem with Traditional Goal Apps
              </h2>
              <div className="space-y-4">
                <p className="text-lg text-text-secondary">
                  <span className="text-4xl font-black text-danger-red">89%</span> of people fail
                  to achieve their goals.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  Traditional goal-tracking apps are free, so there's{' '}
                  <span className="text-white font-semibold">no consequence for giving up</span>.
                  Your broken promises cost you nothing. That's the problem.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="glassmorphic-card border-danger-red/30 text-center py-16"
            >
              <div className="text-6xl mb-4">📉</div>
              <p className="text-text-secondary">
                Most goal-tracking apps are forgotten in 3 weeks...
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works - 5 Steps */}
      <section className="section-padding">
        <div className="container-max">
          <motion.div
            initial="hidden"
            whileInView="show"
            variants={containerVariants}
            viewport={{ once: true }}
            className="text-center mb-16 space-y-4"
          >
            <motion.h2 variants={itemVariants} className="text-heading-lg text-white">
              How It Works
            </motion.h2>
            <motion.p variants={itemVariants} className="text-subheading max-w-2xl mx-auto">
              Five simple steps from goal to reward. Real accountability powered by blockchain and
              AI.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            variants={containerVariants}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
          >
            {[
              {
                step: 1,
                title: 'Stake SOL on your goal',
                description: 'Set a deadline and lock your stake',
                icon: Lock,
              },
              {
                step: 2,
                title: 'Submit proof when complete',
                description: 'Upload text + image proof',
                icon: Camera,
              },
              {
                step: 3,
                title: 'AI validates instantly',
                description: 'Snowflake Cortex 5-layer verification',
                icon: Zap,
              },
              {
                step: 4,
                title: 'Get paid if approved',
                description: '0.5 SOL → 0.83 SOL (+66%)',
                icon: TrendingUp,
              },
              {
                step: 5,
                title: 'Stake redistributed if you fail',
                description: 'Your money goes to winners',
                icon: Award,
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="glassmorphic-card flex flex-col items-center text-center space-y-4"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold">
                  {item.step}
                </div>
                <item.icon className="w-8 h-8 text-solana-green" />
                <h4 className="text-lg font-semibold text-white">{item.title}</h4>
                <p className="text-sm text-text-muted">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="section-padding bg-bg-card/30 border-y border-text-muted/10">
        <div className="container-max">
          <motion.div
            initial="hidden"
            whileInView="show"
            variants={containerVariants}
            viewport={{ once: true }}
            className="text-center mb-16 space-y-4"
          >
            <motion.h2 variants={itemVariants} className="text-heading-lg text-white">
              Powered By Innovation
            </motion.h2>
            <motion.p variants={itemVariants} className="text-subheading max-w-2xl mx-auto">
              Built with industry-leading blockchain and AI technology
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            variants={containerVariants}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {/* Feature 1 */}
            <motion.div variants={itemVariants} className="glassmorphic-card space-y-4">
              <div className="flex items-center justify-between">
                <Zap className="w-8 h-8 text-solana-green" />
                <span className="text-xs font-bold text-solana-green bg-solana-green/10 px-3 py-1 rounded-full">
                  SNOWFLAKE
                </span>
              </div>
              <h4 className="text-lg font-bold text-white">🤖 AI-Powered Validation</h4>
              <div className="space-y-3">
                <p className="text-sm text-text-secondary">
                  Snowflake Cortex runs a 5-layer validation pipeline
                </p>
                <div className="space-y-2 text-xs text-text-muted">
                  <p>✓ Claude 3.5 Sonnet - Text analysis</p>
                  <p>✓ Mistral Large - Fraud detection</p>
                  <p>✓ Sentiment analysis & specificity checks</p>
                  <p>✓ Quality scoring algorithm</p>
                </div>
                <div className="pt-2 border-t border-text-muted/20">
                  <p className="text-xs font-semibold text-solana-green">
                    Auto-decisioning: Approved (≥75 quality) | Rejected | Manual Review
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Feature 2 */}
            <motion.div variants={itemVariants} className="glassmorphic-card space-y-4">
              <div className="flex items-center justify-between">
                <TrendingUp className="w-8 h-8 text-solana-green" />
                <span className="text-xs font-bold text-solana-green bg-solana-green/10 px-3 py-1 rounded-full">
                  SOLANA
                </span>
              </div>
              <h4 className="text-lg font-bold text-white">💰 Proportional Redistribution</h4>
              <div className="space-y-3">
                <p className="text-sm text-text-secondary">Fair economic model on Solana</p>
                <div className="bg-bg-primary/50 rounded p-3 font-mono text-xs text-solana-green">
                  Your Payout = Stake + (Stake / Winners) × Losers
                </div>
                <div className="space-y-2 text-sm">
                  <p className="text-text-secondary">
                    <span className="text-white font-semibold">Example:</span> 0.5 SOL → 0.83 SOL
                    (+66%)
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Feature 3 */}
            <motion.div variants={itemVariants} className="glassmorphic-card space-y-4">
              <div className="flex items-center justify-between">
                <Shield className="w-8 h-8 text-solana-green" />
                <span className="text-xs font-bold text-solana-green bg-solana-green/10 px-3 py-1 rounded-full">
                  CLOUDFLARE
                </span>
              </div>
              <h4 className="text-lg font-bold text-white">☁️ Secure Image Storage</h4>
              <div className="space-y-3">
                <p className="text-sm text-text-secondary">Cloudflare R2 for proof images</p>
                <ul className="space-y-2 text-sm text-text-muted">
                  <li>✓ Direct browser uploads</li>
                  <li>✓ 10MB image limit</li>
                  <li>✓ CDN-backed delivery</li>
                  <li>✓ Presigned URLs</li>
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Earnings Example */}
      <section className="section-padding">
        <div className="container-max">
          <motion.div
            initial="hidden"
            whileInView="show"
            variants={containerVariants}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={itemVariants} className="glassmorphic-card space-y-8">
              <div className="space-y-2">
                <p className="text-xs text-text-muted uppercase tracking-wider">Example Earnings</p>
                <h3 className="text-2xl font-bold text-white">Learn TypeScript Course</h3>
              </div>

              <div className="space-y-4 border-t border-text-muted/20 pt-6">
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Your Stake</span>
                  <span className="text-xl font-bold text-white">0.5 SOL</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-secondary">Community Stake (5 others)</span>
                  <span className="text-xl font-bold text-white">2.5 SOL</span>
                </div>
                <div className="border-t border-text-muted/20 pt-4 flex justify-between items-center">
                  <span className="text-text-secondary">Failed Goals Forfeited</span>
                  <span className="text-xl font-bold text-danger-red">1.0 SOL</span>
                </div>

                <div className="bg-solana-green/10 border border-solana-green/30 rounded-lg p-4 text-center space-y-1">
                  <p className="text-xs text-text-muted">YOU GET</p>
                  <p className="text-3xl font-black text-solana-green">0.83 SOL</p>
                  <p className="text-xs text-text-muted">+66% profit! 🎉</p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-heading-lg text-white">Earn Together</h3>
              <p className="text-lg text-text-secondary leading-relaxed">
                Your success benefits from others' failures. But it's not zero-sum. A rising tide
                lifts all boats. More goal-achievers means a healthier community.
              </p>

              <motion.div
                initial="hidden"
                whileInView="show"
                variants={containerVariants}
                viewport={{ once: true }}
                className="glassmorphic-card space-y-4"
              >
                {[
                  {
                    title: 'Fair Distribution',
                    desc: 'Rewards proportional to your stake',
                  },
                  {
                    title: 'Transparent & Verifiable',
                    desc: 'All transactions on blockchain',
                  },
                  {
                    title: 'No Counterparty Risk',
                    desc: 'Solana escrow handles all payouts',
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    className="flex items-start gap-3"
                  >
                    <div className="w-5 h-5 rounded-full bg-solana-green flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-xs text-black font-bold">✓</span>
                    </div>
                    <div>
                      <p className="font-semibold text-white">{item.title}</p>
                      <p className="text-sm text-text-muted">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="section-padding bg-bg-card/30 border-y border-text-muted/10">
        <div className="container-max">
          <motion.div
            initial="hidden"
            whileInView="show"
            variants={containerVariants}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <motion.div variants={itemVariants} className="text-center space-y-4">
              <h2 className="text-heading-lg text-white">Built with Industry-Leading Technology</h2>
              <p className="text-subheading max-w-2xl mx-auto">
                Combining Solana, Snowflake, Cloudflare, and Supabase for a premium experience
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="show"
              variants={containerVariants}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {[
                { name: 'Solana', desc: 'Blockchain', icon: '⚡' },
                { name: 'Snowflake', desc: 'AI & ML', icon: '🤖' },
                { name: 'Cloudflare', desc: 'Storage & CDN', icon: '☁️' },
                { name: 'Supabase', desc: 'Database', icon: '🗄️' },
              ].map((tech, idx) => (
                <motion.div key={idx} variants={itemVariants} className="card text-center">
                  <div className="text-5xl mb-4">{tech.icon}</div>
                  <h4 className="text-lg font-bold text-white mb-1">{tech.name}</h4>
                  <p className="text-sm text-text-muted">{tech.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-blue-500/10 pointer-events-none" />

        <motion.div
          initial="hidden"
          whileInView="show"
          variants={containerVariants}
          viewport={{ once: true }}
          className="container-max relative z-10 text-center space-y-8"
        >
          <motion.h2 variants={itemVariants} className="text-heading-lg text-white">
            Stop Talking. Start Achieving.
          </motion.h2>
          <motion.p variants={itemVariants} className="text-subheading max-w-2xl mx-auto">
            Real stakes. Real accountability. Real results. Your next goal is one click away.
          </motion.p>
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary pulse-glow inline-flex items-center gap-2 text-lg px-10 py-4"
          >
            Connect Wallet
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}
