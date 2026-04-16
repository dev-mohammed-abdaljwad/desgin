/**
 * API Services Index
 * Centralized exports for all API services
 */

// Authentication
export { default as authService } from './auth';

// Public Services
export {
  pagesService,
  servicesService,
  postsService,
  productsService,
  projectsService,
  settingsService,
} from './public';

// Public Forms
export { formsService } from './forms';

// Admin Services
export {
  adminPagesService,
  adminServicesService,
  adminPostsService,
  adminCategoriesService,
  adminProductsService,
  adminProjectsService,
  adminOffersService,
  adminContactsService,
  adminStudioBookingsService,
  adminProductInquiriesService,
  adminSettingsService,
  adminMediaService,
} from './admin';
