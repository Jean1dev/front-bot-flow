import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useState } from "react";
import {
    CircularProgress,
    Stack,
    Button,
    Dialog
} from '@mui/material';
import axios from 'axios';
import { BaseUrlApiEngine } from '../../constants';

function generateRandomString(length) {
    var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    var result = "";
    for (var i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return result;
}

export const LinkNumberDialog = (props) => {
    const {
        onClose,
        open = false,
        onSubmit = () => {}
    } = props

    const [rawHtml, setRawHtml] = useState(null)
    const [loading, setLoading] = useState(true)

    const code = useMemo(() => {
        const generated = generateRandomString(6)
        console.log('Generated code ', generated)
        return generated
    }, [])

    useEffect(() => {
        axios.post(`${BaseUrlApiEngine}/poc/whats/generate-code`, { code })
            .then(({ data }) => {
                setRawHtml(data)
                setLoading(false)
            })
    }, [code])

    const confirm = useCallback(() => {
        onSubmit(code)
        onClose()
    }, [code, onSubmit])

    return (
        <Dialog
            fullWidth
            maxWidth="sm"
            onClose={onClose}
            open={open}
        >
            {
                loading && (
                    <CircularProgress />
                )
            }
            {
                rawHtml != null && (
                    <div dangerouslySetInnerHTML={{ __html: rawHtml }}></div>
                )
            }
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
                    onClick={confirm}
                    variant="contained"
                >
                    Confirm
                </Button>
            </Stack>
        </Dialog>
    );
}

LinkNumberDialog.propTypes = {
    onClose: PropTypes.func,
    open: PropTypes.bool,
}