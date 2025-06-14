/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { gql } from '@apollo/client/core';
import { takeEvery, put, call, getContext } from 'redux-saga/effects';
import { ExampleRequest, ExampleResponse } from '../../models/example/Example';
import { ExampleAction, ExampleActions, ExampleActionTypes } from '../actions/ExampleActions';
import { GraphQLClient } from '../../apollo/client';
import { GET_BOOK_REQUEST } from '../../apollo/queries/ExampleQueries';
import exampleService from '../../services/example/ExampleService';

export function* getExampleRequest({ data }: ExampleAction) {
  try {
    const response: ExampleResponse = yield exampleService.getExampleRequest(
      data as ExampleRequest,
    );
    yield put(ExampleActions.getExampleSuccess(response));
  } catch (error) {
    console.error('ERROR: ', error);
    yield put(ExampleActions.getExampleError(error as Error));
  }
}

// If using apollo
export function* getExampleRequestQuery({ data }: ExampleAction) {
  const client: GraphQLClient = yield getContext('client');
  try {
    const response: ExampleResponse = yield call(
      client.query,
      'getExample',
      GET_BOOK_REQUEST,
      data as ExampleRequest,
    );
    yield put(ExampleActions.getExampleSuccess(response));
  } catch (error) {
    console.error('ERROR: ', error);
    yield put(ExampleActions.getExampleError(error as Error));
  }
}

function* exampleWatcher() {
  yield takeEvery(ExampleActionTypes.GET_EXAMPLE_REQUEST, (action: ExampleAction) =>
    getExampleRequest({
      type: action.type,
      data: action.data,
    }),
  );
}

export default exampleWatcher;
