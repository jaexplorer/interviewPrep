import { Reducer } from 'redux';
import { ExampleResponse } from '../../models/example/Example';
import { ExampleAction, ExampleActionTypes } from '../actions/ExampleActions';
import { ExampleState, initialExampleState } from '../state/ExampleState';

export const ExampleReducer: Reducer<ExampleState, ExampleAction> = (
  state = initialExampleState,
  { type, data },
) => {
  switch (type) {
    case ExampleActionTypes.GET_EXAMPLE_SUCCESS:
      return {
        ...state,
        book: data as ExampleResponse,
      };
    case ExampleActionTypes.GET_EXAMPLE_TEST:
      return {
        ...state,
        test: state.test + (data as number),
      };
    default:
      return state;
  }
};
