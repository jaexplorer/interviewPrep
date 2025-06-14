export interface User {
  userId: string;
  name: string;
  email: string;
}

export interface RegisterUserRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginUserRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface APIAuthResponse {
  data: AuthResponse;
}

export interface UserResponse {
  user: User;
}

export interface APIUserResponse {
  data: UserResponse;
}

export interface AccessTokenResponse {
  accessToken: string;
}

export interface APIRefreshTokenResponse {
  data: AccessTokenResponse;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface LogoutRequest {
  refreshToken: string;
}
