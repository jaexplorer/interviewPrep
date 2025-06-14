import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { StyledEngineProvider } from '@mui/material/styles';
import { Provider as ReduxProvider } from 'react-redux';
import store from './redux/store';
import { Router } from 'react-router-dom';
import { history } from './navigation/NavigationUtils';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReduxProvider store={store}>
      <Router history={history}>
        <StyledEngineProvider injectFirst>{children}</StyledEngineProvider>
      </Router>
    </ReduxProvider>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
