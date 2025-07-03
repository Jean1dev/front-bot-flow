import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { Seo } from 'src/components/seo';
import { useSettings } from 'src/hooks/use-settings';
import { OverviewBanner } from 'src/components/marketings/overview-banner';
import { OverviewTips } from 'src/components/marketings/overview-tips';
import { useMemo } from 'react';

function saudacao() {
    const agora = new Date();
    const hora = agora.getHours();

    if (hora >= 6 && hora < 12) {
        return "Bom dia";
    } else if (hora >= 12 && hora < 18) {
        return "Boa tarde";
    } else {
        return "Boa noite";
    }
}

const HomePage = () => {
    const settings = useSettings();
    const saudacaoText = useMemo(saudacao, [])

    return (
        <>
            <Seo title="Home" />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8,
                }}
            >
                <Container maxWidth={settings.stretch ? false : 'xl'}>
                    <Grid
                        container
                        disableEqualOverflow
                        spacing={{
                            xs: 3,
                            lg: 4,
                        }}
                    >
                        <Grid xs={12}>
                            <div>
                                <Typography variant="h4">
                                    {saudacaoText}
                                </Typography>
                            </div>
                        </Grid>
                        <Grid
                            xs={12}
                            md={4}
                        >
                        </Grid>
                        <Grid
                            xs={12}
                            md={4}
                        >
                        </Grid>
                        <Grid
                            xs={12}
                            md={4}
                        >
                        </Grid>
                        <Grid
                            xs={12}
                            md={7}
                        >
                            <OverviewBanner />
                        </Grid>
                        <Grid
                            xs={12}
                            md={5}
                        >
                            <OverviewTips
                                sx={{ height: '100%' }}
                                tips={[
                                    {
                                        title: 'Permita o uso de Pop-ups no app',
                                        content: 'Usamos muitos recursos de Abrir em uma nova guia, para permitir uma experiencia mais fluida, por favor autorize o uso de Pop-ups em nossa aplicacao'
                                    },
                                    {
                                        title: 'Duvidas sobre o produto.',
                                        content: 'Acesse a documentacao do produto e tire todas suas duvidas',
                                        link: 'https://jeanlucafpconsultoria.mintlify.app/introduction',
                                        linkLabel: 'acesse aqui'
                                    },
                                    {
                                        title: 'Criticas, sugestoes de melhorias etc...',
                                        content: 'Voce pode agendar uma call comigo gratuitamento',
                                        link: 'https://calendly.com/jeanlucafp/consultoria',
                                        linkLabel: 'Agendar call'
                                    },
                                ]}
                            />
                        </Grid>
                        <Grid
                            xs={12}
                            md={7}
                        >

                        </Grid>
                        <Grid
                            xs={12}
                            md={5}
                        >

                        </Grid>
                        <Grid
                            xs={12}
                            md={7}
                        >

                        </Grid>
                        <Grid
                            xs={12}
                            md={5}
                        >

                        </Grid>
                        <Grid xs={6}>

                        </Grid>
                        <Grid xs={6}>

                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
};

export default HomePage;
