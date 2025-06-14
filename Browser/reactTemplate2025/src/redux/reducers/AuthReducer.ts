import { Reducer } from 'redux';
import { AuthResponse, User, UserResponse } from '../../models/auth/Auth';
import { AuthAction, AuthActionTypes } from '../actions/AuthActions';
import { AuthState, initialAuthState } from '../state/AuthState';

export const AuthReducer: Reducer<AuthState, AuthAction> = (
  state = initialAuthState,
  { type, data },
) => {
  switch (type) {
    case AuthActionTypes.SET_ACCESS_TOKEN:
      return { ...state, accessToken: data as string };

    case AuthActionTypes.GET_USER_SUCCESS:
      return { ...state, user: (data as UserResponse).user };
    case AuthActionTypes.REGISTER_USER_SUCCESS:
    case AuthActionTypes.LOGIN_USER_SUCCESS:
      return {
        ...state,
        user: (data as AuthResponse).user,
        accessToken: (data as AuthResponse).accessToken,
        refreshToken: (data as AuthResponse).refreshToken,
      };

    default:
      return { ...state };
  }
};
