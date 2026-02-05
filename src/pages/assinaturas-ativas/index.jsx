import React, { useState, useEffect } from 'react';
import { Seo } from 'src/components/seo';
import {
    Box,
    Container,
    Stack,
    LinearProgress,
    Typography,
    Card,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { planoApi } from 'src/api/plano';

const AssinaturasAtivasPage = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        planoApi.getAssinaturasAtivas()
            .then(response => {
                setItems(Array.isArray(response.data) ? response.data : []);
                setLoading(false);
            })
            .catch(() => {
                setItems([]);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <LinearProgress />;
    }

    return (
        <>
            <Seo title="Assinaturas Ativas" />
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
                                Assinaturas Ativas
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Visualize os usuários com assinaturas ativas e há quanto tempo estão ativos
                            </Typography>
                        </Stack>
                        <Card>
                            <Scrollbar>
                                <Table sx={{ minWidth: 400 }}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Usuário</TableCell>
                                            <TableCell>Ativo há</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {items.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={2} align="center" sx={{ py: 4 }}>
                                                    <Typography color="text.secondary">
                                                        Nenhuma assinatura ativa encontrada
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            items.map((item, index) => (
                                                <TableRow hover key={index}>
                                                    <TableCell>{item.usuario}</TableCell>
                                                    <TableCell>{item.ativoHa}</TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </Scrollbar>
                        </Card>
                    </Stack>
                </Container>
            </Box>
        </>
    );
};

export default AssinaturasAtivasPage;
