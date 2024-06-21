import {
    Table,
    TableBody,
    TableCell,
    TableRow,
    Typography,
    CardContent,
    Divider,
    SvgIcon,
    IconButton
} from '@mui/material'
import { Trash01 } from '@untitled-ui/icons-react';
import { useCallback } from 'react';
import { Scrollbar } from 'src/components/scrollbar';
import { SeverityPill } from 'src/components/severity-pill'
import { telemetriaApi } from '../../api/telemetria';
import toast from 'react-hot-toast';

export const ConsultaItemDetalhe = (props) => {
    const { logs } = props
    
    const deleteItem = useCallback((id) => {
        telemetriaApi.deleteById(id)
            .then(() => toast.success('Item enviado para remocao'))
    }, [])

    return (
        <TableRow>
            <TableCell
                colSpan={7}
                sx={{
                    p: 0,
                    position: 'relative',
                    '&:after': {
                        position: 'absolute',
                        content: '" "',
                        top: 0,
                        left: 0,
                        backgroundColor: 'primary.main',
                        width: 3,
                        height: 'calc(100% + 1px)'
                    }
                }}
            >
                <CardContent>
                    <Scrollbar>
                        <Table >
                            <TableBody>
                                {logs.map((log) => {
                                    const statusColor = log.status === 'played' ? 'success' : 'error';

                                    return (
                                        <TableRow key={log.id}>
                                            <TableCell width="100">
                                                <Typography variant="subtitle2">
                                                    {log.remoteJid}
                                                </Typography>
                                            </TableCell>
                                            <TableCell width="64">
                                                <SeverityPill color={statusColor}>
                                                    {log.status}
                                                </SeverityPill>
                                            </TableCell>
                                            <TableCell>
                                                {log.id}
                                            </TableCell>
                                            <TableCell align="right">
                                            <IconButton
                                                onClick={() => deleteItem(log.id)}
                                            >
                                                <SvgIcon>
                                                    <Trash01 />
                                                </SvgIcon>
                                            </IconButton>
                                        </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </Scrollbar>
                </CardContent>
                <Divider />

            </TableCell>
        </TableRow>
    )
}