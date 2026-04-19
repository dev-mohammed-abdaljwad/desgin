/**
 * Public API Hooks
 * React hooks for consuming public API endpoints
 */

import { useCallback } from 'react';
import { pagesService, servicesService, postsService, productsService, projectsService, testimonialsService, whyChooseUsService, settingsService, pricingsService } from '../api/services/public';
import { usePaginatedApi, useApi, useLazyApi } from './useApi';
import type { Page, Service, Post, Product, Project, Testimonial, WhyChooseUs, DesignSystemSettings, Pricing } from '../types/api';

// ============= Pages Hooks =============

export function usePages(page: number = 1, perPage: number = 15) {
  return usePaginatedApi(
    (p, pp) => pagesService.getPages(p, pp),
    page,
    perPage,
    []
  );
}

export function usePageBySlug(slug: string) {
  return useApi(
    () => pagesService.getPageBySlug(slug),
    [slug]
  );
}

// ============= Services Hooks =============

export function useServices(page: number = 1, perPage: number = 15) {
  return usePaginatedApi(
    (p, pp) => servicesService.getServices(p, pp),
    page,
    perPage,
    []
  );
}

export function useServicesByCategory(category: string, perPage: number = 15) {
  return useApi(
    () => servicesService.getServicesByCategory(category, perPage),
    [category, perPage]
  );
}

export function useService(id: number) {
  return useApi(
    () => servicesService.getService(id),
    [id]
  );
}

// ============= Posts Hooks =============

export function usePosts(page: number = 1, perPage: number = 15) {
  return usePaginatedApi(
    (p, pp) => postsService.getPosts(p, pp),
    page,
    perPage,
    []
  );
}

export function usePostsByType(type: string, perPage: number = 15) {
  return useApi(
    () => postsService.getPostsByType(type, perPage),
    [type, perPage]
  );
}

export function usePostsByCategory(categoryId: number, perPage: number = 15) {
  return useApi(
    () => postsService.getPostsByCategory(categoryId, perPage),
    [categoryId, perPage]
  );
}

export function usePostBySlug(slug: string) {
  return useApi(
    () => postsService.getPostBySlug(slug),
    [slug]
  );
}

export function useFeaturedPosts() {
  return useApi(
    () => postsService.getFeaturedPosts(),
    []
  );
}

export function useSearchPosts(query: string, perPage: number = 15) {
  // Only search if query is not empty to avoid 400 Bad Request from API
  const trimmedQuery = query.trim();
  return useApi(
    trimmedQuery ? () => postsService.searchPosts(trimmedQuery, perPage) : async () => ({ data: [] }),
    [trimmedQuery, perPage]
  );
}

// ============= Products Hooks =============

export function useProducts(page: number = 1, perPage: number = 15) {
  return usePaginatedApi(
    (p, pp) => productsService.getProducts(p, pp),
    page,
    perPage,
    []
  );
}

export function useProduct(id: number) {
  return useApi(
    () => productsService.getProduct(id),
    [id]
  );
}

export function useProductsByType(type: string, perPage: number = 15) {
  return useApi(
    () => productsService.getProductsByType(type, perPage),
    [type, perPage]
  );
}

export function useFeaturedProducts() {
  return useApi(
    () => productsService.getFeaturedProducts(),
    []
  );
}

export function useDiscountedProducts() {
  return useApi(
    () => productsService.getDiscountedProducts(),
    []
  );
}

// ============= Projects Hooks =============

export function useProjects(page: number = 1, perPage: number = 15) {
  return usePaginatedApi(
    (p, pp) => projectsService.getProjects(pp, p),
    page,
    perPage,
    []
  );
}

export function useProject(id: number) {
  return useApi(
    () => projectsService.getProject(id),
    [id]
  );
}

export function useProjectsByCategory(category: string) {
  return useApi(
    () => projectsService.getProjectsByCategory(category),
    [category]
  );
}

export function useFeaturedProjects() {
  return useApi(
    () => projectsService.getFeaturedProjects(),
    []
  );
}

export function useSearchProjects(query: string) {
  return useApi(
    () => projectsService.searchProjects(query),
    [query]
  );
}

// ============= Testimonials Hooks =============

export function useTestimonials(page: number = 1, perPage: number = 15) {
  return usePaginatedApi(
    (p, pp) => testimonialsService.getTestimonials(p, pp),
    page,
    perPage,
    []
  );
}

export function useFeaturedTestimonials(limit: number = 6) {
  return useApi(
    () => testimonialsService.getFeaturedTestimonials(limit),
    [limit]
  );
}

export function useTestimonial(id: number) {
  return useApi(
    () => testimonialsService.getTestimonial(id),
    [id]
  );
}

// ============= Why Choose Us Hooks =============

export function useWhyChooseUs(page: number = 1, perPage: number = 15) {
  return usePaginatedApi(
    (p, pp) => whyChooseUsService.getWhyChooseUs(p, pp),
    page,
    perPage,
    []
  );
}

export function useWhyChooseUsItem(id: number) {
  return useApi(
    () => whyChooseUsService.getWhyChooseUsItem(id),
    [id]
  );
}

// ============= Settings Hooks =============

export function useDesignSystem() {
  return useApi(
    () => settingsService.getDesignSystem(),
    []
  );
}

export function useSetting(key: string) {
  return useApi(
    () => settingsService.getSetting(key),
    [key]
  );
}

// ============= Pricing Packages Hooks =============

export function usePricings(page: number = 1, perPage: number = 15) {
  return usePaginatedApi(
    (p, pp) => pricingsService.getPricings(p, pp),
    page,
    perPage,
    []
  );
}

export function useAllPricings() {
  return useApi(
    () => pricingsService.getAllPricings(),
    []
  );
}

export function usePricing(id: number) {
  return useApi(
    () => pricingsService.getPricing(id),
    [id]
  );
}

export function useHighlightedPricings() {
  return useApi(
    () => pricingsService.getHighlightedPricings(),
    []
  );
}

// ============= Lazy Hooks (for manual triggering) =============

export function useLazyPageBySlug() {
  return useLazyApi(async () => {
    // This is just a template, the actual call will be made by the caller
    return null;
  });
}

export function useLazySearchPosts() {
  const [execute, state] = useLazyApi(() => Promise.resolve(null));

  const search = useCallback(
    async (query: string, perPage?: number) => {
      return postsService.searchPosts(query, perPage || 15);
    },
    []
  );

  return [search, state] as const;
}

export function useLazySearchProjects() {
  const [execute, state] = useLazyApi(() => Promise.resolve(null));

  const search = useCallback(
    async (query: string) => {
      return projectsService.searchProjects(query);
    },
    []
  );

  return [search, state] as const;
}

// ============= Company Values Hook =============

export function useCompanyValues() {
  const { data: page, loading, error } = usePageBySlug('company-values');
  
  // Default values fallback
  const defaultValues = [
    {
      icon: 'Target',
      title_en: 'Excellence',
      title_ar: 'التميز',
      description_en: 'We strive for excellence in every project, delivering quality that exceeds expectations.',
      description_ar: 'نسعى للتميز في كل مشروع، ونقدم جودة تفوق التوقعات.',
      gradient: 'from-primary to-accent',
    },
    {
      icon: 'Heart',
      title_en: 'Passion',
      title_ar: 'الشغف',
      description_en: 'We are passionate about what we do, bringing creativity and dedication to every task.',
      description_ar: 'نحن شغوفون بما نقوم به، ونجلب الإبداع والتفاني لكل مهمة.',
      gradient: 'from-accent to-secondary',
    },
    {
      icon: 'Rocket',
      title_en: 'Innovation',
      title_ar: 'الابتكار',
      description_en: 'We embrace innovation and constantly seek new ways to deliver better solutions.',
      description_ar: 'نحتضن الابتكار ونبحث باستمرار عن طرق جديدة لتقديم حلول أفضل.',
      gradient: 'from-secondary to-gold',
    },
    {
      icon: 'Shield',
      title_en: 'Trust',
      title_ar: 'الثقة',
      description_en: 'We build lasting relationships based on trust, transparency, and reliability.',
      description_ar: 'نبني علاقات دائمة على أساس الثقة والشفافية والموثوقية.',
      gradient: 'from-gold to-primary',
    },
  ];

  // Try to get values from page metadata, fallback to defaults
  const values = page?.metadata?.values || defaultValues;

  return { data: values, loading, error };
}
