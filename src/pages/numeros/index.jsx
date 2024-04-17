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

function subDays(val) {
    return new Date()
}

function subHours(val) {
    return new Date()
}

const now = new Date();

const orders = [
    {
        id: '5ecb8a6d9f53bfae09e16115',
        createdAt: subDays(subHours(now, 4), 1).getTime(),
        currency: '$',
        customer: {
            address1: 'Street John Wick, no. 7',
            address2: 'House #25',
            city: 'San Diego',
            country: 'USA',
            email: 'miron.vitold@devias.io',
            name: 'Miron Vitold'
        },
        items: [
            {
                id: '5ecb8abbdd6dfb1f9d6bf98b',
                billingCycle: 'monthly',
                currency: '$',
                name: 'Project Points',
                quantity: 25,
                unitAmount: 50.25
            },
            {
                id: '5ecb8ac10f116d04bed990eb',
                billingCycle: 'monthly',
                currency: '$',
                name: 'Freelancer Subscription',
                quantity: 1,
                unitAmount: 5.00
            }
        ],
        number: 'DEV-102',
        paymentMethod: 'CreditCard',
        status: 'pending',
        totalAmount: 500.00
    },
    {
        id: '5ecb8a738aa6f3e577c2b3ec',
        createdAt: subDays(subHours(now, 7), 1).getTime(),
        currency: '$',
        customer: {
            address1: 'Street John Wick, no. 7',
            address2: 'House #25',
            city: 'San Diego',
            country: 'USA',
            email: 'miron.vitold@devias.io',
            name: 'Miron Vitold'
        },
        items: [
            {
                id: '5ecb8abbdd6dfb1f9d6bf98b',
                billingCycle: 'monthly',
                currency: '$',
                name: 'Project Points',
                quantity: 25,
                unitAmount: 50.25
            },
            {
                id: '5ecb8ac10f116d04bed990eb',
                billingCycle: 'monthly',
                currency: '$',
                name: 'Freelancer Subscription',
                quantity: 1,
                unitAmount: 5.00
            }
        ],
        number: 'DEV-101',
        paymentMethod: 'PayPal',
        status: 'complete',
        totalAmount: 324.50
    },
    {
        id: '5ecb8a795e53f134013eba3b',
        createdAt: subDays(subHours(now, 2), 2).getTime(),
        currency: '$',
        customer: {
            address1: 'Street John Wick, no. 7',
            address2: 'House #25',
            city: 'San Diego',
            country: 'USA',
            email: 'miron.vitold@devias.io',
            name: 'Miron Vitold'
        },
        items: [
            {
                id: '5ecb8abbdd6dfb1f9d6bf98b',
                billingCycle: 'monthly',
                currency: '$',
                name: 'Project Points',
                quantity: 25,
                unitAmount: 50.25
            },
            {
                id: '5ecb8ac10f116d04bed990eb',
                billingCycle: 'monthly',
                currency: '$',
                name: 'Freelancer Subscription',
                quantity: 1,
                unitAmount: 5.00
            }
        ],
        number: 'DEV-100',
        paymentMethod: 'CreditCard',
        status: 'canceled',
        totalAmount: 746.50
    },
    {
        id: '5ecb8a7f738cc572a9ce0277',
        createdAt: subDays(subHours(now, 3), 5).getTime(),
        currency: '$',
        customer: {
            address1: 'Street John Wick, no. 7',
            address2: 'House #25',
            city: 'San Diego',
            country: 'USA',
            email: 'miron.vitold@devias.io',
            name: 'Miron Vitold'
        },
        items: [
            {
                id: '5ecb8abbdd6dfb1f9d6bf98b',
                billingCycle: 'monthly',
                currency: '$',
                name: 'Project Points',
                quantity: 25,
                unitAmount: 50.25
            },
            {
                id: '5ecb8ac10f116d04bed990eb',
                billingCycle: 'monthly',
                currency: '$',
                name: 'Freelancer Subscription',
                quantity: 1,
                unitAmount: 5.00
            }
        ],
        number: 'DEV-99',
        paymentMethod: 'PayPal',
        status: 'rejected',
        totalAmount: 56.89
    },
    {
        id: '5e86805e2bafd54f66cc95c3',
        createdAt: subDays(subHours(now, 1), 6).getTime(),
        currency: '$',
        customer: {
            address1: 'Street John Wick, no. 7',
            address2: 'House #25',
            city: 'San Diego',
            country: 'USA',
            email: 'miron.vitold@devias.io',
            name: 'Miron Vitold'
        },
        items: [
            {
                id: '5ecb8abbdd6dfb1f9d6bf98b',
                billingCycle: 'monthly',
                currency: '$',
                name: 'Project Points',
                quantity: 25,
                unitAmount: 50.25
            },
            {
                id: '5ecb8ac10f116d04bed990eb',
                billingCycle: 'monthly',
                currency: '$',
                name: 'Freelancer Subscription',
                quantity: 1,
                unitAmount: 5.00
            }
        ],
        number: 'DEV-98',
        paymentMethod: 'PayPal',
        status: 'complete',
        totalAmount: 541.59
    },
    {
        id: '5ecb8a85a850c16fa413849c',
        createdAt: subDays(subHours(now, 3), 7).getTime(),
        currency: '$',
        customer: {
            address1: 'Street John Wick, no. 7',
            address2: 'House #25',
            city: 'San Diego',
            country: 'USA',
            email: 'miron.vitold@devias.io',
            name: 'Miron Vitold'
        },
        items: [
            {
                id: '5ecb8abbdd6dfb1f9d6bf98b',
                billingCycle: 'monthly',
                currency: '$',
                name: 'Project Points',
                quantity: 25,
                unitAmount: 50.25
            },
            {
                id: '5ecb8ac10f116d04bed990eb',
                billingCycle: 'monthly',
                currency: '$',
                name: 'Freelancer Subscription',
                quantity: 1,
                unitAmount: 5.00
            }
        ],
        status: 'pending',
        number: 'DEV-97',
        paymentMethod: 'CreditCard',
        totalAmount: 941.21
    },
    {
        id: '5ecb8a8e69ba2e409ea0168f',
        createdAt: subDays(subHours(now, 6), 8).getTime(),
        currency: '$',
        customer: {
            address1: 'Street John Wick, no. 7',
            address2: 'House #25',
            city: 'San Diego',
            country: 'USA',
            email: 'miron.vitold@devias.io',
            name: 'Miron Vitold'
        },
        items: [
            {
                id: '5ecb8abbdd6dfb1f9d6bf98b',
                billingCycle: 'monthly',
                currency: '$',
                name: 'Project Points',
                quantity: 25,
                unitAmount: 50.25
            },
            {
                id: '5ecb8ac10f116d04bed990eb',
                billingCycle: 'monthly',
                currency: '$',
                name: 'Freelancer Subscription',
                quantity: 1,
                unitAmount: 5.00
            }
        ],
        number: 'DEV-96',
        paymentMethod: 'CreditCard',
        status: 'complete',
        totalAmount: 499.12
    },
    {
        id: '5ecb8a9341c68839d387e1c4',
        createdAt: subDays(subHours(now, 7), 8).getTime(),
        currency: '$',
        customer: {
            address1: 'Street John Wick, no. 7',
            address2: 'House #25',
            city: 'San Diego',
            country: 'USA',
            email: 'miron.vitold@devias.io',
            name: 'Miron Vitold'
        },
        items: [
            {
                id: '5ecb8abbdd6dfb1f9d6bf98b',
                billingCycle: 'monthly',
                currency: '$',
                name: 'Project Points',
                quantity: 25,
                unitAmount: 50.25
            },
            {
                id: '5ecb8ac10f116d04bed990eb',
                billingCycle: 'monthly',
                currency: '$',
                name: 'Freelancer Subscription',
                quantity: 1,
                unitAmount: 5.00
            }
        ],
        number: 'DEV-95',
        paymentMethod: 'PayPal',
        status: 'rejected',
        totalAmount: 588.75
    },
    {
        id: '5ecb8a984bfbb97c9ae458e8',
        createdAt: subDays(subHours(now, 6), 9).getTime(),
        currency: '$',
        customer: {
            address1: 'Street John Wick, no. 7',
            address2: 'House #25',
            city: 'San Diego',
            country: 'USA',
            email: 'miron.vitold@devias.io',
            name: 'Miron Vitold'
        },
        items: [
            {
                id: '5ecb8abbdd6dfb1f9d6bf98b',
                billingCycle: 'monthly',
                currency: '$',
                name: 'Project Points',
                quantity: 25,
                unitAmount: 50.25
            },
            {
                id: '5ecb8ac10f116d04bed990eb',
                billingCycle: 'monthly',
                currency: '$',
                name: 'Freelancer Subscription',
                quantity: 1,
                unitAmount: 5.00
            }
        ],
        number: 'DEV-94',
        paymentMethod: 'CreditCard',
        status: 'canceled',
        totalAmount: 399.99
    },
    {
        id: '5ecb8aa08d9127dba654ce7a',
        createdAt: subDays(subHours(now, 3), 10).getTime(),
        currency: '$',
        customer: {
            address1: 'Street John Wick, no. 7',
            address2: 'House #25',
            city: 'San Diego',
            country: 'USA',
            email: 'miron.vitold@devias.io',
            name: 'Miron Vitold'
        },
        items: [
            {
                id: '5ecb8abbdd6dfb1f9d6bf98b',
                billingCycle: 'monthly',
                currency: '$',
                name: 'Project Points',
                quantity: 25,
                unitAmount: 50.25
            },
            {
                id: '5ecb8ac10f116d04bed990eb',
                billingCycle: 'monthly',
                currency: '$',
                name: 'Freelancer Subscription',
                quantity: 1,
                unitAmount: 5.00
            }
        ],
        number: 'DEV-93',
        paymentMethod: 'PayPal',
        status: 'canceled',
        totalAmount: 500.00
    }
]

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

const useOrdersStore = (searchState) => {
    const [state, setState] = useState({
        orders: [],
        ordersCount: 0,
    });

    const handleOrdersGet = useCallback(async () => {
        try {
            setState({
                orders: orders,
                ordersCount: orders.length,
            });
        } catch (err) {
            console.error(err);
        }
    }, [searchState]);

    useEffect(
        () => {
            handleOrdersGet();
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [searchState],
    );

    return {
        ...state,
    };
};

const useCurrentOrder = (orders, orderId) => {
    return useMemo(() => {
        if (!orderId) {
            return undefined;
        }

        return orders.find((order) => order.id === orderId);
    }, [orders, orderId]);
};

const NumerosListPage = () => {
    const rootRef = useRef(null);
    const ordersSearch = useOrdersSearch();
    const ordersStore = useOrdersStore(ordersSearch.state);
    const dialog = useDialog();
    const currentOrder = useCurrentOrder(ordersStore.orders, dialog.data);

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
                            count={ordersStore.ordersCount}
                            items={ordersStore.orders}
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
                        order={currentOrder}
                    />
                </Box>
            </Box>
        </>
    );
};

export default NumerosListPage;
