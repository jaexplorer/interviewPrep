import { theme } from '../../theme/Theme';
import { makeStyles } from '@mui/styles';
import { SIZES } from '../../constants/AppConstants';
import { getFonts } from '../../helpers/GetFonts';

const GAP = theme.units.spacing * 4;
export const useStyles = makeStyles({
  homeContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: `calc(100% - ${GAP * 2}px)`,
    height: `calc(100% - ${GAP * 2}px)`,
    padding: GAP,
  },
  homeWrapper: {
    backgroundColor: theme.colors.light,
    borderRadius: theme.units.borderRadius * 4,
    overflow: 'hidden',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  panels: {
    display: 'flex',
    justifyContent: 'space-between',
    flex: 1,
  },
});
