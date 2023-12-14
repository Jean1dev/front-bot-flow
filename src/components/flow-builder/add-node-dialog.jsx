import PropTypes from 'prop-types';
import Trash02Icon from '@untitled-ui/icons-react/build/esm/Trash02';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
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

export const AddNodeDialog = (props) => {
    const {
        onClose,
        open = false,
        onConfirm = () => { }
    } = props;

    const [state, setState] = useState({
        name: ''
    })

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    };

    const onSubmit = (e) => {
        e.preventDefault()
        onConfirm(state)
        setState({ name: ' ' })
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
                        onChange={handleChange}
                        value={state.name}
                    />
                    <TextField
                        fullWidth
                        label="Description"
                        name="description"
                        onChange={() => { }}
                    />
                    <FormControlLabel
                        control={(
                            <Switch
                                checked={true}
                                name="allDay"
                                onChange={() => { }}
                            />
                        )}
                        label="All day"
                    />

                    <FormHelperText error>
                        Erros
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
    onConfirm: PropTypes.func
};
