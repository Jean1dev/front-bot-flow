import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Radio from '@mui/material/Radio';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';

const categoryOptions = [
  {
    description: 'Melhor escolha para quem procura captar novos possiveis clientes',
    title: 'Obter leads',
    value: 'LEADS',
  },
  {
    description: 'Aviso ou comunicado sobre alguma coisa',
    title: 'Avisar pessoas',
    value: 'AVISO',
  },
  {
    description: 'Situacao nao especifica',
    title: 'Outros',
    value: 'OUTROS',
  },
];

export const CampanhaCategoriaStep = (props) => {
  const { onBack, onNext, setCampanha, ...other } = props;
  const [category, setCategory] = useState(categoryOptions[1].value);

  const handleCategoryChange = useCallback((category) => {
    setCampanha((prevState) => ({ ...prevState, category }));
    setCategory(category);
  }, []);

  return (
    <Stack
      spacing={3}
      {...other}>
      <div>
        <Typography variant="h6">
          Estou buscando...
        </Typography>
      </div>
      <Stack spacing={2}>
        {categoryOptions.map((option) => (
          <Card
            key={option.value}
            sx={{
              alignItems: 'center',
              cursor: 'pointer',
              display: 'flex',
              p: 2,
              ...(category === option.value && {
                backgroundColor: 'primary.alpha12',
                boxShadow: (theme) => `${theme.palette.primary.main} 0 0 0 1px`,
              }),
            }}
            onClick={() => handleCategoryChange(option.value)}
            variant="outlined"
          >
            <Stack
              direction="row"
              spacing={2}
            >
              <Radio
                checked={category === option.value}
                color="primary"
              />
              <div>
                <Typography variant="subtitle1">
                  {option.title}
                </Typography>
                <Typography
                  color="text.secondary"
                  variant="body2"
                >
                  {option.description}
                </Typography>
              </div>
            </Stack>
          </Card>
        ))}
      </Stack>
      <div>
        <Button
          endIcon={(
            <SvgIcon>
              <ArrowRightIcon />
            </SvgIcon>
          )}
          onClick={onNext}
          variant="contained"
        >
          Continue
        </Button>
      </div>
    </Stack>
  );
};

CampanhaCategoriaStep.propTypes = {
  onBack: PropTypes.func,
  onNext: PropTypes.func,
};
