/**
 * Script to set up Supabase database tables
 * Run with: npx tsx scripts/setup-supabase.ts
 */

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTables() {
  console.log('🔍 Checking if tables exist...\n');

  const tables = ['goals', 'proofs', 'payouts'];
  const results: Record<string, boolean> = {};

  for (const table of tables) {
    try {
      const { error } = await supabase.from(table).select('count').limit(1);

      if (error) {
        console.log(`❌ Table '${table}' does not exist`);
        results[table] = false;
      } else {
        console.log(`✅ Table '${table}' exists`);
        results[table] = true;
      }
    } catch (err) {
      console.log(`❌ Table '${table}' does not exist`);
      results[table] = false;
    }
  }

  return results;
}

async function createTestGoal() {
  console.log('\n📝 Creating test goal...');

  const testGoal = {
    wallet_address: 'HUMTeQfMZypVQRT6X4PUpuGucZXk4UN3hPPTp8yRd4iq',
    title: 'Complete Next.js Tutorial',
    description: 'Build a full-stack app with Next.js 16 and deploy it',
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
    stake_amount: 0.5,
    stake_tx_signature: 'test_signature_' + Date.now(),
    status: 'active',
    category: 'learning',
  };

  const { data, error } = await supabase.from('goals').insert(testGoal).select();

  if (error) {
    console.error('❌ Failed to create test goal:', error.message);
    return null;
  }

  console.log('✅ Test goal created:', data[0].id);
  return data[0];
}

async function main() {
  console.log('🚀 DeadlineDAO Supabase Setup\n');
  console.log('Supabase URL:', supabaseUrl);
  console.log('');

  // Check if tables exist
  const tableStatus = await checkTables();

  const allTablesExist = Object.values(tableStatus).every(exists => exists);

  if (!allTablesExist) {
    console.log('\n⚠️  Some tables are missing!');
    console.log('\n📋 To set up the database:');
    console.log('1. Go to: https://supabase.com/dashboard/project/bckgbxvadgsamfarpnfh/sql');
    console.log('2. Copy and paste the contents of supabase-schema.sql');
    console.log('3. Click "Run" to execute the SQL');
    console.log('4. Run this script again to verify\n');
    process.exit(1);
  }

  console.log('\n✅ All tables exist!\n');

  // Check if we have any goals
  const { data: existingGoals, error } = await supabase
    .from('goals')
    .select('count')
    .limit(1);

  if (error) {
    console.error('❌ Error checking goals:', error.message);
    process.exit(1);
  }

  console.log(`📊 Current goals in database: ${existingGoals?.length || 0}\n`);

  // Create demo goals automatically
  console.log('🎯 Creating demo goals for presentation...\n');

  const demoGoals = [
    {
      wallet_address: 'HUMTeQfMZypVQRT6X4PUpuGucZXk4UN3hPPTp8yRd4iq',
      title: 'Complete Full-Stack Project',
      description: 'Build and deploy a complete web3 application with Solana integration',
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      stake_amount: 1.5,
      stake_tx_signature: 'demo_tx_' + Date.now() + '_1',
      status: 'active',
      category: 'work',
    },
    {
      wallet_address: 'HUMTeQfMZypVQRT6X4PUpuGucZXk4UN3hPPTp8yRd4iq',
      title: 'Learn Snowflake Cortex AI',
      description: 'Complete all tutorials and build a demo project using Snowflake Cortex for AI validation',
      deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      stake_amount: 0.8,
      stake_tx_signature: 'demo_tx_' + Date.now() + '_2',
      status: 'active',
      category: 'learning',
    },
    {
      wallet_address: 'HUMTeQfMZypVQRT6X4PUpuGucZXk4UN3hPPTp8yRd4iq',
      title: 'Daily Exercise - 30 Days',
      description: 'Complete 30 minutes of exercise every day for 30 days straight',
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      stake_amount: 2.0,
      stake_tx_signature: 'demo_tx_' + Date.now() + '_3',
      status: 'active',
      category: 'health',
    },
  ];

  for (const goal of demoGoals) {
    const { data, error } = await supabase
      .from('goals')
      .insert(goal)
      .select();

    if (error) {
      console.log(`  ⚠️  Goal "${goal.title}" may already exist`);
    } else {
      console.log(`  ✅ Created: "${goal.title}" (${goal.stake_amount} SOL)`);
    }
  }

  console.log('\n✨ Setup complete! Your database is ready for demo.\n');
}

main().catch(console.error);
