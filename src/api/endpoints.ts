/**
 * API Endpoints
 * Centralized API endpoint definitions for the Laravel 12 CMS backend
 */

// ============= Public Endpoints =============

export const PUBLIC_ENDPOINTS = {
  // Pages
  PAGES: {
    LIST: '/pages',
    DETAIL: (slug: string) => `/pages/${slug}`,
  },

  // Services
  SERVICES: {
    LIST: '/services',
    DETAIL: (id: number) => `/services/${id}`,
    BY_CATEGORY: (category: string) => `/services/category/${category}`,
  },

  // Posts
  POSTS: {
    LIST: '/posts',
    DETAIL: (slug: string) => `/posts/${slug}`,
    BY_TYPE: (type: string) => `/posts/type/${type}`,
    BY_CATEGORY: (categoryId: number) => `/posts/category/${categoryId}`,
    SEARCH: '/posts/search',
    FEATURED: '/posts/featured',
  },

  // Products
  PRODUCTS: {
    LIST: '/products',
    DETAIL: (id: number) => `/products/${id}`,
    BY_TYPE: (type: string) => `/products/type/${type}`,
    FEATURED: '/products/featured',
    ON_SALE: '/products/on-sale',
  },

  // Projects
  PROJECTS: {
    LIST: '/projects',
    DETAIL: (id: number) => `/projects/${id}`,
    BY_CATEGORY: (category: string) => `/projects/category/${category}`,
    FEATURED: '/projects/featured',
    SEARCH: '/projects/search',
  },

  // Forms (Public submissions)
  FORMS: {
    CONTACT: '/contact',
    STUDIO_BOOKINGS: '/studio-bookings',
    PRODUCT_INQUIRIES: '/product-inquiries',
  },

  // Testimonials
  TESTIMONIALS: {
    LIST: '/testimonials',
    DETAIL: (id: number) => `/testimonials/${id}`,
    FEATURED: '/testimonials/featured',
  },

  // Why Choose Us
  WHY_CHOOSE_US: {
    LIST: '/why-choose-us',
    DETAIL: (id: number) => `/why-choose-us/${id}`,
  },

  // Settings (Public)
  SETTINGS: {
    DESIGN_SYSTEM: '/settings/design-system',
    BY_KEY: (key: string) => `/settings/${key}`,
  },
} as const;

// ============= Admin Endpoints =============

export const ADMIN_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/admin/login',
    LOGOUT: '/admin/logout',
    ME: '/admin/me',
  },

  // Pages Management
  PAGES: {
    LIST: '/admin/pages',
    CREATE: '/admin/pages',
    DETAIL: (id: number) => `/admin/pages/${id}`,
    UPDATE: (id: number) => `/admin/pages/${id}`,
    DELETE: (id: number) => `/admin/pages/${id}`,
  },

  // Services Management
  SERVICES: {
    LIST: '/admin/services',
    CREATE: '/admin/services',
    DETAIL: (id: number) => `/admin/services/${id}`,
    UPDATE: (id: number) => `/admin/services/${id}`,
    DELETE: (id: number) => `/admin/services/${id}`,
    TOGGLE: (id: number) => `/admin/services/${id}/toggle`,
  },

  // Posts Management
  POSTS: {
    LIST: '/admin/posts',
    CREATE: '/admin/posts',
    DETAIL: (id: number) => `/admin/posts/${id}`,
    UPDATE: (id: number) => `/admin/posts/${id}`,
    DELETE: (id: number) => `/admin/posts/${id}`,
  },

  // Categories Management
  CATEGORIES: {
    LIST: '/admin/categories',
    CREATE: '/admin/categories',
    DETAIL: (id: number) => `/admin/categories/${id}`,
    UPDATE: (id: number) => `/admin/categories/${id}`,
    DELETE: (id: number) => `/admin/categories/${id}`,
  },

  // Products Management
  PRODUCTS: {
    LIST: '/admin/products',
    CREATE: '/admin/products',
    DETAIL: (id: number) => `/admin/products/${id}`,
    UPDATE: (id: number) => `/admin/products/${id}`,
    DELETE: (id: number) => `/admin/products/${id}`,
    TOGGLE: (id: number) => `/admin/products/${id}/toggle`,
  },

  // Projects Management
  PROJECTS: {
    LIST: '/admin/projects',
    CREATE: '/admin/projects',
    DETAIL: (id: number) => `/admin/projects/${id}`,
    UPDATE: (id: number) => `/admin/projects/${id}`,
    DELETE: (id: number) => `/admin/projects/${id}`,
  },

  // Offers Management
  OFFERS: {
    LIST: '/admin/offers',
    CREATE: '/admin/offers',
    DETAIL: (id: number) => `/admin/offers/${id}`,
    UPDATE: (id: number) => `/admin/offers/${id}`,
    DELETE: (id: number) => `/admin/offers/${id}`,
  },

  // Contacts Management
  CONTACTS: {
    LIST: '/admin/contacts',
    DETAIL: (id: number) => `/admin/contacts/${id}`,
    UPDATE: (id: number) => `/admin/contacts/${id}`,
    DELETE: (id: number) => `/admin/contacts/${id}`,
  },

  // Studio Bookings Management
  STUDIO_BOOKINGS: {
    LIST: '/admin/studio-bookings',
    DETAIL: (id: number) => `/admin/studio-bookings/${id}`,
    UPDATE: (id: number) => `/admin/studio-bookings/${id}`,
    CONFIRM: (id: number) => `/admin/studio-bookings/${id}/confirm`,
    CANCEL: (id: number) => `/admin/studio-bookings/${id}/cancel`,
    DELETE: (id: number) => `/admin/studio-bookings/${id}`,
  },

  // Product Inquiries Management
  PRODUCT_INQUIRIES: {
    LIST: '/admin/product-inquiries',
    DETAIL: (id: number) => `/admin/product-inquiries/${id}`,
    UPDATE: (id: number) => `/admin/product-inquiries/${id}`,
    DELETE: (id: number) => `/admin/product-inquiries/${id}`,
  },

  // Settings Management
  SETTINGS: {
    LIST: '/admin/settings',
    BY_GROUP: (group: string) => `/admin/settings/group/${group}`,
    UPDATE: (id: number) => `/admin/settings/${id}`,
    BATCH_UPDATE: '/admin/settings/batch-update',
    DESIGN_SYSTEM: {
      GET: '/admin/settings/design-system',
      UPDATE: '/admin/settings/design-system',
    },
  },

  // Media Management
  MEDIA: {
    LIST: '/admin/media',
    UPLOAD: '/admin/media/upload',
    BULK_UPLOAD: '/admin/media/bulk-upload',
    DETAIL: (id: number) => `/admin/media/${id}`,
    DELETE: (id: number) => `/admin/media/${id}`,
  },
} as const;
