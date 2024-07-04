import PropTypes from 'prop-types';
import Edit02Icon from '@untitled-ui/icons-react/build/esm/Edit02';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { Scrollbar } from 'src/components/scrollbar';
import { Trash01 } from '@untitled-ui/icons-react';

export const SimpleListTable = (props) => {
    const { items = [], cellName } = props
    return (
        <Box sx={{ position: 'relative' }}>

            <Scrollbar>
                <Table sx={{ minWidth: 700 }}>
                    <TableHead>
                        <TableRow>
                            {
                                cellName.map((name, index) => (<TableCell key={index}>{name}</TableCell>))
                            }
                            <TableCell align="right">
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((item) => {

                            return (
                                <TableRow
                                    hover
                                    key={item.id}
                                >
                                    {
                                        cellName.map((name, index) => (
                                            <TableCell key={index}>
                                                {item[name]}
                                            </TableCell>
                                        ))
                                    }

                                    {/* <TableCell align="right">
                                        {
                                            editAction && (
                                                <IconButton
                                                    onClick={() => editAction(item)}
                                                >
                                                    <SvgIcon>
                                                        <Edit02Icon />
                                                    </SvgIcon>
                                                </IconButton>
                                            )
                                        }
                                        <IconButton
                                            onClick={() => onDeleteClick(item.id)}
                                        >
                                            <SvgIcon>
                                                <Trash01 />
                                            </SvgIcon>
                                        </IconButton>
                                    </TableCell> */}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Scrollbar>
        </Box>
    );
}

export const DefaultListTable = (props) => {
    const {
        count = 0, items = [], onDeselectAll, onDeselectOne, onPageChange = () => {
        }, onRowsPerPageChange, onSelectAll, onSelectOne, page = 0, rowsPerPage = 0, selected = [],
        cellName = [], editAction = null, onDeleteClick = () => { }
    } = props;

    const selectedSome = (selected.length > 0) && (selected.length < items.length);
    const selectedAll = (items.length > 0) && (selected.length === items.length);
    const enableBulkActions = selected.length > 0;

    return (
        <Box sx={{ position: 'relative' }}>
            {enableBulkActions && (
                <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                        alignItems: 'center',
                        backgroundColor: (theme) => theme.palette.mode === 'dark'
                            ? 'neutral.800'
                            : 'neutral.50',
                        display: enableBulkActions ? 'flex' : 'none',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        px: 2,
                        py: 0.5,
                        zIndex: 10,
                    }}
                >
                    <Checkbox
                        checked={selectedAll}
                        indeterminate={selectedSome}
                        onChange={(event) => {
                            if (event.target.checked) {
                                onSelectAll?.();
                            } else {
                                onDeselectAll?.();
                            }
                        }}
                    />
                    <Button
                        color="inherit"
                        size="small"
                    >
                        Delete
                    </Button>
                    <Button
                        color="inherit"
                        size="small"
                    >
                        Edit
                    </Button>
                </Stack>
            )}
            <Scrollbar>
                <Table sx={{ minWidth: 700 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    checked={selectedAll}
                                    indeterminate={selectedSome}
                                    onChange={(event) => {
                                        if (event.target.checked) {
                                            onSelectAll?.();
                                        } else {
                                            onDeselectAll?.();
                                        }
                                    }}
                                />
                            </TableCell>
                            {
                                cellName.map((name, index) => (<TableCell key={index}>{name}</TableCell>))
                            }
                            <TableCell align="right">
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((item) => {
                            const isSelected = selected.includes(item.id);

                            return (
                                <TableRow
                                    hover
                                    key={item.id}
                                    selected={isSelected}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={isSelected}
                                            onChange={(event) => {
                                                if (event.target.checked) {
                                                    onSelectOne?.(item.id);
                                                } else {
                                                    onDeselectOne?.(item.id);
                                                }
                                            }}
                                            value={isSelected}
                                        />
                                    </TableCell>
                                    {
                                        cellName.map((name, index) => (
                                            <TableCell key={index}>
                                                {item[name]}
                                            </TableCell>
                                        ))
                                    }

                                    <TableCell align="right">
                                        {
                                            editAction && (
                                                <IconButton
                                                    onClick={() => editAction(item)}
                                                >
                                                    <SvgIcon>
                                                        <Edit02Icon />
                                                    </SvgIcon>
                                                </IconButton>
                                            )
                                        }
                                        <IconButton
                                            onClick={() => onDeleteClick(item.id)}
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
            <TablePagination
                component="div"
                count={count}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
                labelRowsPerPage="Registros por pagina"
            />
        </Box>
    );
};

DefaultListTable.propTypes = {
    count: PropTypes.number,
    items: PropTypes.array,
    onDeselectAll: PropTypes.func,
    onDeselectOne: PropTypes.func,
    onPageChange: PropTypes.func,
    onRowsPerPageChange: PropTypes.func,
    onSelectAll: PropTypes.func,
    onSelectOne: PropTypes.func,
    page: PropTypes.number,
    rowsPerPage: PropTypes.number,
    selected: PropTypes.array,
    cellName: PropTypes.array,
    editAction: PropTypes.func,
    onDeleteClick: PropTypes.func
};
