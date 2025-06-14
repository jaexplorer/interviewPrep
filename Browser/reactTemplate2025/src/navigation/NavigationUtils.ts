import { createBrowserHistory } from 'history';
import { RouteParams, routes } from './NavigationConstants';

export const history = createBrowserHistory();

export type Route = keyof typeof routes;

export function navigate(name: Route, params?: RouteParams[Route], newTab?: boolean) {
  if (newTab) {
    window.open(window.location.origin + routes[name]);
  } else {
    history.push(routes[name], { params });
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function navigateBack() {
  history.goBack();
}

export function resetNavigation(name: Route, params?: RouteParams[Route]) {
  history.replace(routes[name], { params });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
