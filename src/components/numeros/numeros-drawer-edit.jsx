import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useCallback, useState } from 'react';

const statusOptions = [
    {
        label: 'Criado',
        value: 'CRIADO',
    },
    {
        label: 'Validado',
        value: 'VALIDADO',
    },
    {
        label: 'Pendente',
        value: 'PENDENTE',
    },
    {
        label: 'Banido',
        value: 'BANIDO',
    },
];

export const NumberDrawerEdit = (props) => {
    const { onCancel, onSave, number } = props;
    const [state, setState] = useState({
        id: number?.id,
        number: number?.number,
        createdAt: number?.createdAt || new Date(),
        status: number?.status || 'Novo',
        nick: number?.nick,
    })

    const handleChange = useCallback((event) => {
        setState((prevValues) => ({
            ...prevValues,
            [event.target.name]: event.target.value
        }));
    }, [])

    return (
        <Stack spacing={6}>
            <Stack spacing={3}>
                <Typography variant="h6">
                    Detalhes
                </Typography>
                <Stack spacing={3}>
                    <TextField
                        disabled
                        fullWidth
                        label="ID"
                        name="id"
                        value={state.id}
                    />
                    <TextField
                        fullWidth
                        label="Numero"
                        name="number"
                        onChange={handleChange}
                        value={state.number}
                    />
                    <TextField
                        fullWidth
                        label="Apelido"
                        name="nick"
                        onChange={handleChange}
                        value={state.nick}
                    />
                    <TextField
                        disabled
                        fullWidth
                        label="Data criacao"
                        name="date"
                        value={state.createdAt}
                    />
                    <TextField
                        fullWidth
                        label="Status"
                        name="status"
                        select
                        disabled
                        SelectProps={{ native: true }}
                        value={state.status}
                    >
                        {statusOptions.map((option) => (
                            <option
                                key={option.value}
                                value={option.value}
                            >
                                {option.label}
                            </option>
                        ))}
                    </TextField>
                </Stack>
                <Stack
                    alignItems="center"
                    direction="row"
                    flexWrap="wrap"
                    spacing={2}
                >
                    <Button
                        color="primary"
                        onClick={() => onSave(state)}
                        size="small"
                        variant="contained"
                    >
                        Save changes
                    </Button>
                    <Button
                        color="inherit"
                        onClick={onCancel}
                        size="small"
                    >
                        Cancel
                    </Button>
                </Stack>
            </Stack>
        </Stack>
    );
};

NumberDrawerEdit.propTypes = {
    onCancel: PropTypes.func,
    number: PropTypes.object,
};
