'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Github } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg-primary/80 backdrop-blur-xl border-b border-text-muted/10">
      <nav className="max-w-7xl mx-auto px-6 h-16 lg:h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 flex-shrink-0 group"
        >
          <span className="text-2xl font-black text-gradient cursor-pointer">
            🎯 DeadlineDAO
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-12">
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="text-text-secondary hover:text-solana-green font-medium transition-colors text-sm"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection('features')}
            className="text-text-secondary hover:text-solana-green font-medium transition-colors text-sm"
          >
            Features
          </button>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-solana-green font-medium transition-colors text-sm flex items-center gap-2"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
        </div>

        {/* Wallet Button */}
        <div className="flex items-center gap-4">
          <button className="hidden sm:block btn-primary text-sm px-6 py-2 h-10">
            Connect Wallet
          </button>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-bg-card transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-text-primary" />
            ) : (
              <Menu className="w-6 h-6 text-text-primary" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-bg-card/95 backdrop-blur-xl border-b border-text-muted/10 px-6 py-4 space-y-3">
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="block w-full text-left px-4 py-3 rounded-lg text-text-secondary hover:bg-bg-primary hover:text-solana-green transition-colors"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection('features')}
            className="block w-full text-left px-4 py-3 rounded-lg text-text-secondary hover:bg-bg-primary hover:text-solana-green transition-colors"
          >
            Features
          </button>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-left px-4 py-3 rounded-lg text-text-secondary hover:bg-bg-primary hover:text-solana-green transition-colors"
          >
            GitHub
          </a>
          <button className="w-full btn-primary py-2 text-sm mt-4">
            Connect Wallet
          </button>
        </div>
      )}
    </header>
  );
}
