# 🚀 Quick Demo Reference Card

## The Truth About Payouts

### ⚡ **Payouts Happen IMMEDIATELY When Proof Approved!**

You **DON'T** need to wait for deadline! The system pays out instantly when AI approves your proof.

```
Submit Proof → AI Validates → Instant Payout to Wallet ✨
   (3 sec)         (2 sec)            (5 sec)
```

---

## 🎬 30-Second Demo Flow

1. **Show Dashboard** → Point to Prize Pool
   - "3 competitors, all with Nov 2 deadline"
   - "Total prize pool: 0.65 SOL"

2. **Submit Proof** → Click button, add text
   - "AI validates using Snowflake Cortex..."
   - ⏰ Wait 3-5 seconds

3. **BOOM! Payout** → Show response
   ```json
   {
     "payout": {
       "signature": "3XyZ...",
       "amount": 0.83,
       "reward": 0.33
     }
   }
   ```

4. **Verify on Blockchain** → Paste in Explorer
   - `https://explorer.solana.com/tx/[SIG]?cluster=devnet`
   - Show confirmed transaction
   - "Real SOL moved on-chain!"

---

## 🔧 Useful Commands

```bash
# Check what's been paid
npx tsx scripts/check-payout-status.ts

# Manual trigger (for demo/backup)
npx tsx scripts/trigger-payouts.ts 2025-11-02

# Check escrow balance
npx tsx scripts/check-escrow.ts
```

---

## 💰 The Math (Explain This)

```
Your Payout = Your Stake + Your Share of Failed Stakes

Example:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
You staked:           0.5 SOL
Failed stakes pool:   0.8 SOL
Other winners:        1.5 SOL
Your share: 0.5/(0.5+1.5) = 25%

Your reward: 25% × 0.8 = 0.2 SOL
Total payout: 0.5 + 0.2 = 0.7 SOL ✨
```

---

## 🎯 What To Say

**Opening:**
"DeadlineDAO uses AI and blockchain for real accountability. Let me show you how the prize pool works..."

**During Demo:**
"Watch - I'm submitting proof right now. Snowflake AI validates it..."
"Approved! The payout just happened on Solana."
"Here's the transaction signature - let me show you on Explorer..."

**Close:**
"This is real SOL on devnet. Winners get their stake PLUS a proportional share of failed stakes. It's all verifiable on-chain."

---

## ⚠️ Common Questions

**Q: When do payouts happen?**
A: Immediately when proof is approved! Not at deadline.

**Q: What if deadline hasn't passed?**
A: Doesn't matter - payout still happens instantly.

**Q: Why have deadlines then?**
A: Deadlines determine which goals compete together in the prize pool.

**Q: What's the manual script for?**
A: Backup/demo purposes. Normal flow is automatic.

---

## 🎨 Make It Visual

1. Open Solana Explorer BEFORE demo
2. Have Phantom wallet visible
3. Show before/after balance
4. Point to transaction signature
5. Show it confirmed on-chain

---

## 🏆 Your Deployed App

**Production URL:**
https://deadlinedao-f6ejelpjg-zaineels-projects.vercel.app

Or shorter:
https://deadlinedao.vercel.app

---

## 📱 Pre-Demo Checklist

- [ ] Phantom on devnet
- [ ] Have 0.5+ SOL in wallet
- [ ] Create goal with proof ready
- [ ] Solana Explorer open
- [ ] Know the math explanation
- [ ] Practice 30-sec flow

**You got this! 🚀**
