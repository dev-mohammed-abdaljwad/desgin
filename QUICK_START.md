# MediaPro - Quick Start Guide

## 🚀 Getting Started

### Accessing the System

#### Public Website
- **URL:** `/` (homepage)
- **Features:** Browse services, portfolio, blog, contact, offers
- **Users:** Public visitors, potential clients, businesses

#### Admin Dashboard
- **URL:** `/admin`
- **Access Method:** Triple-click anywhere on the public website
- **Special Button:** "Admin Access" appears for 5 seconds
- **Direct URL:** Simply navigate to `/admin`

---

## 🗺️ Quick Navigation

### Public Pages

| Page | URL | Purpose |
|------|-----|---------|
| Home | `/` | Main landing page |
| Services | `/services` | Service catalog |
| Podcast Studio | `/podcast-studio` | Studio booking |
| Education | `/educational-platform` | Educational product |
| Offers | `/offers` | Active promotions |
| Portfolio | `/portfolio` | Case studies |
| Blog | `/blog` | Content feed |
| About | `/about` | Company info |
| Contact | `/contact` | Get in touch |

### Admin Pages

| Page | URL | Purpose |
|------|-----|---------|
| Dashboard | `/admin` | Overview & stats |
| Services | `/admin/services` | Manage services |
| Bookings | `/admin/bookings` | Podcast bookings |
| Portfolio | `/admin/portfolio` | Project gallery |
| Blog | `/admin/blog` | Content CMS |
| Offers | `/admin/offers` | Promotions |
| Education | `/admin/education` | Product tiers |
| Leads | `/admin/leads` | Contact inquiries |
| Settings | `/admin/settings` | Configuration |

---

## 🌐 Language Switching

**Toggle Location:** Top-right corner of admin dashboard  
**Shortcut:** Click the globe icon  
**Languages:** English (EN) ↔ Arabic (AR)  
**Effect:** Instant RTL/LTR layout switch + content translation

---

## 🎨 Design Quick Reference

### Color Codes
```
Primary:   #6366F1 (Indigo)
Secondary: #F97316 (Orange)
Accent:    #06B6D4 (Cyan)
Gold:      #F59E0B (Amber)
```

### Common Gradients
```css
from-primary to-accent     /* Main CTAs */
from-accent to-secondary   /* Stats cards */
from-secondary to-gold     /* Highlights */
from-gold to-primary       /* Premium */
```

---

## 🧩 Common Tasks

### Admin Dashboard

#### Add New Service
1. Go to `/admin/services`
2. Click "Add Service" button (top-right)
3. Fill in service details (EN + AR)
4. Set category and price
5. Toggle active/featured status
6. Save

#### Manage Bookings
1. Go to `/admin/bookings`
2. Filter by status (Pending/Confirmed/Completed)
3. Click Confirm/Cancel buttons
4. View client details

#### Publish Blog Post
1. Go to `/admin/blog`
2. Click "New Article" or "Add Video"
3. Enter title (EN + AR)
4. Select category
5. Upload thumbnail
6. Write content
7. Set to Published

#### Create Offer
1. Go to `/admin/offers`
2. Click "Create Offer"
3. Enter offer details
4. Set discount percentage
5. Generate promo code
6. Set start/end dates
7. Link to services
8. Activate

#### View Leads
1. Go to `/admin/leads`
2. Filter by status or priority
3. Review contact information
4. Update lead status
5. Take action (Contact/Qualify/Convert)

---

## 📊 Understanding the Dashboard

### Main Dashboard (`/admin`)

**Top Section:**
- Welcome card (dismissible)
- 4 stats cards showing key metrics

**Middle Section:**
- Line chart: Leads & Bookings trend
- Pie chart: Service distribution by category

**Bottom Section:**
- Quick Actions: Fast access to common tasks
- Recent Activity: Latest platform events

### Stats Interpretation

**Total Services:** All services in catalog  
**Active Bookings:** Confirmed upcoming sessions  
**New Leads:** Uncontacted inquiries  
**Published Content:** Live blog posts & videos  

---

## 🎯 Key Features

### Public Website
✅ Fully responsive (mobile-first)  
✅ Bottom mobile navigation  
✅ Floating WhatsApp button  
✅ Bilingual content  
✅ Contact forms  
✅ Portfolio filtering  
✅ Blog categories  
✅ Service showcase  

### Admin Dashboard
✅ Desktop-optimized layout  
✅ Collapsible sidebar  
✅ Global search  
✅ Notification center  
✅ Data charts (Recharts)  
✅ CRUD operations  
✅ Status management  
✅ Export capabilities  

---

## 🔄 Common Workflows

### Lead to Customer Flow
1. **Lead arrives** → Shows in `/admin/leads` as "New"
2. **Admin contacts** → Update status to "Contacted"
3. **Lead qualifies** → Change to "Qualified"
4. **Deal closes** → Mark as "Converted"

### Booking Flow
1. **Customer requests booking** → Appears as "Pending"
2. **Admin reviews** → Check details
3. **Admin confirms** → Status → "Confirmed"
4. **Session complete** → Status → "Completed"

### Content Publishing
1. **Create draft** → In `/admin/blog`
2. **Add content** → Title, description, media
3. **Preview** → Check formatting
4. **Publish** → Toggle status to "Published"
5. **Appears live** → Shows on `/blog` page

---

## 💡 Pro Tips

### Admin Dashboard
- Use **keyboard shortcuts** for faster navigation
- **Filter tables** to find items quickly
- **Search globally** from the topbar
- **Check notifications** for new activity
- **Monitor charts** for trends
- **Quick actions** for common tasks

### Public Website
- **Triple-click** anywhere to reveal admin access
- **WhatsApp button** for instant contact
- **Mobile nav** at bottom for easy thumb access
- **Language toggle** in header
- **Service cards** are clickable
- **Portfolio items** open in lightbox

---

## 🎨 Customization

### Theme Colors
Edit: `/src/styles/theme.css`

### Typography
Fonts: Sora (headings), Plus Jakarta Sans (body)  
Arabic: Cairo (headings), Tajawal (body)

### Components
Location: `/src/app/components`

### Content
All content is editable via admin dashboard

---

## 🌍 Bilingual Content

### How Translation Works
```tsx
{t('English text here', 'النص العربي هنا')}
```

### Adding New Translations
1. Use the `t()` function
2. First parameter: English
3. Second parameter: Arabic
4. Automatic direction switch

---

## 📱 Mobile Experience

### Public Website
- Hamburger menu (top)
- Bottom navigation (sticky)
- Swipe gestures
- Touch-optimized buttons
- Floating WhatsApp
- Responsive images

### Admin Dashboard
- Simplified layout
- Collapsible sidebar
- Horizontal scroll tables
- Touch-friendly controls
- Mobile-optimized forms

---

## 🔐 Security Notes

**Current Setup:**
- Demo/prototype mode
- No authentication required
- Frontend-only CMS
- Mock data

**Production Setup (Recommended):**
- Add authentication (JWT/Session)
- Connect to backend API
- Use real database (Supabase/Firebase)
- Implement role-based access
- Add API security
- Enable HTTPS

---

## 🆘 Troubleshooting

### Admin Access Button Not Showing
- **Solution:** Triple-click anywhere on the page again
- **Alternative:** Navigate directly to `/admin`

### Language Not Switching
- **Check:** Language toggle in header/topbar
- **Verify:** Browser supports RTL

### Charts Not Loading
- **Check:** JavaScript enabled
- **Verify:** Data exists for charts

### Sidebar Collapsed
- **Solution:** Click expand button (left/right arrow)

---

## 📚 Documentation

### Full Guides
- **System Overview:** `/SYSTEM_DOCUMENTATION.md`
- **Design System:** `/DESIGN_SYSTEM.md`
- **This Guide:** `/QUICK_START.md`

### Code Structure
```
/src/app
  /components/admin  → Admin components
  /components/layout → Layout components  
  /pages/admin       → Admin pages
  /pages             → Public pages
  /context           → Global state
  routes.tsx         → All routes
```

---

## 🎯 Next Steps

### For Developers
1. Review `/SYSTEM_DOCUMENTATION.md`
2. Study `/DESIGN_SYSTEM.md`
3. Explore component library
4. Check routes configuration
5. Understand state management

### For Designers
1. Review design system colors
2. Check typography scale
3. Study component styles
4. Review spacing system
5. Understand responsive patterns

### For Content Managers
1. Access admin dashboard
2. Familiarize with CMS modules
3. Practice adding content
4. Learn status workflows
5. Explore filtering options

---

## ✨ Best Practices

### Content
- Always provide both EN and AR translations
- Use high-quality images
- Write clear, concise descriptions
- Set appropriate categories
- Preview before publishing

### Admin Usage
- Update statuses promptly
- Review leads daily
- Monitor booking requests
- Keep offers current
- Check analytics regularly

### User Experience
- Test on mobile devices
- Verify RTL layout
- Check all links work
- Ensure fast load times
- Validate forms work

---

## 🚀 Quick Commands

| Action | Location | Shortcut |
|--------|----------|----------|
| Access Admin | Anywhere | Triple-click |
| Toggle Language | Top bar | Click globe |
| Collapse Sidebar | Admin | Click arrow |
| View Notifications | Top bar | Click bell |
| Exit Admin | Sidebar | Click "Exit Admin" |

---

## 📞 Support

For questions or issues:
- Check documentation files
- Review component code
- Inspect browser console
- Test in different browsers

---

**Version:** 1.0.0  
**Last Updated:** April 15, 2026  
**Platform:** MediaPro Unified Ecosystem
