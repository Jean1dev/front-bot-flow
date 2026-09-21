import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Box, Button, Card, Chip, Container, Dialog, DialogActions,
  DialogContent, DialogTitle, FormControl, InputLabel, LinearProgress,
  MenuItem, Select, Stack, Table, TableBody, TableCell, TableHead,
  TablePagination, TableRow, TextField, Typography,
} from '@mui/material';
import { Seo } from 'src/components/seo';
import { Scrollbar } from 'src/components/scrollbar';
import { anomaliasAcessoApi } from 'src/api/anomalias-acesso';

const levelConfig = {
  BAIXO: { label: 'Baixo', color: 'success' }, MEDIO: { label: 'Médio', color: 'info' },
  ALTO: { label: 'Alto', color: 'warning' }, CRITICO: { label: 'Crítico', color: 'error' },
};
const monthNow = new Date().toISOString().slice(0, 7);

const levelChip = (level) => {
  const config = levelConfig[level] || { label: level || 'Desconhecido', color: 'default' };
  return <Chip size="small" label={config.label} color={config.color} />;
};

const formatMonth = (year, month) => `${String(month).padStart(2, '0')}/${year}`;
const formatDate = (value) => value ? new Date(value).toLocaleString('pt-BR') : '—';

export default function AnomaliasAcessoPage() {
  const [items, setItems] = useState([]);
  const [inicio, setInicio] = useState(monthNow);
  const [fim, setFim] = useState(monthNow);
  const [historico, setHistorico] = useState(false);
  const [nivel, setNivel] = useState('TODOS');
  const [email, setEmail] = useState('');
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(25);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selected, setSelected] = useState(null);

  const load = useCallback(async () => {
    if (!historico && (!inicio || !fim || inicio > fim)) return;
    setLoading(true); setError(false);
    try {
      const response = historico ? await anomaliasAcessoApi.listar() : await anomaliasAcessoApi.listarPorPeriodo(inicio, fim);
      setItems(Array.isArray(response.data) ? response.data : []); setPage(0);
    } catch (_) { setError(true); setItems([]); } finally { setLoading(false); }
  }, [fim, historico, inicio]);

  useEffect(() => { load(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const filtered = useMemo(() => items.filter((item) =>
    (nivel === 'TODOS' || item.nivelSuspeita === nivel) &&
    (!email || (item.emailUsuario || '').toLowerCase().includes(email.toLowerCase()))
  ), [email, items, nivel]);
  const visible = filtered.slice(page * limit, page * limit + limit);

  return <>
    <Seo title="Análise de comportamento" />
    <Box component="main" sx={{ flexGrow: 1, py: 8 }}><Container maxWidth="xl"><Stack spacing={3}>
      <Stack spacing={1}><Typography variant="h4">Análise de comportamento</Typography><Typography color="text.secondary" variant="body2">Identifique padrões de acesso suspeitos por usuário e período.</Typography></Stack>
      <Card sx={{ p: 2 }}><Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems={{ md: 'center' }}>
        <TextField label="Início" type="month" value={inicio} onChange={(e) => setInicio(e.target.value)} InputLabelProps={{ shrink: true }} disabled={historico} />
        <TextField label="Fim" type="month" value={fim} onChange={(e) => setFim(e.target.value)} InputLabelProps={{ shrink: true }} disabled={historico} />
        <Button variant={historico ? 'contained' : 'outlined'} onClick={() => setHistorico(!historico)}>{historico ? 'Todo o histórico' : 'Usar todo o histórico'}</Button>
        <Button variant="contained" onClick={load} disabled={loading || (!historico && inicio > fim)}>Consultar</Button>
      </Stack></Card>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
        <TextField label="Buscar por e-mail" value={email} onChange={(e) => { setEmail(e.target.value); setPage(0); }} sx={{ minWidth: 280 }} />
        <FormControl sx={{ minWidth: 180 }}><InputLabel>Nível</InputLabel><Select value={nivel} label="Nível" onChange={(e) => { setNivel(e.target.value); setPage(0); }}><MenuItem value="TODOS">Todos</MenuItem>{Object.entries(levelConfig).map(([value, config]) => <MenuItem key={value} value={value}>{config.label}</MenuItem>)}</Select></FormControl>
      </Stack>
      {loading && <LinearProgress />}
      {error && <Card sx={{ p: 3 }}><Typography color="error">Não foi possível carregar as anomalias.</Typography><Button onClick={load}>Tentar novamente</Button></Card>}
      {!loading && !error && <Card><Scrollbar><Table sx={{ minWidth: 950 }}><TableHead><TableRow><TableCell>Usuário</TableCell><TableCell>Período</TableCell><TableCell>Nível</TableCell><TableCell>Acessos</TableCell><TableCell>Dias</TableCell><TableCell>Origens</TableCell><TableCell>Localizações</TableCell><TableCell /></TableRow></TableHead><TableBody>
        {visible.length === 0 ? <TableRow><TableCell colSpan={8} align="center" sx={{ py: 5 }}>Nenhuma anomalia encontrada.</TableCell></TableRow> : visible.map((item, index) => <TableRow hover key={`${item.planoId}-${item.ano}-${item.mes}-${index}`}><TableCell>{item.emailUsuario || '—'}</TableCell><TableCell>{formatMonth(item.ano, item.mes)}</TableCell><TableCell>{levelChip(item.nivelSuspeita)}</TableCell><TableCell>{item.totalAcessos}</TableCell><TableCell>{item.diasUnicos}</TableCell><TableCell>{item.origensUnicas}</TableCell><TableCell>{item.localizacoesUnicas}</TableCell><TableCell><Button size="small" onClick={() => setSelected(item)}>Detalhes</Button></TableCell></TableRow>)}
      </TableBody></Table></Scrollbar><TablePagination component="div" count={filtered.length} page={page} rowsPerPage={limit} onPageChange={(_, value) => setPage(value)} onRowsPerPageChange={(e) => { setLimit(Number(e.target.value)); setPage(0); }} rowsPerPageOptions={[10, 25, 50]} /></Card>}
    </Stack></Container></Box>
    <Dialog open={Boolean(selected)} onClose={() => setSelected(null)} fullWidth maxWidth="md"><DialogTitle>Detalhes da anomalia</DialogTitle><DialogContent dividers>{selected && <Stack spacing={2}><Typography><strong>Usuário:</strong> {selected.emailUsuario || '—'} · <strong>Plano:</strong> {selected.planoId || '—'}</Typography><Stack direction="row" spacing={1}>{levelChip(selected.nivelSuspeita)}<Typography variant="body2" sx={{ alignSelf: 'center' }}>{formatMonth(selected.ano, selected.mes)}</Typography></Stack><Typography variant="subtitle2">Motivos da detecção</Typography>{(selected.motivosDeteccao || []).map((motivo) => <Typography key={motivo} variant="body2">• {motivo}</Typography>)}<Typography variant="subtitle2">Acessos registrados</Typography><Table size="small"><TableHead><TableRow><TableCell>Data</TableCell><TableCell>Origem</TableCell><TableCell>Localização</TableCell></TableRow></TableHead><TableBody>{(selected.detalhesAcessos || []).map((acesso, index) => <TableRow key={`${acesso.dataAcesso}-${index}`}><TableCell>{formatDate(acesso.dataAcesso)}</TableCell><TableCell>{acesso.origem || '—'}</TableCell><TableCell>{acesso.localizacao || 'Não informada'}</TableCell></TableRow>)}</TableBody></Table></Stack>}</DialogContent><DialogActions><Button onClick={() => setSelected(null)}>Fechar</Button></DialogActions></Dialog>
  </>;
}
