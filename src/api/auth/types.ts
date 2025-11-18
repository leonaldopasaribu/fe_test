export interface SignInRequest {
  username: string;
  password: string;
}

export interface SignInResponse {
  code: number;
  is_logged_in: number;
  message?: string;
  status: boolean;
  token?: string;
}
