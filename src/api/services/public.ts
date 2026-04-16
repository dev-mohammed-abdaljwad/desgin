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
  Offer,
  DesignSystemSettings,
  ApiResponse,
  PaginatedResponse,
} from '../../types/api';

class PagesService {
  private httpClient: HttpClient;

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
  private httpClient: HttpClient;

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
  private httpClient: HttpClient;

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
  private httpClient: HttpClient;

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
  private httpClient: HttpClient;

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
  private httpClient: HttpClient;

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

// Export service instances
export const pagesService = new PagesService();
export const servicesService = new ServicesService();
export const postsService = new PostsService();
export const productsService = new ProductsService();
export const projectsService = new ProjectsService();
export const settingsService = new SettingsService();
