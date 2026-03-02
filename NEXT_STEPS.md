# Next Steps to MVP

## Current State Assessment

### ✅ What's Working
- Core calorie/macros tracking with full CRUD operations
- Data persistence via Capacitor Storage API
- Barcode scanning camera functionality with ZXing
- Open Food Facts API integration (basic)
- Day overview UI with food list and delete functionality
- Proper project structure and configuration
- Utilities for date/time handling

### ❌ Critical Issues Found
1. **Critical Bug**: Function typo in `src/components/calories-tracker/scan-food.tsx:102`
2. **Missing Component**: `app-profile` component referenced in routing but doesn't exist
3. **Incomplete Integration**: Open Food Facts API fetches nutritional data but only uses product name
4. **Missing UI Integration**: Manual food entry component exists but not accessible via routing

## Roadmap to MVP

### Phase 1: Critical Fixes (Week 1)

#### 1.1 Fix Critical Bug in scan-food.tsx
**File**: `src/components/calories-tracker/scan-food.tsx`
**Issue**: Line 102 calls `toastOFFError(error)` but function definition has a typo
**Impact**: App crashes when barcode lookup fails
**Fix**: Correct the function name on line 102

#### 1.2 Create Missing app-profile Component
**Issue**: Routing references `app-profile` component that doesn't exist
**Impact**: Runtime navigation errors
**Solution**:
- Create `src/components/app-profile/` directory
- Implement basic profile component with user info placeholder
- Or remove from routing if not needed for MVP

#### 1.3 Integrate Manual Food Entry
**File**: `src/components/calories-tracker/add.tsx`
**Issue**: Component exists but not in routing
**Solution**: Add route configuration to make manual food entry accessible

### Phase 2: Core Functionality (Week 1-2)

#### 2.1 Extract Nutritional Data from Open Food Facts API
**File**: `src/open-food-facts/index.ts`
**Current**: Only extracts product name
**Needed**: Extract from `product.nutriments`:
- `energy-kcal_100g` or `energy-kj_100g` (convert to kcal)
- `proteins_100g`
- `fat_100g`
- `carbohydrates_100g`

**Implementation**: Update `getFoodData` function to return nutritional values

#### 2.2 Auto-Populate Food Form with API Data
**Files**:
- `src/components/calories-tracker/scan-food.tsx`
- `src/components/calories-tracker/add.tsx`

**Current Flow**: Scan barcode → Get product name → Manual entry of all values
**Desired Flow**: Scan barcode → Get all nutritional data → Auto-populate form → Allow editing

**Implementation**:
- Update scan-food to pass complete nutritional data
- Modify add.tsx to accept pre-filled values
- Allow users to edit API data before saving

#### 2.3 Add Form Validation
**File**: `src/components/calories-tracker/add.tsx`
**Needed**:
- Prevent negative values for all nutritional fields
- Add reasonable upper limits (e.g., max 10,000 kcal per item)
- Validate required fields
- Show clear error messages

### Phase 3: MVP Enhancement (Week 2-3)

#### 3.1 Add Daily Goal Setting
**New Component**: Create goal setting interface
**Features**:
- Set daily calorie target
- Set macro targets (protein, fat, carbs)
- Store goals in Capacitor Storage
- Display progress vs goals in day overview

#### 3.2 Improve User Experience
**Enhancements**:
- Add loading states during API calls
- Better error messages for failed scans
- Offline mode indication
- Food item edit functionality
- Duplicate detection for same food on same day

### Phase 4: Testing & Polish (Week 3)

#### 4.1 End-to-End Testing
**Test Flows**:
1. Manual entry → Add food → View in day overview
2. Barcode scan → Auto-populate → Edit → Save → View
3. Navigate between dates → View different days
4. Delete food item → Verify removal
5. Add multiple items → Verify totals calculation

#### 4.2 Bug Fixes & Refinement
- Fix any discovered issues
- Performance optimization
- UI/UX improvements

## Success Criteria for MVP

A functional MVP should allow users to:
- ✅ Add food items manually with nutritional information
- ✅ Scan barcodes and automatically populate nutritional data
- ✅ View daily calorie and macro totals
- ✅ Navigate between different days
- ✅ Delete food items
- ✅ Set and track daily goals
- ✅ Persist data across app sessions

## Technical Debt to Address Post-MVP

1. **Unit Tests**: Currently minimal test coverage
2. **Error Handling**: Network failures, camera permissions
3. **Data Validation**: More comprehensive input sanitization
4. **Performance**: Optimize API calls and storage operations
5. **Code Quality**: Add missing TypeScript types, improve error messages

## Next Actions

**Start with Phase 1.1** - Fix the critical bug in scan-food.tsx to prevent crashes. This is the highest priority issue that affects basic functionality.

**Then proceed to Phase 2.1** - Completing the Open Food Facts integration will provide the most value for the MVP, making barcode scanning actually useful.

---

*Last Updated: 2026-03-02*
*Project: OCTACMSIBMO*
