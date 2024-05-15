import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const AguardandoAuth = () => (
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
                    alt="Not authorized"
                    component="img"
                    src="/assets/error-401.png"
                    sx={{
                        height: 'auto',
                        maxWidth: '100%',
                        width: 400,
                    }}
                />
            </Box>
            <Typography
                align="center"
                variant="h4"
            >
                401: Authorization required
            </Typography>
            <Typography
                align="center"
                color="text.secondary"
                sx={{ mt: 0.5 }}
            >
                Estamos recuperando os dados de identidade para acessar os seus recursos.
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mt: 6,
                }}
            >
                <CircularProgress />

            </Box>
        </Container>
    </Box>
);

export default AguardandoAuth;