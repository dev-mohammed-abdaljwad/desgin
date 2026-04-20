/**
 * API Configuration
 * Centralized configuration for API endpoints and settings
 */

const isDevelopment = import.meta.env.DEV;

export const API_CONFIG = {
  // Base URL for API requests
  baseUrl: import.meta.env.VITE_API_BASE_URL || (isDevelopment ? 'http://localhost:8000/api/v1' : 'https://api.yourdomain.com/api/v1'),
  
  // API version
  version: 'v1',
  
  // Timeout for requests (in milliseconds)
  requestTimeout: 30000,
  
  // Storage keys
  storageKeys: {
    token: 'auth_token',
    adminUser: 'admin_user',
  },
  
  // Rate limiting
  rateLimits: {
    publicForms: '5 requests per 1 minute per IP',
    apiEndpoints: '60 requests per 1 minute per IP',
  },
  
  // CORS settings
  cors: {
    allowOrigins: isDevelopment 
      ? ['http://localhost:3000', 'http://127.0.0.1:3000']
      : [import.meta.env.VITE_APP_URL || 'https://yourdomain.com'],
    allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
  },
  
  // Pagination defaults
  paginationDefaults: {
    perPage: 15,
    parameter: 'per_page',
  },
  
  // HTTP status codes
  statusCodes: {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    VALIDATION_ERROR: 422,
    RATE_LIMITED: 429,
    SERVER_ERROR: 500,
  },
} as const;

/**
 * Get the full API endpoint URL
 */
export const getApiUrl = (endpoint: string): string => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_CONFIG.baseUrl}${cleanEndpoint}`;
};

/**
 * Get authorization header with token
 */
export const getAuthHeader = (token?: string): HeadersInit => {
  const authToken = token || localStorage.getItem(API_CONFIG.storageKeys.token);
  
  return {
    'Content-Type': 'application/json',
    ...(authToken && { Authorization: `Bearer ${authToken}` }),
  };
};
