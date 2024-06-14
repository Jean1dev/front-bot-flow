import { useState } from 'react';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import {
    Stack,
    Typography,
    Button,
    TextField,
    MenuItem,
    SvgIcon,
    OutlinedInput
} from "@mui/material";

const flows = [
    {
        value: 'flow1',
        label: 'Flow 1'
    },
    {
        value: 'flow2',
        label: 'Flow 2'
    }
]

const MensagemDisparoStep = ({ onBack, onFinish }) => {
    const [state, setState] = useState({
        text: '',
        flow: undefined
    })

    const next = () => {
        onFinish(state);
    }

    return (
        <Stack
            spacing={3}
            >
            <div>
                <Typography variant="h6">
                    Digite a mensagem ou escolhar um flow
                </Typography>
            </div>
            <Stack spacing={3}>
                <OutlinedInput
                    fullWidth
                    multiline
                    value={state.text}
                    placeholder="What's on your mind"
                    onChange={(event) => setState({ ...state, text: event.target.value })}
                    rows={3}
                />
                <TextField
                    fullWidth
                    value={state.flow}
                    label="Flow"
                    name='flow'
                    select
                >
                    {flows.map((option) => (
                        <MenuItem
                            key={option.value}
                            value={option.value}
                        >
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </Stack>
            <Stack
                alignItems="center"
                direction="row"
                spacing={2}
            >
                <Button
                    endIcon={(
                        <SvgIcon>
                            <ArrowRightIcon />
                        </SvgIcon>
                    )}
                    onClick={next}
                    variant="contained"
                >
                    Criar Campanha
                </Button>
                <Button
                    color="inherit"
                    onClick={onBack}
                >
                    Voltar
                </Button>
            </Stack>
        </Stack>
    );
}

export default MensagemDisparoStep;