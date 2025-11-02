import { getEscrowPublicKey, getBalance } from '../lib/solana/client';
import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

async function checkEscrow() {
  try {
    console.log('🔍 Checking Escrow Wallet Status...\n');

    const escrowPubkey = getEscrowPublicKey();
    console.log('📍 Escrow Address:', escrowPubkey.toBase58());

    const balance = await getBalance(escrowPubkey);
    console.log('💰 Escrow Balance:', balance, 'SOL\n');

    if (balance === 0) {
      console.log('⚠️  WARNING: Escrow wallet has NO funds!');
      console.log('❌ Payouts will FAIL until escrow is funded\n');
      console.log('💡 To fund the escrow wallet:');
      console.log('1. Go to: https://faucet.solana.com');
      console.log('2. Enter this address:', escrowPubkey.toBase58());
      console.log('3. Request devnet SOL (recommend at least 5 SOL)\n');
    } else if (balance < 1) {
      console.log('⚠️  WARNING: Escrow balance is low');
      console.log('💡 Consider adding more SOL for multiple payouts\n');
    } else {
      console.log('✅ Escrow wallet is sufficiently funded');
      console.log('✅ Payouts should work correctly\n');
    }

    console.log('📊 Escrow Status Summary:');
    console.log('  • Address:', escrowPubkey.toBase58());
    console.log('  • Balance:', balance, 'SOL');
    console.log('  • Network: devnet');
    console.log('  • Status:', balance > 0 ? '✅ Ready' : '❌ Not Funded');

  } catch (error: any) {
    console.error('❌ Error checking escrow:', error?.message || error);
  }
}

checkEscrow();
