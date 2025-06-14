import { theme } from '../../theme/Theme';
import { makeStyles } from '@mui/styles';
import { SIZES } from '../../constants/AppConstants';
import { getFonts } from '../../helpers/GetFonts';

export const useStyles = makeStyles({
  container: {
    height: 100,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  time: {
    fontSize: theme.font.xl,
    fontWeight: getFonts('Bold'),
    color: theme.colors.black,
  },
});
