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

async function approvePendingGoals() {
  try {
    console.log('🔍 Finding goals with "Pending Validation" status...\n');

    // Get all pending_validation goals
    const { data: pendingGoals, error: fetchError } = await supabase
      .from('goals')
      .select('*')
      .eq('status', 'pending_validation');

    if (fetchError) {
      console.error('❌ Error fetching goals:', fetchError);
      return;
    }

    if (!pendingGoals || pendingGoals.length === 0) {
      console.log('✅ No pending goals found! All clear.');
      return;
    }

    console.log(`📊 Found ${pendingGoals.length} pending goal(s):\n`);

    pendingGoals.forEach((goal, index) => {
      console.log(`${index + 1}. "${goal.title}"`);
      console.log(`   Stake: ${goal.stake_amount} SOL`);
      console.log(`   Deadline: ${new Date(goal.deadline).toLocaleDateString()}`);
      console.log('');
    });

    console.log('⚙️  Approving all pending goals...\n');

    // Update all to completed status
    const { data: updatedGoals, error: updateError } = await supabase
      .from('goals')
      .update({ status: 'active' }) // Change to active so they can submit proof again
      .eq('status', 'pending_validation')
      .select();

    if (updateError) {
      console.error('❌ Error updating goals:', updateError);
      return;
    }

    console.log(`✅ Successfully updated ${updatedGoals?.length || 0} goal(s) to ACTIVE status`);
    console.log('\n💡 These goals are now ACTIVE - you can submit proof again!');
    console.log('📝 With the new AI settings, proofs will be auto-approved (not stuck in pending)');

  } catch (error: any) {
    console.error('❌ Error:', error?.message || error);
  }
}

approvePendingGoals();
