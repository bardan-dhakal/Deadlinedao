import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables FIRST
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkPayouts() {
  try {
    console.log('🔍 Checking Payout Records...\n');

    // Get all payouts
    const { data: payouts, error: payoutsError } = await supabase
      .from('payouts')
      .select('*')
      .order('created_at', { ascending: false });

    if (payoutsError) {
      console.error('❌ Error fetching payouts:', payoutsError);
      return;
    }

    console.log('📊 Total Payouts:', payouts?.length || 0);

    if (!payouts || payouts.length === 0) {
      console.log('⚠️  No payouts have been processed yet\n');
      console.log('💡 This could mean:');
      console.log('  • No goals have been completed yet');
      console.log('  • AI has not approved any proofs yet');
      console.log('  • Payout system needs testing\n');
    } else {
      console.log('✅ Payouts have been processed!\n');

      // Calculate total paid out
      const totalPaid = payouts.reduce((sum, p) => sum + parseFloat(p.amount), 0);
      console.log('💰 Total Amount Paid:', totalPaid.toFixed(4), 'SOL\n');

      // Show recent payouts
      console.log('📋 Recent Payouts:');
      payouts.slice(0, 5).forEach((payout, index) => {
        console.log(`\n${index + 1}. Payout ID: ${payout.id}`);
        console.log(`   Wallet: ${payout.wallet_address.slice(0, 8)}...${payout.wallet_address.slice(-8)}`);
        console.log(`   Amount: ${payout.amount} SOL`);
        console.log(`   Type: ${payout.payout_type}`);
        console.log(`   TX: ${payout.tx_signature.slice(0, 20)}...`);
        console.log(`   Date: ${new Date(payout.created_at).toLocaleString()}`);
      });
    }

    // Check completed goals
    const { data: completedGoals, error: goalsError } = await supabase
      .from('goals')
      .select('*')
      .eq('status', 'completed');

    if (!goalsError && completedGoals) {
      console.log('\n\n✅ Completed Goals:', completedGoals.length);

      if (completedGoals.length > 0 && (!payouts || payouts.length === 0)) {
        console.log('⚠️  WARNING: You have completed goals but no payout records!');
        console.log('💡 This indicates the payout system may not be executing properly');
      } else if (completedGoals.length === payouts?.length) {
        console.log('✅ All completed goals have matching payouts');
      }
    }

  } catch (error: any) {
    console.error('❌ Error:', error?.message || error);
  }
}

checkPayouts();
