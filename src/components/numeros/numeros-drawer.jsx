import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import XIcon from '@untitled-ui/icons-react/build/esm/X';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { NumeroDetalhes } from './numeros-drawer-detalhes';
import { NumberDrawerEdit } from './numeros-drawer-edit';
import { numerosApi } from '../../api/numeros';
import { botEngineApi } from '../../api/bot-engine';
import toast from 'react-hot-toast';
import { generateRandomString } from '../../utils';

export const NumerosDrawer = (props) => {
  const { container, onClose, open, number } = props;
  const [isEditing, setIsEditing] = useState(false);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const [infoComplementares, setInfoComplementares] = useState(null);

  useEffect(() => {
    if (number) {
      numerosApi.getById(number.id)
        .then(res => setInfoComplementares(res.data))
    }
  }, [number])

  const onEditCompleted = useCallback((data) => {
    toast.success('Gerando seu QrCode')
    const randomCode = generateRandomString(10)

    numerosApi.addNovoNumero({
      nick: data.nick,
      numero: data.number
    }).then(() => toast.success('Numero adicionado'))

    botEngineApi.generateNewQrCode(randomCode)
      .then(response => {
        const html = response.data;
        const newTab = window.open('', '_blank');
        newTab.document.write(html);
        onClose()
      })

  }, [])

  const handleEditOpen = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleEditCancel = useCallback(() => {
    setIsEditing(false);
    onClose()
  }, []);

  let content = null;

  if (number) {
    content = (
      <div>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          sx={{
            px: 3,
            py: 2,
          }}
        >
          <Typography
            color="inherit"
            variant="h6"
          >
            {number.nick}
          </Typography>
          <IconButton
            color="inherit"
            onClick={onClose}
          >
            <SvgIcon>
              <XIcon />
            </SvgIcon>
          </IconButton>
        </Stack>
        <Box
          sx={{
            px: 3,
            py: 4,
          }}
        >
          {!isEditing
            ? (
              <NumeroDetalhes
                onApprove={onClose}
                onEdit={handleEditOpen}
                onReject={onClose}
                number={number}
                infoComplementares={infoComplementares}
              />
            )
            : (
              <NumberDrawerEdit
                onCancel={handleEditCancel}
                onSave={handleEditCancel}
                number={number}
              />
            )}
        </Box>
      </div>
    );
  } else {
    content = (
      <div>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          sx={{
            px: 3,
            py: 2,
          }}
        >
          <Typography
            color="inherit"
            variant="h6"
          >
            Novo numero
          </Typography>
          <IconButton
            color="inherit"
            onClick={onClose}
          >
            <SvgIcon>
              <XIcon />
            </SvgIcon>
          </IconButton>
        </Stack>
        <Box
          sx={{
            px: 3,
            py: 4,
          }}
        >
          <NumberDrawerEdit
            onCancel={handleEditCancel}
            onSave={onEditCompleted}
            number={null}
          />
        </Box>
      </div>
    );
  }

  if (lgUp) {
    return (
      <Drawer
        anchor="right"
        open={open}
        PaperProps={{
          sx: {
            position: 'relative',
            width: 500,
          },
        }}
        SlideProps={{ container }}
        variant="persistent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      hideBackdrop
      ModalProps={{
        container,
        sx: {
          pointerEvents: 'none',
          position: 'absolute',
        },
      }}
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          maxWidth: '100%',
          width: 400,
          pointerEvents: 'auto',
          position: 'absolute',
        },
      }}
      SlideProps={{ container }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

NumerosDrawer.propTypes = {
  container: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  number: PropTypes.object,
};
