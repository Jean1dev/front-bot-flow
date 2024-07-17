import DotsHorizontalIcon from '@untitled-ui/icons-react/build/esm/DotsHorizontal';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import { useCallback, useEffect, useState } from 'react';
import { numerosApi } from 'src/api/numeros';
import toast from 'react-hot-toast';

export const NumerosVinculadosATypeBots = ({ name, host }) => {
    const [numeros, setNumeros] = useState([])
    const [quantidadeVinculos, setQuantidadeVinculos] = useState(0);

    useEffect(() => {
        numerosApi.getNumerosValidado()
            .then(response => {
                setNumeros(response.data)
            })

        numerosApi.quantidadeVinculosTypeBot({ name, apiHost: host })
            .then(response => setQuantidadeVinculos(response.data.quantidade))
    }, [])

    const vincular = useCallback((id) => {
        toast.loading('Vinculando...', { duration: 1000 })
        numerosApi.vincularTypeBot({
            numeroId: id,
            apiHost: host,
            typebotName: name
        }).then(() => {
            toast.success('Numero vinculado com sucesso')
            setQuantidadeVinculos((prevValues) => (prevValues + 1))
        })
    }, [name, host])

    return (
        <Card>
            <CardHeader
                action={(
                    <IconButton>
                        <SvgIcon>
                            <DotsHorizontalIcon />
                        </SvgIcon>
                    </IconButton>
                )}
                title="Numeros de Whatsapp vinculados"
            />
            <Divider />
            <Box sx={{ display: 'flex' }}>
                <Box
                    sx={{
                        p: 3,
                        flexGrow: 1,
                        '&:first-of-type': {
                            borderRight: (theme) => `1px solid ${theme.palette.divider}`,
                        },
                    }}
                >
                    <Typography
                        align="center"
                        variant="h5"
                    >
                        {numeros.length}
                    </Typography>
                    <Typography
                        align="center"
                        color="text.secondary"
                        component="h4"
                        variant="overline"
                    >
                        Numeros Validos Totais
                    </Typography>
                </Box>
                <Box
                    sx={{
                        p: 3,
                        flexGrow: 1,
                        '&:first-of-type': {
                            borderRight: (theme) => `1px solid ${theme.palette.divider}`,
                        },
                    }}
                >
                    <Typography
                        align="center"
                        variant="h5"
                    >
                        {quantidadeVinculos}
                    </Typography>
                    <Typography
                        align="center"
                        color="text.secondary"
                        component="h4"
                        variant="overline"
                    >
                        Vinculados a esse Typebot
                    </Typography>
                </Box>
            </Box>
            <Divider />
            <List disablePadding>
                {numeros.map((activity, index) => {
                    const showDivider = index < numeros.length - 1;

                    return (
                        <ListItem
                            onClick={() => { vincular(activity.id) }}
                            divider={showDivider}
                            key={activity.id}
                        >
                            <ListItemText
                                disableTypography
                                primary={(
                                    <Link
                                        color="text.primary"
                                        sx={{ cursor: 'pointer' }}
                                        underline="none"
                                        variant="subtitle2"
                                    >
                                        {activity.id}
                                    </Link>
                                )}
                                secondary={(
                                    <Typography
                                        color="text.secondary"
                                        variant="body2"
                                    >
                                        {activity.descricao}
                                    </Typography>
                                )}
                            />
                            <Typography
                                color="text.secondary"
                                noWrap
                                variant="caption"
                            >
                                Clique aqui para vincular o numero ao typebot
                            </Typography>
                        </ListItem>
                    );
                })}
            </List>
        </Card>
    );
}