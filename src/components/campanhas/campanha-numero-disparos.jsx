import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import SvgIcon from '@mui/material/SvgIcon';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { FileDropzone } from '../file-dropzone';
import Papa from "papaparse";
import { uploadResource } from 'src/api/api-defaults';
import toast from 'react-hot-toast';

export const CampanhaNumeroDisparos = (props) => {
    const { onBack, onNext, setNumeros, addFiles, ...other } = props;
    const [alert, setAlert] = useState(null);
    const [tag, setTag] = useState('');
    const [tags, setTags] = useState([]);
    const [files, setFiles] = useState([]);

    const handleDrop = useCallback((newFiles) => {
        const file = newFiles[0];
        const extensao = file.name.split('.').pop();

        if (extensao.toLowerCase() === 'txt') {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target.result;
                const lines = content.split('\n');
                setAlert({
                    type: 'success',
                    text: `${lines.length} numeros adicionados`
                })
                setTags((prevState) => {
                    return [...prevState, ...lines];
                });

                setFiles((prevFiles) => {
                    return [...prevFiles, ...newFiles];
                });
            };
            reader.readAsText(file);
            return
        }

        if (extensao.toLowerCase === 'csv') {
            Papa.parse(newFiles[0], {
                header: true,
                skipEmptyLines: true,
                complete: function (results) {
                    if (results.errors && results.errors.length > 0) {
                        const message = results.errors.map((error) => error.message).join('\n');
                        setAlert({
                            type: 'error',
                            text: message
                        })
                        return
                    }
    
                    const rowsArray = [];
                    const valuesArray = [];
    
                    results.data.map((d) => {
                        rowsArray.push(Object.keys(d));
                        valuesArray.push(Object.values(d));
                    });
    
    
                    setFiles((prevFiles) => {
                        return [...prevFiles, ...newFiles];
                    });
    
                    setTags((prevState) => {
                        return [...prevState, ...valuesArray.map(arrayInterno => arrayInterno[1])];
                    })
    
                    setAlert({
                        type: 'success',
                        text: `${valuesArray.length} numeros adicionados`
                    })
                },
            });
            return
        }
        
        setAlert({
            type: 'error',
            text: `Tipo de arquivo nao suportado`
        })

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
        setAlert(null)
        setTags((prevState) => {
            return [...prevState, tag];
        });
    }, []);

    const handleTagDelete = useCallback((tag) => {
        setTags((prevState) => {
            return prevState.filter((t) => t !== tag);
        });
    }, []);

    const finish = useCallback(() => {
        setNumeros(tags)
        onNext()
    }, [tags, onNext, setNumeros]);

    const onUpload = useCallback(() => {
        files.forEach(resource => {
            uploadResource(resource)
                .then((fileUrl) => {
                    toast.success(`${resource.name} uploaded`)
                    addFiles(fileUrl)
                })
                .catch((error) => {
                    console.log(error)
                    toast.error(`${resource.name} uploaded failed`)
                })
        })
    }, [files]);

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
                {
                    alert && (
                        <Alert severity={alert.type}>{alert.text}</Alert>
                    )
                }
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
                    Upload de arquivo CSV e Txt
                </Typography>
                <Typography variant="body1">
                    Formatos e modelos acessa a documentao pelo
                </Typography>
                <Typography variant="body1">
                    <a href="https://jeanlucafpconsultoria.mintlify.app/upload-files" target="_blank">Link</a>
                </Typography>
                <FileDropzone
                    accept={{ '*/*': [] }}
                    caption="Max file size is 3 MB"
                    files={files}
                    onDrop={handleDrop}
                    onRemove={handleRemove}
                    onRemoveAll={handleRemoveAll}
                    onUpload={onUpload}
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

CampanhaNumeroDisparos.propTypes = {
    onBack: PropTypes.func,
    onNext: PropTypes.func,
};
