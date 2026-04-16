/**
 * Admin API Services
 * Services for admin endpoints (authentication required)
 */

import { HttpClient } from '../client';
import { ADMIN_ENDPOINTS } from '../endpoints';
import type {
  Page,
  CreatePageRequest,
  UpdatePageRequest,
  Service,
  CreateServiceRequest,
  UpdateServiceRequest,
  Post,
  CreatePostRequest,
  UpdatePostRequest,
  Category,
  CreateCategoryRequest,
  UpdateCategoryRequest,
  Product,
  CreateProductRequest,
  UpdateProductRequest,
  Project,
  CreateProjectRequest,
  UpdateProjectRequest,
  Offer,
  CreateOfferRequest,
  UpdateOfferRequest,
  Contact,
  StudioBooking,
  ProductInquiry,
  Setting,
  DesignSystemSettings,
  MediaFile,
  ApiResponse,
  PaginatedResponse,
} from '../../types/api';

class AdminPagesService {
  private httpClient: HttpClient;

  constructor() {
    this.httpClient = HttpClient.getInstance();
  }

  /**
   * Get all pages (published and unpublished)
   */
  async getPages(page: number = 1, perPage: number = 15): Promise<PaginatedResponse<Page>> {
    return this.httpClient.get<PaginatedResponse<Page>>(
      `${ADMIN_ENDPOINTS.PAGES.LIST}?page=${page}&per_page=${perPage}`
    );
  }

  /**
   * Create new page
   */
  async createPage(data: CreatePageRequest): Promise<ApiResponse<Page>> {
    const formData = this.buildFormData(data);
    return this.httpClient.upload<ApiResponse<Page>>(ADMIN_ENDPOINTS.PAGES.CREATE, formData);
  }

  /**
   * Get single page
   */
  async getPage(id: number): Promise<ApiResponse<Page>> {
    return this.httpClient.get<ApiResponse<Page>>(ADMIN_ENDPOINTS.PAGES.DETAIL(id));
  }

  /**
   * Update page
   */
  async updatePage(id: number, data: UpdatePageRequest): Promise<ApiResponse<Page>> {
    const formData = this.buildFormData(data);
    return this.httpClient.upload<ApiResponse<Page>>(ADMIN_ENDPOINTS.PAGES.UPDATE(id), formData);
  }

  /**
   * Delete page
   */
  async deletePage(id: number): Promise<ApiResponse<void>> {
    return this.httpClient.delete<ApiResponse<void>>(ADMIN_ENDPOINTS.PAGES.DELETE(id));
  }

  private buildFormData(data: any): FormData {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (data[key] instanceof File) {
        formData.append(key, data[key]);
      } else if (data[key] !== undefined && data[key] !== null) {
        formData.append(key, String(data[key]));
      }
    });
    return formData;
  }
}

class AdminServicesService {
  private httpClient: HttpClient;

  constructor() {
    this.httpClient = HttpClient.getInstance();
  }

  /**
   * Get all services
   */
  async getServices(page: number = 1, perPage: number = 15): Promise<PaginatedResponse<Service>> {
    return this.httpClient.get<PaginatedResponse<Service>>(
      `${ADMIN_ENDPOINTS.SERVICES.LIST}?page=${page}&per_page=${perPage}`
    );
  }

  /**
   * Create new service
   */
  async createService(data: CreateServiceRequest): Promise<ApiResponse<Service>> {
    const formData = this.buildFormData(data);
    return this.httpClient.upload<ApiResponse<Service>>(
      ADMIN_ENDPOINTS.SERVICES.CREATE,
      formData
    );
  }

  /**
   * Get single service
   */
  async getService(id: number): Promise<ApiResponse<Service>> {
    return this.httpClient.get<ApiResponse<Service>>(ADMIN_ENDPOINTS.SERVICES.DETAIL(id));
  }

  /**
   * Update service
   */
  async updateService(id: number, data: UpdateServiceRequest): Promise<ApiResponse<Service>> {
    const formData = this.buildFormData(data);
    return this.httpClient.upload<ApiResponse<Service>>(
      ADMIN_ENDPOINTS.SERVICES.UPDATE(id),
      formData
    );
  }

  /**
   * Delete service
   */
  async deleteService(id: number): Promise<ApiResponse<void>> {
    return this.httpClient.delete<ApiResponse<void>>(ADMIN_ENDPOINTS.SERVICES.DELETE(id));
  }

  /**
   * Toggle service active status
   */
  async toggleService(id: number): Promise<ApiResponse<Service>> {
    return this.httpClient.patch<ApiResponse<Service>>(ADMIN_ENDPOINTS.SERVICES.TOGGLE(id));
  }

  private buildFormData(data: any): FormData {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (data[key] instanceof File) {
        formData.append(key, data[key]);
      } else if (data[key] !== undefined && data[key] !== null) {
        formData.append(key, String(data[key]));
      }
    });
    return formData;
  }
}

class AdminPostsService {
  private httpClient: HttpClient;

  constructor() {
    this.httpClient = HttpClient.getInstance();
  }

  /**
   * Get all posts
   */
  async getPosts(page: number = 1, perPage: number = 15): Promise<PaginatedResponse<Post>> {
    return this.httpClient.get<PaginatedResponse<Post>>(
      `${ADMIN_ENDPOINTS.POSTS.LIST}?page=${page}&per_page=${perPage}`
    );
  }

  /**
   * Create new post
   */
  async createPost(data: CreatePostRequest): Promise<ApiResponse<Post>> {
    const formData = this.buildFormData(data);
    return this.httpClient.upload<ApiResponse<Post>>(ADMIN_ENDPOINTS.POSTS.CREATE, formData);
  }

  /**
   * Get single post
   */
  async getPost(id: number): Promise<ApiResponse<Post>> {
    return this.httpClient.get<ApiResponse<Post>>(ADMIN_ENDPOINTS.POSTS.DETAIL(id));
  }

  /**
   * Update post
   */
  async updatePost(id: number, data: UpdatePostRequest): Promise<ApiResponse<Post>> {
    const formData = this.buildFormData(data);
    return this.httpClient.upload<ApiResponse<Post>>(ADMIN_ENDPOINTS.POSTS.UPDATE(id), formData);
  }

  /**
   * Delete post
   */
  async deletePost(id: number): Promise<ApiResponse<void>> {
    return this.httpClient.delete<ApiResponse<void>>(ADMIN_ENDPOINTS.POSTS.DELETE(id));
  }

  private buildFormData(data: any): FormData {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (data[key] instanceof File) {
        formData.append(key, data[key]);
      } else if (Array.isArray(data[key])) {
        data[key].forEach((item: any, index: number) => {
          if (item instanceof File) {
            formData.append(`${key}[${index}]`, item);
          } else {
            formData.append(`${key}[${index}]`, String(item));
          }
        });
      } else if (data[key] !== undefined && data[key] !== null) {
        formData.append(key, String(data[key]));
      }
    });
    return formData;
  }
}

class AdminCategoriesService {
  private httpClient: HttpClient;

  constructor() {
    this.httpClient = HttpClient.getInstance();
  }

  /**
   * Get all categories
   */
  async getCategories(page: number = 1, perPage: number = 15): Promise<PaginatedResponse<Category>> {
    return this.httpClient.get<PaginatedResponse<Category>>(
      `${ADMIN_ENDPOINTS.CATEGORIES.LIST}?page=${page}&per_page=${perPage}`
    );
  }

  /**
   * Create new category
   */
  async createCategory(data: CreateCategoryRequest): Promise<ApiResponse<Category>> {
    const formData = this.buildFormData(data);
    return this.httpClient.upload<ApiResponse<Category>>(
      ADMIN_ENDPOINTS.CATEGORIES.CREATE,
      formData
    );
  }

  /**
   * Get single category
   */
  async getCategory(id: number): Promise<ApiResponse<Category>> {
    return this.httpClient.get<ApiResponse<Category>>(ADMIN_ENDPOINTS.CATEGORIES.DETAIL(id));
  }

  /**
   * Update category
   */
  async updateCategory(id: number, data: UpdateCategoryRequest): Promise<ApiResponse<Category>> {
    const formData = this.buildFormData(data);
    return this.httpClient.upload<ApiResponse<Category>>(
      ADMIN_ENDPOINTS.CATEGORIES.UPDATE(id),
      formData
    );
  }

  /**
   * Delete category
   */
  async deleteCategory(id: number): Promise<ApiResponse<void>> {
    return this.httpClient.delete<ApiResponse<void>>(ADMIN_ENDPOINTS.CATEGORIES.DELETE(id));
  }

  private buildFormData(data: any): FormData {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (data[key] instanceof File) {
        formData.append(key, data[key]);
      } else if (data[key] !== undefined && data[key] !== null) {
        formData.append(key, String(data[key]));
      }
    });
    return formData;
  }
}

class AdminProductsService {
  private httpClient: HttpClient;

  constructor() {
    this.httpClient = HttpClient.getInstance();
  }

  /**
   * Get all products
   */
  async getProducts(page: number = 1, perPage: number = 15): Promise<PaginatedResponse<Product>> {
    return this.httpClient.get<PaginatedResponse<Product>>(
      `${ADMIN_ENDPOINTS.PRODUCTS.LIST}?page=${page}&per_page=${perPage}`
    );
  }

  /**
   * Create new product
   */
  async createProduct(data: CreateProductRequest): Promise<ApiResponse<Product>> {
    const formData = this.buildFormData(data);
    return this.httpClient.upload<ApiResponse<Product>>(
      ADMIN_ENDPOINTS.PRODUCTS.CREATE,
      formData
    );
  }

  /**
   * Get single product
   */
  async getProduct(id: number): Promise<ApiResponse<Product>> {
    return this.httpClient.get<ApiResponse<Product>>(ADMIN_ENDPOINTS.PRODUCTS.DETAIL(id));
  }

  /**
   * Update product
   */
  async updateProduct(id: number, data: UpdateProductRequest): Promise<ApiResponse<Product>> {
    const formData = this.buildFormData(data);
    return this.httpClient.upload<ApiResponse<Product>>(
      ADMIN_ENDPOINTS.PRODUCTS.UPDATE(id),
      formData
    );
  }

  /**
   * Delete product
   */
  async deleteProduct(id: number): Promise<ApiResponse<void>> {
    return this.httpClient.delete<ApiResponse<void>>(ADMIN_ENDPOINTS.PRODUCTS.DELETE(id));
  }

  /**
   * Toggle product active status
   */
  async toggleProduct(id: number): Promise<ApiResponse<Product>> {
    return this.httpClient.patch<ApiResponse<Product>>(ADMIN_ENDPOINTS.PRODUCTS.TOGGLE(id));
  }

  private buildFormData(data: any): FormData {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (data[key] instanceof File) {
        formData.append(key, data[key]);
      } else if (Array.isArray(data[key])) {
        data[key].forEach((item: any, index: number) => {
          if (item instanceof File) {
            formData.append(`${key}[${index}]`, item);
          } else {
            formData.append(`${key}[${index}]`, String(item));
          }
        });
      } else if (data[key] !== undefined && data[key] !== null) {
        formData.append(key, String(data[key]));
      }
    });
    return formData;
  }
}

class AdminProjectsService {
  private httpClient: HttpClient;

  constructor() {
    this.httpClient = HttpClient.getInstance();
  }

  /**
   * Get all projects
   */
  async getProjects(page: number = 1, perPage: number = 15): Promise<PaginatedResponse<Project>> {
    return this.httpClient.get<PaginatedResponse<Project>>(
      `${ADMIN_ENDPOINTS.PROJECTS.LIST}?page=${page}&per_page=${perPage}`
    );
  }

  /**
   * Create new project
   */
  async createProject(data: CreateProjectRequest): Promise<ApiResponse<Project>> {
    const formData = this.buildFormData(data);
    return this.httpClient.upload<ApiResponse<Project>>(
      ADMIN_ENDPOINTS.PROJECTS.CREATE,
      formData
    );
  }

  /**
   * Get single project
   */
  async getProject(id: number): Promise<ApiResponse<Project>> {
    return this.httpClient.get<ApiResponse<Project>>(ADMIN_ENDPOINTS.PROJECTS.DETAIL(id));
  }

  /**
   * Update project
   */
  async updateProject(id: number, data: UpdateProjectRequest): Promise<ApiResponse<Project>> {
    const formData = this.buildFormData(data);
    return this.httpClient.upload<ApiResponse<Project>>(
      ADMIN_ENDPOINTS.PROJECTS.UPDATE(id),
      formData
    );
  }

  /**
   * Delete project
   */
  async deleteProject(id: number): Promise<ApiResponse<void>> {
    return this.httpClient.delete<ApiResponse<void>>(ADMIN_ENDPOINTS.PROJECTS.DELETE(id));
  }

  private buildFormData(data: any): FormData {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (data[key] instanceof File) {
        formData.append(key, data[key]);
      } else if (Array.isArray(data[key])) {
        data[key].forEach((item: any, index: number) => {
          if (item instanceof File) {
            formData.append(`${key}[${index}]`, item);
          } else {
            formData.append(`${key}[${index}]`, String(item));
          }
        });
      } else if (data[key] !== undefined && data[key] !== null) {
        formData.append(key, String(data[key]));
      }
    });
    return formData;
  }
}

class AdminOffersService {
  private httpClient: HttpClient;

  constructor() {
    this.httpClient = HttpClient.getInstance();
  }

  /**
   * Get all offers
   */
  async getOffers(page: number = 1, perPage: number = 15): Promise<PaginatedResponse<Offer>> {
    return this.httpClient.get<PaginatedResponse<Offer>>(
      `${ADMIN_ENDPOINTS.OFFERS.LIST}?page=${page}&per_page=${perPage}`
    );
  }

  /**
   * Create new offer
   */
  async createOffer(data: CreateOfferRequest): Promise<ApiResponse<Offer>> {
    const formData = this.buildFormData(data);
    return this.httpClient.upload<ApiResponse<Offer>>(ADMIN_ENDPOINTS.OFFERS.CREATE, formData);
  }

  /**
   * Get single offer
   */
  async getOffer(id: number): Promise<ApiResponse<Offer>> {
    return this.httpClient.get<ApiResponse<Offer>>(ADMIN_ENDPOINTS.OFFERS.DETAIL(id));
  }

  /**
   * Update offer
   */
  async updateOffer(id: number, data: UpdateOfferRequest): Promise<ApiResponse<Offer>> {
    const formData = this.buildFormData(data);
    return this.httpClient.upload<ApiResponse<Offer>>(ADMIN_ENDPOINTS.OFFERS.UPDATE(id), formData);
  }

  /**
   * Delete offer
   */
  async deleteOffer(id: number): Promise<ApiResponse<void>> {
    return this.httpClient.delete<ApiResponse<void>>(ADMIN_ENDPOINTS.OFFERS.DELETE(id));
  }

  private buildFormData(data: any): FormData {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (data[key] instanceof File) {
        formData.append(key, data[key]);
      } else if (data[key] !== undefined && data[key] !== null) {
        formData.append(key, String(data[key]));
      }
    });
    return formData;
  }
}

class AdminContactsService {
  private httpClient: HttpClient;

  constructor() {
    this.httpClient = HttpClient.getInstance();
  }

  /**
   * Get all contact inquiries
   */
  async getContacts(
    status?: string,
    page: number = 1,
    perPage: number = 15
  ): Promise<PaginatedResponse<Contact>> {
    const query = status ? `?status=${status}&page=${page}&per_page=${perPage}` : `?page=${page}&per_page=${perPage}`;
    return this.httpClient.get<PaginatedResponse<Contact>>(ADMIN_ENDPOINTS.CONTACTS.LIST + query);
  }

  /**
   * Get single contact
   */
  async getContact(id: number): Promise<ApiResponse<Contact>> {
    return this.httpClient.get<ApiResponse<Contact>>(ADMIN_ENDPOINTS.CONTACTS.DETAIL(id));
  }

  /**
   * Update contact
   */
  async updateContact(
    id: number,
    data: { status: string; admin_notes?: string; assigned_to?: number }
  ): Promise<ApiResponse<Contact>> {
    return this.httpClient.put<ApiResponse<Contact>>(
      ADMIN_ENDPOINTS.CONTACTS.UPDATE(id),
      data
    );
  }

  /**
   * Delete contact
   */
  async deleteContact(id: number): Promise<ApiResponse<void>> {
    return this.httpClient.delete<ApiResponse<void>>(ADMIN_ENDPOINTS.CONTACTS.DELETE(id));
  }
}

class AdminStudioBookingsService {
  private httpClient: HttpClient;

  constructor() {
    this.httpClient = HttpClient.getInstance();
  }

  /**
   * Get all studio bookings
   */
  async getBookings(
    status?: string,
    page: number = 1,
    perPage: number = 15
  ): Promise<PaginatedResponse<StudioBooking>> {
    const query = status
      ? `?status=${status}&page=${page}&per_page=${perPage}`
      : `?page=${page}&per_page=${perPage}`;
    return this.httpClient.get<PaginatedResponse<StudioBooking>>(
      ADMIN_ENDPOINTS.STUDIO_BOOKINGS.LIST + query
    );
  }

  /**
   * Get single booking
   */
  async getBooking(id: number): Promise<ApiResponse<StudioBooking>> {
    return this.httpClient.get<ApiResponse<StudioBooking>>(
      ADMIN_ENDPOINTS.STUDIO_BOOKINGS.DETAIL(id)
    );
  }

  /**
   * Update booking
   */
  async updateBooking(
    id: number,
    data: { status: string; admin_notes?: string; assigned_to?: number }
  ): Promise<ApiResponse<StudioBooking>> {
    return this.httpClient.put<ApiResponse<StudioBooking>>(
      ADMIN_ENDPOINTS.STUDIO_BOOKINGS.UPDATE(id),
      data
    );
  }

  /**
   * Confirm booking
   */
  async confirmBooking(id: number): Promise<ApiResponse<StudioBooking>> {
    return this.httpClient.patch<ApiResponse<StudioBooking>>(
      ADMIN_ENDPOINTS.STUDIO_BOOKINGS.CONFIRM(id)
    );
  }

  /**
   * Cancel booking
   */
  async cancelBooking(id: number): Promise<ApiResponse<StudioBooking>> {
    return this.httpClient.patch<ApiResponse<StudioBooking>>(
      ADMIN_ENDPOINTS.STUDIO_BOOKINGS.CANCEL(id)
    );
  }

  /**
   * Delete booking
   */
  async deleteBooking(id: number): Promise<ApiResponse<void>> {
    return this.httpClient.delete<ApiResponse<void>>(
      ADMIN_ENDPOINTS.STUDIO_BOOKINGS.DELETE(id)
    );
  }
}

class AdminProductInquiriesService {
  private httpClient: HttpClient;

  constructor() {
    this.httpClient = HttpClient.getInstance();
  }

  /**
   * Get all product inquiries
   */
  async getInquiries(
    status?: string,
    page: number = 1,
    perPage: number = 15
  ): Promise<PaginatedResponse<ProductInquiry>> {
    const query = status
      ? `?status=${status}&page=${page}&per_page=${perPage}`
      : `?page=${page}&per_page=${perPage}`;
    return this.httpClient.get<PaginatedResponse<ProductInquiry>>(
      ADMIN_ENDPOINTS.PRODUCT_INQUIRIES.LIST + query
    );
  }

  /**
   * Get single inquiry
   */
  async getInquiry(id: number): Promise<ApiResponse<ProductInquiry>> {
    return this.httpClient.get<ApiResponse<ProductInquiry>>(
      ADMIN_ENDPOINTS.PRODUCT_INQUIRIES.DETAIL(id)
    );
  }

  /**
   * Update inquiry
   */
  async updateInquiry(
    id: number,
    data: { status: string; admin_notes?: string }
  ): Promise<ApiResponse<ProductInquiry>> {
    return this.httpClient.put<ApiResponse<ProductInquiry>>(
      ADMIN_ENDPOINTS.PRODUCT_INQUIRIES.UPDATE(id),
      data
    );
  }

  /**
   * Delete inquiry
   */
  async deleteInquiry(id: number): Promise<ApiResponse<void>> {
    return this.httpClient.delete<ApiResponse<void>>(
      ADMIN_ENDPOINTS.PRODUCT_INQUIRIES.DELETE(id)
    );
  }
}

class AdminSettingsService {
  private httpClient: HttpClient;

  constructor() {
    this.httpClient = HttpClient.getInstance();
  }

  /**
   * Get all settings
   */
  async getSettings(): Promise<PaginatedResponse<Setting>> {
    return this.httpClient.get<PaginatedResponse<Setting>>(ADMIN_ENDPOINTS.SETTINGS.LIST);
  }

  /**
   * Get settings by group
   */
  async getSettingsByGroup(group: string): Promise<PaginatedResponse<Setting>> {
    return this.httpClient.get<PaginatedResponse<Setting>>(
      ADMIN_ENDPOINTS.SETTINGS.BY_GROUP(group)
    );
  }

  /**
   * Update setting
   */
  async updateSetting(id: number, value: any): Promise<ApiResponse<Setting>> {
    return this.httpClient.put<ApiResponse<Setting>>(ADMIN_ENDPOINTS.SETTINGS.UPDATE(id), {
      value,
    });
  }

  /**
   * Batch update settings
   */
  async batchUpdateSettings(settings: Record<string, any>): Promise<ApiResponse<Setting[]>> {
    return this.httpClient.post<ApiResponse<Setting[]>>(
      ADMIN_ENDPOINTS.SETTINGS.BATCH_UPDATE,
      { settings }
    );
  }

  /**
   * Get design system
   */
  async getDesignSystem(): Promise<ApiResponse<DesignSystemSettings>> {
    return this.httpClient.get<ApiResponse<DesignSystemSettings>>(
      ADMIN_ENDPOINTS.SETTINGS.DESIGN_SYSTEM.GET
    );
  }

  /**
   * Update design system
   */
  async updateDesignSystem(data: Partial<DesignSystemSettings>): Promise<ApiResponse<DesignSystemSettings>> {
    return this.httpClient.put<ApiResponse<DesignSystemSettings>>(
      ADMIN_ENDPOINTS.SETTINGS.DESIGN_SYSTEM.UPDATE,
      data
    );
  }
}

class AdminMediaService {
  private httpClient: HttpClient;

  constructor() {
    this.httpClient = HttpClient.getInstance();
  }

  /**
   * Get all media files
   */
  async getMedia(
    type?: string,
    page: number = 1,
    perPage: number = 15
  ): Promise<PaginatedResponse<MediaFile>> {
    const query = type
      ? `?type=${type}&page=${page}&per_page=${perPage}`
      : `?page=${page}&per_page=${perPage}`;
    return this.httpClient.get<PaginatedResponse<MediaFile>>(ADMIN_ENDPOINTS.MEDIA.LIST + query);
  }

  /**
   * Upload single file
   */
  async uploadFile(file: File, disk?: string): Promise<ApiResponse<MediaFile>> {
    const formData = new FormData();
    formData.append('file', file);
    if (disk) {
      formData.append('disk', disk);
    }
    return this.httpClient.upload<ApiResponse<MediaFile>>(ADMIN_ENDPOINTS.MEDIA.UPLOAD, formData);
  }

  /**
   * Upload multiple files
   */
  async uploadFiles(files: File[], disk?: string): Promise<ApiResponse<MediaFile[]>> {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files[]', file);
    });
    if (disk) {
      formData.append('disk', disk);
    }
    return this.httpClient.upload<ApiResponse<MediaFile[]>>(
      ADMIN_ENDPOINTS.MEDIA.BULK_UPLOAD,
      formData
    );
  }

  /**
   * Get single media file
   */
  async getMediaFile(id: number): Promise<ApiResponse<MediaFile>> {
    return this.httpClient.get<ApiResponse<MediaFile>>(ADMIN_ENDPOINTS.MEDIA.DETAIL(id));
  }

  /**
   * Delete media file
   */
  async deleteMediaFile(id: number): Promise<ApiResponse<void>> {
    return this.httpClient.delete<ApiResponse<void>>(ADMIN_ENDPOINTS.MEDIA.DELETE(id));
  }
}

// Export service instances
export const adminPagesService = new AdminPagesService();
export const adminServicesService = new AdminServicesService();
export const adminPostsService = new AdminPostsService();
export const adminCategoriesService = new AdminCategoriesService();
export const adminProductsService = new AdminProductsService();
export const adminProjectsService = new AdminProjectsService();
export const adminOffersService = new AdminOffersService();
export const adminContactsService = new AdminContactsService();
export const adminStudioBookingsService = new AdminStudioBookingsService();
export const adminProductInquiriesService = new AdminProductInquiriesService();
export const adminSettingsService = new AdminSettingsService();
export const adminMediaService = new AdminMediaService();
