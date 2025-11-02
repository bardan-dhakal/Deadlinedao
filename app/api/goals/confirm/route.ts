import { NextRequest, NextResponse } from 'next/server';
import { Connection } from '@solana/web3.js';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Initialize Solana connection
const connection = new Connection(
  process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.devnet.solana.com',
  'confirmed'
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { goalId, signature } = body;

    if (!goalId || !signature) {
      return NextResponse.json(
        { error: 'Missing goalId or signature' },
        { status: 400 }
      );
    }

    // Verify transaction on-chain
    let confirmed = false;
    try {
      const status = await connection.getSignatureStatus(signature);
      confirmed = status?.value?.confirmationStatus === 'confirmed' ||
                  status?.value?.confirmationStatus === 'finalized';
    } catch (error) {
      console.error('Error checking transaction status:', error);
    }

    if (!confirmed) {
      return NextResponse.json(
        { error: 'Transaction not confirmed yet. Please wait and try again.' },
        { status: 400 }
      );
    }

    // Update goal status in database
    const { data, error } = await supabase
      .from('goals')
      .update({
        status: 'active',
        stake_tx_signature: signature,
      })
      .eq('id', goalId)
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to update goal', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      goal: data,
      message: 'Goal activated! Your SOL has been staked.',
    });

  } catch (error: any) {
    console.error('Error confirming transaction:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
