import { LocalStorageKeys } from '../helpers/LocalStorage';
import DEFAULT from './themes/Default';

export type ThemeType = typeof DEFAULT;

const themeCollection: ThemeType[] = [DEFAULT];
const defaultTheme = themeCollection[0];
export enum ThemeKey {
  DEFAULT = 'DEFAULT',
}

export const getThemeKey = (): ThemeKey | undefined => {
  const result = localStorage.getItem(LocalStorageKeys.APP_THEME);
  if (result) return result as ThemeKey;
  return undefined;
};

export const setThemeKey = (themeKey: ThemeKey) =>
  localStorage.setItem(LocalStorageKeys.APP_THEME, themeKey);

const getTheme = (themeKey?: ThemeKey): ThemeType => {
  return {
    ...(themeCollection.find((theme) => theme.key === themeKey) || defaultTheme),
  };
};

export const theme = getTheme(getThemeKey());
