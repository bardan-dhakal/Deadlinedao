# 🪙 How to Get Devnet SOL (Free Test Money)

## ❌ **Common Misconception**
"Devnet = Unlimited SOL" ✗

## ✅ **Reality**
Devnet SOL is **FREE** but you need to **request it from a faucet** (like getting free tokens).

---

## 🚰 **Get Devnet SOL (3 Methods)**

### **Method 1: Solana Faucet (Recommended)**

1. **Go to:** https://faucet.solana.com

2. **Enter your wallet address:**
   - In Phantom, click the address to copy it
   - Or get it from your connected wallet in the app

3. **Select Network:** Devnet

4. **Click "Confirm Airdrop"**

5. **You get:** 1-5 SOL (free test money)

6. **Wait:** 30-60 seconds for confirmation

---

### **Method 2: Using Solana CLI** (If installed)

```bash
# Airdrop 2 SOL to your wallet
solana airdrop 2 YOUR_WALLET_ADDRESS --url devnet

# Example:
solana airdrop 2 HbjTYPWj3LnL75wH6fFUu2F6KmrpdDqXbBxzudPZkrgv --url devnet
```

---

### **Method 3: QuickNode Faucet**

1. Go to: https://faucet.quicknode.com/solana/devnet
2. Enter your wallet address
3. Request airdrop
4. Get 0.5 SOL

---

## 🔍 **Check Your Balance**

### **In Phantom Wallet:**
1. Make sure you're on **Devnet** (Settings → Developer Settings → Testnet Mode → Devnet)
2. Check the balance at the top
3. Should show SOL amount (not $0)

### **In Solana Explorer:**
1. Go to: https://explorer.solana.com
2. Enter your wallet address
3. Select **Devnet** from the cluster dropdown
4. See your balance

---

## 🎯 **Your Wallet Address**

From the error, you're using:
```
HbjTYPWj3LnL75wH6fFUu2F6KmrpdDqXbBxzudPZkrgv
```

**Check balance:**
https://explorer.solana.com/address/HbjTYPWj3LnL75wH6fFUu2F6KmrpdDqXbBxzudPZkrgv?cluster=devnet

---

## ⚠️ **Why You're Seeing the Error**

Your issue:
1. ✅ Goal gets created in database (status: `pending_validation`)
2. ❌ Solana transaction fails (insufficient funds)
3. ⚠️ UI shows error

**The flow:**
1. Form submits → API creates DB record
2. Transaction is created → Sent to your wallet to sign
3. **You sign transaction → Blockchain checks balance**
4. ❌ **Not enough SOL → Transaction fails**
5. Goal stays in DB as `pending_validation` (never becomes `active`)

---

## 🔧 **Quick Fix**

### **Step 1: Get Devnet SOL**
```bash
# Go to faucet
https://faucet.solana.com

# Request 5 SOL to your address
HbjTYPWj3LnL75wH6fFUu2F6KmrpdDqXbBxzudPZkrgv
```

### **Step 2: Verify in Phantom**
1. Open Phantom
2. Switch to **Devnet**
3. Should see **5 SOL** or similar

### **Step 3: Try Creating Goal Again**
- Now you have funds!
- Transaction will succeed
- Goal status will update from `pending_validation` → `active`

---

## 🎬 **For Hackathon Demo**

### **Option A: Use Real Devnet SOL** (Recommended)
- Get 5 SOL from faucet
- Demo works perfectly with real transactions
- More impressive to judges

### **Option B: Demo Mode** (Fallback)
I can create a "demo mode" that:
- ✅ Creates goals in database
- ✅ Shows them on dashboard
- ✅ Skips actual blockchain transactions
- ⚠️ Less impressive but guaranteed to work

**Which do you prefer?**

---

## 💡 **Pro Tip**

Before the hackathon:
1. Get 10 SOL from faucet
2. Create 1-2 test goals to verify it works
3. Show judges the transaction signatures on Solana Explorer
4. Much more impressive than demo mode!

---

## 📞 **Next Steps**

1. **Get SOL from faucet** (2 minutes)
2. **Verify balance in Phantom**
3. **Try creating goal again**
4. **Success!** ✅

---

**Want me to create a demo mode instead?** Let me know!
