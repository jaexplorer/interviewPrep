import { theme } from './Theme';

export const loadingAnimation = {
  background: 'linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%)',
  backgroundSize: '200% 100%',
  animation: '1.5s shine linear infinite',
  backgroundColor: theme.colors.loading,
};

export const classNameGenerator = (classes: (string | undefined | null | boolean)[]) => {
  return classes.join(' ');
};

export const blackToPink = {
  filter:
    'invert(55%) sepia(96%) saturate(5930%) hue-rotate(310deg) brightness(89%) contrast(109%)',
};
