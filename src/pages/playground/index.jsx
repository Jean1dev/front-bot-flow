import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';

import { Seo } from 'src/components/seo';
import { useSettings } from 'src/hooks/use-settings';
import { CommunicationBar } from 'src/components/playground/communication-bar';
import { PlayGroundApiDetails } from 'src/components/playground/playground-api-details';
import { WhatsappForm } from 'src/components/playground/whatsapp-form';

const PlayGroundPage = () => {
  const settings = useSettings();

  return (
    <>
      <Seo title="PlayGround" />
      <Box
        component="main"
        sx={{ flexGrow: 1 }}
      >
        <Box
          sx={{
            backgroundColor: 'primary.darkest',
            color: 'primary.contrastText',
            py: '120px',
          }}
        >
          <Container maxWidth="xl">
            <Typography
              color="inherit"
              variant="h5"
            >
              Boa tarde Usuario
            </Typography>
            <Typography
              color="inherit"
              sx={{ mt: 1, mb: 6 }}
            >
              Estamos felizes em ver você novamente.

              Continue de onde parou ou tente outro canal de comunicação
            </Typography>
            {/* <CourseSearch /> */}
          </Container>
        </Box>
        <Box sx={{ py: '64px' }}>
          <Container maxWidth={settings.stretch ? false : 'xl'}>
            <Grid
              container
              spacing={{
                xs: 3,
                lg: 4,
              }}
            >
              {/* <Grid xs={12}>
                <Typography variant="h6">
                  Welcome back, Anika
                </Typography>
                <Typography
                  color="text.secondary"
                  sx={{ mt: 1 }}
                  variant="body2"
                >
                  Nice progress so far, keep it up!
                </Typography>

              </Grid> */}

              <Grid
                xs={12}
                md={9}
              >

                <CommunicationBar
                  timeCurrent={20}
                  timeGoal={35}
                />


              </Grid>
              <Grid
                xs={12}
                md={3}
              >

                <PlayGroundApiDetails />

              </Grid>

            </Grid>

          </Container>

          <Box
            sx={{
              py: 8,
            }}
          >
            <Container maxWidth={settings.stretch ? false : 'lg'}>
              <Stack spacing={8}>
                <Card
                  variant="outlined">
                  <CardHeader

                    title={"Whatsapp PlayGround"}
                  />
                  <Divider />
                  <Box >
                    <WhatsappForm />
                  </Box>

                </Card>
              </Stack>
            </Container>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default PlayGroundPage