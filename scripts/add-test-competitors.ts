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

// Generate fake wallet addresses for testing
const testWallets = [
  'Alice7xKJ9Q2Hf3nT8vWmP5rL4sB1cN6eZ9yU3jM8iV2k',
  'Bob4aR2wE9tY7uI5oP3qK8jH6gF4dS2zA1xC5vB9nM7',
  'Carol2sD8fG4hJ6kL9zX3cV5bN7mQ1wE4rT6yU8iO3p',
];

async function addTestCompetitors() {
  try {
    console.log('🎮 Adding Test Competitors for Multiplayer Demo...\n');

    // Target deadline - Nov 2, 2025 (where current user already has goals)
    const targetDeadline = new Date('2025-11-02').toISOString();

    const testGoals = [
      {
        wallet_address: testWallets[0],
        title: 'Build AI Chatbot',
        description: 'Create a fully functional AI chatbot using GPT-4',
        deadline: targetDeadline,
        category: 'work',
        stake_amount: 0.8,
        stake_tx_signature: 'test_tx_alice_' + Date.now(),
        status: 'active',
      },
      {
        wallet_address: testWallets[1],
        title: 'Complete Marathon Training',
        description: 'Finish 30 days of marathon training program',
        deadline: targetDeadline,
        category: 'health',
        stake_amount: 0.3,
        stake_tx_signature: 'test_tx_bob_' + Date.now(),
        status: 'active',
      },
      {
        wallet_address: testWallets[1],
        title: 'Learn TypeScript Advanced Topics',
        description: 'Master TypeScript generics, utility types, and decorators',
        deadline: targetDeadline,
        category: 'learning',
        stake_amount: 0.2,
        stake_tx_signature: 'test_tx_bob2_' + Date.now(),
        status: 'active',
      },
      {
        wallet_address: testWallets[2],
        title: 'Write Technical Blog Series',
        description: 'Publish 5 technical blog posts on web development',
        deadline: targetDeadline,
        category: 'work',
        stake_amount: 0.4,
        stake_tx_signature: 'test_tx_carol_' + Date.now(),
        status: 'active',
      },
      // Add one failed goal to increase prize pool
      {
        wallet_address: testWallets[2],
        title: 'Daily Meditation - 30 Days',
        description: 'Meditate every day for 30 days',
        deadline: targetDeadline,
        category: 'health',
        stake_amount: 0.15,
        stake_tx_signature: 'test_tx_carol_failed_' + Date.now(),
        status: 'failed',
      },
    ];

    console.log('📝 Creating test goals...\n');

    let successCount = 0;
    for (const goal of testGoals) {
      const { data, error } = await supabase
        .from('goals')
        .insert(goal)
        .select()
        .single();

      if (error) {
        console.error(`❌ Failed to create goal "${goal.title}":`, error.message);
      } else {
        console.log(`✅ Created: "${goal.title}" by ${goal.wallet_address.slice(0, 8)}... (${goal.stake_amount} SOL) [${goal.status}]`);
        successCount++;
      }
    }

    console.log(`\n✨ Successfully created ${successCount}/${testGoals.length} test goals!\n`);

    // Show updated competition stats
    const { data: allGoals } = await supabase
      .from('goals')
      .select('*')
      .eq('deadline', targetDeadline);

    if (allGoals) {
      const activeGoals = allGoals.filter(g => g.status === 'active');
      const failedGoals = allGoals.filter(g => g.status === 'failed');
      const uniqueUsers = new Set(activeGoals.map(g => g.wallet_address));
      const totalPrizePool = failedGoals.reduce((sum, g) => sum + parseFloat(g.stake_amount), 0);
      const totalActiveStake = activeGoals.reduce((sum, g) => sum + parseFloat(g.stake_amount), 0);

      console.log('🏆 Updated Competition Stats for Nov 2, 2025:');
      console.log(`   Total Competitors: ${uniqueUsers.size}`);
      console.log(`   Active Goals: ${activeGoals.length}`);
      console.log(`   Failed Goals: ${failedGoals.length}`);
      console.log(`   Prize Pool: ${totalPrizePool.toFixed(4)} SOL`);
      console.log(`   Total Active Stakes: ${totalActiveStake.toFixed(4)} SOL`);
      console.log(`   Total Potential: ${(totalPrizePool + totalActiveStake).toFixed(4)} SOL\n`);

      console.log('👥 Competitors:');
      Array.from(uniqueUsers).forEach((wallet, index) => {
        const userGoals = activeGoals.filter(g => g.wallet_address === wallet);
        const userStake = userGoals.reduce((sum, g) => sum + parseFloat(g.stake_amount), 0);
        console.log(`   ${index + 1}. ${wallet.slice(0, 8)}... - ${userStake.toFixed(3)} SOL (${userGoals.length} goals)`);
      });
    }

    console.log('\n🎉 Multiplayer feature ready! Refresh your dashboard to see competitors!\n');

  } catch (error: any) {
    console.error('❌ Error:', error?.message || error);
  }
}

addTestCompetitors();
