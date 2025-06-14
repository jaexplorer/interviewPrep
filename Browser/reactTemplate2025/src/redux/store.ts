import { Action, applyMiddleware, compose, createStore, Store } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import rootReducer from './reducers/RootReducer';
import moment from 'moment';
import { createGQLClient } from '../apollo/client';
import { ApplicationState } from './state/ApplicationState';

function saveToLocalStorage(state: any) {
  try {
    const serialisedState = JSON.stringify(state);
    const currentDate = moment().format('DD/MM/YYYY');
    localStorage.setItem('state', serialisedState);
    localStorage.setItem('stateCreatedDate', currentDate);
  } catch (e) {
    console.log(e);
  }
}

function loadFromLocalStorage() {
  try {
    const serialisedState = localStorage.getItem('state');
    const stateCreatedDate = localStorage.getItem('stateCreatedDate');
    if (serialisedState === null) {
      return undefined;
    }
    if (stateCreatedDate) {
      const date = moment(stateCreatedDate, 'DD/MM/YYYY');
      if (moment().diff(date, 'days') > 60) {
        localStorage.clearAll(); // clearing out the local storage to be fetched again
        // window.location.href = `/#/login`; // clearing out the redux store and resetting the app state
      }
    }
    return JSON.parse(serialisedState);
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

const sagaMiddleware = createSagaMiddleware({ context: { client: createGQLClient() } });

let composeEnhancers = compose;

declare let window: any;
if (typeof window !== 'undefined') {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        trace: true,
        traceLimit: 25,
      }) as typeof compose)
    : compose;
}
const persistedStore = loadFromLocalStorage();

const store: Store<ApplicationState> = createStore(
  rootReducer,
  // persistedStore,
  composeEnhancers(applyMiddleware(sagaMiddleware)),
);

store.subscribe(() => saveToLocalStorage(store.getState()));
sagaMiddleware.run(rootSaga);

export interface StoreAction<TType extends string, TPayload> extends Action<TType> {
  readonly type: TType;
  readonly data?: TPayload | null;
}

export default store;
