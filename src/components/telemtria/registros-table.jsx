import { useCallback, useState, Fragment } from "react";
import {
    Box,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
    SvgIcon
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { ChevronLeftOutlined, ChevronRight } from '@mui/icons-material';
import { ConsultaItemDetalhe } from "./consulta-item-detalhe";
import { Trash01 } from "@untitled-ui/icons-react";
import { telemetriaApi } from "../../api/telemetria";
import toast from 'react-hot-toast';

export const RegistrosTable = (props) => {
    const {
        count = 0,
        items = [],
        onPageChange,
        onRowsPerPageChange,
        page = 0,
        rowsPerPage = 0
    } = props;

    const [currentItem, setCurrentItem] = useState(null);

    const handleItemToggle = useCallback((itemId) => {
        setCurrentItem((prevItemId) => {
            if (prevItemId === itemId) {
                return null;
            }

            return itemId;
        });
    }, []);

    const handleItemClose = useCallback(() => {
        setCurrentItem(null);
    }, []);

    const deleteItem = useCallback((id) => {
        telemetriaApi.deleteAllByNumber(id)
            .then(() => toast.success('Item enviado para remocao'))
    }, [])

    return (
        <div>
            <Scrollbar>
                <Table sx={{ minWidth: 1200 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell width="25%">
                                ID
                            </TableCell>
                            <TableCell width="25%">
                                Quantidade de registros
                            </TableCell>
                            <TableCell>
                                Numero
                            </TableCell>
                            <TableCell align="right">
                                Ações
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((item) => {
                            const isCurrent = item.numeroId === currentItem;

                            return (
                                <Fragment key={item.numeroId}>
                                    <TableRow
                                        hover
                                        key={item.numeroId}
                                    >
                                        <TableCell
                                            padding="checkbox"
                                            sx={{
                                                ...(isCurrent && {
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
                                                })
                                            }}
                                            width="25%"
                                        >
                                            <IconButton onClick={() => handleItemToggle(item.numeroId)}>
                                                <SvgIcon>
                                                    {isCurrent ? <ChevronLeftOutlined /> : <ChevronRight />}
                                                </SvgIcon>
                                            </IconButton>
                                        </TableCell>
                                        <TableCell width="25%">
                                            <Box
                                                sx={{
                                                    alignItems: 'center',
                                                    display: 'flex'
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        cursor: 'pointer',
                                                        ml: 2
                                                    }}
                                                >
                                                    <Typography variant="subtitle2">
                                                        {item.numeroId}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            {item.quantidade}
                                        </TableCell>
                                        <TableCell>
                                            qualquer coisa
                                        </TableCell>
                                        <TableCell align="right">
                                            <IconButton
                                                onClick={() => deleteItem(item.numeroId)}
                                            >
                                                <SvgIcon>
                                                    <Trash01 />
                                                </SvgIcon>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                    {isCurrent && (
                                        <ConsultaItemDetalhe logs={item.registros}/>
                                    )}
                                </Fragment>
                            );
                        })}
                    </TableBody>
                </Table>
            </Scrollbar>
            <TablePagination
                component="div"
                count={count}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 20, 100]}
            />
        </div>
    );
}