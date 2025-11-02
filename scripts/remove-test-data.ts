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

// Test wallet addresses to remove
const testWallets = [
  'Alice7xKJ9Q2Hf3nT8vWmP5rL4sB1cN6eZ9yU3jM8iV2k',
  'Bob4aR2wE9tY7uI5oP3qK8jH6gF4dS2zA1xC5vB9nM7',
  'Carol2sD8fG4hJ6kL9zX3cV5bN7mQ1wE4rT6yU8iO3p',
];

async function removeTestData() {
  try {
    console.log('🧹 Removing Test/Dummy Data from Database...\n');

    // First, show what will be deleted
    const { data: testGoals, error: fetchError } = await supabase
      .from('goals')
      .select('*')
      .in('wallet_address', testWallets);

    if (fetchError) {
      console.error('❌ Error fetching test goals:', fetchError.message);
      process.exit(1);
    }

    if (!testGoals || testGoals.length === 0) {
      console.log('✅ No test data found! Database is clean.\n');
      return;
    }

    console.log(`📋 Found ${testGoals.length} test goals to remove:\n`);
    testGoals.forEach((goal, index) => {
      console.log(`   ${index + 1}. "${goal.title}" by ${goal.wallet_address.slice(0, 8)}... (${goal.stake_amount} SOL) [${goal.status}]`);
    });

    console.log('\n🗑️  Deleting test goals...\n');

    // Delete all test goals
    const { data: deletedGoals, error: deleteError } = await supabase
      .from('goals')
      .delete()
      .in('wallet_address', testWallets)
      .select();

    if (deleteError) {
      console.error('❌ Error deleting test goals:', deleteError.message);
      process.exit(1);
    }

    console.log(`✅ Successfully deleted ${deletedGoals?.length || 0} test goals!\n`);

    // Also remove any goals with test transaction signatures
    const { data: testTxGoals, error: testTxError } = await supabase
      .from('goals')
      .delete()
      .like('stake_tx_signature', 'test_tx_%')
      .select();

    if (!testTxError && testTxGoals && testTxGoals.length > 0) {
      console.log(`✅ Also removed ${testTxGoals.length} goals with test transactions\n`);
    }

    console.log('🎉 Database cleaned! All dummy/test data removed.\n');

  } catch (error: any) {
    console.error('❌ Error:', error?.message || error);
  }
}

removeTestData();
