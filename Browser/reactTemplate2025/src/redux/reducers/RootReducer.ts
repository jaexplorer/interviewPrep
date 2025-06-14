import { combineReducers, AnyAction } from 'redux';
import { ApplicationState, initialState } from '../state/ApplicationState';
import { AuthReducer } from '../reducers/AuthReducer';
import { ErrorReducer } from './ErrorReducer';
import { LoadingReducer } from './LoadingReducer';
import { ExampleReducer } from './ExampleReducer';

const rootReducer = combineReducers<ApplicationState>({
  exampleState: ExampleReducer,
  authState: AuthReducer,
  loadingState: LoadingReducer,
  errorState: ErrorReducer,
});

export default (state: ApplicationState | undefined, action: AnyAction) => {
  // Example condition if you need to clear data eg. Logging out
  if (action.type === 'LOGOUT') {
    return rootReducer(initialState, action);
  }
  return rootReducer(state, action);
};
