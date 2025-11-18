import { apiClient } from '../client';
import type { SignInRequest, SignInResponse } from './types';

export const authApi = {
  signin: async (credentials: SignInRequest): Promise<SignInResponse> => {
    return apiClient('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  signout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('rememberMe');
  },
};
