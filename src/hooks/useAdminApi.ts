/**
 * Admin API Hooks
 * React hooks for admin endpoints (requires authentication)
 */

import { useCallback } from 'react';
import {
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
} from '../api/services/admin';
import { useMutation, usePaginatedApi, useApi } from './useApi';
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
} from '../types/api';

// ============= Pages Management =============

export function useAdminPages(page: number = 1, perPage: number = 15) {
  return usePaginatedApi(
    (p, pp) => adminPagesService.getPages(p, pp),
    page,
    perPage,
    []
  );
}

export function useAdminPage(id: number) {
  return useApi(
    () => adminPagesService.getPage(id),
    [id]
  );
}

export function useCreatePage() {
  return useMutation<CreatePageRequest, Page>((data) => adminPagesService.createPage(data));
}

export function useUpdatePage(id: number) {
  return useMutation<UpdatePageRequest, Page>((data) => adminPagesService.updatePage(id, data));
}

export function useDeletePage() {
  return useMutation<number, void>((id) => adminPagesService.deletePage(id));
}

// ============= Services Management =============

export function useAdminServices(page: number = 1, perPage: number = 15) {
  return usePaginatedApi(
    (p, pp) => adminServicesService.getServices(p, pp),
    page,
    perPage,
    []
  );
}

export function useAdminService(id: number) {
  return useApi(
    () => adminServicesService.getService(id),
    [id]
  );
}

export function useCreateService() {
  return useMutation<CreateServiceRequest, Service>((data) => adminServicesService.createService(data));
}

export function useUpdateService(id: number) {
  return useMutation<UpdateServiceRequest, Service>((data) =>
    adminServicesService.updateService(id, data)
  );
}

export function useDeleteService() {
  return useMutation<number, void>((id) => adminServicesService.deleteService(id));
}

export function useToggleService() {
  return useMutation<number, Service>((id) => adminServicesService.toggleService(id));
}

// ============= Posts Management =============

export function useAdminPosts(page: number = 1, perPage: number = 15) {
  return usePaginatedApi(
    (p, pp) => adminPostsService.getPosts(p, pp),
    page,
    perPage,
    []
  );
}

export function useAdminPost(id: number) {
  return useApi(
    () => adminPostsService.getPost(id),
    [id]
  );
}

export function useCreatePost() {
  return useMutation<CreatePostRequest, Post>((data) => adminPostsService.createPost(data));
}

export function useUpdatePost(id: number) {
  return useMutation<UpdatePostRequest, Post>((data) => adminPostsService.updatePost(id, data));
}

export function useDeletePost() {
  return useMutation<number, void>((id) => adminPostsService.deletePost(id));
}

// ============= Categories Management =============

export function useAdminCategories(page: number = 1, perPage: number = 15) {
  return usePaginatedApi(
    (p, pp) => adminCategoriesService.getCategories(p, pp),
    page,
    perPage,
    []
  );
}

export function useAdminCategory(id: number) {
  return useApi(
    () => adminCategoriesService.getCategory(id),
    [id]
  );
}

export function useCreateCategory() {
  return useMutation<CreateCategoryRequest, Category>((data) =>
    adminCategoriesService.createCategory(data)
  );
}

export function useUpdateCategory(id: number) {
  return useMutation<UpdateCategoryRequest, Category>((data) =>
    adminCategoriesService.updateCategory(id, data)
  );
}

export function useDeleteCategory() {
  return useMutation<number, void>((id) => adminCategoriesService.deleteCategory(id));
}

// ============= Products Management =============

export function useAdminProducts(page: number = 1, perPage: number = 15) {
  return usePaginatedApi(
    (p, pp) => adminProductsService.getProducts(p, pp),
    page,
    perPage,
    []
  );
}

export function useAdminProduct(id: number) {
  return useApi(
    () => adminProductsService.getProduct(id),
    [id]
  );
}

export function useCreateProduct() {
  return useMutation<CreateProductRequest, Product>((data) =>
    adminProductsService.createProduct(data)
  );
}

export function useUpdateProduct(id: number) {
  return useMutation<UpdateProductRequest, Product>((data) =>
    adminProductsService.updateProduct(id, data)
  );
}

export function useDeleteProduct() {
  return useMutation<number, void>((id) => adminProductsService.deleteProduct(id));
}

export function useToggleProduct() {
  return useMutation<number, Product>((id) => adminProductsService.toggleProduct(id));
}

// ============= Projects Management =============

export function useAdminProjects(page: number = 1, perPage: number = 15) {
  return usePaginatedApi(
    (p, pp) => adminProjectsService.getProjects(p, pp),
    page,
    perPage,
    []
  );
}

export function useAdminProject(id: number) {
  return useApi(
    () => adminProjectsService.getProject(id),
    [id]
  );
}

export function useCreateProject() {
  return useMutation<CreateProjectRequest, Project>((data) =>
    adminProjectsService.createProject(data)
  );
}

export function useUpdateProject(id: number) {
  return useMutation<UpdateProjectRequest, Project>((data) =>
    adminProjectsService.updateProject(id, data)
  );
}

export function useDeleteProject() {
  return useMutation<number, void>((id) => adminProjectsService.deleteProject(id));
}

// ============= Offers Management =============

export function useAdminOffers(page: number = 1, perPage: number = 15) {
  return usePaginatedApi(
    (p, pp) => adminOffersService.getOffers(p, pp),
    page,
    perPage,
    []
  );
}

export function useAdminOffer(id: number) {
  return useApi(
    () => adminOffersService.getOffer(id),
    [id]
  );
}

export function useCreateOffer() {
  return useMutation<CreateOfferRequest, Offer>((data) => adminOffersService.createOffer(data));
}

export function useUpdateOffer(id: number) {
  return useMutation<UpdateOfferRequest, Offer>((data) => adminOffersService.updateOffer(id, data));
}

export function useDeleteOffer() {
  return useMutation<number, void>((id) => adminOffersService.deleteOffer(id));
}

// ============= Contacts Management =============

export function useAdminContacts(status?: string, page: number = 1, perPage: number = 15) {
  return usePaginatedApi(
    (p, pp) => adminContactsService.getContacts(status, p, pp),
    page,
    perPage,
    [status]
  );
}

export function useAdminContact(id: number) {
  return useApi(
    () => adminContactsService.getContact(id),
    [id]
  );
}

export function useUpdateContact(id: number) {
  return useMutation<{ status: string; admin_notes?: string; assigned_to?: number }, Contact>(
    (data) => adminContactsService.updateContact(id, data)
  );
}

export function useDeleteContact() {
  return useMutation<number, void>((id) => adminContactsService.deleteContact(id));
}

// ============= Studio Bookings Management =============

export function useAdminStudioBookings(status?: string, page: number = 1, perPage: number = 15) {
  return usePaginatedApi(
    (p, pp) => adminStudioBookingsService.getBookings(status, p, pp),
    page,
    perPage,
    [status]
  );
}

export function useAdminStudioBooking(id: number) {
  return useApi(
    () => adminStudioBookingsService.getBooking(id),
    [id]
  );
}

export function useUpdateStudioBooking(id: number) {
  return useMutation<{ status: string; admin_notes?: string; assigned_to?: number }, StudioBooking>(
    (data) => adminStudioBookingsService.updateBooking(id, data)
  );
}

export function useConfirmStudioBooking() {
  return useMutation<number, StudioBooking>((id) => adminStudioBookingsService.confirmBooking(id));
}

export function useCancelStudioBooking() {
  return useMutation<number, StudioBooking>((id) => adminStudioBookingsService.cancelBooking(id));
}

export function useDeleteStudioBooking() {
  return useMutation<number, void>((id) => adminStudioBookingsService.deleteBooking(id));
}

// ============= Product Inquiries Management =============

export function useAdminProductInquiries(status?: string, page: number = 1, perPage: number = 15) {
  return usePaginatedApi(
    (p, pp) => adminProductInquiriesService.getInquiries(status, p, pp),
    page,
    perPage,
    [status]
  );
}

export function useAdminProductInquiry(id: number) {
  return useApi(
    () => adminProductInquiriesService.getInquiry(id),
    [id]
  );
}

export function useUpdateProductInquiry(id: number) {
  return useMutation<{ status: string; admin_notes?: string }, ProductInquiry>((data) =>
    adminProductInquiriesService.updateInquiry(id, data)
  );
}

export function useDeleteProductInquiry() {
  return useMutation<number, void>((id) => adminProductInquiriesService.deleteInquiry(id));
}

// ============= Settings Management =============

export function useAdminSettings() {
  return useApi(
    () => adminSettingsService.getSettings(),
    []
  );
}

export function useAdminSettingsByGroup(group: string) {
  return useApi(
    () => adminSettingsService.getSettingsByGroup(group),
    [group]
  );
}

export function useUpdateSetting(id: number) {
  return useMutation<any, Setting>((value) => adminSettingsService.updateSetting(id, value));
}

export function useBatchUpdateSettings() {
  return useMutation<Record<string, any>, Setting[]>((settings) =>
    adminSettingsService.batchUpdateSettings(settings)
  );
}

export function useAdminDesignSystem() {
  return useApi(
    () => adminSettingsService.getDesignSystem(),
    []
  );
}

export function useUpdateDesignSystem() {
  return useMutation<Partial<DesignSystemSettings>, DesignSystemSettings>((data) =>
    adminSettingsService.updateDesignSystem(data)
  );
}

// ============= Media Management =============

export function useAdminMedia(type?: string, page: number = 1, perPage: number = 15) {
  return usePaginatedApi(
    (p, pp) => adminMediaService.getMedia(type, p, pp),
    page,
    perPage,
    [type]
  );
}

export function useUploadFile() {
  return useMutation<{ file: File; disk?: string }, MediaFile>(({ file, disk }) =>
    adminMediaService.uploadFile(file, disk)
  );
}

export function useUploadFiles() {
  return useMutation<{ files: File[]; disk?: string }, MediaFile[]>(({ files, disk }) =>
    adminMediaService.uploadFiles(files, disk)
  );
}

export function useAdminMediaFile(id: number) {
  return useApi(
    () => adminMediaService.getMediaFile(id),
    [id]
  );
}

export function useDeleteMediaFile() {
  return useMutation<number, void>((id) => adminMediaService.deleteMediaFile(id));
}
