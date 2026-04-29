import {
    Box,
    Card,
    CardContent,
    Chip,
    Divider,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    Paper,
    Alert,
} from '@mui/material';

const CodeBlock = ({ children }) => (
    <Paper
        variant="outlined"
        sx={{
            p: 2,
            bgcolor: 'grey.900',
            color: 'grey.100',
            fontFamily: 'monospace',
            fontSize: '0.82rem',
            overflowX: 'auto',
            borderRadius: 1,
            whiteSpace: 'pre',
        }}
    >
        {children}
    </Paper>
);

const SectionTitle = ({ children, id }) => (
    <Typography variant="h6" id={id} sx={{ mt: 4, mb: 1, fontWeight: 700 }}>
        {children}
    </Typography>
);

const ParamTable = ({ rows }) => (
    <Table size="small" sx={{ mb: 2 }}>
        <TableHead>
            <TableRow sx={{ bgcolor: 'action.hover' }}>
                {['Parâmetro', 'Tipo', 'Obrigatório', 'Padrão', 'Descrição'].map((h) => (
                    <TableCell key={h} sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>{h}</TableCell>
                ))}
            </TableRow>
        </TableHead>
        <TableBody>
            {rows.map((row) => (
                <TableRow key={row[0]} hover>
                    <TableCell><code>{row[0]}</code></TableCell>
                    <TableCell>{row[1]}</TableCell>
                    <TableCell>{row[2]}</TableCell>
                    <TableCell>{row[3] ? <code>{row[3]}</code> : '—'}</TableCell>
                    <TableCell>{row[4]}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
);

const FieldTable = ({ rows }) => (
    <Table size="small" sx={{ mb: 2 }}>
        <TableHead>
            <TableRow sx={{ bgcolor: 'action.hover' }}>
                {['Campo', 'Tipo', 'Descrição'].map((h) => (
                    <TableCell key={h} sx={{ fontWeight: 700 }}>{h}</TableCell>
                ))}
            </TableRow>
        </TableHead>
        <TableBody>
            {rows.map((row) => (
                <TableRow key={row[0]} hover>
                    <TableCell><code>{row[0]}</code></TableCell>
                    <TableCell>{row[1]}</TableCell>
                    <TableCell>{row[2]}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
);

const queryParams = [
    ['limit', 'integer', 'Não', '100', 'Máximo de registros retornados. Máximo permitido: 500.'],
    ['offset', 'integer', 'Não', '0', 'Número de registros a pular (para paginação).'],
    ['event', 'string', 'Não', null, 'Filtra por tipo de evento. Ver Valores válidos abaixo.'],
    ['platform', 'string', 'Não', null, 'Filtra por plataforma do cliente.'],
    ['provider', 'string', 'Não', null, 'Filtra por provedor de IA.'],
    ['planType', 'string', 'Não', null, 'Filtra por tipo de plano do usuário.'],
    ['installId', 'string', 'Não', null, 'Filtra por instalação específica (UUID).'],
    ['appVersion', 'string', 'Não', null, 'Filtra por versão da aplicação (ex: 0.1.8).'],
    ['from', 'string', 'Não', null, 'Data/hora de início (ISO 8601). Ex: 2026-01-01T00:00:00.000Z.'],
    ['to', 'string', 'Não', null, 'Data/hora de fim (ISO 8601). Ex: 2026-12-31T23:59:59.999Z.'],
];

const responseFields = [
    ['data', 'array', 'Lista de eventos, ordenados do mais recente ao mais antigo (savedAt desc).'],
    ['total', 'integer', 'Total de eventos que correspondem aos filtros (ignora limit/offset).'],
    ['limit', 'integer', 'Limite aplicado na consulta.'],
    ['offset', 'integer', 'Offset aplicado na consulta.'],
    ['hasMore', 'boolean', 'true se existem mais eventos além dos retornados.'],
];

const eventFields = {
    'ai.workflow.generation_succeeded': [
        ['requestId', 'string', 'ID da requisição'],
        ['model', 'string', 'Nome do modelo (ex: gpt-4o)'],
        ['provider', 'string', 'Provedor (openai, anthropic, ollama)'],
        ['isStream', 'boolean', 'Se usou streaming'],
        ['durationMs', 'number', 'Duração em milissegundos'],
        ['nodeCount', 'number', 'Qtd de nós no workflow'],
        ['edgeCount', 'number', 'Qtd de arestas no workflow'],
        ['blockTypes', 'string[]', 'Tipos de blocos usados'],
        ['hadClarification', 'boolean', 'Se houve etapa de clarificação'],
        ['retryCount', 'number', 'Número de tentativas'],
        ['sessionTurn', 'number', 'Turno da sessão'],
        ['planType', 'string', 'Plano do usuário'],
        ['quotaRemaining', 'number', 'Cota restante após o evento'],
    ],
    'ai.workflow.generation_failed': [
        ['requestId', 'string', 'ID da requisição'],
        ['model', 'string', 'Nome do modelo'],
        ['provider', 'string', 'Provedor'],
        ['isStream', 'boolean', 'Se usou streaming'],
        ['durationMs', 'number', 'Duração em milissegundos'],
        ['errorCategory', 'string', 'Categoria do erro: network, validation, timeout, quota_provider, unknown'],
        ['planType', 'string', 'Plano do usuário'],
    ],
    'ai.quota.exceeded': [
        ['planType', 'string', 'Plano do usuário'],
        ['limit', 'number', 'Limite de cota configurado'],
        ['feature', 'string', 'Funcionalidade que excedeu (generation)'],
    ],
    'ai.workflow.analysis_succeeded': [
        ['requestId', 'string', 'ID da requisição'],
        ['mode', 'string', 'Modo de análise: explain ou optimize'],
        ['model', 'string', 'Nome do modelo'],
        ['provider', 'string', 'Provedor'],
        ['nodeCount', 'number', 'Qtd de nós'],
        ['edgeCount', 'number', 'Qtd de arestas'],
        ['blockTypes', 'string[]', 'Tipos de blocos'],
        ['durationMs', 'number', 'Duração em milissegundos'],
        ['planType', 'string', 'Plano do usuário'],
    ],
    'ai.workflow.analysis_failed': [
        ['requestId', 'string', 'ID da requisição'],
        ['mode', 'string', 'Modo de análise: explain ou optimize'],
        ['model', 'string', 'Nome do modelo'],
        ['provider', 'string', 'Provedor'],
        ['durationMs', 'number', 'Duração em milissegundos'],
        ['errorCategory', 'string', 'Categoria do erro'],
        ['planType', 'string', 'Plano do usuário'],
    ],
    'ai.template.saved': [
        ['nodeCount', 'number', 'Qtd de nós no template'],
        ['edgeCount', 'number', 'Qtd de arestas no template'],
        ['blockTypes', 'string[]', 'Tipos de blocos'],
    ],
    'ai.template.deleted': [],
    'ai.session.reset': [
        ['turnCount', 'number', 'Número de turnos da sessão antes do reset'],
    ],
};

const validEventValues = [
    ['ai.workflow.generation_succeeded', 'Geração de workflow concluída com sucesso'],
    ['ai.workflow.generation_failed', 'Geração de workflow falhou'],
    ['ai.quota.exceeded', 'Cota do usuário atingida'],
    ['ai.workflow.analysis_succeeded', 'Análise de workflow concluída com sucesso'],
    ['ai.workflow.analysis_failed', 'Análise de workflow falhou'],
    ['ai.template.saved', 'Template salvo'],
    ['ai.template.deleted', 'Template deletado'],
    ['ai.session.reset', 'Sessão reiniciada'],
];

const responseBody200 = `{
  "data": [ ...eventos ],
  "total": 1523,
  "limit": 100,
  "offset": 0,
  "hasMore": true
}`;

const eventExample = `{
  "event": "ai.workflow.generation_succeeded",
  "occurredAt": "2026-04-27T14:32:00.000Z",
  "appVersion": "0.1.8",
  "installId": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "platform": "linux",
  "payload": {
    "requestId": "a3f9c1d2e4b5",
    "model": "gpt-4o",
    "provider": "openai",
    "isStream": true,
    "durationMs": 3240,
    "nodeCount": 5,
    "edgeCount": 4,
    "blockTypes": ["comprar", "delay", "telegram"],
    "hadClarification": false,
    "retryCount": 0,
    "sessionTurn": 2,
    "planType": "free",
    "quotaRemaining": 7
  },
  "savedAt": "2026-04-27T14:32:01.123Z"
}`;

const error400Body = `{
  "error": "invalid_filter",
  "detail": "invalid event value"
}`;

const error503Body = `{
  "error": "storage_unavailable"
}`;

const paginationLogic = `totalPages = Math.ceil(total / limit)
currentPage = Math.floor(offset / limit) + 1
nextOffset = offset + limit   // se hasMore === true
prevOffset = offset - limit   // se offset > 0`;

const BASE_URL = 'https://sales-notify-gkf4c2akhvgsagdt.canadacentral-01.azurewebsites.net';

const examples = [
    { label: 'Listar os 50 eventos mais recentes', url: `GET ${BASE_URL}/v1/events?limit=50` },
    { label: 'Filtrar falhas de geração', url: `GET ${BASE_URL}/v1/events?event=ai.workflow.generation_failed` },
    { label: 'Filtrar por período', url: `GET ${BASE_URL}/v1/events?from=2026-04-01T00:00:00.000Z&to=2026-04-30T23:59:59.999Z` },
    { label: 'Usuários no plano free usando OpenAI', url: `GET ${BASE_URL}/v1/events?planType=free&provider=openai` },
    { label: 'Segunda página de resultados (100 por página)', url: `GET ${BASE_URL}/v1/events?limit=100&offset=100` },
    { label: 'Filtros combinados com paginação', url: `GET ${BASE_URL}/v1/events?event=ai.workflow.generation_succeeded&platform=win32&planType=premium&limit=25&offset=0` },
];

export const EventsApiDocs = () => {
    return (
        <Box sx={{ maxWidth: 960, mx: 'auto', pb: 6 }}>
            <Card variant="outlined">
                <CardContent>
                    <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
                        <Chip label="GET" color="success" size="small" sx={{ fontWeight: 700, fontSize: '0.85rem' }} />
                        <Typography variant="h5" sx={{ fontFamily: 'monospace', fontWeight: 700 }}>
                            /v1/events
                        </Typography>
                    </Stack>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Endpoint para consulta paginada dos eventos de tracking da IA. Todos os filtros são opcionais e combinados com <code>AND</code>.
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 700 }}>Base URL:</Typography>
                        <Typography variant="body2" sx={{ fontFamily: 'monospace', color: 'primary.main' }}>
                            https://sales-notify-gkf4c2akhvgsagdt.canadacentral-01.azurewebsites.net
                        </Typography>
                    </Stack>
                </CardContent>
            </Card>

            {/* Query Parameters */}
            <SectionTitle>Query Parameters</SectionTitle>
            <ParamTable rows={queryParams} />

            {/* Valid Values */}
            <SectionTitle id="valores-validos">Valores válidos</SectionTitle>

            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>event</Typography>
            <Table size="small" sx={{ mb: 3 }}>
                <TableHead>
                    <TableRow sx={{ bgcolor: 'action.hover' }}>
                        <TableCell sx={{ fontWeight: 700 }}>Valor</TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>Descrição</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {validEventValues.map(([val, desc]) => (
                        <TableRow key={val} hover>
                            <TableCell><code>{val}</code></TableCell>
                            <TableCell>{desc}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Stack direction="row" spacing={1} sx={{ mb: 1 }} flexWrap="wrap" useFlexGap>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, alignSelf: 'center' }}>platform:</Typography>
                {['win32', 'darwin', 'linux'].map((v) => <Chip key={v} label={v} size="small" variant="outlined" />)}
            </Stack>
            <Stack direction="row" spacing={1} sx={{ mb: 1 }} flexWrap="wrap" useFlexGap>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, alignSelf: 'center' }}>provider:</Typography>
                {['openai', 'anthropic', 'ollama'].map((v) => <Chip key={v} label={v} size="small" variant="outlined" />)}
            </Stack>
            <Stack direction="row" spacing={1} sx={{ mb: 3 }} flexWrap="wrap" useFlexGap>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, alignSelf: 'center' }}>planType:</Typography>
                {['free', 'premium'].map((v) => <Chip key={v} label={v} size="small" variant="outlined" />)}
            </Stack>

            <Divider sx={{ my: 3 }} />

            {/* Response */}
            <SectionTitle>Response</SectionTitle>

            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                <Chip label="200 OK" color="success" size="small" />
                <Typography variant="body2" color="text.secondary">Sucesso</Typography>
            </Stack>
            <CodeBlock>{responseBody200}</CodeBlock>

            <Typography variant="subtitle2" sx={{ mt: 2, mb: 1, fontWeight: 700 }}>Campos da resposta</Typography>
            <FieldTable rows={responseFields} />

            <Typography variant="subtitle2" sx={{ mt: 2, mb: 1, fontWeight: 700 }}>Estrutura de cada evento em <code>data</code></Typography>
            <CodeBlock>{eventExample}</CodeBlock>

            <Alert severity="info" sx={{ mt: 2, mb: 2 }}>
                O campo <code>payload</code> varia conforme o <code>event</code>. Ver detalhes na seção abaixo.
            </Alert>

            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1, mt: 2 }}>
                <Chip label="400 Bad Request" color="warning" size="small" />
                <Typography variant="body2" color="text.secondary">Filtro inválido</Typography>
            </Stack>
            <CodeBlock>{error400Body}</CodeBlock>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 2 }}>
                Retornado quando qualquer parâmetro de filtro contém um valor fora dos permitidos.
            </Typography>

            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
                <Chip label="503 Service Unavailable" color="error" size="small" />
                <Typography variant="body2" color="text.secondary">Banco indisponível</Typography>
            </Stack>
            <CodeBlock>{error503Body}</CodeBlock>

            <Divider sx={{ my: 3 }} />

            {/* Pagination */}
            <SectionTitle>Paginação</SectionTitle>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Use <code>total</code>, <code>limit</code> e <code>offset</code> para construir paginação:
            </Typography>
            <CodeBlock>{paginationLogic}</CodeBlock>

            <Divider sx={{ my: 3 }} />

            {/* Examples */}
            <SectionTitle>Exemplos de uso</SectionTitle>
            <Stack spacing={2}>
                {examples.map(({ label, url }) => (
                    <Box key={url}>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>{label}</Typography>
                        <CodeBlock>{url}</CodeBlock>
                    </Box>
                ))}
            </Stack>

            <Divider sx={{ my: 3 }} />

            {/* Payload per event */}
            <SectionTitle>Estrutura do payload por tipo de evento</SectionTitle>

            {Object.entries(eventFields).map(([eventName, fields]) => (
                <Box key={eventName} sx={{ mb: 3 }}>
                    <Typography
                        variant="subtitle1"
                        sx={{ fontFamily: 'monospace', fontWeight: 700, mb: 1 }}
                    >
                        {eventName}
                    </Typography>
                    {fields.length === 0 ? (
                        <Typography variant="body2" color="text.secondary">Payload vazio <code>{'{}'}</code>.</Typography>
                    ) : (
                        <FieldTable rows={fields} />
                    )}
                </Box>
            ))}
        </Box>
    );
};
