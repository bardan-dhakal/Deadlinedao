# ⚠️ BEFORE HACKATHON DEMO - FINAL CHECKLIST

## 🚨 **IMPORTANT: Do This Right Before Judges Arrive**

---

## 🔧 **Quick Config Change:**

### **Set Auto-Connect to FALSE for Demo**

**Why?** Right now, your wallet auto-connects when you refresh. This is convenient for testing, but **for the demo** you want to show judges the wallet connection process!

**File:** `components/WalletProvider.tsx`

**Change Line 48:**

**Current (for testing):**
```typescript
<WalletProvider wallets={wallets} onError={onError} autoConnect={true}>
```

**Change to (for demo):**
```typescript
<WalletProvider wallets={wallets} onError={onError} autoConnect={false}>
```

**Takes 10 seconds:**
1. Open `components/WalletProvider.tsx`
2. Find line 48
3. Change `autoConnect={true}` to `autoConnect={false}`
4. Save
5. Restart server

---

## ✅ **Full Pre-Demo Checklist**

### **5 Minutes Before Judges:**

- [ ] **Disconnect wallet** (click address → Disconnect)
- [ ] **Set autoConnect to FALSE** in WalletProvider.tsx
- [ ] **Restart server** (`npm run dev`)
- [ ] **Refresh browser** (Cmd+R)
- [ ] **Close all extra tabs**
- [ ] **Zoom browser to 125%** for visibility
- [ ] **Open VS Code** to `/app/api/proofs/route.ts`
- [ ] **Have demo guide open** on second monitor
- [ ] **Check Phantom is on Devnet**
- [ ] **Verify you have 5+ SOL** in wallet

---

## 🎬 **Why Auto-Connect Matters:**

### **Auto-Connect = TRUE (Testing Mode)** ✅
- Wallet connects automatically on refresh
- **Convenient for development**
- Don't need to reconnect every time
- **Use this while testing/building**

### **Auto-Connect = FALSE (Demo Mode)** 🎯
- Wallet stays disconnected on refresh
- **Perfect for showing judges**
- Can demonstrate wallet connection flow
- Shows "Connect Wallet" button properly
- **Use this for hackathon presentation**

---

## 📊 **Current Status:**

**Right now:** `autoConnect={true}` ← **Good for testing!**

**Before demo:** `autoConnect={false}` ← **Better for judges!**

---

## 🎤 **Demo Script with Auto-Connect FALSE:**

1. **Landing Page** - "Notice the Connect Wallet button"
2. **Click Connect** - "Users select their Solana wallet"
3. **Choose Phantom** - "I'm using Phantom on devnet"
4. **Approve** - "Quick approval, and we're connected"
5. **Show Address** - "Now my wallet address appears"
6. **Navigate** - "I can access dashboard and create goals"

**This flow impresses judges!** Shows real wallet integration.

---

## ⚡ **Quick Toggle Script:**

**Enable auto-connect (for testing):**
```bash
# Find and replace in WalletProvider.tsx
# autoConnect={false} → autoConnect={true}
```

**Disable auto-connect (for demo):**
```bash
# Find and replace in WalletProvider.tsx
# autoConnect={true} → autoConnect={false}
```

---

## 🎯 **Remember:**

- **Testing now:** Keep `autoConnect={true}` ✅
- **Before demo:** Switch to `autoConnect={false}` ⚠️
- **After demo:** Switch back to `autoConnect={true}` if continuing work

---

**For now, enjoy auto-connect while testing!** Just remember to turn it off before your presentation! 🚀
