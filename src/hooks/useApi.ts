/**
 * API Hooks
 * React hooks for making API requests with loading and error states
 */

import { useState, useCallback, useEffect } from 'react';
import type { ApiResponse, PaginatedResponse, PaginationMeta } from '../types/api';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

interface UsePaginatedState<T> extends UseApiState<T[]> {
  meta: PaginationMeta | null;
}

/**
 * Generic hook for API calls
 */
export function useApi<T>(
  apiCall: () => Promise<any>,
  deps: any[] = []
): UseApiState<T> & { refetch: () => Promise<void> } {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const execute = useCallback(async () => {
    setState({ data: null, loading: true, error: null });
    try {
      const response = await apiCall();
      setState({
        data: response.data || response,
        loading: false,
        error: null,
      });
    } catch (err) {
      setState({
        data: null,
        loading: false,
        error: err instanceof Error ? err : new Error('An error occurred'),
      });
    }
  }, [apiCall]);

  useEffect(() => {
    execute();
  }, deps);

  return {
    ...state,
    refetch: execute,
  };
}

/**
 * Hook for paginated API calls
 */
export function usePaginatedApi<T>(
  apiCall: (page: number, perPage: number) => Promise<any>,
  initialPage: number = 1,
  initialPerPage: number = 15,
  deps: any[] = []
): UsePaginatedState<T> & {
  refetch: () => Promise<void>;
  goToPage: (page: number) => Promise<void>;
  setPerPage: (perPage: number) => Promise<void>;
  currentPage: number;
  perPage: number;
} {
  const [page, setPage] = useState(initialPage);
  const [perPage, setPerPageValue] = useState(initialPerPage);
  const [state, setState] = useState<UsePaginatedState<T>>({
    data: null,
    loading: true,
    error: null,
    meta: null,
  });

  const execute = useCallback(
    async (currentPage: number, currentPerPage: number) => {
      setState((prev) => ({ ...prev, loading: true }));
      try {
        const response = await apiCall(currentPage, currentPerPage);
        setState({
          data: response.data || [],
          loading: false,
          error: null,
          meta: response.meta || null,
        });
      } catch (err) {
        setState({
          data: null,
          loading: false,
          error: err instanceof Error ? err : new Error('An error occurred'),
          meta: null,
        });
      }
    },
    [apiCall]
  );

  useEffect(() => {
    execute(page, perPage);
  }, [page, perPage, ...deps]);

  return {
    ...state,
    refetch: () => execute(page, perPage),
    goToPage: async (newPage: number) => {
      setPage(newPage);
    },
    setPerPage: async (newPerPage: number) => {
      setPerPageValue(newPerPage);
      setPage(1);
    },
    currentPage: page,
    perPage,
  };
}

/**
 * Hook for mutations (POST, PUT, DELETE, etc.)
 */
export function useMutation<TRequest, TResponse>(
  mutationFn: (data: TRequest) => Promise<any>
): {
  mutate: (data: TRequest) => Promise<TResponse>;
  loading: boolean;
  error: Error | null;
  data: TResponse | null;
  reset: () => void;
} {
  const [state, setState] = useState({
    loading: false,
    error: null as Error | null,
    data: null as TResponse | null,
  });

  const mutate = useCallback(
    async (data: TRequest): Promise<TResponse> => {
      setState({ loading: true, error: null, data: null });
      try {
        const response = await mutationFn(data);
        const result = response.data || response;
        setState({ loading: false, error: null, data: result });
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('An error occurred');
        setState({ loading: false, error, data: null });
        throw error;
      }
    },
    [mutationFn]
  );

  const reset = useCallback(() => {
    setState({ loading: false, error: null, data: null });
  }, []);

  return {
    mutate,
    ...state,
    reset,
  };
}

/**
 * Hook for lazy API calls (only call when needed)
 */
export function useLazyApi<T>(
  apiCall: () => Promise<any>
): [() => Promise<T>, UseApiState<T>] {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async (): Promise<T> => {
    setState({ data: null, loading: true, error: null });
    try {
      const response = await apiCall();
      const result = response.data || response;
      setState({ data: result, loading: false, error: null });
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An error occurred');
      setState({ data: null, loading: false, error });
      throw error;
    }
  }, [apiCall]);

  return [execute, state];
}
