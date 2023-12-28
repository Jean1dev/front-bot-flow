import PropTypes from 'prop-types';
import { BookmarkAdd, X as XIcon } from '@untitled-ui/icons-react/build/esm';
import {
    TextField,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    SvgIcon,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Typography,
    Tooltip,
    IconButton
} from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';

const options = [
    {
        label: "Botao Resposta",
        type: "replyButton",
    },
    {
        label: "Botao de URL",
        type: "urlButton"
    },
    {
        label: "Botao de ligacao para contato",
        type: "callButton"
    }
]

const MessageWithButtonsActionType = ({ onChange }) => {
    const [state, setState] = useState([])
    const [messageTitle, setMessageTitle] = useState('')
    const [footerTitle, setFooterTitle] = useState('')
    const [formType, setFormType] = useState(options[0].type)
    const [valueDynamicForm, setValueDynamicForm] = useState('')

    useEffect(() => {
        onChange({
            type: 'ENVIAR_MESSAGE_BUTTON',
            data: {
                actionsButton: state.map(it => ({
                    type: it.label,
                    response: it.val
                })),
                titleMessage: messageTitle,
                footerMessage: footerTitle
            }
        })
    }, [state, messageTitle, footerTitle])

    const handleRemove = useCallback((opt) => {
        setState((prevFiles) => {
            return prevFiles.filter((_opt) => _opt.label !== opt.label);
        });
    }, []);

    const addOption = useCallback(() => {
        // Permitir somente ate 4 buttons

        setState((prevValues) => {
            return [...prevValues, {
                label: formType,
                val: valueDynamicForm
            }]
        })
        setValueDynamicForm('')

    }, [formType, valueDynamicForm])

    const dinamicForm = useMemo(() => {
        switch (formType) {
            case options[0].type:
                return (
                    <TextField
                        fullWidth
                        label="Opcao da resposta"
                        name="message"
                        required
                        onChange={(e) => {
                            const val = e.target.value
                            setValueDynamicForm(val)
                        }}
                        value={valueDynamicForm}
                    />
                )

            case options[1].type:
                return (
                    <TextField
                        fullWidth
                        label="Link"
                        required
                        onChange={(e) => {
                            const val = e.target.value
                            setValueDynamicForm(val)
                        }}
                        value={valueDynamicForm}
                    />
                )


            case options[2].type:
                return (
                    <TextField
                        fullWidth
                        label="Numero do contato"
                        required
                        onChange={(e) => {
                            const val = e.target.value
                            setValueDynamicForm(val)
                        }}
                        value={valueDynamicForm}
                    />
                )

            default:
                return <></>
        }
    }, [formType, valueDynamicForm])

    return (
        <Box
            sx={{
                backgroundColor: (theme) => theme.palette.mode === 'dark'
                    ? 'neutral.800'
                    : 'neutral.100',
                p: 3,
            }}
        >
            <Card>
                <CardHeader title="Adicione ate 4 botoes" />
                <Divider />
                <CardContent>
                    <TextField
                        fullWidth
                        label="Titulo da mensagem"
                        name="message"
                        required
                        onChange={(e) => {
                            const val = e.target.value
                            setMessageTitle(val)
                        }}
                        value={messageTitle}
                    />
                    <Divider />
                    <TextField
                        fullWidth
                        label="Rodape da mensagem da mensagem (Opcional)"
                        name="message"
                        onChange={(e) => {
                            const val = e.target.value
                            setFooterTitle(val)
                        }}
                        value={footerTitle}
                    />
                    <Divider />
                    <TextField
                        fullWidth
                        name="option"
                        onChange={(event) => setFormType(event.target.value)}
                        select
                        SelectProps={{ native: true }}
                        value={formType}
                        variant="outlined"
                    >
                        {options.map((option, index) => (
                            <option
                                key={index}
                                value={option.type}
                            >
                                {option.label}
                            </option>
                        ))}
                    </TextField>
                    <Divider />
                    {dinamicForm}
                    <Box sx={{ mt: 2 }}>
                        <Button
                            onClick={addOption}
                            startIcon={(
                                <SvgIcon>
                                    <BookmarkAdd />
                                </SvgIcon>
                            )}
                            variant="contained"
                        >
                            Adicionar acao
                        </Button>
                    </Box>
                    <Box sx={{ mt: 2 }}>
                        <Table>
                            <TableBody>
                                {state.map((item, index) => {

                                    return (
                                        <TableRow key={index}>
                                            <TableCell>
                                                <Typography variant="subtitle2">
                                                    {item.label}
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="subtitle2">
                                                    {item?.val}
                                                </Typography>
                                            </TableCell>
                                            <Tooltip title="Remove">
                                                <IconButton
                                                    edge="end"
                                                    onClick={() => handleRemove(item)}
                                                >
                                                    <SvgIcon>
                                                        <XIcon />
                                                    </SvgIcon>
                                                </IconButton>
                                            </Tooltip>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );

}

MessageWithButtonsActionType.propTypes = {
    onChange: PropTypes.func
}

export default MessageWithButtonsActionType