import PropTypes from 'prop-types';
import ChevronRightIcon from '@untitled-ui/icons-react/build/esm/ChevronRight';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export const CommunicationBar = (props) => {

    return (
        <Card>
            <CardHeader
                sx={{ pb: 0 }}
            />
            <CardContent>
                <Grid
                    container
                    spacing={3}
                >
                    <Grid
                        xs={12}
                        md={4}
                    >
                        <Stack
                            alignItems="center"
                            direction="row"
                            spacing={2}
                            sx={{
                                backgroundColor: (theme) => theme.palette.mode === 'dark'
                                    ? 'neutral.800'
                                    : 'error.lightest',
                                borderRadius: 2.5,
                                px: 3,
                                py: 4,
                            }}
                        >
                            <Box
                                sx={{
                                    flexShrink: 0,
                                    height: 48,
                                    width: 48,
                                    '& img': {
                                        width: '100%',
                                    },
                                }}
                            >
                                <img src="/assets/playground/whatsapp.svg" />
                            </Box>
                            <div>
                                <Typography
                                    color="text.secondary"
                                    variant="body2"
                                >
                                    WhatsApp
                                </Typography>
                                <Box sx={{ mt: 2 }}>
                                    <Button
                                        color="info"
                                        endIcon={<ChevronRightIcon />}
                                        size="small"
                                        variant="contained"
                                    >
                                        Selecionar
                                    </Button>
                                </Box>
                            </div>
                        </Stack>
                    </Grid>
                    <Grid
                        xs={12}
                        md={4}
                    >
                        <Stack
                            alignItems="center"
                            direction="row"
                            spacing={2}
                            sx={{
                                backgroundColor: (theme) => theme.palette.mode === 'dark'
                                    ? 'neutral.800'
                                    : 'warning.lightest',
                                borderRadius: 2.5,
                                px: 3,
                                py: 4,
                            }}
                        >
                            <Box
                                sx={{
                                    flexShrink: 0,
                                    height: 48,
                                    width: 48,
                                    '& img': {
                                        width: '100%',
                                    },
                                }}
                            >
                                <img src="/assets/playground/sms.svg" />
                            </Box>
                            <div>
                                <Typography
                                    color="text.secondary"
                                    variant="body2"
                                >
                                    SMS
                                </Typography>
                                <Box sx={{ mt: 2 }}>
                                    <Button
                                        color="info"
                                        endIcon={<ChevronRightIcon />}
                                        size="small"
                                        variant="contained"
                                    >
                                        Selecionar
                                    </Button>
                                </Box>
                            </div>
                        </Stack>
                    </Grid>
                    <Grid
                        xs={12}
                        md={4}
                    >
                        <Stack
                            alignItems="center"
                            direction="row"
                            spacing={2}
                            sx={{
                                backgroundColor: (theme) => theme.palette.mode === 'dark'
                                    ? 'neutral.800'
                                    : 'success.lightest',
                                borderRadius: 2.5,
                                px: 3,
                                py: 4,
                            }}
                        >
                            <Box
                                sx={{
                                    flexShrink: 0,
                                    height: 48,
                                    width: 48,
                                    '& img': {
                                        width: '100%',
                                    },
                                }}
                            >
                                <img src="/assets/playground/email.svg" />
                            </Box>
                            <div>
                                <Typography
                                    color="text.secondary"
                                    variant="body2"
                                >
                                    E-mail
                                </Typography>
                                <Box sx={{ mt: 2 }}>
                                    <Button
                                        color="info"
                                        endIcon={<ChevronRightIcon />}
                                        size="small"
                                        variant="contained"
                                    >
                                        Selecionar
                                    </Button>
                                </Box>
                            </div>
                        </Stack>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

CommunicationBar.propTypes = {
};
