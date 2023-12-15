import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

const SimpleMessageActionType = ({ onChange }) => {
    const [message, setMessage] = useState('')

    return (
        <TextField
            fullWidth
            label="Mensagem que sera enviada para o usuario"
            name="message"
            required
            onChange={(e) => {
                const val = e.target.value
                setMessage(val)
                onChange({
                    type: 'ENVIAR_MENSAGEM',
                    data: {
                        message: val
                    }
                })
            }}
            value={message}
        />
    )
}

SimpleMessageActionType.propTypes = {
    onChange: PropTypes.func
}

export default SimpleMessageActionType