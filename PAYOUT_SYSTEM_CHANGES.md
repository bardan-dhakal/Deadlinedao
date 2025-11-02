# 🔄 Payout System Changes - Two-Phase Implementation

## Summary

Changed from **single-phase** to **two-phase** payout system for better UX and fairness.

---

## What Changed

### **OLD System (Single-Phase):**
```
Proof Approved → Calculate Total (Stake + Reward) → Send Everything
```
❌ Problem: Can't accurately calculate rewards until deadline passes

### **NEW System (Two-Phase):**
```
Phase 1: Proof Approved → Return Stake Immediately
Phase 2: Deadline Passes → Calculate & Distribute Rewards
```
✅ Solution: Users get money back fast, rewards calculated fairly

---

## Files Modified

### 1. **lib/solana/payouts.ts**
- ✅ Modified `processCompletionPayout()` to return stake only
- ✅ Added new `distributeDeadlineRewards()` function for Phase 2
- ✅ Updated documentation and comments

### 2. **lib/solana/index.ts**
- ✅ Exported new `distributeDeadlineRewards` function

### 3. **app/api/proofs/route.ts**
- ✅ Updated API response to show two-phase info
- ✅ Added `reward_info` object with pending status
- ✅ Changed payout message to explain Phase 2

### 4. **scripts/trigger-payouts.ts**
- ✅ Completely updated for Phase 2 reward distribution
- ✅ Now uses `distributeDeadlineRewards()` instead of `executeRedistribution()`
- ✅ Updated all console messages to reflect two-phase system

### 5. **New Documentation:**
- ✅ `TWO_PHASE_PAYOUT_GUIDE.md` - Comprehensive demo guide
- ✅ `PAYOUT_SYSTEM_CHANGES.md` - This file

---

## API Response Changes

### Before:
```json
{
  "payout": {
    "amount": 0.7,
    "originalStake": 0.5,
    "reward": 0.2
  }
}
```

### After:
```json
{
  "payout": {
    "phase": "stake_returned",
    "amount": 0.5,
    "message": "Your stake has been returned!"
  },
  "reward_info": {
    "status": "pending",
    "message": "Rewards distributed after deadline"
  }
}
```

---

## How to Use

### For Users (Automatic):
1. Submit proof → Get stake back immediately
2. Wait for deadline → Rewards automatically distributed (future: cron job)

### For Demo (Manual):
```bash
# Check who needs rewards
npx tsx scripts/check-payout-status.ts

# Distribute rewards for specific deadline
npx tsx scripts/trigger-payouts.ts 2025-11-02
```

---

## Benefits

| Benefit | Description |
|---------|-------------|
| ✅ Better UX | Users get money back in seconds, not hours |
| ✅ Accurate | Rewards calculated after all results known |
| ✅ Fair | Proportional distribution based on actual failures |
| ✅ Transparent | Users see both phases in UI |
| ✅ Blockchain | Both phases create verifiable transactions |

---

## Breaking Changes

⚠️ **Frontend may need updates:**
- Check for `payout.phase` field
- Handle `reward_info.status` = "pending"
- Show appropriate messages to users

⚠️ **Database:**
- No schema changes needed
- Payout records now have two entries per winner:
  1. `type: 'original_stake'` (Phase 1)
  2. `type: 'completion_reward'` (Phase 2)

---

## Testing

### Test Phase 1:
1. Create goal with near deadline
2. Submit valid proof
3. Verify stake returned immediately
4. Check transaction on Solana Explorer

### Test Phase 2:
1. Create multiple goals with same deadline
2. Complete some, let some fail
3. Run `trigger-payouts.ts` script
4. Verify rewards distributed proportionally
5. Check all transactions on Solana Explorer

---

## Future Improvements

- [ ] Add cron job for automatic Phase 2 distribution
- [ ] Add Vercel cron route `/api/cron/distribute-rewards`
- [ ] Update UI to show pending rewards
- [ ] Add notification when rewards are distributed
- [ ] Dashboard widget showing "Rewards pending for X deadlines"

---

## Migration Notes

**No migration needed!** The system is backwards compatible:
- Existing payouts remain valid
- New proofs use new two-phase system
- Both systems work side-by-side

---

## Questions?

See:
- `TWO_PHASE_PAYOUT_GUIDE.md` for demo instructions
- `PAYOUT_DEMO_GUIDE.md` for original payout guide
- `lib/solana/payouts.ts` for implementation details
