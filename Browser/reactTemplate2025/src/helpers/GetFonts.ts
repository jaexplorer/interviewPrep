export type VariantType = 'Light' | 'Regular' | 'Medium' | 'Semi-Bold' | 'Bold';

export const getFonts = (variant?: VariantType) => {
  switch (variant) {
    case 'Light':
      return 100;
    case 'Regular':
      return 200;
    case 'Medium':
      return 300;
    case 'Semi-Bold':
      return 400;
    case 'Bold':
      return 500;
    default:
      return 300;
  }
};
