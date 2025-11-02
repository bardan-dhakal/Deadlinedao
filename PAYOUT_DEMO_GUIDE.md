# 💰 Payout System Demo Guide

## How Payouts Work in DeadlineDAO

### 🔄 Two Payout Scenarios:

#### **Scenario 1: Immediate Payout (When Proof Approved)** ⚡
- Payouts **already happen immediately** when AI approves your proof!
- You don't need to wait until deadline
- The system automatically:
  1. Validates your proof with Snowflake AI
  2. Calculates your reward (stake + share of failed stakes)
  3. Sends SOL directly to your wallet on Solana
  4. Records transaction signature in database

**Code Location:** `app/api/proofs/route.ts:141`

#### **Scenario 2: Batch Payout (Manual Trigger)** 📦
- For goals that completed but missed automatic payout
- For demo purposes to show redistribution working
- Uses the manual trigger script

---

## 🎯 Demo Strategy for Hackathon

### **Option A: Show Real-Time Payout (Recommended)**

**Steps:**
1. **Create a Goal** with near deadline (e.g., 5 mins from now)
   - Use small stake: 0.01 SOL
   - Category: "work" or "learning"

2. **Submit Proof** immediately
   - Add text description
   - Upload image (optional)
   - AI validates in ~3 seconds

3. **Watch the Payout Happen!**
   - Response will include transaction signature
   - Copy signature and show on Solana Explorer
   - Show wallet balance increase

**Example API Response:**
```json
{
  "success": true,
  "goal_status": "completed",
  "payout": {
    "signature": "3XyZ...",
    "amount": 0.83,
    "originalStake": 0.5,
    "reward": 0.33
  }
}
```

**Show on Solana Explorer:**
```
https://explorer.solana.com/tx/[SIGNATURE]?cluster=devnet
```

---

### **Option B: Show Prize Pool Redistribution**

**Setup (Before Demo):**
1. Create multiple goals with same deadline
2. Use different wallets (or simulate with test accounts)
3. Mark some as failed, some as completed

**During Demo:**
```bash
# 1. Check current status
npx tsx scripts/check-payout-status.ts

# 2. Show prize pool for specific deadline
# (Visit your deployed app dashboard)

# 3. Trigger manual payout redistribution
npx tsx scripts/trigger-payouts.ts 2025-11-02

# 4. Show transaction signatures on Solana Explorer
```

---

## 📊 Demo Script Example

### **The Story:**
"Let me show you how our multiplayer accountability system works with real SOL on Solana..."

### **Live Demo:**

**1. Show Prize Pool (2 minutes)**
```
- Navigate to Dashboard
- Point out Prize Pool card on right
- Explain: "See these 3 competitors? They all have goals due Nov 2nd"
- Show total prize pool, potential payouts
```

**2. Submit Proof (1 minute)**
```
- Click "Submit Proof" on active goal
- Enter proof text
- Click Submit
- Wait for AI validation
- Show "Approved!" message
```

**3. Show Blockchain Transaction (2 minutes)**
```
- Copy transaction signature from response
- Open Solana Explorer: https://explorer.solana.com
- Paste signature
- Show:
  ✅ Transaction confirmed
  ✅ SOL sent from escrow to your wallet
  ✅ Amount matches calculated payout
```

**4. Show Updated Balance (30 seconds)**
```
- Refresh Phantom wallet
- Show increased balance
- "This is real SOL on devnet!"
```

---

## 🧪 Testing Commands

### Check Payout Status
```bash
npx tsx scripts/check-payout-status.ts
```
Shows:
- Total goals/payouts
- Recent transactions
- Completed goals without payouts
- Goals grouped by deadline

### Manual Payout Trigger
```bash
# For today's deadline
npx tsx scripts/trigger-payouts.ts

# For specific date
npx tsx scripts/trigger-payouts.ts 2025-11-02
```

### Check Escrow Balance
```bash
npx tsx scripts/check-escrow.ts
```

---

## 🎨 What Makes This Impressive

### **1. Real Blockchain Integration** 🔗
- Not simulated - actual Solana transactions
- Verifiable on-chain
- Transaction signatures visible

### **2. AI-Powered Validation** 🤖
- Snowflake Cortex AI validates proofs
- 5-layer validation system
- Fraud detection

### **3. Fair Prize Pool Math** 📐
```
Your Payout = Your Stake + (Your Stake / Total Winners) × Failed Stakes

Example:
- Your stake: 0.5 SOL
- Other winners: 1.5 SOL total
- Failed stakes: 0.8 SOL
- Your reward: (0.5 / 2.0) × 0.8 = 0.2 SOL
- Total payout: 0.7 SOL ✨
```

### **4. Multiplayer Competition** 🏆
- See all competitors in real-time
- Leaderboard by stake amount
- Know your min/max potential payout

---

## 🚨 Important Notes

### **Payouts Already Work Automatically!**
The system **automatically pays out when proof is approved**. You don't need to wait for deadline or trigger manually. The manual script is just for:
- Demo purposes
- Edge cases where automatic payout failed
- Batch processing old goals

### **Verify Transactions**
Every payout generates a Solana transaction signature. Always show this on Explorer to prove it's real!

### **Use Devnet SOL**
All demos use devnet (test network). Get free devnet SOL from:
- `solana airdrop 2 YOUR_ADDRESS --url https://api.devnet.solana.com`
- https://faucet.solana.com

---

## 📱 Quick Demo Checklist

- [ ] Switch Phantom to devnet
- [ ] Have devnet SOL in wallet
- [ ] Create goal with near deadline
- [ ] Have proof ready (text + image)
- [ ] Open Solana Explorer in tab
- [ ] Practice explaining the math
- [ ] Show transaction signature
- [ ] Refresh wallet to show balance increase

---

## 🎯 Key Points to Emphasize

1. **"This is real SOL moving on the blockchain"**
2. **"AI validates in seconds using Snowflake Cortex"**
3. **"Winners share the prize pool proportionally"**
4. **"Every transaction is verifiable on-chain"**
5. **"Multiplayer competition with same deadline"**

---

## 💡 Tips

- **Keep stakes small** (0.01-0.1 SOL) for demo
- **Use descriptive goal titles** so judges understand
- **Have backup proof ready** in case first one gets rejected
- **Show Explorer first** so it's ready to paste signature
- **Explain the math** while waiting for transaction confirmation

Good luck with your demo! 🚀
