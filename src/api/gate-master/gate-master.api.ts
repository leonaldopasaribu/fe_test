import { apiClient } from '../client';
import type {
  GateMasterResponse,
  GateMasterCreateRequest,
  GateMasterUpdateRequest,
} from './types';

export const gateMasterApi = {
  fetchAll: async (
    page: number = 1,
    limit: number = 10,
    searchQuery?: string
  ): Promise<GateMasterResponse> => {
    let url = `/gerbangs?page=${page}&limit=${limit}`;
    if (searchQuery && searchQuery.trim() !== '') {
      url += `&NamaGerbang=${encodeURIComponent(searchQuery)}`;
    }
    const result: GateMasterResponse = await apiClient(url, {
      requiresAuth: true,
    });
    return result;
  },

  create: async (data: GateMasterCreateRequest): Promise<void> => {
    await apiClient('/gerbangs', {
      method: 'POST',
      body: JSON.stringify(data),
      requiresAuth: true,
    });
  },

  update: async (data: GateMasterUpdateRequest): Promise<void> => {
    await apiClient('/gerbangs', {
      method: 'PUT',
      body: JSON.stringify(data),
      requiresAuth: true,
    });
  },

  delete: async (id: number, IdCabang: number): Promise<void> => {
    await apiClient('/gerbangs', {
      method: 'DELETE',
      body: JSON.stringify({ id, IdCabang }),
      requiresAuth: true,
    });
  },
};
