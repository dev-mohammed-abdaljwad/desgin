# MediaPro Design System
## Unified Product Ecosystem Style Guide

---

## 🎨 Design Philosophy

**Modern Editorial Luxury** - A premium dark theme combining sophistication with functionality, creating a high-end digital experience that serves both marketing (public website) and productivity (admin dashboard) needs.

### Core Principles
1. **Unity** - Same visual language across public and admin systems
2. **Clarity** - Clear hierarchy and intentional contrast
3. **Elegance** - Sophisticated gradients and glassmorphism
4. **Accessibility** - WCAG AA compliant, bilingual RTL/LTR support
5. **Responsiveness** - Adaptive layouts for all devices

---

## 🎨 Color System

### Primary Palette

```css
/* Indigo - Primary Brand Color */
--primary: #6366F1
--primary-foreground: #FFFFFF

/* Orange - Secondary Accent */
--secondary: #F97316
--secondary-foreground: #FFFFFF

/* Cyan - Accent Highlight */
--accent: #06B6D4
--accent-foreground: #FFFFFF

/* Amber - Gold Premium Touch */
--gold: #F59E0B
```

### Neutrals

```css
/* Dark Background */
--background: #0F0A1E (Deep Purple Black)
--foreground: #F8F9FA (Off White)

/* Surface Colors */
--card: rgba(255, 255, 255, 0.05)
--popover: #1A1333 (Dark Purple)
--muted: rgba(255, 255, 255, 0.1)
--border: rgba(255, 255, 255, 0.1)
--input-background: rgba(255, 255, 255, 0.05)
```

### Semantic Colors

```css
/* Success */
--success: #10B981 (Green)

/* Destructive/Error */
--destructive: #EF4444 (Red)

/* Warning */
--warning: #F59E0B (Amber)

/* Info */
--info: #06B6D4 (Cyan)
```

### Color Usage Guidelines

**Primary (#6366F1)** - Main CTAs, links, active states, primary actions  
**Secondary (#F97316)** - Secondary CTAs, highlights, warm accents  
**Accent (#06B6D4)** - Info badges, cool accents, data visualization  
**Gold (#F59E0B)** - Premium features, special offers, highlights  

---

## 🌈 Gradient System

### Brand Gradients

```css
/* Primary Gradient */
background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)
/* Usage: Main CTAs, hero sections */

/* Secondary Gradient */
background: linear-gradient(135deg, #F97316 0%, #FB923C 100%)
/* Usage: Secondary actions, warm highlights */

/* Accent Gradient */
background: linear-gradient(135deg, #06B6D4 0%, #0EA5E9 100%)
/* Usage: Info cards, cool accents */

/* Gold Gradient */
background: linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)
/* Usage: Premium features, special badges */
```

### Functional Gradients

```css
/* Primary to Accent */
from-primary to-accent
/* Main CTAs, primary stats cards */

/* Accent to Secondary */
from-accent to-secondary
/* Secondary stats, highlights */

/* Secondary to Gold */
from-secondary to-gold
/* Tertiary elements, special features */

/* Gold to Primary */
from-gold to-primary
/* Completing the cycle, premium CTAs */
```

### Hero Background

```css
background: linear-gradient(135deg, #0F0A1E 0%, #1A1333 50%, #2D1B4E 100%)
/* Dark gradient for hero sections */
```

---

## 📝 Typography

### Font Families

```css
/* Display Font - Headings */
--font-display: 'Sora', 'Cairo', sans-serif

/* Body Font - Content */
--font-body: 'Plus Jakarta Sans', 'Tajawal', sans-serif
```

### Type Scale

```css
/* Headings */
h1: 2.5rem (40px) - font-weight: 700
h2: 2rem (32px) - font-weight: 700
h3: 1.5rem (24px) - font-weight: 600
h4: 1.25rem (20px) - font-weight: 600

/* Body */
Base: 1rem (16px) - font-weight: 400
Large: 1.125rem (18px)
Small: 0.875rem (14px)
XSmall: 0.75rem (12px)

/* Line Heights */
Tight: 1.25
Normal: 1.5
Relaxed: 1.75
Loose: 2
```

### Font Weights

```css
Regular: 400
Medium: 500
Semibold: 600
Bold: 700
```

### Usage Guidelines

**Display Font (Sora/Cairo)** - Use for:
- Page titles
- Section headings
- Stats numbers
- Logo text
- Important UI labels

**Body Font (Plus Jakarta Sans/Tajawal)** - Use for:
- Paragraph text
- Navigation items
- Form labels
- Table content
- Button text
- General UI text

---

## 🧱 Spacing System

### 8px Grid System

```
4px   = 0.25rem
8px   = 0.5rem  ← Base unit
12px  = 0.75rem
16px  = 1rem
20px  = 1.25rem
24px  = 1.5rem
32px  = 2rem
40px  = 2.5rem
48px  = 3rem
64px  = 4rem
80px  = 5rem
96px  = 6rem
128px = 8rem
```

### Component Spacing

**Padding:**
- Cards: 24px (p-6)
- Buttons: 12px vertical, 24px horizontal (py-3 px-6)
- Inputs: 12px vertical, 16px horizontal (py-3 px-4)
- Containers: 24px mobile, 48px desktop (px-6 lg:px-12)

**Gaps:**
- Grid gaps: 24px (gap-6)
- Flex gaps: 12px-16px (gap-3, gap-4)
- Section gaps: 48px-96px (space-y-12, space-y-24)

---

## 🎯 Border Radius

```css
/* Rounded System */
sm: 8px   (rounded-lg)
md: 12px  (rounded-xl)
lg: 16px  (rounded-2xl)
xl: 24px  (rounded-3xl)
full: 9999px (rounded-full)

/* Component Usage */
Buttons: 12px (rounded-xl)
Cards: 16px (rounded-2xl)
Modals: 24px (rounded-3xl)
Inputs: 12px (rounded-xl)
Badges: 8px (rounded-lg)
Avatars: 9999px (rounded-full)
```

---

## 💫 Effects & Shadows

### Glassmorphism

```css
/* Card Glass Effect */
background: rgba(255, 255, 255, 0.05)
backdrop-filter: blur(12px)
border: 1px solid rgba(255, 255, 255, 0.1)

/* Strong Glass */
background: rgba(255, 255, 255, 0.1)
backdrop-filter: blur(20px)
```

### Box Shadows

```css
/* Subtle */
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12)

/* Medium */
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1)

/* Large */
box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1)

/* XL - CTAs */
box-shadow: 0 20px 25px rgba(0, 0, 0, 0.15)

/* 2XL - Modals */
box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25)

/* Colored - Primary */
box-shadow: 0 20px 40px rgba(99, 102, 241, 0.3)

/* Colored - Accent */
box-shadow: 0 20px 40px rgba(6, 182, 212, 0.3)
```

### Blur Effects

```css
backdrop-blur-sm: 4px
backdrop-blur: 12px
backdrop-blur-lg: 16px
backdrop-blur-xl: 24px
backdrop-blur-2xl: 40px
backdrop-blur-3xl: 64px
```

---

## 🎨 Component Styles

### Buttons

#### Primary Button
```css
bg-gradient-to-r from-primary to-accent
text-white
px-8 py-4
rounded-xl
font-semibold
hover:shadow-2xl hover:shadow-primary/50
transition-all transform hover:scale-105
```

#### Secondary Button
```css
bg-card/50 backdrop-blur-xl
border border-border
text-foreground
px-8 py-4
rounded-xl
font-semibold
hover:border-primary/50
transition-all
```

#### Ghost Button
```css
bg-transparent
hover:bg-muted/50
px-4 py-2
rounded-lg
transition-colors
```

#### Destructive Button
```css
bg-destructive/20
text-destructive
hover:bg-destructive/30
px-4 py-2
rounded-lg
transition-colors
```

### Cards

#### Standard Card
```css
p-6
bg-card/50 backdrop-blur-xl
border border-border
rounded-2xl
hover:border-primary/50
transition-all
```

#### Stats Card
```css
p-6
bg-card/50 backdrop-blur-xl
border border-border
rounded-2xl
relative overflow-hidden

/* Icon */
w-12 h-12 mb-4
rounded-xl
bg-gradient-to-br {from-color} {to-color}
```

### Inputs

```css
w-full
px-4 py-3
bg-input-background
border border-border
rounded-xl
text-foreground
placeholder:text-muted-foreground
focus:outline-none focus:border-primary/50
transition-colors
```

### Tables

```css
/* Table */
w-full
bg-card/50 backdrop-blur-xl
border border-border
rounded-2xl
overflow-hidden

/* Header */
bg-muted/30
px-6 py-4
text-left text-sm font-semibold

/* Row */
hover:bg-muted/20
transition-colors
px-6 py-4
```

### Badges

```css
/* Status Badge - Active */
px-3 py-1
bg-green-500/20 text-green-500
rounded-lg
text-sm font-medium

/* Status Badge - Inactive */
px-3 py-1
bg-muted text-muted-foreground
rounded-lg
text-sm font-medium

/* Category Badge */
px-3 py-1
bg-primary/20 text-primary
rounded-lg
text-sm font-medium
```

---

## 🎬 Animations

### Transitions

```css
/* Standard */
transition-all duration-300

/* Colors */
transition-colors duration-200

/* Transform */
transition-transform duration-300

/* Multiple */
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)
```

### Hover Effects

```css
/* Scale */
hover:scale-105

/* Shadow */
hover:shadow-2xl hover:shadow-primary/50

/* Border */
hover:border-primary/50

/* Background */
hover:bg-muted/50

/* Opacity */
hover:opacity-80
```

### Motion (Framer Motion)

```tsx
/* Fade In */
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.8 }}

/* Stagger Children */
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
transition={{ staggerChildren: 0.1 }}

/* Scale */
initial={{ scale: 0.9 }}
animate={{ scale: 1 }}
transition={{ duration: 0.5 }}
```

---

## 📱 Responsive Breakpoints

```css
/* Tailwind Breakpoints */
sm: 640px   /* Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Large screens */

/* Usage */
Mobile: base styles (no prefix)
Tablet: md:
Desktop: lg:
Large: xl:
```

### Responsive Patterns

**Public Website** - Mobile First
```css
/* Mobile */
grid-cols-1
/* Tablet */
md:grid-cols-2
/* Desktop */
lg:grid-cols-3
```

**Admin Dashboard** - Desktop First
```css
/* Mobile */
flex-col
/* Desktop */
lg:flex-row
```

---

## 🌍 Internationalization (i18n)

### RTL Support

```css
/* Direction */
dir="rtl" /* Arabic */
dir="ltr" /* English */

/* Positioning */
left-0 /* LTR */
right-0 /* RTL */

/* Use start/end instead */
start-0
end-0

/* Margins/Padding */
ml-4 /* LTR */
mr-4 /* RTL */

/* Use logical properties */
ms-4 (margin-start)
me-4 (margin-end)
```

### Language Toggle

```tsx
const { t, language, setLanguage } = useLanguage()

// Usage
{t('English Text', 'النص العربي')}
```

---

## 🎯 Icon System

### Lucide React Icons

**Size System:**
```css
xs: w-3 h-3 (12px)
sm: w-4 h-4 (16px)
md: w-5 h-5 (20px)
lg: w-6 h-6 (24px)
xl: w-8 h-8 (32px)
```

**Common Icons:**
```tsx
import {
  // Navigation
  Home, Menu, X, ChevronRight,
  
  // Actions
  Plus, Edit, Trash2, Save, Download,
  
  // Status
  Check, X, AlertCircle, Info,
  
  // Social
  Mail, Phone, MessageCircle,
  
  // Admin
  LayoutDashboard, Settings, Users,
  
  // Content
  FileText, Image, Video, Folder
} from 'lucide-react'
```

---

## 🎨 Data Visualization

### Chart Colors

```tsx
const COLORS = {
  chart1: '#6366F1', // Primary
  chart2: '#F97316', // Secondary
  chart3: '#06B6D4', // Accent
  chart4: '#F59E0B', // Gold
  chart5: '#8B5CF6', // Purple
}
```

### Chart Styles (Recharts)

```tsx
// Consistent tooltip styling
<Tooltip 
  contentStyle={{ 
    backgroundColor: '#1A1333', 
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px',
    color: '#F8F9FA'
  }} 
/>

// Grid
<CartesianGrid 
  strokeDasharray="3 3" 
  stroke="rgba(255,255,255,0.1)" 
/>

// Axes
<XAxis stroke="#A1A1AA" />
<YAxis stroke="#A1A1AA" />
```

---

## ✨ Best Practices

### DO's
✅ Use design tokens (CSS variables)  
✅ Maintain consistent spacing (8px grid)  
✅ Apply glassmorphism to cards  
✅ Use semantic color names  
✅ Follow responsive patterns  
✅ Implement smooth transitions  
✅ Support both RTL and LTR  
✅ Use appropriate font weights  
✅ Maintain visual hierarchy  
✅ Keep accessibility in mind  

### DON'Ts
❌ Mix color systems  
❌ Use arbitrary spacing values  
❌ Overuse animations  
❌ Ignore mobile experience  
❌ Use only English labels  
❌ Skip hover states  
❌ Forget focus states  
❌ Use low contrast text  
❌ Create visual chaos  
❌ Ignore loading states  

---

## 🎁 Component Library

### Available Components

**Public Website:**
- Hero sections
- Service cards
- Portfolio grid
- Blog feed
- Contact forms
- Testimonials
- Pricing tables
- Call-to-action sections

**Admin Dashboard:**
- Stats cards
- Data tables
- Charts (Line, Bar, Pie, Donut)
- Form inputs
- Sidebar navigation
- Topbar
- Modal dialogs
- Notification center
- Quick action cards
- Activity feeds

### Shared Components
- Buttons (all variants)
- Cards (all types)
- Inputs (text, select, textarea)
- Badges
- Icons
- Tooltips
- Loaders
- Empty states

---

## 🚀 Implementation Examples

### Example 1: Primary CTA Button

```tsx
<button className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-primary/50 transition-all transform hover:scale-105 flex items-center gap-2">
  <Plus className="w-5 h-5" />
  Add New Service
</button>
```

### Example 2: Glassmorphism Card

```tsx
<div className="p-6 bg-card/50 backdrop-blur-xl border border-border rounded-2xl hover:border-primary/50 transition-all">
  <h3 className="font-semibold text-lg mb-2">Card Title</h3>
  <p className="text-muted-foreground">Card content goes here</p>
</div>
```

### Example 3: Stats Card with Gradient Icon

```tsx
<div className="p-6 bg-card/50 backdrop-blur-xl border border-border rounded-2xl">
  <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
    <Icon className="w-6 h-6 text-white" />
  </div>
  <h3 className="text-sm text-muted-foreground mb-2">Total Users</h3>
  <p className="font-[var(--font-display)] font-bold text-3xl">1,234</p>
  <span className="text-sm font-medium text-green-500">+12%</span>
</div>
```

---

## 📚 Resources

### Design Files
- Figma file: [Link to design system]
- Component library: In `/src/app/components`
- Theme tokens: `/src/styles/theme.css`

### Documentation
- Full system docs: `/SYSTEM_DOCUMENTATION.md`
- This design system: `/DESIGN_SYSTEM.md`

### Inspiration
- Modern SaaS dashboards
- Premium editorial websites
- Luxury brand sites
- Data visualization tools

---

**Last Updated:** April 15, 2026  
**Version:** 1.0.0  
**Maintained by:** MediaPro Design Team
