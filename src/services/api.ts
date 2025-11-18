const API_BASE_URL = 'http://localhost:8080/api';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token?: string;
  user?: {
    id: string;
    email: string;
    name?: string;
  };
  message?: string;
}

export const authApi = {
  signin: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: 'Login failed. Please check your credentials.',
      }));
      throw new Error(error.message || 'Login failed');
    }

    return response.json();
  },

  signout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('rememberMe');
  },
};
