/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { makeStyles } from '@mui/styles';
import { SIZES } from './constants/AppConstants';
import { theme } from './theme/Theme';
import { getFonts } from './helpers/GetFonts';

export const useStyles = makeStyles({
  root: {
    width: '100vw',
    height: '100svh',
    display: 'flex',
    flexDirection: 'column',
  },
  mainContainer: {
    flex: 1,
  },
});
