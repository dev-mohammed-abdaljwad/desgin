/**
 * Authentication Hooks
 * React hooks for authentication operations
 */

import { useState, useCallback, useEffect } from 'react';
import authService from '../api/services/auth';
import { useMutation, useApi } from './useApi';
import type { LoginRequest, AdminUser, LoginResponse } from '../types/api';

interface UseAuthReturn {
  user: AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (credentials: LoginRequest) => Promise<LoginResponse>;
  logout: () => Promise<void>;
  loading: boolean;
  error: Error | null;
}

/**
 * Hook for authentication state and operations
 */
export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<AdminUser | null>(authService.getUser());
  const [token, setToken] = useState<string | null>(authService.getToken());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const login = useCallback(async (credentials: LoginRequest): Promise<LoginResponse> => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.login(credentials);
      setUser(authService.getUser());
      setToken(authService.getToken());
      return response;
    } catch (err) {
      const apiError = err instanceof Error ? err : new Error('Login failed');
      setError(apiError);
      throw apiError;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await authService.logout();
      setUser(null);
      setToken(null);
    } catch (err) {
      const apiError = err instanceof Error ? err : new Error('Logout failed');
      setError(apiError);
      throw apiError;
    } finally {
      setLoading(false);
    }
  }, []);

  // Sync auth state on mount and when storage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setUser(authService.getUser());
      setToken(authService.getToken());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return {
    user,
    token,
    isAuthenticated: !!token,
    login,
    logout,
    loading,
    error,
  };
}

/**
 * Hook for login mutation
 */
export function useLogin() {
  return useMutation<LoginRequest, LoginResponse>((credentials) =>
    authService.login(credentials)
  );
}

/**
 * Hook for logout mutation
 */
export function useLogout() {
  return useMutation<void, void>(() => authService.logout());
}

/**
 * Hook to get current user
 */
export function useCurrentUser() {
  return useApi(
    () => authService.getCurrentUser(),
    []
  );
}

/**
 * Hook to refresh user
 */
export function useRefreshUser() {
  return useMutation<void, AdminUser | null>(() => authService.refreshUser());
}

/**
 * Hook to check authentication status
 */
export function useIsAuthenticated() {
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(authService.isAuthenticated());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return isAuthenticated;
}
