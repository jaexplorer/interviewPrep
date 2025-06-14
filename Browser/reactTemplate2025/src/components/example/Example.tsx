import React, { FC, useEffect, useState, useMemo } from 'react';
import { useStyles } from './ExampleStyles';
import { LABELS } from './ExampleConstants';
import { routes } from '../../navigation/NavigationConstants';
import { Dispatch } from 'redux';
import { connect, useDispatch, useSelector } from 'react-redux';
import { ExampleActions } from '../../redux/actions/ExampleActions';
import { ApplicationState } from '../../redux/state/ApplicationState';
import { RouteComponentProps, withRouter } from 'react-router';

interface ExampleProps extends RouteComponentProps {
  count: number;
  testExample: (value: number) => void;
}

const Example: FC<ExampleProps> = ({ count, testExample }) => {
  const classes = useStyles();

  return (
    <div>
      <div onClick={() => testExample(2)}>Count: {count}</div>
    </div>
  );
};

const mapStateToProps = (state: ApplicationState) => ({
  count: state.exampleState.test,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  testExample: (value: number) => dispatch(ExampleActions.getExampleTest(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Example));
