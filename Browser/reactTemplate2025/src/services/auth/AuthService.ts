/* eslint-disable class-methods-use-this */
import axios from 'axios';
import { Store } from 'redux';
import {
  LoginUserRequest,
  RegisterUserRequest,
  APIUserResponse,
  APIAuthResponse,
  LogoutRequest,
  APIRefreshTokenResponse,
  RefreshTokenRequest,
} from '../../models/auth/Auth';
import { ApplicationState } from '../../redux/state/ApplicationState';

let store: Store<ApplicationState>;

export const injectStoreAuthService = (_store: Store<ApplicationState>) => {
  store = _store;
};
class AuthService {
  url = false ? 'http://localhost:4000/' : 'https://forkit-server.onrender.com/';

  public setAuthToken(token?: string) {
    const { accessToken } = store.getState().authState;
    const newToken = token || accessToken;
    if (newToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }

  public async getUser(): Promise<APIUserResponse> {
    this.setAuthToken();
    return await axios.get(`${this.url}user`);
  }

  public async registerUser(request: RegisterUserRequest): Promise<APIAuthResponse> {
    return await axios.post(`${this.url}auth/signup`, request);
  }

  public async loginUser(request: LoginUserRequest): Promise<APIAuthResponse> {
    return await axios.post(`${this.url}auth/login`, request);
  }

  public async refreshToken(request: RefreshTokenRequest): Promise<APIRefreshTokenResponse> {
    return await axios.post(`${this.url}auth/refresh_token`, request);
  }

  public async logout(request: LogoutRequest) {
    return await axios.post(`${this.url}auth/logout`, request);
  }
}

const authService = new AuthService();

// Handle refresh
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      const { refreshToken } = store.getState().authState;
      if (refreshToken) {
        const payload = await authService.refreshToken({ refreshToken });
        authService.setAuthToken(payload.data.accessToken);
        return axios.request(error.config);
      }
    } else {
      return Promise.reject(error.response.data.error);
    }
  },
);

export default authService;
