# PWA Install Prompt - Testing Guide

## 🧪 Testing Scenarios

### Scenario 1: First Time User (Android Mobile)

**Setup:**
- Android device or Chrome DevTools device emulation
- Clear localStorage: `localStorage.removeItem('pwa-install-dismissed')`
- Clear browser cache

**Expected Behavior:**
1. Visit app URL
2. Wait 2-5 seconds
3. Bottom sheet slides up from bottom
4. Shows with smooth animation
5. Icon visible on left
6. Title: "Install App" (or localized)
7. Three features listed
8. Two buttons visible
9. Close (X) button top-right

**Actions to Test:**
- [ ] Click "Install Now" → Native browser prompt appears
- [ ] Accept install → App installed to home screen
- [ ] Confirm app works from home screen
- [ ] Re-open web version → No prompt (already installed)

---

### Scenario 2: Later Dismissal (Android Mobile)

**Setup:**
- Same as Scenario 1
- Fresh session

**Expected Behavior:**
1. Bottom sheet appears
2. Click "Maybe Later"
3. Sheet slides down and disappears
4. App continues normally

**Actions to Test:**
- [ ] Check localStorage: `localStorage.getItem('pwa-install-dismissed')`
- [ ] Verify timestamp was set
- [ ] Close and reopen app (same session) → No prompt
- [ ] Close browser completely
- [ ] Reopen app within 3 days → No prompt
- [ ] Wait 3+ days → Prompt shows again

---

### Scenario 3: Desktop Chrome

**Setup:**
- Desktop or Chrome with device emulation disabled
- Clear localStorage

**Expected Behavior:**
1. Visit app URL
2. Wait 2-5 seconds
3. Floating card appears bottom-left
4. Shows with slide-up animation
5. Compact version of mobile layout
6. Hover effect visible (shadow glow)
7. Close (X) button top-right

**Actions to Test:**
- [ ] Hover over card → Shadow glows
- [ ] Click "Install" → Native browser prompt appears
- [ ] Click "Later" → Card disappears
- [ ] Resize window → Card reflows or stays in corner

---

### Scenario 4: iOS Safari

**Setup:**
- Real iPhone/iPad with Safari
- Or Chrome DevTools emulating iPhone

**Expected Behavior:**
1. Visit app URL
2. Component might be hidden (iOS has limited support)
3. If guidance text shown: "Add to Home Screen via Safari"
4. User manually taps Share → "Add to Home Screen"
5. App added to home screen

**Actions to Test:**
- [ ] Component detects iOS correctly
- [ ] Guidance text appears (if enabled)
- [ ] User can add via Safari Share menu
- [ ] App appears on home screen

---

### Scenario 5: Desktop Firefox

**Setup:**
- Firefox browser
- Clear localStorage

**Expected Behavior:**
1. App loads
2. Floating card appears (Firefox 64+ has beforeinstallprompt support)
3. Same as Chrome desktop
4. Click Install → Firefox native dialog

**Actions to Test:**
- [ ] beforeinstallprompt event fires
- [ ] Card appears
- [ ] Install works through Firefox
- [ ] App installable

---

### Scenario 6: Bilingual Testing (Arabic/English)

**Setup:**
- Language selector set to AR
- Clear localStorage

**Mobile Version - Arabic:**
- [ ] Title: "ثبّت التطبيق" (right-aligned)
- [ ] Subtitle: "وصول سريع من شاشتك الرئيسية" (RTL)
- [ ] Features: Arabic text, right-to-left
- [ ] Buttons: "تثبيت الآن" | "لاحقاً" (reversed order)
- [ ] Layout flows right-to-left

**Mobile Version - English:**
- [ ] Title: "Install App" (left-aligned)
- [ ] Subtitle: "Quick access from your home screen" (LTR)
- [ ] Features: English text, left-to-right
- [ ] Buttons: "Install Now" | "Maybe Later" (standard order)
- [ ] Layout flows left-to-right

**Actions to Test:**
- [ ] Switch language in app
- [ ] Component re-renders correctly
- [ ] Text direction changes
- [ ] Button order flips
- [ ] Alignment proper for direction

---

## 📱 Testing on Real Devices

### Android Device (Physical)

**Prerequisites:**
- Device must be able to reach your server
- HTTPS enabled (PWA requirement)
- Or use ngrok for local HTTPS tunnel

**Steps:**
```bash
# 1. Build production version
npm run build

# 2. Start preview server
npm run preview
# Note: This runs on http://localhost:4173

# 3. For remote device, use ngrok
# OR deploy to staging server with HTTPS

# 4. On Android device:
# - Open browser
# - Navigate to app URL
# - Wait for beforeinstallprompt event
# - Bottom sheet should appear

# 5. Test install
# - Tap "Install Now"
# - Confirm in browser prompt
# - App appears on home screen
```

### iOS Device (Physical)

**Prerequisites:**
- Safari browser (primary PWA support)
- iOS 13+
- App meets PWA criteria

**Steps:**
```
1. Open Safari
2. Navigate to app URL
3. Tap Share button (rectangle with arrow)
4. Scroll and tap "Add to Home Screen"
5. App appears on home screen
6. Launch from home screen
7. Appears in standalone mode (no Safari UI)
```

---

## 🖥️ Local Testing with DevTools

### Chrome DevTools

**Enable PWA Testing:**
1. Open DevTools (F12)
2. Go to **Application** tab
3. Check **Manifest** section:
   - manifest.json should load
   - All manifest properties visible
4. Check **Service Workers** section:
   - Service worker should show "active and running"
5. Check **Cache Storage**:
   - CACHE_NAME and RUNTIME_CACHE (from service-worker.ts)

**Device Emulation:**
1. Open DevTools (F12)
2. Click **Toggle device toolbar** (Ctrl+Shift+M)
3. Select device (iPhone XR, Pixel 5, etc.)
4. Reload page
5. Component should adapt to device size

### Firefox DevTools

**Check PWA:**
1. Open DevTools (F12)
2. Go to **Storage** tab
3. Expand **Local Storage**
4. Check `pwa-install-dismissed` key
5. View timestamp value

**Network Tab:**
1. Reload page
2. Check manifest.json loads (green 200)
3. Check service-worker.js loads

---

## 🧬 Debugging Strategies

### Component Not Showing

**Step 1: Check Browser Support**
```javascript
// In console:
'serviceWorker' in navigator  // Should be true
beforeinstallprompt in globalThis  // Check if fired
```

**Step 2: Check Progressive Auto-Reload**
```javascript
// Check if already installed:
window.matchMedia('(display-mode: standalone)').matches

// Should return false for first visit
```

**Step 3: Check Dismissal Memory**
```javascript
// Check localStorage:
localStorage.getItem('pwa-install-dismissed')

// Clear if set:
localStorage.removeItem('pwa-install-dismissed')

// Reload page - should show prompt
```

**Step 4: Check PWA Criteria**
```javascript
// In DevTools > Application > Manifest
// Verify:
- name present
- start_url set
- icons with correct sizes
- display mode (standalone)

// In DevTools > Service Workers
// Verify:
- Service worker registered
- Status: active and running
- No errors in console
```

### Animations Not Smooth

**Check:**
1. Open Chrome DevTools → Performance tab
2. Record while component enters/exits
3. Check frame rate (should be ~60 FPS)
4. Look for dropped frames or jank
5. Check Console for JavaScript errors

**If Janky:**
- Component uses GPU-accelerated animations
- Might be device-specific (low-end phones)
- Check Device Performance tab for bottlenecks

### RTL/Bilingual Issues

**If Arabic alignment wrong:**
```javascript
// Check LanguageContext sets dir correctly:
<div dir={language === 'ar' ? 'rtl' : 'ltr'}>
```

**If buttons in wrong order:**
- Component uses `flex-row-reverse` for RTL
- Check language state is 'ar' or 'en'
- Clear cache and reload

---

## 🔍 Chrome DevTools Inspection

### Step-by-step inspection:

1. **Open DevTools** (F12)

2. **Go to Application Tab**
   - ✅ Manifest loads
   - ✅ All icons present
   - ✅ Service worker active

3. **Go to Storage Tab**
   - Check localStorage for `pwa-install-dismissed` key
   - View timestamp of dismissal

4. **Go to Console Tab**
   - Should be no errors
   - Should not show: `[PWA] ... failed`

5. **Check Network Tab**
   - manifest.json: 200 OK
   - service-worker.js: 200 OK
   - All CSS/JS: 200 OK

6. **Check Elements/Inspector**
   - Find `<div ... className="... fixed inset-0 pointer-events-none z-50">`
   - This is the component container
   - Check if hidden or visible

---

## 📝 Testing Checklist

### Functionality
- [ ] Component shows on first visit (not dismissed)
- [ ] Bottom sheet slides up smoothly (mobile)
- [ ] Floating card appears (desktop)
- [ ] Install button triggers browser prompt
- [ ] Maybe Later dismisses prompt
- [ ] Close (X) button works
- [ ] Dismissal lasts 3 days
- [ ] After 3 days, shows again
- [ ] Doesn't show if already installed

### Visual/UX
- [ ] Bottom sheet full-width on mobile
- [ ] Floating card bottom-left on desktop
- [ ] Icon visible and properly styled
- [ ] Text readable (high contrast)
- [ ] Animations smooth (no jank)
- [ ] Rounded corners display correctly
- [ ] Grid/feature list properly stacked

### Bilingual
- [ ] English text correct on EN
- [ ] Arabic text correct on AR
- [ ] Arabic right-to-left layout on AR
- [ ] English left-to-right layout on EN
- [ ] Button order reversed on AR
- [ ] Button order normal on EN

### Platform-Specific
- [ ] Android shows bottom sheet
- [ ] Desktop shows floating card
- [ ] iOS shows guidance (if enabled)
- [ ] Dark theme consistent
- [ ] Gradients render correctly

### Browser
- [ ] Chrome 68+ ✅
- [ ] Firefox 64+ ✅
- [ ] Edge 79+ ✅
- [ ] Safari (iOS) ✅ (guidance mode)
- [ ] Safari (macOS) ⚠️ (limited)

### Performance
- [ ] Page loads without pause
- [ ] No layout shift when component appears
- [ ] Animations at 60fps (no dropped frames)
- [ ] Component unmounts cleanly (no memory leaks)
- [ ] localStorage access is instant

### Accessibility
- [ ] Buttons properly focused
- [ ] Keyboard navigation works
- [ ] Screen readers handle component
- [ ] ARIA labels present
- [ ] High contrast sufficient

---

## 📊 Performance Metrics

### Expected Performance Profile

| Metric | Target | Acceptable |
|--------|--------|-----------|
| First Paint | <100ms | <300ms |
| Component Init | <50ms | <100ms |
| Animation FPS | 60 | >50 |
| Memory Usage | <200kb | <500kb |
| localStorage | <10 bytes | <1kb |

---

## 🚀 Pre-Launch QA

### Final Pre-Production Checks

- [ ] Code reviewed by team
- [ ] All tests passing
- [ ] No console errors
- [ ] Animations smooth on target devices
- [ ] Bilingual text verified
- [ ] Dismissal working correctly
- [ ] PWA criteria met
- [ ] HTTPS configured
- [ ] Service Worker active
- [ ] manifest.json valid

### Sign-Off

- [ ] Product Manager: Approved
- [ ] Design: Matches mockups
- [ ] QA: All tests pass
- [ ] Dev: Code ready
- [ ] DevOps: Deployment ready

---

## 📱 Device Testing Matrix

| Device | Browser | Version | Status |
|--------|---------|---------|--------|
| Pixel 5 | Chrome | 120+ | ✅ Test |
| iPhone 12 | Safari | 15+ | ✅ Test |
| Mac | Chrome | 120+ | ✅ Test |
| Windows | Edge | 120+ | ✅ Test |
| Tablet | Chrome | 120+ | ✅ Test |

---

## 🎓 Common Test Scenarios

### Scenario: User Installs, Then Uninstalls

1. Visit app → prompt shows
2. Click Install → app installed
3. Prompt disappears (marked as installed)
4. User uninstalls app
5. Visit app again → **Should prompt again** (not dismissed)
6. ✅ This is correct behavior

### Scenario: User Dismisses, Comes Back Next Day

1. Visit app → prompt shows
2. Click Maybe Later → prompt disappears
3. Timestamp stored in localStorage
4. User leaves and returns same day → No prompt ✅
5. User leaves and returns on day 4 → Prompt shows ✅

### Scenario: User on Offline App

1. Install app
2. Use app offline
3. Component still renders (checks installation status)
4. ✅ Doesn't show install prompt (already installed)

---

**Happy Testing! 🚀**

Report bugs or issues for improvements.

---

**Version**: 1.0.0  
**Last Updated**: April 2026
