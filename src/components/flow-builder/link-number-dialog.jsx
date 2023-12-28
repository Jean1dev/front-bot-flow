import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import {
    CircularProgress,
    Stack,
    Button,
    Dialog
} from '@mui/material';
import axios from 'axios';

export const LinkNumberDialog = (props) => {
    const {
        onClose,
        open = false
    } = props

    const [rawHtml, setRawHtml] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.post('https://bot-builder-engine-2242d70bd3b3.herokuapp.com/poc/whats/generate-code')
            .then(({ data }) => {
                setRawHtml(data)
                setLoading(false)
            })
    }, [])

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
                    onClick={onClose}
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