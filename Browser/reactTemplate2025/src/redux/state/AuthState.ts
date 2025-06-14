import { User } from '../../models/auth/Auth';

export class AuthState {
  public accessToken: string | undefined;
  public refreshToken: string | undefined;
  public user: User | undefined;
}

export const initialAuthState: AuthState = {
  accessToken: undefined,
  refreshToken: undefined,
  user: undefined,
};
