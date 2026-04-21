# Premium PWA Install Prompt Component

## Overview

`InstallPWA` is a premium, bilingual (Arabic/English) PWA installation prompt component with professional animations and dismissal memory.

## Features

✅ **Fully Responsive**: Bottom sheet on mobile, floating card on desktop  
✅ **Bilingual**: Full Arabic/English support with RTL layout  
✅ **Smart Dismissal**: Remembers dismissal for 3 days using localStorage  
✅ **Smooth Animations**: Slide-up entrance with fade-out exit (400ms/300ms)  
✅ **Premium Design**: Frosted glass effect, gradients, and dark theme  
✅ **Platform Detection**: Handles Chrome, Firefox, and Edge web app installs  
✅ **iOS Support**: Detects iOS and provides appropriate guidance  
✅ **Auto-Detect**: Only shows when PWA is installable  

## Component Structure

```
InstallPWA Component
├── Device Detection (Mobile/Desktop/iOS)
├── Installation State Management
├── Dismissal Memory (localStorage)
├── beforeinstallprompt Event Listener
└── Two UI Variants
    ├── Mobile Bottom Sheet (full-width, rounded top)
    └── Desktop Floating Card (320px, bottom-left)
```

## Usage

Simply add the component to your root layout:

```tsx
import { InstallPWA } from '@/app/components/pwa/InstallPWA';

export function RootLayout() {
  return (
    <div>
      {/* Your layout components */}
      <InstallPWA />
      {/* Rest of layout */}
    </div>
  );
}
```

**No props required** — The component auto-detects everything.

## Customization Guide

### Change Colors

Edit the gradient classes in the component:

**Primary Button Color** (currently Indigo):
```tsx
// Find this:
<button className="... bg-gradient-to-r from-indigo-500 to-indigo-600 ...">

// Change to your color (e.g., Purple):
<button className="... bg-gradient-to-r from-purple-500 to-purple-600 ...">
```

**App Icon Background**:
```tsx
// Currently: Indigo to Purple gradient
<div className="... bg-gradient-to-br from-indigo-500 to-purple-600 ...">

// Change to any Tailwind gradient
```

**Background Theme**:
```tsx
// Currently: Dark slate/black
<div className="... bg-gradient-to-br from-slate-900 via-slate-950 to-black ...">

// Customize as needed for your brand
```

### Change App Icon

Replace the emoji with your logo/SVG:

**Mobile Version** (around line 150):
```tsx
<div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg">
  📚  {/* Replace this emoji */}
</div>
```

**Desktop Version** (around line 210):
```tsx
<div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
  📚  {/* Replace this emoji */}
</div>
```

### Customize Dismissal Duration

Change the dismissal period from 3 days to something else:

```tsx
// Line 20 - Change the number:
const DISMISSAL_DAYS = 3;  // Change to 7, 14, 30, etc.
```

### Change Feature Icons/Text

Modify the features list in the mobile version (around line 165):

```tsx
<Feature
  icon={<Wifi className="w-4 h-4" />}
  text={t('Works offline', 'يعمل بدون إنترنت')}
/>
<Feature
  icon={<Zap className="w-4 h-4" />}
  text={t('Fast & lightweight', 'سريع وخفيف')}
/>
<Feature
  icon={<Bell className="w-4 h-4" />}
  text={t('Push notifications', 'إشعارات فورية')}
/>
```

Add/remove features as needed. Import additional icons from `lucide-react`.

### Modify Text

All text uses the `t()` function for bilingual support:

```tsx
t('English Text', 'النص بالعربية')
```

Example:
```tsx
// Original:
{t('Install App', 'ثبّت التطبيق')}

// Custom:
{t('Get The App', 'احصل على التطبيق')}
```

## Animations

### Mobile Bottom Sheet Animation

- **Enter**: Slides up from `translateY(100%)` to `0` with opacity fade-in
- **Duration**: 400ms with `ease-out`
- **Exit**: Reverse animation in 300ms

### Desktop Floating Card Animation

- **Enter**: Same slide-up effect
- **Hover**: Subtle shadow enhancement on hover
- **Exit**: Same 300ms fade-out

### Customize Animations

Edit the timing in the component:

```tsx
// Line 72 - Enter animation duration:
className={`... transition-all duration-400 ease-out ...`}  // 400ms

// Line 163 - Exit animation duration:
setTimeout(() => {
  // ...
}, 300);  // Change to your desired ms
```

Add custom keyframe animations in `src/styles/tailwind.css`:

```css
@keyframes customSlide {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-custom-slide {
  animation: customSlide 0.5s ease-out forwards;
}
```

## Browser Support

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome/Edge | ✅ Full | `beforeinstallprompt` event works |
| Firefox | ✅ Full | On Firefox 64+ |
| Safari (iOS) | ⚠️ Partial | Shows guidance only, uses native prompt |
| Safari (macOS) | ⚠️ Partial | Limited PWA support |

## Debug & Development

### Check PWA Readiness

```typescript
// Service Worker registered?
if ('serviceWorker' in navigator) {
  console.log('Service Workers supported');
}

// App installed?
if (window.matchMedia('(display-mode: standalone)').matches) {
  console.log('App is installed');
}

// Before install prompt fired?
window.addEventListener('beforeinstallprompt', (e) => {
  console.log('Install prompt available');
});
```

### Local Testing

1. **Build the app** (PWA only works in production mode):
   ```bash
   npm run build
   ```

2. **Preview locally with HTTPs:**
   ```bash
   npm run preview
   ```

3. **Open DevTools** → Application tab → Manifest to verify:
   - ✅ manifest.json is valid
   - ✅ Service Worker registered
   - ✅ All icons present

4. **Check Console** for any PWA-related errors

### Disable for Testing

To temporarily disable the dismissal memory and test repeatedly:

```tsx
// Comment out this line temporarily:
if (isDismissedRecently()) {
  return;
}
```

## localStorage Keys

- `pwa-install-dismissed`: Timestamp of last dismissal

Clear dismissal history:
```javascript
localStorage.removeItem('pwa-install-dismissed');
```

## Requirements

✅ Already in your project:
- React 18+
- TypeScript
- Tailwind CSS
- useLanguage hook
- lucide-react (icons)

No additional dependencies needed!

## Performance Tips

1. **Lazy Load**: The component is already lightweight (renders to `null` when not needed)
2. **No Layout Shift**: Uses `fixed` positioning, no impact on document flow
3. **Smooth 60fps**: Uses `requestAnimationFrame` for entrance animation
4. **Minimal Re-renders**: Smart state management

## Accessibility

✅ Semantic button elements  
✅ `aria-label` on close button  
✅ Keyboard dismissible (ESC key could be added)  
✅ High contrast text on dark background  
✅ RTL support for Arabic screen readers  

### Add ESC Key Dismissal (Optional)

```tsx
useEffect(() => {
  const handleEsc = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isVisible) {
      handleDismiss();
    }
  };
  
  window.addEventListener('keydown', handleEsc);
  return () => window.removeEventListener('keydown', handleEsc);
}, [isVisible]);
```

## Common Issues & Solutions

### Component Not Showing

**Problem**: `beforeinstallprompt` event fires, but component doesn't show.

**Solutions**:
1. ✅ Component only works in **HTTPS** (or localhost for testing)
2. ✅ manifest.json must be valid and linked in `index.html`
3. ✅ Service Worker must be registered
4. ✅ Check localStorage for `pwa-install-dismissed` — clear it
5. ✅ Build and test in production mode (`npm run build`)

### Animations Not Smooth

**Problem**: Janky animations on mobile.

**Solutions**:
1. Animations use `transform` and `opacity` (GPU-accelerated)
2. Check device performance (low-end devices may appear slower)
3. Reduce animation duration if needed

### RTL Layout Issues

**Problem**: Buttons/text misaligned in Arabic.

**Solutions**:
1. The component uses `dir={dir === 'rtl' ? 'flex-row-reverse' : ''}` for RTL
2. Ensure parent `LanguageProvider` sets `dir` correctly on root element
3. Tailwind RTL support is built-in with `dir` attribute

## Testing Checklist

- [ ] Mobile (iOS): Shows custom UI or guidance text
- [ ] Mobile (Android): Shows bottom sheet with buttons
- [ ] Desktop: Shows floating card in bottom-left
- [ ] Languages: Switch between AR/EN — layout adapts correctly
- [ ] Dismissal: After "Maybe Later", doesn't show for 3 days
- [ ] Install: Clicking button triggers browser install prompt
- [ ] Offline: Component appears even in offline mode
- [ ] Dark Mode: Colors are readable and cohesive

## File References

- Component: [src/app/components/pwa/InstallPWA.tsx](src/app/components/pwa/InstallPWA.tsx)
- Layout: [src/app/components/layout/RootLayout.tsx](src/app/components/layout/RootLayout.tsx)
- Styles: [src/styles/tailwind.css](src/styles/tailwind.css)
- Language Context: [src/app/context/LanguageContext.tsx](src/app/context/LanguageContext.tsx)

---

**Component Version**: 1.0.0  
**Last Updated**: April 2026  
**Compatible With**: React 18+, TypeScript 5+, Tailwind CSS 3+
