# Backend Instructions: Dynamic Content for Frontend

## Overview
This document provides instructions for the Laravel 12 CMS backend team to ensure all content on the frontend is pulled from the API, making the site fully dynamic and manageable through the admin dashboard.

---

## 1. Required Pages (via /api/v1/pages endpoint)

The frontend requires the following pages to be created in the CMS. Each page should have these fields:

### Common Fields for All Pages
```json
{
  "id": 1,
  "slug": "unique-slug",
  "title_en": "English Title",
  "title_ar": "العنوان بالعربية",
  "content_en": "Long form content in English...",
  "content_ar": "محتوى طويل بالعربية...",
  "featured_image": "https://cdn.example.com/image.jpg",
  "meta_description_en": "SEO description",
  "meta_description_ar": "وصف SEO",
  "status": "published",
  "created_at": "2026-01-15T10:30:00Z",
  "updated_at": "2026-01-15T10:30:00Z"
}
```

### Pages to Create

#### 1. **About Us Page** 
- **Slug**: `about-us`
- **Purpose**: Main about page story section
- **Required Fields**: title, content_en, content_ar, featured_image
- **Used By**: About.tsx (Story Section)
- **Example**:
```json
{
  "slug": "about-us",
  "title_en": "Our Journey",
  "title_ar": "رحلتنا",
  "content_en": "MediaPro started in 2020 with a vision to transform creative services...",
  "content_ar": "بدأت ميديا برو في عام 2020 برؤية تحويل الخدمات الإبداعية...",
  "featured_image": "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
  "status": "published"
}
```

#### 2. **Vision Page**
- **Slug**: `vision`
- **Purpose**: Company vision statement section
- **Required Fields**: content_en, content_ar
- **Used By**: About.tsx (Vision Section)
- **Fallback**: If not found, uses default hardcoded text
- **Example**:
```json
{
  "slug": "vision",
  "title_en": "Our Vision",
  "title_ar": "رؤيتنا",
  "content_en": "To be the leading creative agency and educational platform in the region...",
  "content_ar": "أن نكون الوكالة الإبداعية والمنصة التعليمية الرائدة في المنطقة...",
  "status": "published"
}
```

#### 3. **Mission Page**
- **Slug**: `mission`
- **Purpose**: Company mission statement section
- **Required Fields**: content_en, content_ar
- **Used By**: About.tsx (Mission Section)
- **Fallback**: If not found, uses default hardcoded text
- **Example**:
```json
{
  "slug": "mission",
  "title_en": "Our Mission",
  "title_ar": "مهمتنا",
  "content_en": "To deliver exceptional creative services and quality education...",
  "content_ar": "تقديم خدمات إبداعية استثنائية وتعليم عالي الجودة...",
  "status": "published"
}
```

#### 4. **Values Pages** (Optional - One page or separate pages)
- **Slug**: `company-values` 
- **Purpose**: Define company values displayed in About page
- **Purpose**: Instead of static array, store as JSON or individual pages
- **Option A - Single JSON Field**:
```json
{
  "slug": "company-values",
  "title_en": "Our Values",
  "title_ar": "قيمنا",
  "content_en": "...",
  "content_ar": "...",
  "metadata": {
    "values": [
      {
        "title_en": "Excellence",
        "title_ar": "التميز",
        "description_en": "We strive for excellence...",
        "description_ar": "نسعى للتميز...",
        "icon": "target"
      },
      {
        "title_en": "Passion",
        "title_ar": "الشغف",
        "description_en": "We are passionate...",
        "description_ar": "نحن شغوفون...",
        "icon": "heart"
      }
    ]
  },
  "status": "published"
}
```

---

## 2. Required Endpoints & Data Structure

### Currently Used Endpoints

#### GET `/api/v1/pages/{slug}`
- Returns single page by slug
- **Response**:
```json
{
  "data": {
    "id": 1,
    "slug": "about-us",
    "title_en": "About Us",
    "title_ar": "عن وكالتنا",
    "content_en": "...",
    "content_ar": "...",
    "featured_image": "url",
    "status": "published"
  }
}
```

#### GET `/api/v1/projects/featured`
- Returns featured projects for homepage and about page
- **Expected Response**:
```json
{
  "data": [
    {
      "id": 1,
      "title_en": "Project Name",
      "title_ar": "اسم المشروع",
      "slug": "project-slug",
      "description_en": "...",
      "description_ar": "...",
      "client_name": "Client Name",
      "category": "web-design",
      "images": [
        "https://cdn.example.com/project1-main.jpg",
        "https://cdn.example.com/project1-alt.jpg"
      ],
      "featured": true,
      "status": "published"
    }
  ]
}
```

#### GET `/api/v1/services?page=1&per_page=100`
- Returns all services with pagination
- **Expected Response**:
```json
{
  "data": [
    {
      "id": 1,
      "title_en": "Branding",
      "title_ar": "العلامات التجارية",
      "slug": "branding",
      "description_en": "Complete branding solutions...",
      "description_ar": "حلول العلامات التجارية الكاملة...",
      "price": "2500.00",
      "category": "creative",
      "image": "url",
      "status": "published"
    }
  ],
  "pagination": {
    "total": 12,
    "per_page": 100,
    "current_page": 1,
    "last_page": 1
  }
}
```

#### GET `/api/v1/products?page=1&per_page=100`
- Returns all products with pagination
- **Expected Response**:
```json
{
  "data": [
    {
      "id": 1,
      "title_en": "Product Name",
      "title_ar": "اسم المنتج",
      "description_en": "...",
      "description_ar": "...",
      "price": "99.99",
      "category": "software",
      "images": ["url1", "url2"],
      "featured": true,
      "status": "published"
    }
  ],
  "pagination": {
    "total": 45,
    "per_page": 100,
    "current_page": 1,
    "last_page": 1
  }
}
```

---

## 3. Data Currently Static (Needs Backend Support)

### About Page - Values Section
**Current**: Hardcoded in component (lines 75-101)

**Status**: 🟡 PARTIALLY DYNAMIC
- Currently: Static array with 4 values (Excellence, Passion, Innovation, Trust)
- **To Make Dynamic**: Create endpoint `/api/v1/settings/values` or extend pages to include values
- **Recommended Approach**:
  1. Create `company-values` page with metadata field
  2. Or create dedicated `/api/v1/company-values` endpoint
  3. Each value should include: icon name, title_en/ar, description_en/ar

### About Page - Team Section  
**Current**: Completely unused (lines 103-122 - DEAD CODE)

**Status**: ✅ REMOVED
- The `team` array is not used anymore
- Featured projects display is used instead
- Can be deleted from component

### About Page - Hero Title/Subtitle
**Current**: Static translation strings in component

**Status**: 🟡 HARDCODED
- Title: "About MediaPro"
- **Recommendation**: These are typically page headers, keep as hardcoded translations OR create settings endpoint for site-wide texts

---

## 4. Frontend API Calls (Current Status)

| Section | Endpoint | Status | Fallback |
|---------|----------|--------|----------|
| Stats | derived from projects, services, products | ✅ Working | counts = 0 |
| Story | `GET /pages/about-us` | ✅ Working | hardcoded default text |
| Vision | `GET /pages/vision` | ✅ Working | hardcoded default text |
| Mission | `GET /pages/mission` | ✅ Working | hardcoded default text |
| Values | STATIC ARRAY | 🟡 Needs backend | hardcoded values |
| Services | `GET /services?page=1&per_page=100` | ✅ Working | empty array |
| Featured Projects | `GET /projects/featured` | ✅ Working | empty array |

---

## 5. Backend Checklist for Full Dynamic Content

### Phase 1: Ensure Existing Endpoints Work ✅
- [ ] `GET /api/v1/pages/{slug}` returns correct page data
- [ ] `GET /api/v1/projects/featured` includes images array
- [ ] `GET /api/v1/services?page=1&per_page=100` works with pagination
- [ ] `GET /api/v1/products?page=1&per_page=100` works with pagination

### Phase 2: Create Required Pages 🔄
- [ ] Create "about-us" page via admin
- [ ] Create "vision" page via admin
- [ ] Create "mission" page via admin
- [ ] Populate all pages with bilingual content and images

### Phase 3: Implement Values Endpoint (Optional)
- [ ] Create `/api/v1/company-values` endpoint
- [ ] Return array of values with: title_en, title_ar, description_en, description_ar, icon
- [ ] OR add metadata field to pages table to store JSON values

---

## 6. Admin Panel Requirements

The Admin Dashboard should have sections for:

1. **Pages Management**
   - Create/Edit/Delete pages
   - Fields: slug, title_en/ar, content_en/ar, featured_image, status
   - Pages: about-us, vision, mission, company-values

2. **Services Management**
   - Fields: title_en/ar, description_en/ar, price, category, image, featured, status
   - At least 6 services for About page display

3. **Products Management**
   - Fields: title_en/ar, description_en/ar, price, category, images[], featured, status
   - Any number of products can be created

4. **Projects Management**
   - Fields: title_en/ar, description_en/ar, client_name, category, images[], featured, status
   - Mark projects as "featured" for About page display

---

## 7. Recommended Database Migrations

### Ensure Pages Table Has:
```php
Schema::table('pages', function (Blueprint $table) {
    $table->string('slug')->unique()->indexed();
    $table->string('title_en');
    $table->string('title_ar');
    $table->longText('content_en')->nullable();
    $table->longText('content_ar')->nullable();
    $table->string('featured_image')->nullable();
    $table->string('meta_description_en')->nullable();
    $table->string('meta_description_ar')->nullable();
    $table->enum('status', ['draft', 'published', 'archived'])->default('draft');
    $table->json('metadata')->nullable(); // For storing values or other structured data
    $table->timestamps();
});
```

### Ensure Services Table Has:
```php
Schema::table('services', function (Blueprint $table) {
    $table->string('title_en')->indexed();
    $table->string('title_ar')->indexed();
    $table->string('slug')->unique();
    $table->longText('description_en');
    $table->longText('description_ar');
    $table->decimal('price', 8, 2);
    $table->string('category');
    $table->string('image')->nullable();
    $table->boolean('featured')->default(false);
    $table->enum('status', ['draft', 'published', 'archived'])->default('draft');
    $table->timestamps();
});
```

### Ensure Projects Table Has:
```php
Schema::table('projects', function (Blueprint $table) {
    $table->string('title_en')->indexed();
    $table->string('title_ar')->indexed();
    $table->string('slug')->unique();
    $table->longText('description_en');
    $table->longText('description_ar');
    $table->string('client_name');
    $table->string('category');
    $table->json('images'); // Array of image URLs
    $table->boolean('featured')->default(false);
    $table->enum('status', ['draft', 'published', 'archived'])->default('draft');
    $table->timestamps();
});
```

---

## 8. API Response Format Validation

All endpoints should return data in this format:

✅ **Success Response**:
```json
{
  "success": true,
  "data": { ... },
  "message": "Success"
}
```

❌ **Error Response**:
```json
{
  "success": false,
  "error": "Not found",
  "message": "Resource not found"
}
```

---

## 9. Testing Checklist for Backend

- [ ] Can create pages with bilingual content
- [ ] Can upload featured images for pages
- [ ] Can create and mark projects as featured
- [ ] Can create and manage services with prices
- [ ] Can create and manage products
- [ ] All endpoints return bilingual content
- [ ] Pagination works correctly for services/products
- [ ] Can filter featured items
- [ ] CORS headers are properly set for frontend access

---

## 10. Frontend Implementation Status

Currently implemented sections in About.tsx:
- ✅ Stats (pulls counts from API)
- ✅ Story (pulls from pages/about-us)
- ✅ Vision & Mission (pulls from API with fallbacks)
- ✅ Services (pulls from /services endpoint)
- ✅ Featured Projects (pulls from /projects/featured)
- 🟡 Values (still static - awaiting backend support)

---

## 11. Next Steps for Other Pages

This same pattern should be applied to:

1. **Homepage** - Featured services, products, projects, testimonials
2. **Services Page** - Full services list with filtering
3. **Projects Page** - Portfolio with categories and filtering
4. **Blog/Posts Page** - Dynamic posts from /posts endpoint
5. **Contact Page** - Contact form submissions to /contacts endpoint
6. **Products Page** - Products with categories and search

Each page will follow the same pattern: fetch data from API → display with loading states → show fallbacks if needed.

---

## Support & Questions

For implementation questions:
- Reference the API_INTEGRATION_GUIDE.md in frontend for endpoint details
- Check the usePublicApi.ts hooks for expected response structures
- Verify bilingual support for all content fields (content_en, content_ar, title_en, title_ar)
