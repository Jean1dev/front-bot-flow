import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SvgIcon from '@mui/material/SvgIcon';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Tab from '@mui/material/Tab';
import MenuItem from '@mui/material/MenuItem';
import Tabs from '@mui/material/Tabs';
import OutlinedInput from '@mui/material/OutlinedInput';
import useMediaQuery from '@mui/material/useMediaQuery';
import EmojiPicker from 'emoji-picker-react';
import { AttachEmail, EmojiEmotions, Image } from '@mui/icons-material';

import { Docs } from './internal/docs';
import { useState, useCallback, useMemo, useEffect } from 'react';
import { cUrlDocs, javaDocs, pythonDocs } from './internal/docs-types';
import toast from 'react-hot-toast';
import { playGroundApi } from 'src/api/playground';
import { numerosApi } from 'src/api/numeros';
import { botEngineApi } from 'src/api/bot-engine';

const ApiDocsStep = () => {
    const [currentTab, setCurrentTab] = useState('curl');

    const handleTabsChange = useCallback((_event, value) => {
        setCurrentTab(value);
    }, []);

    const docs = useMemo(() => {
        switch (currentTab) {
            case 'curl':
                return cUrlDocs;
            case 'java':
                return javaDocs;
            case 'python':
                return pythonDocs;
            default:
                return cUrlDocs;
        }
    }, [currentTab])

    return (
        <Box
            sx={{
                position: 'relative',
                pb: 6,
            }}
        >
            <Card>
                <CardHeader
                    title={docs.title}
                    subheader={docs.description}
                />
                <Tabs
                    onChange={handleTabsChange}
                    value={currentTab}
                    sx={{ px: 3 }}
                >
                    <Tab
                        label="cURL"
                        value="curl"
                    />
                    <Tab
                        label="Java"
                        value="java"
                    />
                    <Tab
                        label="Python"
                        value="python"
                    />
                </Tabs>
                <Divider />
                <CardContent>
                    <Docs content={docs.lesson || ''} />
                </CardContent>
            </Card>
            <Box
                sx={{
                    bottom: 20,
                    display: 'flex',
                    justifyContent: 'center',
                    left: 0,
                    position: 'absolute',
                    right: 0,
                    zIndex: 1,
                }}
            >
            </Box>
        </Box>
    );
}

export const WhatsappForm = () => {
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
    const [textMessage, setTextMessage] = useState('');
    const [numeroEnvio, setNumeroEnvio] = useState('');
    const [senderId, setSenderId] = useState('');
    const [numerosValidados, setNumerosValidados] = useState([])
    const smUp = useMediaQuery((theme) => theme.breakpoints.up('sm'));

    const handleReaction = (emojiObject) => {
        setTextMessage((prevValues) => prevValues + emojiObject.emoji);
    };

    const formatarNumero = (event) => {
        const numero = event.target.value
        const numeroFormatado = numero.toString().replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2- $3');
        setNumeroEnvio(numeroFormatado)
    }

    const onSubmit = (event) => {
        event.preventDefault()

        playGroundApi.send({
            "senderId": senderId,
            "recipientNumber": numeroEnvio,
            "message": textMessage
        }).then(({ data }) => {

            if (data.success) {
                setNumeroEnvio('')
                toast.success(data.message)
                return
            }

            if (data.needValidadeNumber) {
                toast.error(data.message)
                toast.success('Gerando seu QrCode')

                numerosApi.getById(data.senderId)
                    .then(response => {
                        const result = response.data;
                        const { whatsappInternalId } = result

                        botEngineApi.generateNewQrCode(whatsappInternalId)
                            .then(response => {
                                const html = response.data;
                                const newTab = window.open('', '_blank');
                                newTab.document.write(html);
                            })
                    })

                return
            }

            toast.error(data.message)

        })
    }

    useEffect(() => {
        numerosApi.getNumerosValidado()
            .then(({ data }) => {
                setNumerosValidados(data.map(item => ({
                    value: item.id,
                    label: item.descricao
                })))
            })
    }, [])

    return (
        <Box sx={{ p: 3 }}>
            <ApiDocsStep />
            <form onSubmit={onSubmit}>

                <Typography
                    sx={{
                        mt: 3,
                        mb: 2,
                    }}
                    variant="subtitle2"
                >
                    Selecione um numero valido para disparar a mensagem de WhatsApp
                </Typography>
                <TextField
                    fullWidth
                    value={senderId}
                    label="Numero para disparo"
                    name='senderId'
                    onChange={(event) => setSenderId(event.target.value)}
                    select
                >
                    {numerosValidados.map((option) => (
                        <MenuItem
                            key={option.value}
                            value={option.value}
                        >
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>


                <Typography
                    sx={{
                        mt: 3,
                        mb: 2,
                    }}
                    variant="subtitle2"
                >
                    Informe o numero para enviar a mensagem
                </Typography>

                <TextField
                    fullWidth
                    label="Numero para enviar"
                    name="phone"
                    value={numeroEnvio}
                    onChange={formatarNumero}
                    required
                />
                <Typography
                    sx={{
                        mt: 3,
                        mb: 2,
                    }}
                    variant="subtitle2"
                >
                    Mensagem
                </Typography>
                <Stack
                    spacing={3}
                    sx={{ flexGrow: 1 }}
                >
                    <OutlinedInput
                        fullWidth
                        multiline
                        value={textMessage}
                        placeholder="What's on your mind"
                        onChange={(event) => setTextMessage(event.target.value)}
                        rows={3}
                    />
                    <EmojiPicker
                        onEmojiClick={handleReaction}
                        open={openEmojiPicker}
                    />
                    <Stack
                        alignItems="center"
                        direction="row"
                        justifyContent="space-between"
                        spacing={3}
                    >
                        {smUp && (
                            <Stack
                                alignItems="center"
                                direction="row"
                                spacing={1}
                            >
                                <IconButton onClick={() => alert('Upload in devlopement')}>
                                    <SvgIcon>
                                        <Image />
                                    </SvgIcon>
                                </IconButton>
                                <IconButton>
                                    <SvgIcon>
                                        <AttachEmail />
                                    </SvgIcon>
                                </IconButton>
                                <IconButton onClick={() => setOpenEmojiPicker(!openEmojiPicker)}>
                                    <SvgIcon>
                                        <EmojiEmotions />
                                    </SvgIcon>
                                </IconButton>
                            </Stack>
                        )}
                    </Stack>
                </Stack>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        mt: 3,
                    }}
                >
                    <Button
                        type="submit"
                        variant="contained"
                    >
                        Enviar
                    </Button>
                </Box>
            </form>
        </Box>
    );
}
