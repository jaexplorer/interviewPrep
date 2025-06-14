import { FC, useEffect, useRef } from 'react';
import Navigation from './navigation/Navigation';
import { useStyles } from './AppStyles';
import { injectStoreApollo } from './apollo/client';
import { injectStoreAuthService } from './services/auth/AuthService';
import store from './redux/store';

interface AppProps {}

const App: FC<AppProps> = ({}) => {
  const classes = useStyles();
  injectStoreApollo(store);
  injectStoreAuthService(store);

  return (
    <div className={classes.root}>
      <div className={classes.mainContainer}>
        <Navigation />
      </div>
    </div>
  );
};

export default App;
