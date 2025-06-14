import {
  AuthResponse,
  LoginUserRequest,
  LogoutRequest,
  RegisterUserRequest,
  User,
  UserResponse,
} from '../../models/auth/Auth';
import { StoreAction } from '../store';

export enum AuthActionTypes {
  GET_USER = 'GET_USER',
  GET_USER_REQUEST = 'GET_USER_REQUEST',
  GET_USER_SUCCESS = 'GET_USER_SUCCESS',
  GET_USER_ERROR = 'GET_USER_ERROR',

  REGISTER_USER = 'REGISTER_USER',
  REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST',
  REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS',
  REGISTER_USER_ERROR = 'REGISTER_USER_ERROR',

  LOGIN_USER = 'LOGIN_USER',
  LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST',
  LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS',
  LOGIN_USER_ERROR = 'LOGIN_USER_ERROR',

  LOGOUT = 'LOGOUT',

  SET_ACCESS_TOKEN = 'SET_ACCESS_TOKEN',
}

export type AuthActionPayload =
  | User
  | RegisterUserRequest
  | LoginUserRequest
  | AuthResponse
  | UserResponse
  | LogoutRequest
  | string
  | Error;

export type AuthAction = StoreAction<AuthActionTypes, AuthActionPayload>;

export class AuthActions {
  public static logout(data: LogoutRequest): AuthAction {
    return { type: AuthActionTypes.LOGOUT, data };
  }

  public static setAccessToken(data: string): AuthAction {
    return { type: AuthActionTypes.SET_ACCESS_TOKEN, data };
  }

  // GET USER ----------------------------------------------------//
  public static getUserRequest(): AuthAction {
    return { type: AuthActionTypes.GET_USER_REQUEST };
  }

  public static getUserSuccess(data: UserResponse): AuthAction {
    return { type: AuthActionTypes.GET_USER_SUCCESS, data };
  }

  public static getUserError(data: string): AuthAction {
    return { type: AuthActionTypes.GET_USER_ERROR, data };
  }

  // REGISTER USER ----------------------------------------------------//
  public static registerUserRequest(data: RegisterUserRequest): AuthAction {
    return { type: AuthActionTypes.REGISTER_USER_REQUEST, data };
  }

  public static registerUserSuccess(data: AuthResponse): AuthAction {
    return { type: AuthActionTypes.REGISTER_USER_SUCCESS, data };
  }

  public static registerUserError(data: string): AuthAction {
    return { type: AuthActionTypes.REGISTER_USER_ERROR, data };
  }

  // LOGIN USER ----------------------------------------------------//
  public static loginUserRequest(data: LoginUserRequest): AuthAction {
    return { type: AuthActionTypes.LOGIN_USER_REQUEST, data };
  }

  public static loginUserSuccess(data: AuthResponse): AuthAction {
    return { type: AuthActionTypes.LOGIN_USER_SUCCESS, data };
  }

  public static loginUserError(data: string): AuthAction {
    return { type: AuthActionTypes.LOGIN_USER_ERROR, data };
  }
}
