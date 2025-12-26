import React, { useState, useEffect, useCallback } from 'react';
import { Seo } from 'src/components/seo';
import {
    Box,
    Container,
    Stack,
    LinearProgress,
    Typography,
    Card,
    CardContent,
    TextField,
    Button,
    Avatar
} from '@mui/material';
import { configuracaoUsuarioApi } from 'src/api/configuracoes-usuario';
import { FileDropzone } from 'src/components/file-dropzone';
import { uploadResource } from 'src/api/api-defaults';
import toast from 'react-hot-toast';

const ConfiguracoesUsuarioPage = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [configuracao, setConfiguracao] = useState({
        name: '',
        logoUrl: ''
    });
    const [files, setFiles] = useState([]);
    const [logoPreview, setLogoPreview] = useState('');

    useEffect(() => {
        carregarConfiguracao();
    }, []);

    const carregarConfiguracao = useCallback(() => {
        setLoading(true);
        configuracaoUsuarioApi.buscar()
            .then(response => {
                const data = response.data;
                setConfiguracao({
                    name: data.name || '',
                    logoUrl: data.logoUrl || ''
                });
                setLogoPreview(data.logoUrl || '');
                setLoading(false);
            })
            .catch((error) => {
                if (error?.response?.status === 400) {
                    setConfiguracao({
                        name: '',
                        logoUrl: ''
                    });
                    setLogoPreview('');
                }
                setLoading(false);
            });
    }, []);

    const handleDrop = useCallback((newFiles) => {
        setFiles(newFiles);
    }, []);

    const handleRemove = useCallback((file) => {
        setFiles((prevFiles) => prevFiles.filter((_file) => _file.path !== file.path));
    }, []);

    const handleRemoveAll = useCallback(() => {
        setFiles([]);
    }, []);

    const handleUpload = useCallback(() => {
        if (files.length === 0) return;

        toast.loading('Fazendo upload do logo, aguarde...', { duration: 4000 });
        uploadResource(files[0])
            .then((url) => {
                toast.success('Logo enviado com sucesso');
                setLogoPreview(url);
                setConfiguracao((prev) => ({ ...prev, logoUrl: url }));
                setFiles([]);
            })
            .catch(() => {
                toast.error('Erro ao fazer upload do logo');
            });
    }, [files]);

    const handleNameChange = useCallback((event) => {
        setConfiguracao((prev) => ({ ...prev, name: event.target.value }));
    }, []);

    const handleSave = useCallback(() => {
        if (!configuracao.name && !configuracao.logoUrl) {
            toast.error('Preencha pelo menos um campo (nome ou logo)');
            return;
        }

        setSaving(true);
        configuracaoUsuarioApi.criarOuAtualizar(configuracao.logoUrl, configuracao.name)
            .then(() => {
                toast.success('Configurações salvas com sucesso');
                carregarConfiguracao();
            })
            .catch(() => {
                toast.error('Erro ao salvar configurações');
            })
            .finally(() => {
                setSaving(false);
            });
    }, [configuracao, carregarConfiguracao]);

    if (loading) {
        return <LinearProgress />;
    }

    return (
        <>
            <Seo title="Configurações do Usuário" />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8,
                }}
            >
                <Container maxWidth="xl">
                    <Stack spacing={4}>
                        <Stack spacing={1}>
                            <Typography variant="h4">
                                Configurações do Usuário
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Gerencie as informações da sua empresa
                            </Typography>
                        </Stack>
                        <Card>
                            <CardContent>
                                <Stack spacing={4}>
                                    <Stack spacing={2}>
                                        <Typography variant="h6">
                                            Logo da Empresa
                                        </Typography>
                                        {logoPreview && (
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 2,
                                                    mb: 2
                                                }}
                                            >
                                                <Avatar
                                                    src={logoPreview}
                                                    sx={{
                                                        width: 120,
                                                        height: 120
                                                    }}
                                                />
                                                <Button
                                                    variant="outlined"
                                                    color="error"
                                                    onClick={() => {
                                                        setLogoPreview('');
                                                        setConfiguracao((prev) => ({ ...prev, logoUrl: '' }));
                                                    }}
                                                >
                                                    Remover Logo
                                                </Button>
                                            </Box>
                                        )}
                                        <FileDropzone
                                            caption="Arraste e solte uma imagem aqui ou clique para selecionar (JPG, PNG, SVG)"
                                            files={files}
                                            onDrop={handleDrop}
                                            onRemove={handleRemove}
                                            onRemoveAll={handleRemoveAll}
                                            onUpload={handleUpload}
                                            accept={{ 'image/*': [] }}
                                            maxFiles={1}
                                        />
                                    </Stack>
                                    <Stack spacing={2}>
                                        <Typography variant="h6">
                                            Nome da Empresa
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            label="Nome da Empresa"
                                            value={configuracao.name}
                                            onChange={handleNameChange}
                                            placeholder="Digite o nome da sua empresa"
                                        />
                                    </Stack>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-end',
                                            gap: 2
                                        }}
                                    >
                                        <Button
                                            variant="outlined"
                                            onClick={carregarConfiguracao}
                                            disabled={saving}
                                        >
                                            Cancelar
                                        </Button>
                                        <Button
                                            variant="contained"
                                            onClick={handleSave}
                                            disabled={saving}
                                        >
                                            {saving ? 'Salvando...' : 'Salvar'}
                                        </Button>
                                    </Box>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Stack>
                </Container>
            </Box>
        </>
    );
};

export default ConfiguracoesUsuarioPage;

