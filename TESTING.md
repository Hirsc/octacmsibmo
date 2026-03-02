# OCTACMSIBMO Testing Guide

## 🧪 Comprehensive Testing Checklist

This guide provides step-by-step testing instructions for verifying all MVP functionality.

## Prerequisites

1. **Install Dependencies**: `npm install`
2. **Build Project**: `npm run build` or `npm start` for development
3. **Platform**: Test on actual device/emulator for full functionality (camera, storage)
4. **Internet**: Required for Open Food Facts API calls

## Test Environment Setup

### Development Mode
```bash
npm start
```
- Runs on `http://localhost:3333`
- Enables hot reload and faster development
- Use for initial testing

### Production Build
```bash
npm run build
```
- Creates optimized production build
- Test before final deployment

---

## 🔍 Feature Testing Checklist

### 1. Application Launch & Navigation ✅

#### Test Case 1.1: App Initialization
- [ ] Launch application
- [ ] Verify home page loads (day overview)
- [ ] Check that progress bars display with default goals
- [ ] Verify no console errors

#### Test Case 1.2: Navigation
- [ ] Tap flag icon (goals settings)
- [ ] Verify goals page loads
- [ ] Tap back button
- [ ] Verify return to home page

#### Test Case 1.3: Routing Integrity
- [ ] Try manual navigation to `/profile/test`
- [ ] Verify profile page displays correctly
- [ ] Test back button functionality

---

### 2. Manual Food Entry Testing ✅

#### Test Case 2.1: Valid Manual Entry
- [ ] Tap create icon (right FAB)
- [ ] Verify manual food form opens
- [ ] Fill in valid values:
  - Name: "Test Apple"
  - Energy: "52"
  - Protein: "0.3"
  - Fat: "0.2"
  - Carbs: "14"
  - Amount: "100"
- [ ] Tap "Save Food" button
- [ ] Verify return to home page
- [ ] Verify "Test Apple" appears in food list
- [ ] Verify macros totals update correctly

#### Test Case 2.2: Form Validation
- [ ] Open manual food entry
- [ ] Try submitting empty form
- [ ] Verify error toast appears
- [ ] Test negative values:
  - Energy: "-100"
- [ ] Verify validation error appears
- [ ] Test unrealistic values:
  - Energy: "99999"
- [ ] Verify validation error appears

#### Test Case 2.3: Optional EAN Field
- [ ] Fill all required fields
- [ ] Enter EAN code: "1234567890123"
- [ ] Verify form accepts optional EAN
- [ ] Save and verify data is stored

---

### 3. Barcode Scanning Testing ✅

#### Test Case 3.1: Camera Access
- [ ] Tap barcode icon (left FAB)
- [ ] Verify camera permission request (first time)
- [ ] Grant camera permissions
- [ ] Verify camera view displays

#### Test Case 3.2: Valid Barcode Scan
- [ ] Scan a known product barcode (e.g., "5449000000996" - Coca Cola)
- [ ] Wait for API response
- [ ] Verify product name populates automatically
- [ ] Verify nutritional data populates:
  - Energy (should be ~42 kcal/100g)
  - Protein, fat, carbs should have values
  - Amount should default to 100g
- [ ] Verify all fields are editable
- [ ] Modify a value (e.g., change amount to 150g)
- [ ] Tap "Save Food"
- [ ] Verify data saves correctly

#### Test Case 3.3: Invalid/Unknown Barcode
- [ ] Scan a random/unknown barcode
- [ ] Verify error toast: "Product not found"
- [ ] Verify camera view reappears for retry

#### Test Case 3.4: API Error Handling
- [ ] Test with no internet connection
- [ ] Scan a barcode
- [ ] Verify appropriate error message
- [ ] Verify app doesn't crash

---

### 4. Goal Setting Testing ✅

#### Test Case 4.1: Initial Goals
- [ ] Launch app
- [ ] Verify default goals display:
  - Energy: 2000 kcal
  - Protein: 50g
  - Fat: 70g
  - Carbs: 250g

#### Test Case 4.2: Modify Goals
- [ ] Tap flag icon
- [ ] Verify goals settings page opens
- [ ] Modify energy goal to "2500"
- [ ] Modify protein goal to "100"
- [ ] Tap "Save Goals"
- [ ] Verify success toast
- [ ] Verify return to home page
- [ ] Verify progress bars update with new goals

#### Test Case 4.3: Goal Validation
- [ ] Open goals settings
- [ ] Try invalid energy goal: "100"
- [ ] Verify validation error
- [ ] Try unrealistic energy goal: "50000"
- [ ] Verify validation error
- [ ] Reset to defaults button
- [ ] Verify goals reset to default values

#### Test Case 4.4: Goal Persistence
- [ ] Set custom goals
- [ ] Close and restart app
- [ ] Verify custom goals are retained

---

### 5. Progress Tracking Testing ✅

#### Test Case 5.1: Progress Display
- [ ] Add food item with known macros
- [ ] Verify progress bars update
- [ ] Verify current values display
- [ ] Verify goal values display
- [ ] Verify percentage calculations are correct

#### Test Case 5.2: Progress Colors
- [ ] Add small amount of food (< 80% of goal)
- [ ] Verify progress bar is gray/medium color
- [ ] Add more food (80-99% of goal)
- [ ] Verify progress bar turns yellow/warning color
- [ ] Add food to exceed goal (≥100%)
- [ ] Verify progress bar turns green/success color

#### Test Case 5.3: Multiple Items
- [ ] Add 3-4 different food items
- [ ] Verify totals calculate correctly
- [ ] Verify progress bars reflect cumulative totals
- [ ] Test: Energy = item1.energy + item2.energy + item3.energy

---

### 6. Data Management Testing ✅

#### Test Case 6.1: Food Deletion
- [ ] Add a food item
- [ ] Verify it appears in list
- [ ] Delete the item
- [ ] Verify removal from list
- [ ] Verify totals update correctly

#### Test Case 6.2: Data Persistence
- [ ] Add multiple food items
- [ ] Close application completely
- [ ] Restart application
- [ ] Verify all food items are retained
- [ ] Verify totals are correct

#### Test Case 6.3: Date Navigation
- [ ] Add food items for today
- [ ] Navigate to different date (if implemented)
- [ ] Verify data is date-specific

---

### 7. Integration Testing ✅

#### Test Case 7.1: Complete User Flow
1. **Setup**:
   - [ ] Launch app
   - [ ] Set custom goals (Energy: 1800, Protein: 80g, Fat: 60g, Carbs: 200g)

2. **Add Food via Scan**:
   - [ ] Scan a barcode
   - [ ] Verify auto-population
   - [ ] Adjust amount if needed
   - [ ] Save the item

3. **Add Food Manually**:
   - [ ] Add another item manually
   - [ ] Fill complete nutritional data
   - [ ] Save the item

4. **Verify Progress**:
   - [ ] Check progress bars update
   - [ ] Verify calculations are accurate
   - [ ] Test: Current totals = Item1 + Item2

5. **Manage Data**:
   - [ ] Delete one item
   - [ ] Verify totals update
   - [ ] Close and restart app
   - [ ] Verify data persistence

---

## 🐛 Common Issues & Troubleshooting

### Camera Not Working
- **Symptom**: Barcode scanner shows black screen
- **Solution**: Check camera permissions in device settings
- **Alternative**: Test with manual food entry

### API Not Responding
- **Symptom**: "Something unknown went wrong" toast
- **Solution**: Check internet connection
- **Alternative**: Use manual food entry

### Data Not Persisting
- **Symptom**: Food items disappear after restart
- **Solution**: Check Capacitor Storage permissions
- **Debug**: Check browser console for storage errors

### Validation Errors
- **Symptom**: Can't save valid-looking data
- **Solution**: Check for trailing spaces, use numeric values
- **Debug**: Check validation rules in food-validation.ts

---

## 📊 Test Results Template

Use this template to track your testing results:

```markdown
## Test Results - [Date]

### Environment
- Platform: [iOS/Android/Web]
- Device: [Device name/emulator]
- Build: [Development/Production]

### Test Results
1. Application Launch: ✅ PASS / ❌ FAIL
2. Manual Food Entry: ✅ PASS / ❌ FAIL
3. Barcode Scanning: ✅ PASS / ❌ FAIL
4. Goal Setting: ✅ PASS / ❌ FAIL
5. Progress Tracking: ✅ PASS / ❌ FAIL
6. Data Management: ✅ PASS / ❌ FAIL
7. Integration Tests: ✅ PASS / ❌ FAIL

### Issues Found
1. [Issue description]
2. [Issue description]

### Overall Status
- Ready for Release: ✅ YES / ❌ NO
- Known Issues: [List any blocking issues]
```

---

## ✅ Success Criteria

Testing is successful when:
- ✅ All test cases pass without crashes
- ✅ Data persists correctly across app sessions
- ✅ Progress calculations are accurate
- ✅ Barcode scanning reliably populates data
- ✅ Form validation prevents invalid data
- ✅ Goals persist and update progress display

**Ready for user testing when all critical tests pass!**

---

*Last Updated: 2026-03-02*
*Project: OCTACMSIBMO*