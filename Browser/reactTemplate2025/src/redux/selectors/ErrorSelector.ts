/* eslint-disable @typescript-eslint/no-unsafe-return */
import { ApplicationState } from '../state/ApplicationState';

/*
  Show error when any of GET_TODOS_ERROR, GET_USER_ERROR is active
  const errorSelector = errorSelector([TodoActionTypes.GET_TODO, TodoActionTypes.GET_USER]);
  const mapStateToProps = (state) => ({ isError: errorSelector(state) });
*/
export const errorMessageSelector = (actions: string[]) => (state: ApplicationState) => {
  // returns the first error messages for actions
  // * We assume when any request fails on a page that
  //   requires multiple API calls, we shows the first error
  return actions.map((action) => state.errorState[action]).filter((e) => e)[0] || '';
};
