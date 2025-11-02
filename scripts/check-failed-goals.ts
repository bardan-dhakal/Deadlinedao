import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkFailedGoals() {
  try {
    console.log('🔍 Checking Failed Goals for Redistribution...\n');

    // Get all failed goals
    const { data: failedGoals, error } = await supabase
      .from('goals')
      .select('*')
      .eq('status', 'failed')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('❌ Error fetching failed goals:', error);
      return;
    }

    if (!failedGoals || failedGoals.length === 0) {
      console.log('⚠️  No failed goals found!');
      console.log('💡 This means there are NO stakes to redistribute to winners');
      console.log('📝 Winners will only get their original stake back (no bonus)\n');
      return;
    }

    console.log(`📊 Found ${failedGoals.length} failed goal(s):\n`);

    let totalStakePool = 0;

    failedGoals.forEach((goal, index) => {
      console.log(`${index + 1}. "${goal.title}"`);
      console.log(`   Wallet: ${goal.wallet_address.slice(0, 8)}...${goal.wallet_address.slice(-8)}`);
      console.log(`   Stake: ${goal.stake_amount} SOL`);
      console.log(`   Deadline: ${new Date(goal.deadline).toLocaleDateString()}`);
      console.log('');
      totalStakePool += parseFloat(goal.stake_amount);
    });

    console.log(`💰 Total Stake Pool Available: ${totalStakePool.toFixed(4)} SOL`);
    console.log('✅ This pool will be redistributed to successful goal completers!\n');

    console.log('📋 Redistribution Logic:');
    console.log('  • When someone completes a goal and AI approves:');
    console.log('  • They get: Original Stake + Proportional Share of Failed Stakes');
    console.log('  • Formula: YourStake + (YourStake / TotalWinnersStake) × TotalFailedStakes\n');

  } catch (error: any) {
    console.error('❌ Error:', error?.message || error);
  }
}

checkFailedGoals();
