import PropTypes from 'prop-types';
import Settings04Icon from '@untitled-ui/icons-react/build/esm/Settings04';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';

import { useSettings } from 'src/hooks/use-settings';

export const OverviewBanner = (props) => {
  const { handleDrawerOpen } = useSettings();

  return (
    <Stack
      alignItems="center"
      direction={{
        xs: 'column',
        md: 'row',
      }}
      spacing={4}
      sx={{
        backgroundColor: (theme) => theme.palette.mode === 'dark'
          ? 'primary.darkest'
          : 'primary.lightest',
        borderRadius: 2.5,
        p: 4,
      }}
      {...props}>
      <Box
        sx={{
          width: 200,
          '& img': {
            width: '100%',
          },
        }}
      >
        <img src="/assets/person-standing.png" />
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Typography
          color="primary.main"
          variant="overline"
        >
          New v1 released
        </Typography>
        <Typography
          color="text.primary"
          sx={{ mt: 2 }}
          variant="h6"
        >
          Informacoes importantes!
        </Typography>
        <Typography
          color="text.primary"
          sx={{ mt: 1 }}
          variant="body1"
        >
          Sempre confira as dicas do Administrador ao lado -
         
        </Typography>
        <Typography
          color="text.primary"
          sx={{ mt: 1 }}
          variant="body1"
        >
          Personalize e deixe o app do seu jeito
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Button
            color="primary"
            onClick={handleDrawerOpen}
            startIcon={(
              <SvgIcon>
                <Settings04Icon />
              </SvgIcon>
            )}
            variant="contained"
          >
            Open App Settings
          </Button>
        </Box>
      </Box>
    </Stack>
  );
};

OverviewBanner.propTypes = {
  onDismiss: PropTypes.func,
};
