/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// /* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { call, put, takeEvery } from 'redux-saga/effects';
import {
  AuthResponse,
  APIAuthResponse,
  APIUserResponse,
  LoginUserRequest,
  RegisterUserRequest,
  LogoutRequest,
} from '../../models/auth/Auth';
import authService from '../../services/auth/AuthService';
import { AuthAction, AuthActions, AuthActionTypes } from '../actions/AuthActions';

export function* getUser(action: AuthAction) {
  try {
    const response: APIUserResponse = yield authService.getUser();
    yield put(AuthActions.getUserSuccess(response.data));
  } catch (error) {
    console.debug('ERROR: ', error);
    yield put(AuthActions.getUserError(error as string));
  }
}

export function* registerUser(action: AuthAction) {
  try {
    const response: APIAuthResponse = yield authService.registerUser(
      action.data as RegisterUserRequest,
    );

    yield put(AuthActions.registerUserSuccess(response.data));
  } catch (error) {
    console.debug('ERROR: ', error);
    yield put(AuthActions.registerUserError(error as string));
  }
}

export function* loginUser(action: AuthAction) {
  try {
    const response: APIAuthResponse = yield authService.loginUser(action.data as LoginUserRequest);
    yield put(AuthActions.loginUserSuccess(response.data));
  } catch (error) {
    console.debug('ERROR: ', error);
    yield put(AuthActions.loginUserError(error as string));
  }
}

export function* logoutUser(action: AuthAction) {
  try {
    yield authService.logout(action.data as LogoutRequest);
  } catch (error) {
    console.debug('ERROR: ', error);
  }
}

function* authWatcher() {
  yield takeEvery(AuthActionTypes.GET_USER_REQUEST, (action: AuthAction) => getUser(action));
  yield takeEvery(AuthActionTypes.REGISTER_USER_REQUEST, (action: AuthAction) =>
    registerUser(action),
  );
  yield takeEvery(AuthActionTypes.LOGIN_USER_REQUEST, (action: AuthAction) => loginUser(action));
  yield takeEvery(AuthActionTypes.LOGOUT, (action: AuthAction) => logoutUser(action));
}

export default authWatcher;
