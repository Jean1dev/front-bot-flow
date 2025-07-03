import React, { useState, useEffect, useCallback } from 'react';
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
    TableRow,
    TablePagination,
    Button,
    SvgIcon
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { SeverityPill } from 'src/components/severity-pill';
import { Plus } from '@untitled-ui/icons-react';
import { CriarInscricaoModal } from '../../components/inscricoes/criar-inscricao-modal';
import { inscricoesApi } from '../../api/inscricoes';

const InscricoesListView = () => {
    const [items, setItems] = useState(null);
    const [loading, setLoading] = useState(true);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        inscricoesApi.listInscricoes({
            size: limit,
            page
        }).then(response => {
            setItems(response.data)
            setLoading(false)
        }).catch(() => {
            setLoading(false)
        })
    }, [limit, page])

    const onRowsPerPageChange = useCallback((val) => {
        setLoading(true)
        setLimit(val.target.value)
    }, [])

    const onPageChange = useCallback((_, it) => {
        setLoading(true)
        setPage(it)
    }, [])

    const handleModalSuccess = useCallback(() => {
        setLoading(true);
        inscricoesApi.listInscricoes({
            size: limit,
            page
        }).then(response => {
            setItems(response.data)
            setLoading(false)
        }).catch(() => {
            setLoading(false)
        })
    }, [limit, page])

    const getStatusBadge = (vigenteAte) => {
        const hoje = new Date();
        const dataVigencia = new Date(vigenteAte);
        const diffTime = dataVigencia.getTime() - hoje.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) {
            return <SeverityPill color="error">Expirado</SeverityPill>;
        } else if (diffDays <= 5) {
            return <SeverityPill color="warning">Expirando</SeverityPill>;
        } else {
            return <SeverityPill color="success">Ativo</SeverityPill>;
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    };

    if (loading) {
        return <LinearProgress />
    }

    return (
        <>
            <Seo title="Inscrições" />
            <Box component="main"
                sx={{
                    flexGrow: 1,
                    py: 8,
                }}
            >
                <Container maxWidth="xl">
                    <Stack spacing={4}>
                                            <Stack
                        direction="row"
                        justifyContent="space-between"
                        spacing={4}
                    >
                        <Stack spacing={1}>
                            <Typography variant="h4">
                                Inscrições
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Gerencie as inscrições e acompanhe o status dos planos
                            </Typography>
                        </Stack>
                        <Stack
                            alignItems="center"
                            direction="row"
                            spacing={3}
                        >
                            <Button
                                startIcon={(
                                    <SvgIcon>
                                        <Plus />
                                    </SvgIcon>
                                )}
                                variant="contained"
                                onClick={() => setModalOpen(true)}
                            >
                                Nova Inscrição
                            </Button>
                        </Stack>
                    </Stack>
                        <Card>
                            <Scrollbar>
                                <Table sx={{ minWidth: 700 }}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Email</TableCell>
                                            <TableCell>Vigente Até</TableCell>
                                            <TableCell>Status</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {items && items.map((item, index) => (
                                            <TableRow
                                                hover
                                                key={index}
                                            >
                                                <TableCell>
                                                    {item.email}
                                                </TableCell>
                                                <TableCell>
                                                    {formatDate(item.vigenteAte)}
                                                </TableCell>
                                                <TableCell>
                                                    {getStatusBadge(item.vigenteAte)}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Scrollbar>
                            {items && (
                                <TablePagination
                                    component="div"
                                    count={items.length}
                                    onPageChange={onPageChange}
                                    onRowsPerPageChange={onRowsPerPageChange}
                                    page={page}
                                    rowsPerPage={limit}
                                    rowsPerPageOptions={[5, 10, 25]}
                                />
                            )}
                        </Card>
                    </Stack>
                </Container>
            </Box>
            <CriarInscricaoModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onSuccess={handleModalSuccess}
            />
        </>
    );
};

export default InscricoesListView; 