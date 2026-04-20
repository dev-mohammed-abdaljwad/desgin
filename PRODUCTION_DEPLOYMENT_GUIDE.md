# Production Deployment Guide

## ✅ Changes Made for Production

Your project has been successfully configured for production use. Here's what was updated:

### 1. **Package Configuration** 
- ✅ Version updated to `1.0.0`
- ✅ Project renamed to `educational-learning-platform`
- ✅ Added project metadata (description, keywords, author, license)
- ✅ Made package public-ready (`"private": false`)
- ✅ Added production build scripts

### 2. **Build Optimization**
- ✅ Configured Terser minification with dead code elimination
- ✅ Disabled sourcemaps in production
- ✅ Console logs automatically removed in production builds
- ✅ Optimized asset naming with content hashing
- ✅ Configured chunk splitting for better caching

### 3. **Environment Configuration**
- ✅ Created `.env.development` for local development
- ✅ Created `.env.production` for production deployment
- ✅ Created `.env.example` as documentation template
- ✅ Updated API configuration for environment-based endpoints
- ✅ CORS origins now environment-aware

### 4. **Code Cleanup**
- ✅ Removed debug console logs from PWA utilities
- ✅ Wrapped remaining logs in development-only checks
- ✅ All logs will be stripped from production builds

### 5. **Security**
- ✅ Updated `.gitignore` to exclude sensitive files
- ✅ Environment files with sensitive data won't be committed

---

## 📋 Pre-Deployment Checklist

### Before Building for Production:

```bash
# 1. Update production environment variables
cp .env.example .env.production
# Edit .env.production with your actual production values:
# - VITE_API_BASE_URL: Your production API endpoint
# - VITE_APP_URL: Your production application URL
```

### Critical Settings to Update in `.env.production`:

```env
# Replace these with your actual production values
VITE_API_BASE_URL=https://api.yourdomain.com/api/v1
VITE_APP_URL=https://yourdomain.com
```

### Build for Production:

```bash
# Install dependencies (if not already done)
npm install
# or
pnpm install

# Build for production
npm run build:prod
# or
pnpm build:prod

# Preview the production build locally
npm run preview
```

---

## 🚀 Deployment Steps

### 1. **Prepare Build Artifacts**
The production build creates optimized files in the `dist/` directory:
- `dist/index.html` - Main application entry point
- `dist/service-worker.js` - PWA service worker
- `dist/assets/` - Minified, hashed CSS/JS bundles

### 2. **Deploy to Your Server**
Choose your hosting platform:

#### **Vercel / Netlify (Recommended)**
```bash
# These platforms handle deployment automatically
# Just push to your repository or connect via UI
git add .
git commit -m "Production deployment configuration"
git push origin main
```

#### **Traditional Server (Apache/Nginx)**
1. Build the project: `npm run build:prod`
2. Copy `dist/` contents to your server's web root
3. Configure server to serve `index.html` for all routes (SPA routing)

#### **Docker Deployment**
```dockerfile
FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --production=false
COPY . .
RUN npm run build:prod

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 3. **Verify Deployment**
- ✅ Test all API endpoints with production URLs
- ✅ Verify PWA installation on mobile/desktop
- ✅ Check that service worker caching works
- ✅ Test offline functionality
- ✅ Verify SSL/HTTPS is enabled

---

## 🧪 Testing Production Build

### Test Locally:
```bash
# Build for production
npm run build:prod

# Preview the build
npm run preview

# Open http://localhost:4173 in your browser
```

### Verify PWA:
1. Open DevTools → Application → Service Workers
2. Confirm service worker shows as "active and running"
3. Check Application → Manifest to verify PWA metadata
4. Test install prompt on supported browsers

### Verify Performance:
1. DevTools → Lighthouse → Run audit
2. Check Network tab for minified assets
3. Verify no console errors appear
4. Confirm no console logs in production build

---

## 📊 Build Output Summary

After running `npm run build:prod`, you'll see output like:

```
  dist/service-worker.js               1.23 kB
  dist/index.html                      3.45 kB
  dist/assets/main.xxxx.js           234.56 kB
  dist/assets/vendor.xxxx.js         156.78 kB
  dist/assets/main.xxxx.css            12.34 kB
```

**Key metrics:**
- Main bundle should be < 300 KB (gzipped)
- No sourcemaps in production files
- All assets have content hashes for cache busting

---

## 🔐 Environment Variables Reference

### Development (`/.env.development`)
```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
VITE_APP_URL=http://localhost:3000
VITE_ENVIRONMENT=development
VITE_DEBUG=true
```

### Production (`/.env.production`)
```env
VITE_API_BASE_URL=https://api.yourdomain.com/api/v1
VITE_APP_URL=https://yourdomain.com
VITE_ENVIRONMENT=production
VITE_DEBUG=false
VITE_SW_UPDATE_INTERVAL=86400000
```

---

## 🛠️ Troubleshooting

### Issue: API endpoints failing in production
**Solution:** Check that `VITE_API_BASE_URL` in `.env.production` is correct and accessible from your production domain.

### Issue: Service worker not updating
**Solution:** Verify `VITE_SW_UPDATE_INTERVAL` is set and service worker cache headers are configured correctly on your server.

### Issue: Console errors about CORS
**Solution:** Update `VITE_APP_URL` in `.env.production` and configure server CORS headers to allow requests from your domain.

### Issue: PWA install not prompting
**Solution:** 
- Ensure HTTPS is enabled
- Verify manifest.json is properly configured
- Check that service worker is active

---

## 📚 Next Steps

1. **Update `.env.production`** with your actual API and app URLs
2. **Run `npm run build:prod`** to create optimized build
3. **Test locally** with `npm run preview`
4. **Deploy `dist/` folder** to your hosting provider
5. **Monitor** application performance and error rates
6. **Set up analytics** (optional: configure VITE_ANALYTICS_ID)

---

## 🎯 Production Scripts Available

```bash
# Development
npm run dev              # Start dev server with hot reload

# Production
npm run build            # Standard production build
npm run build:prod       # Production build with NODE_ENV=production
npm run preview          # Preview production build locally
```

---

## ✨ Best Practices

1. **Always test builds locally before deploying**
2. **Keep `.env.production` secure and never commit to git**
3. **Monitor application performance in production**
4. **Set up error tracking (e.g., Sentry)**
5. **Implement analytics to track user behavior**
6. **Regularly update dependencies for security**
7. **Set up CD/CI for automated deployments**

---

## 📞 Support Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [PWA Guidelines](https://web.dev/progressive-web-apps/)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)

---

**Last Updated:** April 20, 2026  
**Version:** 1.0.0  
**Status:** ✅ Ready for Production
