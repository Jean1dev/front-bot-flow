import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';

import { Seo } from 'src/components/seo';
import { useDialog } from 'src/hooks/use-dialog';
import { NumerosListContainer } from 'src/components/numeros/numeros-list-container';
import { NumerosListSearch } from 'src/components/numeros/numeros-list-search';
import { NumerosListTable } from 'src/components/numeros/numeros-list-table';
import { NumerosDrawer } from 'src/components/numeros/numeros-drawer';

const default1 = {
    id: '5ecb8a6879877087d4aa2690',
    createdAt: 'Ha dois dias atras',
    number: '55 (48) 998457797',
    status: 'pending',
    nick: 'meu primeiro fone',
    totalDeliverys: 150,
    totalSpent: 'R$ 0.50'
}

const useOrdersSearch = () => {
    const [state, setState] = useState({
        filters: {
            query: undefined,
            status: undefined,
        },
        page: 0,
        rowsPerPage: 5,
        sortBy: 'createdAt',
        sortDir: 'desc',
    });

    const handleFiltersChange = useCallback((filters) => {
        setState((prevState) => ({
            ...prevState,
            filters,
        }));
    }, []);

    const handleSortChange = useCallback((sortDir) => {
        setState((prevState) => ({
            ...prevState,
            sortDir,
        }));
    }, []);

    const handlePageChange = useCallback((event, page) => {
        setState((prevState) => ({
            ...prevState,
            page,
        }));
    }, []);

    const handleRowsPerPageChange = useCallback((event) => {
        setState((prevState) => ({
            ...prevState,
            rowsPerPage: parseInt(event.target.value, 10),
        }));
    }, []);

    return {
        handleFiltersChange,
        handleSortChange,
        handlePageChange,
        handleRowsPerPageChange,
        state,
    };
};

const useCurrentData = (numbers, Id) => {
    return useMemo(() => {
        if (!Id) {
            return undefined;
        }

        return numbers.find((num) => num.id === Id);
    }, [numbers, Id]);
};

const NumerosListPage = () => {
    const [state, setState] = useState({
        orders: [default1],
        ordersCount: 1,
    });

    const rootRef = useRef(null);
    const ordersSearch = useOrdersSearch();
    const dialog = useDialog();
    const currentNumber = useCurrentData(state.orders, dialog.data);

    const handleOrderOpen = useCallback((orderId) => {
        // Close drawer if is the same order

        if (dialog.open && dialog.data === orderId) {
            dialog.handleClose();
            return;
        }

        dialog.handleOpen(orderId);
    }, [dialog]);

    return (
        <>
            <Seo title="Meus Numeros" />
            <Divider />
            <Box
                component="main"
                ref={rootRef}
                sx={{
                    display: 'flex',
                    flex: '1 1 auto',
                    overflow: 'hidden',
                    position: 'relative',
                }}
            >
                <Box
                    ref={rootRef}
                    sx={{
                        bottom: 0,
                        display: 'flex',
                        left: 0,
                        position: 'absolute',
                        right: 0,
                        top: 0,
                    }}
                >
                    <NumerosListContainer open={dialog.open}>
                        <Box sx={{ p: 3 }}>
                            <Stack
                                alignItems="flex-start"
                                direction="row"
                                justifyContent="space-between"
                                spacing={4}
                            >
                                <div>
                                    <Typography variant="h4">
                                        Meus Numeros
                                    </Typography>
                                </div>
                                <div>
                                    <Button
                                        startIcon={(
                                            <SvgIcon>
                                                <PlusIcon />
                                            </SvgIcon>
                                        )}
                                        onClick={dialog.handleOpen}
                                        variant="contained"
                                    >
                                        Add
                                    </Button>
                                </div>
                            </Stack>
                        </Box>
                        <Divider />
                        <NumerosListSearch
                            onFiltersChange={ordersSearch.handleFiltersChange}
                            onSortChange={ordersSearch.handleSortChange}
                            sortBy={ordersSearch.state.sortBy}
                            sortDir={ordersSearch.state.sortDir}
                        />
                        <Divider />
                        <NumerosListTable
                            count={state.ordersCount}
                            items={state.orders}
                            onPageChange={ordersSearch.handlePageChange}
                            onRowsPerPageChange={ordersSearch.handleRowsPerPageChange}
                            onSelect={handleOrderOpen}
                            page={ordersSearch.state.page}
                            rowsPerPage={ordersSearch.state.rowsPerPage}
                        />
                    </NumerosListContainer>
                    <NumerosDrawer
                        container={rootRef.current}
                        onClose={dialog.handleClose}
                        open={dialog.open}
                        number={currentNumber}
                    />
                </Box>
            </Box>
        </>
    );
};

export default NumerosListPage;
