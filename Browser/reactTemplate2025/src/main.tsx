import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { StyledEngineProvider } from '@mui/material/styles';
import { Provider as ReduxProvider } from 'react-redux';
import './index.css';
import store from './redux/store';
import { Router } from 'react-router-dom';
import { history } from './navigation/NavigationUtils';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <Router history={history}>
        <StyledEngineProvider injectFirst>
          <App />
        </StyledEngineProvider>
      </Router>
    </ReduxProvider>
  </React.StrictMode>,
);
