import { useState, useEffect } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

export interface Value {
  id: number;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  icon_name: string;
  gradient: string;
  order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface TeamMember {
  id: number;
  name_ar: string;
  name_en: string;
  position_ar: string;
  position_en: string;
  bio_ar?: string;
  bio_en?: string;
  image: string;
  email?: string;
  phone?: string;
  linkedin_url?: string;
  twitter_url?: string;
  order: number;
  is_featured: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  meta?: {
    total: number;
    count: number;
    per_page: number;
    current_page: number;
    last_page: number;
  };
}

interface UseApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch?: () => void;
}

interface UsePaginatedApiResponse<T> {
  data: T[] | null;
  meta: any;
  loading: boolean;
  error: string | null;
  refetch?: () => void;
}

// ============= Values Hooks =============

/**
 * Fetch all active values/principles
 */
export function useValues(): UseApiResponse<Value[]> {
  const [data, setData] = useState<Value[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchValues = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/values`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: PaginatedResponse<Value> = await response.json();
      
      if (result.success) {
        // Sort by order
        const sortedData = result.data.sort((a, b) => a.order - b.order);
        setData(sortedData);
      } else {
        setError('Failed to fetch values');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchValues();
  }, []);

  return { data, loading, error, refetch: fetchValues };
}

/**
 * Fetch a single value by ID
 */
export function useValue(id: number): UseApiResponse<Value> {
  const [data, setData] = useState<Value | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchValue = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_BASE_URL}/values/${id}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: { success: boolean; data: Value } = await response.json();
        
        if (result.success) {
          setData(result.data);
        } else {
          setError('Failed to fetch value');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchValue();
    }
  }, [id]);

  return { data, loading, error };
}

// ============= Team Members Hooks =============

/**
 * Fetch all team members with pagination
 */
export function useTeamMembers(page: number = 1, perPage: number = 15): UsePaginatedApiResponse<TeamMember> {
  const [data, setData] = useState<TeamMember[] | null>(null);
  const [meta, setMeta] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `${API_BASE_URL}/team-members?page=${page}&per_page=${perPage}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: PaginatedResponse<TeamMember> = await response.json();
      
      if (result.success) {
        // Sort by order
        const sortedData = result.data.sort((a, b) => a.order - b.order);
        setData(sortedData);
        setMeta(result.meta);
      } else {
        setError('Failed to fetch team members');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setData(null);
      setMeta(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, [page, perPage]);

  return { data, meta, loading, error, refetch: fetchTeamMembers };
}

/**
 * Fetch only featured team members
 */
export function useFeaturedTeamMembers(): UseApiResponse<TeamMember[]> {
  const [data, setData] = useState<TeamMember[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFeaturedMembers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/team-members?is_featured=true`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: PaginatedResponse<TeamMember> = await response.json();
      
      if (result.success) {
        // Sort by order
        const sortedData = result.data.sort((a, b) => a.order - b.order);
        setData(sortedData);
      } else {
        setError('Failed to fetch featured team members');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedMembers();
  }, []);

  return { data, loading, error, refetch: fetchFeaturedMembers };
}

/**
 * Fetch a single team member by ID
 */
export function useTeamMember(id: number): UseApiResponse<TeamMember> {
  const [data, setData] = useState<TeamMember | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_BASE_URL}/team-members/${id}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: { success: boolean; data: TeamMember } = await response.json();
        
        if (result.success) {
          setData(result.data);
        } else {
          setError('Failed to fetch team member');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMember();
    }
  }, [id]);

  return { data, loading, error };
}
