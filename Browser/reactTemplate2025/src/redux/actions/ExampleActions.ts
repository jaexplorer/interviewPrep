import { StoreAction } from '../store';
import { ExampleRequest, ExampleResponse } from '../../models/example/Example';

export enum ExampleActionTypes {
  GET_EXAMPLE = 'GET_EXAMPLE',
  GET_EXAMPLE_REQUEST = 'GET_EXAMPLE_REQUEST',
  GET_EXAMPLE_SUCCESS = 'GET_EXAMPLE_SUCCESS',
  GET_EXAMPLE_ERROR = 'GET_EXAMPLE_ERROR',
  GET_EXAMPLE_TEST = 'GET_EXAMPLE_TEST',
}

export type ExampleActionPayload = ExampleRequest | ExampleResponse | number | Error;
export type ExampleAction = StoreAction<ExampleActionTypes, ExampleActionPayload>;
export class ExampleActions {
  public static getExampleRequest(data: ExampleRequest) {
    return { type: ExampleActionTypes.GET_EXAMPLE_REQUEST, data };
  }
  public static getExampleSuccess(data: ExampleResponse) {
    return { type: ExampleActionTypes.GET_EXAMPLE_SUCCESS, data };
  }
  public static getExampleError(data: Error) {
    return { type: ExampleActionTypes.GET_EXAMPLE_ERROR, data };
  }
  public static getExampleTest(data: number): ExampleAction {
    return { type: ExampleActionTypes.GET_EXAMPLE_TEST, data };
  }
}
