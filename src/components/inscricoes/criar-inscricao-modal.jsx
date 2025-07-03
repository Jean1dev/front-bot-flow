import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Stack} from '@mui/material';
import { inscricoesApi } from '../../api/inscricoes';
import toast from 'react-hot-toast';
import { sendSMS } from '../../api/api-defaults';

export const CriarInscricaoModal = ({ open, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        email: '',
        telefone: ''
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleInputChange = (field) => (event) => {
        setFormData(prev => ({
            ...prev,
            [field]: event.target.value
        }));
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.email) {
            newErrors.email = 'Email é obrigatório';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email inválido';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        
        try {
            await inscricoesApi.criarInscricao({
                data: {
                    email: formData.email,
                    periodoPlano: "MENSAL"
                }
            });
            
            if (formData.telefone) {
                await sendSMS(formData.telefone, "Assinatura ativa no software de arbitragem");
            }

            toast.success('Inscrição criada com sucesso!');
            onSuccess();
            handleClose();
        } catch (error) {
            toast.error('Erro ao criar inscrição');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setFormData({ email: '', telefone: '' });
        setErrors({});
        setLoading(false);
        onClose();
    };

    return (
        <Dialog 
            open={open} 
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle>
                Nova Inscrição
            </DialogTitle>
            <DialogContent>
                <Stack spacing={3} sx={{ mt: 1 }}>
                    <TextField
                        label="Email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange('email')}
                        error={!!errors.email}
                        helperText={errors.email}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Telefone"
                        value={formData.telefone}
                        onChange={handleInputChange('telefone')}
                        error={!!errors.telefone}
                        helperText={errors.telefone}
                        fullWidth
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button 
                    onClick={handleClose}
                    disabled={loading}
                >
                    Cancelar
                </Button>
                <Button 
                    onClick={handleSubmit}
                    variant="contained"
                    disabled={loading}
                >
                    {loading ? 'Criando...' : 'Criar Inscrição'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}; 