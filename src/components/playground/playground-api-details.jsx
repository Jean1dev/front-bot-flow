import ChevronRightIcon from '@untitled-ui/icons-react/build/esm/ChevronRight';
import Clipboard from '@untitled-ui/icons-react/build/esm/Copy02';
import FilePlus02Icon from '@untitled-ui/icons-react/build/esm/FilePlus02';
import UserPlus02Icon from '@untitled-ui/icons-react/build/esm/UserPlus02';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useCallback, useState } from 'react';

export const PlayGroundApiDetails = () => {
  const [state, setState] = useState({
    reveal: false
  })

  const reveal = useCallback(() => {
    setState((prevState) => ({ ...prevState, reveal: true }))
  }, [])

  return (
    <Card variant="outlined">
      <CardContent>
        <Stack
          divider={<Divider />}
          spacing={2}
        >
          <Stack
            alignItems="flex-start"
            direction="row"
            spacing={2}
          >
            <SvgIcon>
              <FilePlus02Icon />
            </SvgIcon>
            <div>
              <Typography variant="subtitle1">
                API Key
              </Typography>

              {
                state.reveal && (
                  <Stack spacing={6}>
                    <Grid
                      container
                      spacing={3}
                    >

                      <Grid
                        xs={12}
                        md={6}
                      >
                        <Typography
                          color="text.secondary"
                          variant="body2"
                        >
                          FGOWHGOIW32
                        </Typography>
                      </Grid>


                      <Grid
                        xs={12}
                        md={6}
                      >
                        <Button
                          size="small"
                          onClick={() => setState({ reveal: false })}
                          variant="text"
                        >
                          <Clipboard />
                        </Button>
                      </Grid>

                    </Grid>
                  </Stack>
                )
              }

              {
                !state.reveal && (
                  <Box sx={{ mt: 2 }}>
                    <Button
                      endIcon={<ChevronRightIcon />}
                      size="small"
                      variant="contained"
                      onClick={reveal}
                    >
                      Reveal
                    </Button>
                  </Box>
                )
              }
            </div>
          </Stack>
          <Stack
            alignItems="flex-start"
            direction="row"
            spacing={2}
          >
            <SvgIcon>
              <UserPlus02Icon />
            </SvgIcon>
            <div>
              <Typography variant="subtitle1">
                API Base URL
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
              >
                https://api.com/v1
              </Typography>

            </div>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};
