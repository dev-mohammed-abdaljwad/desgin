# PWA Setup Guide

This project has been configured as a Progressive Web App (PWA). Here's what has been set up and what you need to do to complete it.

## ✅ What's Already Done

### 1. **Service Worker** (`public/service-worker.ts`)
- Installed and activated Service Worker with caching strategies
- Network-first strategy for API calls
- Cache-first strategy for static assets
- Offline support enabled

### 2. **PWA Configuration Files**
- **Manifest** (`public/manifest.json`) - App metadata, app name, icons, shortcuts, etc.
- **Service Worker Registration** (`src/utils/pwa.ts`) - Utilities for SW management
- **App Integration** (`src/main.tsx`) - Service worker registered on production builds

### 3. **Updated Files**
- `index.html` - Added PWA meta tags, manifest link, Apple touch icon
- `vite.config.ts` - Configured service worker build output
- `package.json` - Ready for PWA dependencies

### 4. **Icon Assets**
- Generated SVG icons in `public/icons/` (96x96, 144x144, 192x192, 512x512)
- Maskable icons for adaptive icons
- Screenshot assets for app store listings

## ⚠️ What You Need to Finish

### 1. **Convert SVG Icons to PNG** (Required)

The manifest expects PNG files. You have several options:

#### Option A: Using ImageMagick (Recommended if installed)
```bash
cd public/icons

# Convert all SVG icons to PNG
convert icon-96x96.svg icon-96x96.png
convert icon-96x96-maskable.svg icon-96x96-maskable.png
convert icon-144x144.svg icon-144x144.png
convert icon-144x144-maskable.svg icon-144x144-maskable.png
convert icon-192x192.svg icon-192x192.png
convert icon-192x192-maskable.svg icon-192x192-maskable.png
convert icon-512x512.svg icon-512x512.png
convert icon-512x512-maskable.svg icon-512x512-maskable.png
convert screenshot-1.svg screenshot-1.png
convert screenshot-2.svg screenshot-2.png
```

#### Option B: Using Online Converter
1. Go to https://cloudconvert.com/svg-to-png
2. Upload each SVG file individually
3. Convert to PNG and save in `public/icons/`

#### Option C: Using Python
Create a Python script with `cairosvg` library:
```bash
pip install cairosvg
python scripts/convert_svg_to_png.py
```

#### Option D: Using Node.js + Sharp (After getting npm working)
```bash
npm install -D sharp
# Or if using a package manager that works:
node scripts/convert-icons-to-png.js
```

### 2. **Customize Your Icons**

Edit the SVG files in `public/icons/` to match your brand:
- Change colors in the gradient
- Modify the letter/logo
- Adjust sizes as needed

### 3. **Update Manifest (if needed)**

Edit `public/manifest.json`:
```json
{
  "name": "Your App Name",
  "short_name": "Short Name",
  "description": "Your app description",
  // ... rest of config
}
```

### 4. **Build and Deploy**

```bash
npm run build  # or pnpm run build

# The output will be in dist/
# Deploy dist/ to your web server
```

## 📱 Testing Your PWA

### Desktop Browser:
1. Open your app in Chrome/Edge
2. Look for "Install" button in the address bar
3. Or open DevTools → Manifest tab to verify

### Mobile:
1. Open on Android Chrome/iOS Safari
2. Tap menu → "Add to Home Screen"
3. Or "Install app" if available

### Offline Testing:
1. Open DevTools → Network tab
2. Set throttling to "Offline"
3. Reload page - should show cached content

## 🛠️ PWA Features Available

### Service Worker APIs (`src/utils/pwa.ts`):

```typescript
import { 
  registerServiceWorker,
  isPWAInstalled,
  requestNotificationPermission,
  sendNotification,
  clearCache,
  getCacheSize,
  updateServiceWorker,
} from '@/utils/pwa';

// Check if installed
if (isPWAInstalled()) {
  console.log('App is installed as PWA');
}

// Request notifications
const granted = await requestNotificationPermission();
if (granted) {
  sendNotification('Welcome!', {
    body: 'Your message here',
    icon: '/icons/icon-192x192.png',
  });
}

// Manage cache
const size = await getCacheSize();
console.log(`Cache size: ${size} items`);

// Clear cache when needed
await clearCache();
```

## 📊 PWA Capabilities Enabled

- ✅ Install as app (standalone)
- ✅ Offline support
- ✅ Background sync ready
- ✅ Push notifications ready
- ✅ App shortcuts
- ✅ Share target
- ✅ Adaptive icons (maskable)
- ✅ App metadata
- ✅ Screenshots for install prompt
- ✅ Custom theme colors

## 🔍 Debugging

### Chrome DevTools:
1. Open DevTools
2. Go to **Application** tab
3. Check **Manifest** section
4. Check **Service Workers** section
5. Check **Cache Storage** section

### Lighthouse PWA Audit:
1. Open DevTools → Lighthouse
2. Run PWA audit
3. Fix any issues reported

## 📝 Caching Strategies Implemented

### 1. **API Requests** - Network First
- Try to fetch from network
- Fall back to cache if offline
- Good for real-time data

### 2. **HTML Pages** - Network First  
- Try to fetch latest version
- Fall back to cached version
- Good for navigation

### 3. **Static Assets** - Cache First
- Serve from cache immediately
- Update cache in background
- Good for images, fonts, CSS

### 4. **Stale-While-Revalidate** (Optional)
Can be added later for better UX

## 🚀 Next Steps

1. **Priority 1**: Convert SVG icons to PNG
2. **Priority 2**: Deploy and test in production
3. **Priority 3**: Customize colors and app name
4. **Optional**: Add push notifications
5. **Optional**: Implement background sync

## 📚 Resources

- [MDN PWA Guide](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [Web.dev PWA](https://web.dev/progressive-web-apps/)
- [PWA Checklist](https://web.dev/pwa-checklist/)
- [Manifest Spec](https://www.w3.org/TR/appmanifest/)

## ⚡ Performance Tips

1. Keep service worker small (<1MB)
2. Cache strategically - don't cache everything
3. Use compression for assets
4. Update cache version when needed
5. Monitor cache storage usage

---

**Status**: PWA structure complete, ready for icon conversion and deployment!
