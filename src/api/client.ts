/**
 * HTTP Client
 * Centralized HTTP client for making API requests with error handling
 */

import { API_CONFIG, getApiUrl, getAuthHeader } from './config';
import type { ApiError, ApiResponse } from '../types/api';

export class HttpClient {
  private static instance: HttpClient;

  private constructor() {}

  static getInstance(): HttpClient {
    if (!HttpClient.instance) {
      HttpClient.instance = new HttpClient();
    }
    return HttpClient.instance;
  }

  /**
   * Make a GET request
   */
  async get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'GET',
    });
  }

  /**
   * Make a POST request
   */
  async post<T>(endpoint: string, body?: any, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  /**
   * Make a PUT request
   */
  async put<T>(endpoint: string, body?: any, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  /**
   * Make a PATCH request
   */
  async patch<T>(endpoint: string, body?: any, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  /**
   * Make a DELETE request
   */
  async delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'DELETE',
    });
  }

  /**
   * Upload files (multipart/form-data)
   */
  async upload<T>(endpoint: string, formData: FormData, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: formData,
      headers: {
        Authorization: getAuthHeader().Authorization || '',
      },
    });
  }

  /**
   * Core request method with error handling
   */
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = getApiUrl(endpoint);
    const defaultHeaders = getAuthHeader();

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.requestTimeout);

      const response = await fetch(url, {
        ...config,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Parse response
      let data;
      const contentType = response.headers.get('content-type');

      if (contentType?.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      // Handle errors
      if (!response.ok) {
        this.handleErrorResponse(response.status, data);
      }

      return data as T;
    } catch (error) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new ApiClientError(
          'Network error. Please check your connection.',
          'NETWORK_ERROR'
        );
      }

      if (error instanceof DOMException && error.name === 'AbortError') {
        throw new ApiClientError('Request timeout', 'TIMEOUT_ERROR');
      }

      throw error;
    }
  }

  /**
   * Handle error responses based on status code
   */
  private handleErrorResponse(status: number, data: any): never {
    const message = data?.message || 'An error occurred';
    const errors = data?.errors;

    switch (status) {
      case 400:
        throw new ApiClientError(message, 'BAD_REQUEST', errors);
      case 401:
        // Clear auth data on 401
        this.clearAuth();
        throw new ApiClientError(message || 'Unauthorized', 'UNAUTHORIZED', errors);
      case 403:
        throw new ApiClientError(message || 'Forbidden', 'FORBIDDEN', errors);
      case 404:
        throw new ApiClientError(message || 'Not found', 'NOT_FOUND', errors);
      case 422:
        throw new ApiClientError(message || 'Validation failed', 'VALIDATION_ERROR', errors);
      case 429:
        throw new ApiClientError(message || 'Too many requests', 'RATE_LIMITED', errors);
      case 500:
      case 502:
      case 503:
      case 504:
        throw new ApiClientError(
          message || 'Server error. Please try again later.',
          'SERVER_ERROR'
        );
      default:
        throw new ApiClientError(message, 'UNKNOWN_ERROR', errors);
    }
  }

  /**
   * Clear authentication data
   */
  private clearAuth(): void {
    localStorage.removeItem(API_CONFIG.storageKeys.token);
    localStorage.removeItem(API_CONFIG.storageKeys.adminUser);
    // Optionally dispatch a logout event or redirect
    window.dispatchEvent(new CustomEvent('auth:logout'));
  }
}

/**
 * Custom API Error class
 */
export class ApiClientError extends Error implements ApiError {
  success = false;
  code: string;
  errors?: Record<string, string[]>;

  constructor(message: string, code: string = 'UNKNOWN_ERROR', errors?: Record<string, string[]>) {
    super(message);
    this.name = 'ApiClientError';
    this.code = code;
    this.errors = errors;
  }
}

/**
 * Export singleton instance
 */
export const apiClient = HttpClient.getInstance();
