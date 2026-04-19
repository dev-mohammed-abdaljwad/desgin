# 🚀 PWA Quick Reference

## In 30 Seconds

Your PWA is ready! Just need to:
1. **Convert icons**: `svg → png` in `public/icons/`
2. **Build**: `npm run build`
3. **Deploy**: Upload `dist/` folder with HTTPS

---

## Integration Use Cases

### Show Install Button
```tsx
import { PWAInstallPrompt } from '@/app/components/pwa/PWAInstallPrompt';

export default function App() {
  return <PWAInstallPrompt />;
}
```

### Add Settings Panel
```tsx
import { PWASettings } from '@/app/components/pwa/PWASettings';

export default function Settings() {
  return (
    <div>
      <PWASettings />
    </div>
  );
}
```

### Detect If Installed
```tsx
import { isPWAInstalled } from '@/utils/pwa';

if (isPWAInstalled()) {
  console.log('User installed as app!');
}
```

### Send Notification
```tsx
import { 
  requestNotificationPermission, 
  sendNotification 
} from '@/utils/pwa';

// Request permission first
const granted = await requestNotificationPermission();

if (granted) {
  sendNotification('Welcome!', {
    body: 'Hello from your PWA',
    icon: '/icons/icon-192x192.png'
  });
}
```

### Clear Cache
```tsx
import { clearCache } from '@/utils/pwa';

const handleClear = async () => {
  await clearCache();
  console.log('Cache cleared!');
};
```

---

## Files You Created

| File | Purpose |
|------|---------|
| `public/manifest.json` | App metadata for installers |
| `public/service-worker.ts` | Caching & offline logic |
| `src/utils/pwa.ts` | PWA utilities & APIs |
| `src/app/components/pwa/PWAInstallPrompt.tsx` | Install UI |
| `src/app/components/pwa/PWASettings.tsx` | Settings panel |
| `public/icons/*` | App icons (SVG) |

---

## Icon Conversion

### Quick Method (ImageMagick)
```bash
cd public/icons
for f in *.svg; do convert "$f" "${f%.svg}.png"; done
```

### Online Method
1. Go to https://cloudconvert.com/svg-to-png
2. Upload SVGs, download PNGs
3. Save to `public/icons/`

### Python Method
```bash
python3 scripts/convert_svg_to_png.py
```

---

## Testing

### Chrome DevTools
1. `F12` → **Application** tab
2. Check **Manifest** section
3. Check **Service Workers**
4. **Network** tab → set **Offline** → reload

### Mobile
- **Android**: Should show "Install" button
- **iOS**: Use "Add to Home Screen"

### Check Install Criteria
1. HTTPS ✓
2. Manifest valid ✓
3. Icons present ✓
4. Service Worker active ✓

---

## Common Issues

| Problem | Solution |
|---------|----------|
| Icons not showing | Convert SVGs to PNG |
| SW not registering | Must be HTTPS |
| Install button gone | Check manifest validity |
| Offline not working | Check Cache Storage in DevTools |

---

## Production Checklist

- [ ] Icons converted to PNG
- [ ] HTTPS enabled
- [ ] Build passes Lighthouse PWA audit
- [ ] Tested offline mode
- [ ] Tested on real mobile device
- [ ] Deploy to production

---

## Useful Files to Know

- **Main SW code**: `public/service-worker.ts`
- **Utilities**: `src/utils/pwa.ts`
- **Install UI**: `src/app/components/pwa/PWAInstallPrompt.tsx`
- **Config**: `public/manifest.json`
- **Setup guide**: `PWA_SETUP_GUIDE.md`
- **Full docs**: `PWA_IMPLEMENTATION.md`

---

## API Reference

### `pwa.ts` Functions

```typescript
// Registration
registerServiceWorker(options?: ServiceWorkerOptions)
unregisterServiceWorker()

// Status
isPWAInstalled(): boolean
getServiceWorkerRegistration(): ServiceWorkerRegistration | null

// Cache
clearCache()
getCacheSize(): Promise<number>

// Notifications
requestNotificationPermission(): Promise<boolean>
sendNotification(title, options?)

// Updates
updateServiceWorker()
```

---

## Deployment

```bash
# 1. Convert icons
python3 scripts/convert_svg_to_png.py

# 2. Build app
npm run build

# 3. Deploy dist/ folder
# Make sure HTTPS is enabled!

# 4. Test
# Open https://your-site.com
# Check for install button
```

---

## FAQ

**Q: Does it work offline?**  
A: Yes! Static assets and API calls are cached.

**Q: How big is the service worker?**  
A: ~4KB minified. Very small!

**Q: Is HTTPS required?**  
A: Yes, but only for production. Dev works on localhost.

**Q: Can I customize colors?**  
A: Yes! Edit `public/manifest.json` and icon files.

**Q: Does it work on iPhone?**  
A: Yes! Use "Add to Home Screen". Install prompt works on Android.

---

**Ready to deploy?** Start with icon conversion! 🎨
