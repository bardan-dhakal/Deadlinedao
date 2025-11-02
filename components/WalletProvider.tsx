'use client';

import React, { useMemo, useCallback, useEffect } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork, WalletError } from '@solana/wallet-adapter-base';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  CoinbaseWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';

export function SolanaWalletProvider({ children }: { children: React.ReactNode }) {
  // Use devnet for development (matches your .env.local)
  const network = WalletAdapterNetwork.Devnet;

  // Get RPC endpoint from env or use default devnet
  const endpoint = useMemo(
    () => process.env.NEXT_PUBLIC_SOLANA_RPC_URL || clusterApiUrl(network),
    [network]
  );

  // Configure supported wallets
  const wallets = useMemo(
    () => {
      return [
        new PhantomWalletAdapter(),
        new SolflareWalletAdapter(),
        new CoinbaseWalletAdapter(),
      ];
    },
    [network]
  );

  // Error handler - suppress WalletNotReadyError
  const onError = useCallback((error: WalletError) => {
    // Suppress WalletNotReadyError since it's expected when wallet isn't installed
    if (error.name === 'WalletNotReadyError') {
      console.log('Wallet not ready - extension may not be installed');
      return;
    }
    console.error('Wallet error:', error);
  }, []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} onError={onError} autoConnect={true}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
