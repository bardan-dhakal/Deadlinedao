import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

async function updateDeadlines() {
  console.log('📅 Updating demo goal deadlines to future dates...\n');

  // Get all active goals
  const { data: goals } = await supabase
    .from('goals')
    .select('*')
    .eq('status', 'active');

  if (!goals || goals.length === 0) {
    console.log('No active goals found');
    return;
  }

  for (const goal of goals) {
    // Set deadline to 7 days from now
    const newDeadline = new Date();
    newDeadline.setDate(newDeadline.getDate() + 7);

    const { error } = await supabase
      .from('goals')
      .update({ deadline: newDeadline.toISOString() })
      .eq('id', goal.id);

    if (error) {
      console.log(`❌ Failed to update ${goal.title}`);
    } else {
      console.log(`✅ Updated: ${goal.title} - New deadline: ${newDeadline.toLocaleDateString()}`);
    }
  }

  console.log('\n✨ All deadlines updated! You can now submit proofs.');
}

updateDeadlines().catch(console.error);
