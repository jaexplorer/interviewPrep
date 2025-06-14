import { all } from 'redux-saga/effects';
import authWatcher from './AuthSaga';
import exampleWatcher from './ExampleSaga';

export default function* rootSaga() {
  yield all([exampleWatcher(), authWatcher()]);
}
