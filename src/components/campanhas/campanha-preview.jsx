import CheckIcon from '@untitled-ui/icons-react/build/esm/Check';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import { useRouter } from 'src/hooks/use-router';

export const CampanhaPreview = ({ campanha }) => {
  const router = useRouter()

  return (
    <Stack spacing={2}>
      <div>
        <Avatar
          sx={{
            backgroundColor: 'success.main',
            color: 'success.contrastText',
            height: 40,
            width: 40,
          }}
        >
          <SvgIcon>
            <CheckIcon />
          </SvgIcon>
        </Avatar>
        <Typography
          variant="h6"
          sx={{ mt: 2 }}
        >
          Feito!
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          Sua nova campanha foi criada com sucesso.
        </Typography>
      </div>
      <Card variant="outlined">
        <Stack
          alignItems="center"
          direction="row"
          flexWrap="wrap"
          justifyContent="space-between"
          sx={{
            px: 2,
            py: 1.5,
          }}
        >
          <div>
            <Typography variant="subtitle1">
              {campanha.title}
            </Typography>
            <Typography
              color="text.secondary"
              variant="caption"
            >
              Objetivo da campanha • {campanha.category}
            </Typography>
          </div>
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
          >
            <Typography
              color="text.secondary"
              variant="caption"
            >
              1 minute ago
            </Typography>
            <Button size="small" onClick={() => router.push('/')}>
              Iniciar disparos
            </Button>
          </Stack>
        </Stack>
      </Card>
    </Stack>
  );
}
