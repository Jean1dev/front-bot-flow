import { useState, useCallback, Fragment } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Collapse,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    SvgIcon,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
    Typography,
} from '@mui/material';
import { ChevronLeftOutlined, ChevronRight } from '@mui/icons-material';
import { Scrollbar } from 'src/components/scrollbar';
import { eventsApi } from 'src/api/events';

const EVENT_TYPES = [
    'ai.workflow.generation_succeeded',
    'ai.workflow.generation_failed',
    'ai.quota.exceeded',
    'ai.workflow.analysis_succeeded',
    'ai.workflow.analysis_failed',
    'ai.template.saved',
    'ai.template.deleted',
    'ai.session.reset',
];

const PLATFORMS = ['win32', 'darwin', 'linux'];
const PROVIDERS = ['openai', 'anthropic', 'ollama'];
const PLAN_TYPES = ['free', 'premium'];

const EVENT_COLOR = {
    'ai.workflow.generation_succeeded': 'success',
    'ai.workflow.analysis_succeeded': 'success',
    'ai.template.saved': 'info',
    'ai.workflow.generation_failed': 'error',
    'ai.workflow.analysis_failed': 'error',
    'ai.quota.exceeded': 'warning',
    'ai.template.deleted': 'warning',
    'ai.session.reset': 'default',
};

const emptyFilters = {
    event: '',
    platform: '',
    provider: '',
    planType: '',
    installId: '',
    appVersion: '',
    from: '',
    to: '',
};

const PayloadRow = ({ event, payload }) => (
    <TableRow>
        <TableCell colSpan={6} sx={{ py: 0 }}>
            <Collapse in unmountOnExit>
                <Box sx={{ py: 2, px: 3 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }}>Payload</Typography>
                    <Box
                        component="pre"
                        sx={{
                            m: 0,
                            p: 1.5,
                            bgcolor: 'grey.900',
                            color: 'grey.100',
                            borderRadius: 1,
                            fontSize: '0.78rem',
                            overflowX: 'auto',
                            fontFamily: 'monospace',
                        }}
                    >
                        {JSON.stringify({ event, ...payload }, null, 2)}
                    </Box>
                </Box>
            </Collapse>
        </TableCell>
    </TableRow>
);

const EventsTable = ({ items, total, page, rowsPerPage, onPageChange, onRowsPerPageChange }) => {
    const [expandedRow, setExpandedRow] = useState(null);

    const toggleRow = useCallback((idx) => {
        setExpandedRow((prev) => (prev === idx ? null : idx));
    }, []);

    return (
        <div>
            <Scrollbar>
                <Table sx={{ minWidth: 900 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>Evento</TableCell>
                            <TableCell>Ocorrido em</TableCell>
                            <TableCell>Plataforma</TableCell>
                            <TableCell>Versão</TableCell>
                            <TableCell>Install ID</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                                    <Typography color="text.secondary">Nenhum evento encontrado</Typography>
                                </TableCell>
                            </TableRow>
                        )}
                        {items.map((item, idx) => {
                            const isExpanded = expandedRow === idx;
                            return (
                                <Fragment key={idx}>
                                    <TableRow hover>
                                        <TableCell padding="checkbox">
                                            <IconButton size="small" onClick={() => toggleRow(idx)}>
                                                <SvgIcon fontSize="small">
                                                    {isExpanded ? <ChevronLeftOutlined /> : <ChevronRight />}
                                                </SvgIcon>
                                            </IconButton>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={item.event}
                                                color={EVENT_COLOR[item.event] || 'default'}
                                                size="small"
                                                sx={{ fontFamily: 'monospace', fontSize: '0.72rem' }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2">
                                                {new Date(item.occurredAt).toLocaleString('pt-BR')}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>{item.platform || '—'}</TableCell>
                                        <TableCell>{item.appVersion || '—'}</TableCell>
                                        <TableCell>
                                            <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.78rem' }}>
                                                {item.installId ? `${item.installId.slice(0, 8)}…` : '—'}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                    {isExpanded && (
                                        <PayloadRow event={item.event} payload={item.payload || {}} />
                                    )}
                                </Fragment>
                            );
                        })}
                    </TableBody>
                </Table>
            </Scrollbar>
            <TablePagination
                component="div"
                count={total}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
                rowsPerPageOptions={[25, 50, 100]}
                labelRowsPerPage="Por página"
            />
        </div>
    );
};

export const ConsultaEventos = () => {
    const [filters, setFilters] = useState(emptyFilters);
    const [appliedFilters, setAppliedFilters] = useState(emptyFilters);
    const [events, setEvents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    const buildParams = useCallback((f, p, rpp) => {
        const params = { limit: rpp, offset: p * rpp };
        if (f.event) params.event = f.event;
        if (f.platform) params.platform = f.platform;
        if (f.provider) params.provider = f.provider;
        if (f.planType) params.planType = f.planType;
        if (f.installId) params.installId = f.installId;
        if (f.appVersion) params.appVersion = f.appVersion;
        if (f.from) params.from = new Date(f.from).toISOString();
        if (f.to) params.to = new Date(f.to).toISOString();
        return params;
    }, []);

    const fetchEvents = useCallback((f, p, rpp) => {
        setLoading(true);
        eventsApi.get(buildParams(f, p, rpp))
            .then((res) => {
                setEvents(res.data.data || []);
                setTotal(res.data.total || 0);
            })
            .finally(() => setLoading(false));
    }, [buildParams]);

    const handleSearch = useCallback(() => {
        setPage(0);
        setAppliedFilters(filters);
        setSearched(true);
        fetchEvents(filters, 0, rowsPerPage);
    }, [filters, fetchEvents, rowsPerPage]);

    const handleClear = useCallback(() => {
        setFilters(emptyFilters);
        setAppliedFilters(emptyFilters);
        setEvents([]);
        setTotal(0);
        setPage(0);
        setSearched(false);
    }, []);

    const handlePageChange = useCallback((_e, newPage) => {
        setPage(newPage);
        fetchEvents(appliedFilters, newPage, rowsPerPage);
    }, [appliedFilters, fetchEvents, rowsPerPage]);

    const handleRowsPerPageChange = useCallback((e) => {
        const rpp = parseInt(e.target.value, 10);
        setRowsPerPage(rpp);
        setPage(0);
        fetchEvents(appliedFilters, 0, rpp);
    }, [appliedFilters, fetchEvents]);

    const handleFilterChange = (field) => (e) => {
        setFilters((prev) => ({ ...prev, [field]: e.target.value }));
    };

    return (
        <Stack spacing={3}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 700 }}>Filtros</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={3}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Tipo de evento</InputLabel>
                                <Select
                                    value={filters.event}
                                    label="Tipo de evento"
                                    onChange={handleFilterChange('event')}
                                >
                                    <MenuItem value=""><em>Todos</em></MenuItem>
                                    {EVENT_TYPES.map((e) => (
                                        <MenuItem key={e} value={e} sx={{ fontFamily: 'monospace', fontSize: '0.78rem' }}>{e}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Plataforma</InputLabel>
                                <Select value={filters.platform} label="Plataforma" onChange={handleFilterChange('platform')}>
                                    <MenuItem value=""><em>Todas</em></MenuItem>
                                    {PLATFORMS.map((p) => <MenuItem key={p} value={p}>{p}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Provedor</InputLabel>
                                <Select value={filters.provider} label="Provedor" onChange={handleFilterChange('provider')}>
                                    <MenuItem value=""><em>Todos</em></MenuItem>
                                    {PROVIDERS.map((p) => <MenuItem key={p} value={p}>{p}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <FormControl fullWidth size="small">
                                <InputLabel>Plano</InputLabel>
                                <Select value={filters.planType} label="Plano" onChange={handleFilterChange('planType')}>
                                    <MenuItem value=""><em>Todos</em></MenuItem>
                                    {PLAN_TYPES.map((p) => <MenuItem key={p} value={p}>{p}</MenuItem>)}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField
                                fullWidth
                                size="small"
                                label="Install ID"
                                value={filters.installId}
                                onChange={handleFilterChange('installId')}
                                placeholder="UUID da instalação"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField
                                fullWidth
                                size="small"
                                label="Versão do app"
                                value={filters.appVersion}
                                onChange={handleFilterChange('appVersion')}
                                placeholder="ex: 0.1.8"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField
                                fullWidth
                                size="small"
                                label="De (data)"
                                type="datetime-local"
                                value={filters.from}
                                onChange={handleFilterChange('from')}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField
                                fullWidth
                                size="small"
                                label="Até (data)"
                                type="datetime-local"
                                value={filters.to}
                                onChange={handleFilterChange('to')}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                    </Grid>
                    <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                        <Button variant="contained" onClick={handleSearch} disabled={loading}>
                            {loading ? <CircularProgress size={18} sx={{ mr: 1 }} /> : null}
                            Buscar
                        </Button>
                        <Button variant="outlined" onClick={handleClear} disabled={loading}>
                            Limpar
                        </Button>
                    </Stack>
                </CardContent>
            </Card>

            {searched && (
                <Card>
                    <Box sx={{ px: 3, py: 1.5 }}>
                        <Typography variant="body2" color="text.secondary">
                            {loading ? 'Carregando…' : `${total} evento(s) encontrado(s)`}
                        </Typography>
                    </Box>
                    <EventsTable
                        items={events}
                        total={total}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        onPageChange={handlePageChange}
                        onRowsPerPageChange={handleRowsPerPageChange}
                    />
                </Card>
            )}
        </Stack>
    );
};
