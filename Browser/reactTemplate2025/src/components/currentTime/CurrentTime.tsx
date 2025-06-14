import React, { FC, useEffect, useState, useMemo } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useStyles } from './CurrentTimeStyles';
import { LABELS } from './CurrentTimeConstants';
import moment from 'moment';

interface CurrentTimeProps {}

const CurrentTime: FC<CurrentTimeProps> = ({}) => {
  const classes = useStyles();
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const now = new Date();
    setTime(moment(now).format('h:mmA'));
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.time}>
        {LABELS.TIME}
        {time}
      </div>
    </div>
  );
};

export default CurrentTime;
