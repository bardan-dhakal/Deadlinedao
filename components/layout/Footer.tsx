import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bg-card border-t border-gray-800 mt-20">
      <div className="container-max py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="text-2xl font-black text-gradient">
              🎯 DeadlineDAO
            </div>
            <p className="text-text-secondary text-sm leading-relaxed">
              AI-powered accountability on Solana. Lock SOL, achieve goals, get rewarded.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-text-primary mb-6 uppercase tracking-wide text-sm">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/feed"
                  className="text-text-secondary hover:text-solana-green text-sm transition-colors"
                >
                  Browse Goals
                </Link>
              </li>
              <li>
                <Link
                  href="/create"
                  className="text-text-secondary hover:text-solana-green text-sm transition-colors"
                >
                  Create Goal
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-text-secondary hover:text-solana-green text-sm transition-colors"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-text-primary mb-6 uppercase tracking-wide text-sm">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-text-secondary hover:text-solana-green text-sm transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-text-secondary hover:text-solana-green text-sm transition-colors"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-text-secondary hover:text-solana-green text-sm transition-colors"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-text-primary mb-6 uppercase tracking-wide text-sm">Legal</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-text-secondary hover:text-solana-green text-sm transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-text-secondary hover:text-solana-green text-sm transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-text-secondary hover:text-solana-green text-sm transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-text-muted space-y-4 md:space-y-0">
            <p>&copy; {currentYear} DeadlineDAO. Built for OSU Hackathon 2025.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-solana-green transition-colors">
                Twitter
              </a>
              <a href="#" className="hover:text-solana-green transition-colors">
                Discord
              </a>
              <a href="#" className="hover:text-solana-green transition-colors">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
