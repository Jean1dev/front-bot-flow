import PropTypes from 'prop-types';
import Trash02Icon from '@untitled-ui/icons-react/build/esm/Trash02';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import SimpleMessageActionType from './simple-message-action-type';
import MessageWithImageActionType from './message-with-image-action-type';
import MessageWithButtonsActionType from './message-with-buttons-action-type';

const ACTIONS_TYPES = [
    {
        type: 'ENVIAR_MENSAGEM',
        label: 'Enviar Mensagem',
        info: 'Envia uma mensagem de texto'
    },
    {
        type: 'ENVIAR_IMAGEM',
        label: 'Enviar imagem',
        info: 'Envia uma mensagem com uma imagem em anexo'
    },
    {
        type: 'ENVIAR_MENSAGEM_COM_BOTOES',
        label: 'Enviar Mensagens com botoes',
        info: 'Envia uma mensagem com botoes clicaveis'
    },
]

const initialState = {
    name: '',
    phone: '',
    desc: '',
    final: false,
    type: ACTIONS_TYPES[0].type
}

export const AddNodeDialog = (props) => {
    const {
        onClose,
        open = false,
        onConfirm = () => { },
        phase = 'start'
    } = props;

    const [state, setState] = useState(initialState)

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    };

    const setAction = (data) => {
        console.log('setAction', data)
        setState({ ...state, action: data })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        onConfirm(state)
        setState(initialState)
        onClose()
    }

    return (
        <Dialog
            fullWidth
            maxWidth="sm"
            onClose={onClose}
            open={open}
        >
            <form onSubmit={onSubmit}>
                <Box sx={{ p: 3 }}>
                    <Typography
                        align="center"
                        gutterBottom
                        variant="h5"
                    >
                        Adicionar Iteracao
                    </Typography>
                </Box>
                <Stack
                    spacing={2}
                    sx={{ p: 3 }}
                >
                    <TextField
                        fullWidth
                        label="Nome da acao"
                        name="name"
                        required
                        onChange={handleChange}
                        value={state.name}
                    />
                    {phase === 'start' && (
                        <TextField
                            fullWidth
                            label="Telefone"
                            name="phone"
                            required
                            onChange={handleChange}
                            value={state.phone}
                        />
                    )}
                    <TextField
                        fullWidth
                        label="Descricao"
                        name="desc"
                        onChange={handleChange}
                        value={state.desc}
                    />
                    <Select
                        name="type"
                        value={state.type}
                        onChange={handleChange}
                    >
                        {
                            ACTIONS_TYPES.map((item, index) => (
                                <MenuItem key={index} value={item.type}>{item.label}</MenuItem>
                            ))
                        }
                    </Select>
                    <FormControlLabel
                        control={(
                            <Switch
                                checked={state.final}
                                name="final"
                                onChange={handleChange}
                            />
                        )}
                        label="Acao que ira finalizar o atendimento"
                    />

                    {
                        state.type === ACTIONS_TYPES[0].type && (
                            <SimpleMessageActionType onChange={setAction} />
                        )
                    }

                    {
                        state.type === ACTIONS_TYPES[1].type && (
                            <MessageWithImageActionType onChange={setAction} />
                        )
                    }

                    {
                        state.type === ACTIONS_TYPES[2].type && (
                            <MessageWithButtonsActionType onChange={setAction} />
                        )
                    }


                    <FormHelperText error>
                        Erros de validacao irao aparecer aqui
                    </FormHelperText>

                </Stack>
                <Divider />
                <Stack
                    alignItems="center"
                    direction="row"
                    justifyContent="space-between"
                    spacing={1}
                    sx={{ p: 2 }}
                >
                    <IconButton onClick={() => { }}>
                        <SvgIcon>
                            <Trash02Icon />
                        </SvgIcon>
                    </IconButton>
                    <Stack
                        alignItems="center"
                        direction="row"
                        spacing={1}
                    >
                        <Button
                            color="inherit"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                        >
                            Confirm
                        </Button>
                    </Stack>
                </Stack>
            </form>
        </Dialog>
    );
};

AddNodeDialog.propTypes = {
    onClose: PropTypes.func,
    open: PropTypes.bool,
    onConfirm: PropTypes.func,
    phase: PropTypes.string
};
