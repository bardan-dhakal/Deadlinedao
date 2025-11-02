import * as dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';
import { distributeDeadlineRewards } from '../lib/solana/payouts';
import { createPayout } from '../lib/supabase/payouts';

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

async function triggerPayoutsForDeadline(deadlineDate?: string) {
  try {
    console.log('💰 PHASE 2: Deadline Reward Distribution\n');
    console.log('=' .repeat(70));
    console.log('This distributes REWARDS from failed stakes to winners.');
    console.log('Original stakes were already returned when proofs were approved.\n');
    console.log('=' .repeat(70));

    // If no deadline specified, use today
    const targetDate = deadlineDate || new Date().toISOString().split('T')[0];
    console.log(`📅 Target Deadline: ${targetDate}\n`);

    // Fetch all goals
    const { data: allGoals, error: fetchError } = await supabase
      .from('goals')
      .select('*')
      .order('created_at', { ascending: false });

    if (fetchError || !allGoals) {
      console.error('❌ Error fetching goals:', fetchError?.message);
      process.exit(1);
    }

    // Filter by deadline date
    const targetDeadline = new Date(targetDate);
    const goalsForDeadline = allGoals.filter(g => {
      const gDeadline = new Date(g.deadline);
      return (
        gDeadline.getFullYear() === targetDeadline.getFullYear() &&
        gDeadline.getMonth() === targetDeadline.getMonth() &&
        gDeadline.getDate() === targetDeadline.getDate()
      );
    });

    if (goalsForDeadline.length === 0) {
      console.log(`❌ No goals found for deadline: ${targetDate}`);
      console.log('\nAvailable deadlines:');
      const uniqueDeadlines = Array.from(new Set(allGoals.map(g => new Date(g.deadline).toISOString().split('T')[0])));
      uniqueDeadlines.forEach(d => console.log(`   - ${d}`));
      process.exit(1);
    }

    // Separate by status
    const completedGoals = goalsForDeadline.filter(g => g.status === 'completed');
    const failedGoals = goalsForDeadline.filter(g => g.status === 'failed');
    const activeGoals = goalsForDeadline.filter(g => g.status === 'active');

    console.log('📊 Goal Statistics:');
    console.log(`   Total Goals: ${goalsForDeadline.length}`);
    console.log(`   ✅ Completed: ${completedGoals.length}`);
    console.log(`   ❌ Failed: ${failedGoals.length}`);
    console.log(`   ⏳ Active: ${activeGoals.length}\n`);

    if (completedGoals.length === 0) {
      console.log('⚠️  No completed goals to pay out!');
      process.exit(0);
    }

    if (failedGoals.length === 0) {
      console.log('ℹ️  No failed goals - winners will only get their stake back.\n');
    }

    // Calculate totals
    const totalCompletedStake = completedGoals.reduce((sum, g) => sum + parseFloat(g.stake_amount.toString()), 0);
    const totalFailedStake = failedGoals.reduce((sum, g) => sum + parseFloat(g.stake_amount.toString()), 0);

    console.log('💎 Prize Pool:');
    console.log(`   Winners Total Stake: ${totalCompletedStake.toFixed(4)} SOL (already returned)`);
    console.log(`   Failed Stakes (Reward Pool): ${totalFailedStake.toFixed(4)} SOL`);
    console.log(`   REWARDS to Distribute: ${totalFailedStake.toFixed(4)} SOL\n`);

    // Show reward breakdown
    console.log('👥 Reward Distribution Preview:');
    const uniqueWinners = Array.from(new Set(completedGoals.map(g => g.wallet_address)));
    uniqueWinners.forEach(wallet => {
      const userGoals = completedGoals.filter(g => g.wallet_address === wallet);
      const userStake = userGoals.reduce((sum, g) => sum + parseFloat(g.stake_amount.toString()), 0);
      const proportion = userStake / totalCompletedStake;
      const reward = proportion * totalFailedStake;

      console.log(`   ${wallet.slice(0, 8)}...${wallet.slice(-6)}`);
      console.log(`      Original Stake: ${userStake.toFixed(4)} SOL (already returned)`);
      console.log(`      Reward Share: ${(proportion * 100).toFixed(1)}%`);
      console.log(`      Reward Amount: ${reward.toFixed(4)} SOL 💰\n`);
    });

    // Confirm before executing
    console.log('=' .repeat(70));
    console.log('⚠️  Ready to distribute REWARDS on Solana devnet!');
    console.log('   This will send REAL transactions for rewards only.\n');

    // Execute reward distribution
    console.log('🚀 Distributing rewards...\n');
    const result = await distributeDeadlineRewards(completedGoals, failedGoals);

    console.log('=' .repeat(70));
    console.log('📊 Reward Distribution Results:\n');

    let successCount = 0;
    let errorCount = 0;

    for (const payout of result.payouts) {
      if (payout.signature) {
        console.log(`✅ ${payout.recipient.slice(0, 8)}...${payout.recipient.slice(-6)}`);
        console.log(`   Amount: ${payout.amount.toFixed(4)} SOL`);
        console.log(`   Type: ${payout.type}`);
        console.log(`   Signature: ${payout.signature}`);
        console.log(`   Explorer: https://explorer.solana.com/tx/${payout.signature}?cluster=devnet\n`);

        // Save to database
        const goalId = completedGoals.find(g => g.wallet_address === payout.recipient)?.id;
        if (goalId) {
          await createPayout({
            goal_id: goalId,
            wallet_address: payout.recipient,
            amount: payout.amount,
            tx_signature: payout.signature,
            payout_type: payout.type,
          });
        }

        successCount++;
      } else {
        console.log(`❌ ${payout.recipient.slice(0, 8)}...${payout.recipient.slice(-6)}`);
        console.log(`   Error: ${payout.error}\n`);
        errorCount++;
      }
    }

    console.log('=' .repeat(70));
    console.log('🎉 Reward Distribution Complete!\n');
    console.log(`✅ Successful Reward Payouts: ${successCount}`);
    console.log(`❌ Failed Reward Payouts: ${errorCount}`);
    console.log(`💰 Total Rewards Distributed: ${result.payouts.reduce((sum, p) => sum + (p.signature ? p.amount : 0), 0).toFixed(4)} SOL`);
    console.log(`📝 Note: Original stakes (${totalCompletedStake.toFixed(4)} SOL) were already returned\n`);

  } catch (error: any) {
    console.error('❌ Error:', error?.message || error);
    process.exit(1);
  }
}

// Get deadline from command line args
const deadline = process.argv[2];

if (deadline) {
  console.log(`Using specified deadline: ${deadline}\n`);
}

triggerPayoutsForDeadline(deadline);
