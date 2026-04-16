/**
 * Authentication Service
 * Handles admin authentication and token management
 */

import { HttpClient } from '../client';
import { API_CONFIG } from '../config';
import { ADMIN_ENDPOINTS } from '../endpoints';
import type { LoginRequest, LoginResponse, AdminUser, ApiResponse } from '../../types/api';

class AuthService {
  private static instance: AuthService;
  private httpClient: HttpClient;

  private constructor() {
    this.httpClient = HttpClient.getInstance();
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  /**
   * Admin login
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await this.httpClient.post<ApiResponse<LoginResponse>>(
      ADMIN_ENDPOINTS.AUTH.LOGIN,
      credentials
    );

    if (response.data) {
      this.setToken(response.data.token);
      this.setUser(response.data.admin);
    }

    return response.data || response as unknown as LoginResponse;
  }

  /**
   * Admin logout
   */
  async logout(): Promise<void> {
    try {
      await this.httpClient.post(ADMIN_ENDPOINTS.AUTH.LOGOUT);
    } finally {
      this.clearAuth();
    }
  }

  /**
   * Get current authenticated user
   */
  async getCurrentUser(): Promise<AdminUser> {
    const response = await this.httpClient.get<ApiResponse<AdminUser>>(
      ADMIN_ENDPOINTS.AUTH.ME
    );
    return response.data || (response as unknown as AdminUser);
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  /**
   * Get stored token
   */
  getToken(): string | null {
    return localStorage.getItem(API_CONFIG.storageKeys.token);
  }

  /**
   * Set token in storage
   */
  private setToken(token: string): void {
    localStorage.setItem(API_CONFIG.storageKeys.token, token);
  }

  /**
   * Get stored user
   */
  getUser(): AdminUser | null {
    const user = localStorage.getItem(API_CONFIG.storageKeys.adminUser);
    return user ? JSON.parse(user) : null;
  }

  /**
   * Set user in storage
   */
  private setUser(user: AdminUser): void {
    localStorage.setItem(API_CONFIG.storageKeys.adminUser, JSON.stringify(user));
  }

  /**
   * Clear all auth data
   */
  clearAuth(): void {
    localStorage.removeItem(API_CONFIG.storageKeys.token);
    localStorage.removeItem(API_CONFIG.storageKeys.adminUser);
  }

  /**
   * Refresh user data
   */
  async refreshUser(): Promise<AdminUser | null> {
    try {
      const user = await this.getCurrentUser();
      this.setUser(user);
      return user;
    } catch (error) {
      this.clearAuth();
      return null;
    }
  }
}

export default AuthService.getInstance();
