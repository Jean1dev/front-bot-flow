import PropTypes from 'prop-types';
import {
    TextField,
    Stack,
    Avatar,
    SvgIcon,
    Typography,
    Box,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Tooltip,
    IconButton,
    Button
} from '@mui/material';
import Upload01Icon from '@untitled-ui/icons-react/build/esm/Upload01';
import XIcon from '@untitled-ui/icons-react/build/esm/X';
import { useCallback, useState } from 'react';
import { FileIcon } from '../file-icon';
import { useDropzone } from 'react-dropzone';

/* eslint-disable no-restricted-properties */
export const bytesToSize = (bytes, decimals = 2) => {
    if (bytes === 0) {
        return '0 Bytes';
    }

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

const MessageWithImageActionType = ({ onChange }) => {
    const [state, setState] = useState({
        desc: '',
        url: ''
    })
    const [files, setFiles] = useState([]);

    const handleDrop = useCallback((newFiles) => {
        setFiles((prevFiles) => {
            return [...prevFiles, ...newFiles];
        });
    }, []);

    const handleRemove = useCallback((file) => {
        setFiles((prevFiles) => {
            return prevFiles.filter((_file) => _file.path !== file.path);
        });
    }, []);

    const handleRemoveAll = useCallback(() => {
        setFiles([]);
    }, []);

    const handleUpload = useCallback(() => {

    }, [state, files])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: { 'image/*': [] },
        onDrop: handleDrop
    });

    return (
        <>
            <TextField
                fullWidth
                label="Titulo da imagem"
                name="message"
                required
                onChange={(e) => {
                    const val = e.target.value
                    setState({ ...state, desc: val })
                    onChange({
                        type: 'ENVIAR_IMAGEM',
                        data: state
                    })
                }}
                value={state.desc}
            />
            <div>
                {files.length == 0 && (
                    <Box
                        sx={{
                            alignItems: 'center',
                            border: 1,
                            borderRadius: 1,
                            borderStyle: 'dashed',
                            borderColor: 'divider',
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            outline: 'none',
                            p: 6,
                            ...(isDragActive && {
                                backgroundColor: 'action.active',
                                opacity: 0.5,
                            }),
                            '&:hover': {
                                backgroundColor: 'action.hover',
                                cursor: 'pointer',
                                opacity: 0.5,
                            },
                        }}
                        {...getRootProps()}>
                        <input {...getInputProps()} />
                        <Stack
                            alignItems="center"
                            direction="row"
                            spacing={2}
                        >
                            <Avatar
                                sx={{
                                    height: 64,
                                    width: 64,
                                }}
                            >
                                <SvgIcon>
                                    <Upload01Icon />
                                </SvgIcon>
                            </Avatar>
                            <Stack spacing={1}>
                                <Typography
                                    sx={{
                                        '& span': {
                                            textDecoration: 'underline',
                                        },
                                    }}
                                    variant="h6"
                                >
                                    <span>Click to upload</span> or drag and drop
                                </Typography>
                                <Typography
                                    color="text.secondary"
                                    variant="body2"
                                >
                                    (SVG, JPG, PNG, or gif maximum 900x400)
                                </Typography>
                            </Stack>
                        </Stack>
                    </Box>
                )}
                {files.length > 0 && (
                    <Box sx={{ mt: 2 }}>
                        <List>
                            {files.map((file) => {
                                const extension = file.name.split('.').pop();

                                return (
                                    <ListItem
                                        key={file.path}
                                        sx={{
                                            border: 1,
                                            borderColor: 'divider',
                                            borderRadius: 1,
                                            '& + &': {
                                                mt: 1,
                                            },
                                        }}
                                    >
                                        <ListItemIcon>
                                            <FileIcon extension={extension} />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={file.name}
                                            primaryTypographyProps={{ variant: 'subtitle2' }}
                                            secondary={bytesToSize(file.size)}
                                        />
                                        <Tooltip title="Remove">
                                            <IconButton
                                                edge="end"
                                                onClick={() => handleRemove(file)}
                                            >
                                                <SvgIcon>
                                                    <XIcon />
                                                </SvgIcon>
                                            </IconButton>
                                        </Tooltip>
                                    </ListItem>
                                );
                            })}
                        </List>
                        <Stack
                            alignItems="center"
                            direction="row"
                            justifyContent="flex-end"
                            spacing={2}
                            sx={{ mt: 2 }}
                        >
                            <Button
                                color="inherit"
                                onClick={handleRemoveAll}
                                size="small"
                                type="button"
                            >
                                Remove All
                            </Button>
                            <Button
                                onClick={handleUpload}
                                size="small"
                                type="button"
                                variant="contained"
                            >
                                Upload
                            </Button>
                        </Stack>
                    </Box>
                )}
            </div>
        </>
    )
}

MessageWithImageActionType.propTypes = {
    onChange: PropTypes.func
}

export default MessageWithImageActionType