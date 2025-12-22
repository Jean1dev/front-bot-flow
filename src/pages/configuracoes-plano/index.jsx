import React, { useState, useEffect } from 'react';
import { Seo } from 'src/components/seo';
import {
    Box,
    Container,
    Stack,
    LinearProgress,
    Typography,
    Card,
    CardContent
} from '@mui/material';
import { configuracaoApi } from 'src/api/configuracoes';

const ConfiguracoesPlanoPage = () => {
    const [tenantData, setTenantData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        configuracaoApi.getTenant()
            .then(response => {
                setTenantData(response.data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <LinearProgress />
    }

    return (
        <>
            <Seo title="Configurações de Plano" />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8,
                }}
            >
                <Container maxWidth="xl">
                    <Stack spacing={4}>
                        <Stack spacing={1}>
                            <Typography variant="h4">
                                Configurações de Plano
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Visualize as informações do seu tenant
                            </Typography>
                        </Stack>
                        <Card>
                            <CardContent>
                                <Stack spacing={2}>
                                    <Typography variant="h6">
                                        Informações do Tenant
                                    </Typography>
                                    {tenantData && (
                                        <Stack spacing={1}>
                                            <Typography variant="body1">
                                                <strong>Tenant ID:</strong> {tenantData.tenantId || 'Não informado'}
                                            </Typography>
                                        </Stack>
                                    )}
                                </Stack>
                            </CardContent>
                        </Card>
                    </Stack>
                </Container>
            </Box>
        </>
    );
};

export default ConfiguracoesPlanoPage;

