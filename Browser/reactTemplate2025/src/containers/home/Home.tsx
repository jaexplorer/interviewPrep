import React, { FC, useEffect, useState, useMemo } from 'react';
import { useStyles } from './HomeStyles';
import { LABELS } from './HomeConstants';
import CurrentTime from '../../components/currentTime/CurrentTime';
import { RouteComponentProps, withRouter } from 'react-router';

interface HomeProps extends RouteComponentProps {}

const Home: FC<HomeProps> = ({}) => {
  const classes = useStyles();

  return (
    <div className={classes.homeContainer}>
      <div className={classes.homeWrapper}>
        <CurrentTime />
      </div>
    </div>
  );
};

export default withRouter(Home);
