import { ErrorState, initialErrorState } from '../state/ErrorState';
import { LoadingState, initialLoadingState } from '../state/LoadingState';
import { AuthState, initialAuthState } from './AuthState';
import { ExampleState, initialExampleState } from './ExampleState';

export interface ApplicationState {
  exampleState: ExampleState;
  authState: AuthState;
  loadingState: LoadingState;
  errorState: ErrorState;
}

export const initialState: ApplicationState = {
  exampleState: initialExampleState,
  authState: initialAuthState,
  loadingState: initialLoadingState,
  errorState: initialErrorState,
};
