import PropTypes from 'prop-types';
import MenuItem from '@mui/material/MenuItem';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useCallback, useState } from 'react';

const numerosVerificados = [
    {
        label: 'Numero verificado 1',
        value: 'healthcare',
    },
    {
        label: 'Numero verificado 2',
        value: 'makeup',
    },
];

export const DetalhesCampanhaStep = (props) => {
    const { onBack, onNext, setCampanha, ...other } = props;
    const [state, setState] = useState({
        title: '',
        number: numerosVerificados[0].value
    })

    const finish = useCallback(() => {
        setCampanha((prevState) => ({ ...prevState, ...state }));
        onNext();
    }, [state])

    return (
        <Stack
            spacing={3}
            {...other}>
            <div>
                <Typography variant="h6">
                    Adicione os detalhes
                </Typography>
            </div>
            <Stack spacing={3}>
                <TextField
                    fullWidth
                    label="Titulo da campanha"
                    name="title"
                    value={state.title}
                    placeholder="e.g Salesforce Analyst"
                    onChange={(e) => setState({...state, title: e.target.value})}
                />
                <TextField
                    defaultValue={numerosVerificados[0].value}
                    fullWidth
                    value={state.number}
                    label="Numero para disparo"
                    name="numero"
                    select
                >
                    {numerosVerificados.map((option) => (
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
                    onClick={finish}
                    variant="contained"
                >
                    Continue
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
};

DetalhesCampanhaStep.propTypes = {
    onBack: PropTypes.func,
    onNext: PropTypes.func,
};
