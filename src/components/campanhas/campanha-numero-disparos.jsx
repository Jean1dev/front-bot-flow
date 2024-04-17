import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@mui/material/MenuItem';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { FileDropzone } from '../file-dropzone';

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

export const CampanhaNumeroDisparos = (props) => {
    const { onBack, onNext, ...other } = props;
    const [tag, setTag] = useState('');
    const [tags, setTags] = useState([]);
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

    const handleTagAdd = useCallback((tag) => {
        setTags((prevState) => {
            return [...prevState, tag];
        });
    }, []);

    const handleTagDelete = useCallback((tag) => {
        setTags((prevState) => {
            return prevState.filter((t) => t !== tag);
        });
    }, []);

    return (
        <Stack
            spacing={3}
            {...other}>
            <div>
                <Typography variant="h6">
                    Adicione os numeros para disparar
                </Typography>
            </div>
            <Stack spacing={3}>
                <TextField
                    fullWidth
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Button
                                    color="inherit"
                                    sx={{ ml: 2 }}
                                    onClick={() => {
                                        if (!tag) {
                                            return;
                                        }

                                        handleTagAdd(tag);
                                        setTag('');
                                    }}
                                >
                                    Add
                                </Button>
                            </InputAdornment>
                        ),
                    }}
                    label="Numeros"
                    name="tags"
                    onChange={(event) => setTag(event.target.value)}
                    value={tag}
                />
                <Typography variant="h6">
                    Upload de arquivo csv. Formato nome;numero
                </Typography>
                <FileDropzone
                    accept={{ '*/*': [] }}
                    caption="Max file size is 3 MB"
                    files={files}
                    onDrop={handleDrop}
                    onRemove={handleRemove}
                    onRemoveAll={handleRemoveAll}
                    onUpload={() => { }}
                />
                <Stack
                    alignItems="center"
                    direction="row"
                    flexWrap="wrap"
                    spacing={1}
                >
                    {tags.map((tag, index) => (
                        <Chip
                            key={index}
                            label={tag}
                            onDelete={() => handleTagDelete(tag)}
                            variant="outlined"
                        />
                    ))}
                </Stack>
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
                    onClick={onNext}
                    variant="contained"
                >
                    Criar campanha
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

CampanhaNumeroDisparos.propTypes = {
    onBack: PropTypes.func,
    onNext: PropTypes.func,
};
