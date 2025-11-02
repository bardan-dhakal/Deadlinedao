'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import WalletMultiButton to avoid SSR issues
const WalletMultiButton = dynamic(
  () => import('@solana/wallet-adapter-react-ui').then((mod) => mod.WalletMultiButton),
  { ssr: false }
);

export function WalletButton({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Show placeholder during SSR
  if (!mounted) {
    return (
      <button className={className} disabled>
        Connect Wallet
      </button>
    );
  }

  // Use the built-in WalletMultiButton which handles all wallet interactions
  return <WalletMultiButton className={className} />;
}
