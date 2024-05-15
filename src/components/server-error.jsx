import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/paths';

const ServerError = () => (
    <>
        <Box
            component="main"
            sx={{
                alignItems: 'center',
                display: 'flex',
                flexGrow: 1,
                py: '80px',
            }}
        >
            <Container maxWidth="lg">
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mb: 6,
                    }}
                >
                    <Box
                        alt="Internal server error"
                        component="img"
                        src="/assets/error-500.png"
                        sx={{
                            height: 'auto',
                            maxWidth: '100%',
                            width: 400,
                        }}
                    />
                </Box>
                <Typography
                    align="center"
                    variant='h4'
                >
                    500: Internal Server Error
                </Typography>
                <Typography
                    align="center"
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                >
                    You either tried some shady route or you came here by mistake. Whichever it is, try using the navigation.
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        mt: 6,
                    }}
                >
                    <Button
                        href={paths.index}
                    >
                        Back to Home
                    </Button>
                </Box>
            </Container>
        </Box>
    </>
);

export default ServerError;
