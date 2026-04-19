/**
 * Public API Services
 * Services for public endpoints (no authentication required)
 */

import { HttpClient } from '../client';
import { PUBLIC_ENDPOINTS } from '../endpoints';
import type {
  Page,
  Service,
  Post,
  Product,
  Project,
  Testimonial,
  WhyChooseUs,
  DesignSystemSettings,
  ApiResponse,
  PaginatedResponse,
  Pricing,
  StudioData,
  StudioFeature,
  StudioPackage,
  StudioWhyUs,
  StudioFAQ,
} from '../../types/api';

class PagesService {
  private readonly httpClient: HttpClient;

  constructor() {
    this.httpClient = HttpClient.getInstance();
  }

  /**
   * Get all published pages
   */
  async getPages(page: number = 1, perPage: number = 15): Promise<PaginatedResponse<Page>> {
    return this.httpClient.get<PaginatedResponse<Page>>(
      `${PUBLIC_ENDPOINTS.PAGES.LIST}?page=${page}&per_page=${perPage}`
    );
  }

  /**
   * Get single page by slug
   */
  async getPageBySlug(slug: string): Promise<ApiResponse<Page>> {
    return this.httpClient.get<ApiResponse<Page>>(PUBLIC_ENDPOINTS.PAGES.DETAIL(slug));
  }
}

class ServicesService {
  private readonly httpClient: HttpClient;

  constructor() {
    this.httpClient = HttpClient.getInstance();
  }

  /**
   * Get all active services
   */
  async getServices(page: number = 1, perPage: number = 15): Promise<PaginatedResponse<Service>> {
    return this.httpClient.get<PaginatedResponse<Service>>(
      `${PUBLIC_ENDPOINTS.SERVICES.LIST}?page=${page}&per_page=${perPage}`
    );
  }

  /**
   * Get services by category
   */
  async getServicesByCategory(
    category: string,
    perPage: number = 15
  ): Promise<PaginatedResponse<Service>> {
    return this.httpClient.get<PaginatedResponse<Service>>(
      `${PUBLIC_ENDPOINTS.SERVICES.BY_CATEGORY(category)}?per_page=${perPage}`
    );
  }

  /**
   * Get single service by ID
   */
  async getService(id: number): Promise<ApiResponse<Service>> {
    return this.httpClient.get<ApiResponse<Service>>(PUBLIC_ENDPOINTS.SERVICES.DETAIL(id));
  }

}

class PostsService {
  private readonly httpClient: HttpClient;

  constructor() {
    this.httpClient = HttpClient.getInstance();
  }

  /**
   * Get all published posts
   */
  async getPosts(page: number = 1, perPage: number = 15): Promise<PaginatedResponse<Post>> {
    return this.httpClient.get<PaginatedResponse<Post>>(
      `${PUBLIC_ENDPOINTS.POSTS.LIST}?page=${page}&per_page=${perPage}`
    );
  }

  /**
   * Get posts by type (blog, reel, news)
   */
  async getPostsByType(type: string, perPage: number = 15): Promise<PaginatedResponse<Post>> {
    return this.httpClient.get<PaginatedResponse<Post>>(
      `${PUBLIC_ENDPOINTS.POSTS.BY_TYPE(type)}?per_page=${perPage}`
    );
  }

  /**
   * Get posts by category
   */
  async getPostsByCategory(
    categoryId: number,
    perPage: number = 15
  ): Promise<PaginatedResponse<Post>> {
    return this.httpClient.get<PaginatedResponse<Post>>(
      `${PUBLIC_ENDPOINTS.POSTS.BY_CATEGORY(categoryId)}?per_page=${perPage}`
    );
  }

  /**
   * Get single post by slug
   */
  async getPostBySlug(slug: string): Promise<ApiResponse<Post>> {
    return this.httpClient.get<ApiResponse<Post>>(PUBLIC_ENDPOINTS.POSTS.DETAIL(slug));
  }

  /**
   * Search posts
   */
  async searchPosts(query: string, perPage: number = 15): Promise<PaginatedResponse<Post>> {
    return this.httpClient.get<PaginatedResponse<Post>>(
      `${PUBLIC_ENDPOINTS.POSTS.SEARCH}?q=${encodeURIComponent(query)}&per_page=${perPage}`
    );
  }

  /**
   * Get featured posts
   */
  async getFeaturedPosts(): Promise<PaginatedResponse<Post>> {
    return this.httpClient.get<PaginatedResponse<Post>>(PUBLIC_ENDPOINTS.POSTS.FEATURED);
  }
}

class ProductsService {
  private readonly httpClient: HttpClient;

  constructor() {
    this.httpClient = HttpClient.getInstance();
  }

  /**
   * Get all active products
   */
  async getProducts(page: number = 1, perPage: number = 15): Promise<PaginatedResponse<Product>> {
    return this.httpClient.get<PaginatedResponse<Product>>(
      `${PUBLIC_ENDPOINTS.PRODUCTS.LIST}?page=${page}&per_page=${perPage}`
    );
  }

  /**
   * Get single product
   */
  async getProduct(id: number): Promise<ApiResponse<Product>> {
    return this.httpClient.get<ApiResponse<Product>>(PUBLIC_ENDPOINTS.PRODUCTS.DETAIL(id));
  }

  /**
   * Get products by type
   */
  async getProductsByType(type: string, perPage: number = 15): Promise<PaginatedResponse<Product>> {
    return this.httpClient.get<PaginatedResponse<Product>>(
      `${PUBLIC_ENDPOINTS.PRODUCTS.BY_TYPE(type)}?per_page=${perPage}`
    );
  }

  /**
   * Get featured products
   */
  async getFeaturedProducts(): Promise<PaginatedResponse<Product>> {
    return this.httpClient.get<PaginatedResponse<Product>>(PUBLIC_ENDPOINTS.PRODUCTS.FEATURED);
  }

  /**
   * Get discounted products
   */
  async getDiscountedProducts(): Promise<PaginatedResponse<Product>> {
    return this.httpClient.get<PaginatedResponse<Product>>(PUBLIC_ENDPOINTS.PRODUCTS.ON_SALE);
  }
}

class ProjectsService {
  private readonly httpClient: HttpClient;

  constructor() {
    this.httpClient = HttpClient.getInstance();
  }

  /**
   * Get all published projects
   */
  async getProjects(perPage: number = 15, page: number = 1): Promise<PaginatedResponse<Project>> {
    return this.httpClient.get<PaginatedResponse<Project>>(
      `${PUBLIC_ENDPOINTS.PROJECTS.LIST}?page=${page}&per_page=${perPage}`
    );
  }

  /**
   * Get single project
   */
  async getProject(id: number): Promise<ApiResponse<Project>> {
    return this.httpClient.get<ApiResponse<Project>>(PUBLIC_ENDPOINTS.PROJECTS.DETAIL(id));
  }

  /**
   * Get projects by category
   */
  async getProjectsByCategory(category: string): Promise<PaginatedResponse<Project>> {
    return this.httpClient.get<PaginatedResponse<Project>>(
      PUBLIC_ENDPOINTS.PROJECTS.BY_CATEGORY(category)
    );
  }

  /**
   * Get featured projects
   */
  async getFeaturedProjects(): Promise<PaginatedResponse<Project>> {
    return this.httpClient.get<PaginatedResponse<Project>>(PUBLIC_ENDPOINTS.PROJECTS.FEATURED);
  }

  /**
   * Search projects
   */
  async searchProjects(query: string): Promise<PaginatedResponse<Project>> {
    return this.httpClient.get<PaginatedResponse<Project>>(
      `${PUBLIC_ENDPOINTS.PROJECTS.SEARCH}?q=${encodeURIComponent(query)}`
    );
  }
}

class SettingsService {
  private readonly httpClient: HttpClient;

  constructor() {
    this.httpClient = HttpClient.getInstance();
  }

  /**
   * Get design system settings
   */
  async getDesignSystem(): Promise<ApiResponse<DesignSystemSettings>> {
    return this.httpClient.get<ApiResponse<DesignSystemSettings>>(
      PUBLIC_ENDPOINTS.SETTINGS.DESIGN_SYSTEM
    );
  }

  /**
   * Get specific setting by key
   */
  async getSetting(key: string): Promise<ApiResponse<any>> {
    return this.httpClient.get<ApiResponse<any>>(PUBLIC_ENDPOINTS.SETTINGS.BY_KEY(key));
  }
}

class TestimonialsService {
  private readonly httpClient: HttpClient;

  constructor() {
    this.httpClient = HttpClient.getInstance();
  }

  /**
   * Get all published testimonials
   */
  async getTestimonials(page: number = 1, perPage: number = 15): Promise<PaginatedResponse<Testimonial>> {
    return this.httpClient.get<PaginatedResponse<Testimonial>>(
      `${PUBLIC_ENDPOINTS.TESTIMONIALS.LIST}?page=${page}&per_page=${perPage}`
    );
  }

  /**
   * Get featured testimonials
   */
  async getFeaturedTestimonials(limit: number = 6): Promise<ApiResponse<Testimonial[]>> {
    return this.httpClient.get<ApiResponse<Testimonial[]>>(
      `${PUBLIC_ENDPOINTS.TESTIMONIALS.FEATURED}?limit=${limit}`
    );
  }

  /**
   * Get single testimonial by ID
   */
  async getTestimonial(id: number): Promise<ApiResponse<Testimonial>> {
    return this.httpClient.get<ApiResponse<Testimonial>>(PUBLIC_ENDPOINTS.TESTIMONIALS.DETAIL(id));
  }
}

class WhyChooseUsService {
  private readonly httpClient: HttpClient;

  constructor() {
    this.httpClient = HttpClient.getInstance();
  }

  /**
   * Get all why choose us items
   */
  async getWhyChooseUs(page: number = 1, perPage: number = 15): Promise<PaginatedResponse<WhyChooseUs>> {
    return this.httpClient.get<PaginatedResponse<WhyChooseUs>>(
      `${PUBLIC_ENDPOINTS.WHY_CHOOSE_US.LIST}?page=${page}&per_page=${perPage}`
    );
  }

  /**
   * Get single why choose us item by ID
   */
  async getWhyChooseUsItem(id: number): Promise<ApiResponse<WhyChooseUs>> {
    return this.httpClient.get<ApiResponse<WhyChooseUs>>(PUBLIC_ENDPOINTS.WHY_CHOOSE_US.DETAIL(id));
  }
}

class PricingsService {
  private readonly httpClient: HttpClient;

  constructor() {
    this.httpClient = HttpClient.getInstance();
  }

  /**
   * Get all pricing packages (with pagination)
   */
  async getPricings(page: number = 1, perPage: number = 15): Promise<PaginatedResponse<Pricing>> {
    return this.httpClient.get<PaginatedResponse<Pricing>>(
      `${PUBLIC_ENDPOINTS.PRICINGS.LIST}?page=${page}&per_page=${perPage}`
    );
  }

  /**
   * Get all pricing packages (no pagination)
   */
  async getAllPricings(): Promise<ApiResponse<Pricing[]>> {
    return this.httpClient.get<ApiResponse<Pricing[]>>(PUBLIC_ENDPOINTS.PRICINGS.ALL);
  }

  /**
   * Get single pricing package by ID
   */
  async getPricing(id: number): Promise<ApiResponse<Pricing>> {
    return this.httpClient.get<ApiResponse<Pricing>>(PUBLIC_ENDPOINTS.PRICINGS.DETAIL(id));
  }

  /**
   * Get highlighted pricing packages
   */
  async getHighlightedPricings(): Promise<ApiResponse<Pricing[]>> {
    return this.httpClient.get<ApiResponse<Pricing[]>>(PUBLIC_ENDPOINTS.PRICINGS.HIGHLIGHTED);
  }
}

class StudioService {
  private readonly httpClient: HttpClient;

  constructor() {
    this.httpClient = HttpClient.getInstance();
  }

  /**
   * Get all studio data (features, packages, why_us, faq)
   */
  async getStudioAll(): Promise<ApiResponse<StudioData>> {
    return this.httpClient.get<ApiResponse<StudioData>>(PUBLIC_ENDPOINTS.STUDIO.ALL);
  }

  /**
   * Get studio features only
   */
  async getStudioFeatures(): Promise<ApiResponse<StudioFeature[]>> {
    return this.httpClient.get<ApiResponse<StudioFeature[]>>(PUBLIC_ENDPOINTS.STUDIO.FEATURES);
  }

  /**
   * Get studio packages with pagination
   */
  async getStudioPackages(page: number = 1, perPage: number = 15): Promise<PaginatedResponse<StudioPackage>> {
    return this.httpClient.get<PaginatedResponse<StudioPackage>>(
      `${PUBLIC_ENDPOINTS.STUDIO.PACKAGES}?page=${page}&per_page=${perPage}`
    );
  }

  /**
   * Get all studio packages (no pagination)
   */
  async getAllStudioPackages(): Promise<ApiResponse<StudioPackage[]>> {
    return this.httpClient.get<ApiResponse<StudioPackage[]>>(PUBLIC_ENDPOINTS.STUDIO.PACKAGES_ALL);
  }

  /**
   * Get highlighted studio packages
   */
  async getHighlightedStudioPackages(): Promise<ApiResponse<StudioPackage[]>> {
    return this.httpClient.get<ApiResponse<StudioPackage[]>>(PUBLIC_ENDPOINTS.STUDIO.PACKAGES_HIGHLIGHTED);
  }

  /**
   * Get single studio package by ID
   */
  async getStudioPackage(id: number): Promise<ApiResponse<StudioPackage>> {
    return this.httpClient.get<ApiResponse<StudioPackage>>(PUBLIC_ENDPOINTS.STUDIO.PACKAGES_DETAIL(id));
  }

  /**
   * Get studio why us items
   */
  async getStudioWhyUs(): Promise<ApiResponse<StudioWhyUs[]>> {
    return this.httpClient.get<ApiResponse<StudioWhyUs[]>>(PUBLIC_ENDPOINTS.STUDIO.WHY_US);
  }

  /**
   * Get studio FAQ items
   */
  async getStudioFAQ(): Promise<ApiResponse<StudioFAQ[]>> {
    return this.httpClient.get<ApiResponse<StudioFAQ[]>>(PUBLIC_ENDPOINTS.STUDIO.FAQ);
  }
}

// Export service instances
export const pagesService = new PagesService();
export const servicesService = new ServicesService();
export const postsService = new PostsService();
export const productsService = new ProductsService();
export const projectsService = new ProjectsService();
export const testimonialsService = new TestimonialsService();
export const whyChooseUsService = new WhyChooseUsService();
export const settingsService = new SettingsService();
export const pricingsService = new PricingsService();
export const studioService = new StudioService();
