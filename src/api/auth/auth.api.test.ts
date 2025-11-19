import { authApi } from './auth.api';
import { apiClient } from '../client';
import type { SignInRequest, SignInResponse } from './types';

jest.mock('../client', () => ({
  apiClient: jest.fn(),
}));

describe('authApi', () => {
  const mockApiClient = apiClient as jest.MockedFunction<typeof apiClient>;

  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  describe('signin', () => {
    const mockCredentials: SignInRequest = {
      username: 'testuser',
      password: 'testpassword',
    };

    it('should return success response when credentials are valid', async () => {
      const mockResponse: SignInResponse = {
        code: 200,
        is_logged_in: 1,
        message: 'Login successful',
        status: true,
        token: 'mock-jwt-token',
      };

      mockApiClient.mockResolvedValueOnce(mockResponse);

      const result = await authApi.signin(mockCredentials);

      expect(mockApiClient).toHaveBeenCalledWith('/auth/login', {
        method: 'POST',
        body: JSON.stringify(mockCredentials),
      });
      expect(result).toEqual(mockResponse);
    });

    it('should return error response when credentials are invalid', async () => {
      const mockErrorResponse: SignInResponse = {
        code: 401,
        is_logged_in: 0,
        message: 'Invalid credentials',
        status: false,
      };

      mockApiClient.mockResolvedValueOnce(mockErrorResponse);

      const result = await authApi.signin(mockCredentials);

      expect(mockApiClient).toHaveBeenCalledWith('/auth/login', {
        method: 'POST',
        body: JSON.stringify(mockCredentials),
      });
      expect(result).toEqual(mockErrorResponse);
      expect(result.status).toBe(false);
    });

    it('should throw error when API call fails', async () => {
      const mockError = new Error('Network error');
      mockApiClient.mockRejectedValueOnce(mockError);

      await expect(authApi.signin(mockCredentials)).rejects.toThrow(
        'Network error'
      );

      expect(mockApiClient).toHaveBeenCalledWith('/auth/login', {
        method: 'POST',
        body: JSON.stringify(mockCredentials),
      });
    });

    it('should send correct request body format when signin is called', async () => {
      const mockResponse: SignInResponse = {
        code: 200,
        is_logged_in: 1,
        status: true,
        token: 'mock-token',
      };

      mockApiClient.mockResolvedValueOnce(mockResponse);

      await authApi.signin(mockCredentials);

      const callArgs = mockApiClient.mock.calls[0];
      const bodyString = callArgs[1]?.body as string;
      const parsedBody = JSON.parse(bodyString);

      expect(parsedBody).toEqual({
        username: 'testuser',
        password: 'testpassword',
      });
    });
  });

  describe('signout', () => {
    it('should clear authToken when signout is called', () => {
      localStorage.setItem('authToken', 'mock-token');
      localStorage.setItem('user', JSON.stringify({ id: 1, name: 'Test' }));
      localStorage.setItem('rememberMe', 'true');

      authApi.signout();

      expect(localStorage.getItem('authToken')).toBeNull();
    });

    it('should clear user data when signout is called', () => {
      localStorage.setItem('authToken', 'mock-token');
      localStorage.setItem('user', JSON.stringify({ id: 1, name: 'Test' }));
      localStorage.setItem('rememberMe', 'true');

      authApi.signout();

      expect(localStorage.getItem('user')).toBeNull();
    });

    it('should clear rememberMe flag when signout is called', () => {
      localStorage.setItem('authToken', 'mock-token');
      localStorage.setItem('user', JSON.stringify({ id: 1, name: 'Test' }));
      localStorage.setItem('rememberMe', 'true');

      authApi.signout();

      expect(localStorage.getItem('rememberMe')).toBeNull();
    });

    it('should clear all auth-related items when signout is called', () => {
      localStorage.setItem('authToken', 'mock-token');
      localStorage.setItem('user', JSON.stringify({ id: 1, name: 'Test' }));
      localStorage.setItem('rememberMe', 'true');
      localStorage.setItem('otherData', 'should-remain');

      authApi.signout();

      expect(localStorage.getItem('authToken')).toBeNull();
      expect(localStorage.getItem('user')).toBeNull();
      expect(localStorage.getItem('rememberMe')).toBeNull();
      expect(localStorage.getItem('otherData')).toBe('should-remain');
    });

    it('should not throw error when localStorage is empty', () => {
      expect(() => authApi.signout()).not.toThrow();
    });

    it('should be callable multiple times when called repeatedly', () => {
      localStorage.setItem('authToken', 'mock-token');

      authApi.signout();
      expect(localStorage.getItem('authToken')).toBeNull();

      authApi.signout();
      expect(localStorage.getItem('authToken')).toBeNull();
    });
  });
});
