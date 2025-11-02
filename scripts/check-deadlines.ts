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

async function checkDeadlines() {
  try {
    console.log('🔍 Checking Goal Deadlines...\n');

    // Get all goals
    const { data: goals, error } = await supabase
      .from('goals')
      .select('*')
      .order('deadline', { ascending: true });

    if (error) {
      console.error('❌ Error fetching goals:', error);
      return;
    }

    if (!goals || goals.length === 0) {
      console.log('⚠️  No goals found!');
      return;
    }

    console.log(`📊 Total Goals: ${goals.length}\n`);

    // Group by deadline
    const deadlineGroups = new Map<string, any[]>();

    goals.forEach(goal => {
      const deadline = new Date(goal.deadline).toISOString().split('T')[0];
      if (!deadlineGroups.has(deadline)) {
        deadlineGroups.set(deadline, []);
      }
      deadlineGroups.get(deadline)!.push(goal);
    });

    console.log(`📅 Unique Deadlines: ${deadlineGroups.size}\n`);

    // Display each deadline group
    Array.from(deadlineGroups.entries()).forEach(([deadline, goalsInGroup]) => {
      console.log(`\n🗓️  Deadline: ${deadline}`);
      console.log(`   Total Goals: ${goalsInGroup.length}`);

      const activeCount = goalsInGroup.filter(g => g.status === 'active').length;
      const completedCount = goalsInGroup.filter(g => g.status === 'completed').length;
      const failedCount = goalsInGroup.filter(g => g.status === 'failed').length;

      console.log(`   Active: ${activeCount} | Completed: ${completedCount} | Failed: ${failedCount}`);

      const totalStake = goalsInGroup.reduce((sum, g) => sum + parseFloat(g.stake_amount), 0);
      const failedStake = goalsInGroup.filter(g => g.status === 'failed').reduce((sum, g) => sum + parseFloat(g.stake_amount), 0);

      console.log(`   Total Stake: ${totalStake.toFixed(4)} SOL`);
      console.log(`   Prize Pool: ${failedStake.toFixed(4)} SOL`);

      // Show goals in this group
      console.log(`   Goals:`);
      goalsInGroup.forEach((goal, idx) => {
        console.log(`     ${idx + 1}. "${goal.title}" - ${goal.status} - ${goal.stake_amount} SOL`);
      });
    });

  } catch (error: any) {
    console.error('❌ Error:', error?.message || error);
  }
}

checkDeadlines();
