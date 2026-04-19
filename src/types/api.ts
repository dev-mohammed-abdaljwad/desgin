/**
 * API Types and Interfaces
 * Type definitions for all API responses and requests
 */

// ============= Common Types =============

export interface PaginationMeta {
  total: number;
  count: number;
  per_page: number;
  current_page: number;
  last_page: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta?: PaginationMeta;
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

// ============= Auth Types =============

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: 'super_admin' | 'admin' | 'editor' | 'contributor';
  created_at: string;
  updated_at?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  admin: AdminUser;
  token: string;
}

export interface AuthState {
  user: AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
}

// ============= Pages Types =============

export interface Page {
  id: number;
  slug: string;
  title: BilingualText;
  content: BilingualText;
  meta_title: string;
  meta_description: string;
  featured_image: string;
  is_published: boolean;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface CreatePageRequest {
  title_ar: string;
  title_en: string;
  content_ar: string;
  content_en: string;
  slug: string;
  meta_title?: string;
  meta_description?: string;
  featured_image?: File;
  is_published?: boolean;
}

export interface UpdatePageRequest extends Partial<CreatePageRequest> {}

// ============= Services Types =============

export type ServiceCategory = 'marketing' | 'media' | 'podcast' | 'education' | 'design' | 'photography' | 'ads' | 'social-media' | 'video-production';

export interface BilingualText {
  ar: string;
  en: string;
}

export interface Service {
  id: number;
  title: BilingualText;
  description: BilingualText;
  category: ServiceCategory;
  image: string;
  icon: string;
  price: string | number;
  is_active: boolean;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface CreateServiceRequest {
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  category: string;
  price?: number;
  image?: File;
  icon?: File;
  order?: number;
  is_active?: boolean;
}

export interface UpdateServiceRequest extends Partial<CreateServiceRequest> {}

// ============= Posts Types =============

export type PostType = 'blog' | 'reel' | 'news';

export interface Post {
  id: number;
  title: BilingualText;
  content: BilingualText;
  excerpt: BilingualText;
  type: PostType;
  category_id?: number;
  category?: Category;
  slug: string;
  thumbnail: string;
  featured_image: string;
  video_url?: string;
  tags: string[];
  meta_title: string;
  meta_description: string;
  is_published: boolean;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name: BilingualText;
  description?: BilingualText;
  type: PostType;
  slug: string;
  icon?: string;
  order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreatePostRequest {
  title_ar: string;
  title_en: string;
  content_ar: string;
  content_en: string;
  excerpt_ar?: string;
  excerpt_en?: string;
  type: PostType;
  category_id: number;
  slug: string;
  thumbnail?: File;
  featured_image?: File;
  video_url?: string;
  tags?: string[];
  meta_title?: string;
  meta_description?: string;
  is_published?: boolean;
}

export interface UpdatePostRequest extends Partial<CreatePostRequest> {}

export interface CreateCategoryRequest {
  name_ar: string;
  name_en: string;
  description_ar?: string;
  description_en?: string;
  type: PostType;
  slug: string;
  icon?: File;
  order?: number;
  is_active?: boolean;
}

export interface UpdateCategoryRequest extends Partial<CreateCategoryRequest> {}

// ============= Products Types =============

export type ProductType = 'education_platform' | 'subscription' | 'bundle' | 'course';

export interface Product {
  id: number;
  title: BilingualText;
  description: BilingualText;
  benefits: BilingualText;
  type: ProductType;
  price: number;
  discount_price?: number;
  discount_percentage?: number;
  has_discount: boolean;
  features: string[];
  images: string[];
  thumbnail: string;
  duration_months?: number;
  modules_count?: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateProductRequest {
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  type: ProductType;
  price: number;
  discount_price?: number;
  features?: string[];
  benefits_ar?: string;
  benefits_en?: string;
  thumbnail?: File;
  images?: File[];
  duration_months?: number;
  modules_count?: number;
  is_active?: boolean;
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {}

// ============= Projects Types =============

export interface Project {
  id: number;
  title: BilingualText;
  description: BilingualText;
  challenge: BilingualText;
  solution: BilingualText;
  category: string;
  client_name: string;
  client_logo: string;
  result_metrics: Record<string, any>;
  website_url?: string;
  video_url?: string;
  images: string[];
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateProjectRequest {
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  challenge_ar?: string;
  challenge_en?: string;
  solution_ar?: string;
  solution_en?: string;
  category?: string;
  client_name?: string;
  client_logo?: File;
  result_metrics?: Record<string, any>;
  website_url?: string;
  video_url?: string;
  images?: File[];
  is_published?: boolean;
}

export interface UpdateProjectRequest extends Partial<CreateProjectRequest> {}

// ============= Offers Types =============

export interface Offer {
  id: number;
  title: BilingualText;
  description?: BilingualText;
  code: string;
  discount_percentage?: number;
  discount_amount?: number;
  applies_to: 'service' | 'product' | 'all';
  service_id?: number;
  product_id?: number;
  start_date: string;
  end_date: string;
  usage_limit?: number;
  banner_image?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateOfferRequest {
  title_ar: string;
  title_en: string;
  description_ar?: string;
  description_en?: string;
  code: string;
  discount_percentage?: number;
  discount_amount?: number;
  applies_to: 'service' | 'product' | 'all';
  service_id?: number;
  product_id?: number;
  start_date: string;
  end_date: string;
  usage_limit?: number;
  banner_image?: File;
  is_active?: boolean;
}

export interface UpdateOfferRequest extends Partial<CreateOfferRequest> {}

// ============= Contact Form Types =============

export type ContactType = 'general' | 'booking' | 'product' | 'inquiry' | 'support';

export interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  type: ContactType;
  status: 'new' | 'contacted' | 'resolved' | 'closed';
  company_name?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateContactRequest {
  name: string;
  email: string;
  phone: string;
  message: string;
  type?: ContactType;
  company_name?: string;
}

// ============= Studio Booking Types =============

export type StudioBookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';
export type ServiceType = 'podcast' | 'live_stream' | 'music_production' | 'other';

export interface StudioBooking {
  id: number;
  name: string;
  email: string;
  phone: string;
  booking_date: string;
  duration: number;
  service_type: ServiceType;
  notes?: string;
  status: StudioBookingStatus;
  created_at: string;
  updated_at: string;
}

export interface CreateStudioBookingRequest {
  name: string;
  email: string;
  phone: string;
  booking_date: string;
  duration: number;
  service_type: ServiceType;
  notes?: string;
}

// ============= Product Inquiry Types =============

export interface ProductInquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  product_id: number;
  status: 'new' | 'contacted' | 'interested' | 'closed';
  created_at: string;
  updated_at: string;
}

export interface CreateProductInquiryRequest {
  name: string;
  email: string;
  phone: string;
  message: string;
  product_id: number;
}

// ============= Pricing Package Types =============

export interface PricingFeature {
  ar: string;
  en: string;
}

export interface Pricing {
  id: number;
  title: string;
  description: string;
  price: string;
  period: string;
  features: PricingFeature[];
  highlighted: boolean;
  ctaText: string;
  created_at: string;
  updated_at?: string;
}

// ============= Studio Types =============

export interface StudioFeature {
  id: number;
  icon: string;
  title: string;
  title_en: string;
  title_ar: string;
  description: string;
  description_en: string;
  description_ar: string;
  gradient: string;
  created_at: string;
}

export interface StudioPackage {
  id: number;
  title: string;
  price: string;
  period: string;
  description: string;
  features: PricingFeature[];
  highlighted: boolean;
  ctaText: string;
  created_at: string;
}

export interface StudioWhyUs {
  id: number;
  type: string;
  icon: string;
  title: string;
  title_en: string;
  title_ar: string;
  description: string;
  description_en: string;
  description_ar: string;
  created_at: string;
}

export interface StudioFAQ {
  id: number;
  type: string;
  question: string;
  question_en: string;
  question_ar: string;
  answer: string;
  answer_en: string;
  answer_ar: string;
  created_at: string;
}

export interface StudioData {
  features: StudioFeature[];
  packages: StudioPackage[];
  why_us: StudioWhyUs[];
  faq: StudioFAQ[];
}

// ============= Settings Types =============

export interface DesignSystemSettings {
  site_name: string;
  site_description: string;
  theme_color: string;
  secondary_color: string;
  primary_font: string;
  headings_font: string;
  default_language: 'ar' | 'en';
  is_rtl: boolean;
  logo_url: string;
  favicon_url: string;
  social_links: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
}

export interface Setting {
  id: number;
  key: string;
  value: string | number | boolean | Record<string, any>;
  group: string;
  created_at: string;
  updated_at: string;
}

// ============= Media Types =============

export type MediaType = 'image' | 'video' | 'document' | 'audio';

export interface MediaFile {
  id: number;
  name: string;
  url: string;
  type: MediaType;
  size: number;
  mime_type: string;
  disk: string;
  created_at: string;
  updated_at: string;
}

// ============= Testimonials Types =============

export interface Testimonial {
  id: number;
  name: BilingualText;
  role: BilingualText;
  company?: BilingualText;
  content: BilingualText;
  rating: number;
  avatar?: string;
  is_featured: boolean;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateTestimonialRequest {
  name_ar: string;
  name_en: string;
  role_ar: string;
  role_en: string;
  company_ar?: string;
  company_en?: string;
  content_ar: string;
  content_en: string;
  rating: number;
  avatar?: string;
  is_featured?: boolean;
  is_published?: boolean;
}

export interface UpdateTestimonialRequest extends Partial<CreateTestimonialRequest> {}

// ============= Why Choose Us Types =============

export interface WhyChooseUs {
  id: number;
  title: BilingualText;
  description: BilingualText;
  icon: string;
  icon_color: string;
  is_published: boolean;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface CreateWhyChooseUsRequest {
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  icon: string;
  icon_color?: string;
  is_published?: boolean;
  order?: number;
}

export interface UpdateWhyChooseUsRequest extends Partial<CreateWhyChooseUsRequest> {}

export interface UploadResponse {
  success: boolean;
  data: MediaFile;
  message: string;
}
