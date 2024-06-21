import { Seo } from 'src/components/seo';
import {
    Box,
    Container,
    Stack,
    Typography,
    Tabs,
    Tab,
    Divider
} from '@mui/material'
import { useState, useCallback } from 'react';
import { RealTimeStreaming } from 'src/components/telemtria/real-time-streaming';
import { ConsultaTelemetria } from 'src/components/telemtria/consulta';

const tabs = [
    { label: 'Console', value: 'geral' },
    { label: 'Registros', value: 'registros' },
];

const TelemetriaPage = () => {
    const [currentTab, setCurrentTab] = useState('geral');

    const handleTabsChange = useCallback((_event, value) => {
        setCurrentTab(value);
    }, []);

    return (
        <>
            <Seo title="Telemetria" />
            <Box
                component="main"
                sx={{ flexGrow: 1 }}
            >
                <Container maxWidth="xl">
                    <Stack
                        spacing={3}
                        sx={{ mb: 3 }}
                    >
                        <Typography variant="h4">
                            Acompanhamento em tempo real
                        </Typography>

                        <div>
                            <Tabs
                                indicatorColor="primary"
                                onChange={handleTabsChange}
                                scrollButtons="auto"
                                textColor="primary"
                                value={currentTab}
                                variant="scrollable"
                            >
                                {tabs.map((tab) => (
                                    <Tab
                                        key={tab.value}
                                        label={tab.label}
                                        value={tab.value}
                                    />
                                ))}
                            </Tabs>
                            <Divider />
                        </div>
                    </Stack>
                    {currentTab === 'geral' && (
                        <RealTimeStreaming/>
                    )}
                    {currentTab === 'registros' && (
                        <ConsultaTelemetria/>
                    )}
                </Container>
            </Box>
        </>
    )
}

export default TelemetriaPage;