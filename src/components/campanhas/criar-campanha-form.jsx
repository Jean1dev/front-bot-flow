import { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import CheckIcon from '@untitled-ui/icons-react/build/esm/Check';
import Avatar from '@mui/material/Avatar';
import Step from '@mui/material/Step';
import StepContent from '@mui/material/StepContent';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';

import { CampanhaCategoriaStep } from './categoria-campanha-step';
import { DetalhesCampanhaStep } from './detalhes-campanha-step';
import { CampanhaPreview } from './campanha-preview';
import { CampanhaNumeroDisparos } from './campanha-numero-disparos';

const StepIcon = (props) => {
  const { active, completed, icon } = props;

  const highlight = active || completed;

  return (
    <Avatar
      sx={{
        height: 40,
        width: 40,
        ...(highlight && {
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
        }),
      }}
      variant="rounded"
    >
      {completed
        ? (
          <SvgIcon>
            <CheckIcon />
          </SvgIcon>
        )
        : icon}
    </Avatar>
  );
};

StepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.node.isRequired,
};

export const CriarNovaCampanhaForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const handleNext = useCallback(() => {
    setActiveStep((prevState) => prevState + 1);
  }, []);

  const handleBack = useCallback(() => {
    setActiveStep((prevState) => prevState - 1);
  }, []);

  const handleComplete = useCallback(() => {
    setIsComplete(true);
  }, []);

  const steps = useMemo(() => {
    return [
      {
        label: 'Categoria da campanha',
        content: (
          <CampanhaCategoriaStep
            onBack={handleBack}
            onNext={handleNext}
          />
        ),
      },
      {
        label: 'Detalhes',
        content: (
          <DetalhesCampanhaStep
            onBack={handleBack}
            onNext={handleNext}
          />
        ),
      },
      {
        label: 'Lista de numeros',
        content: (
          <CampanhaNumeroDisparos
            onBack={handleBack}
            onNext={handleComplete}
          />
        ),
      },
    ];
  }, [handleBack, handleNext, handleComplete]);

  if (isComplete) {
    return <CampanhaPreview />;
  }

  return (
    <Stepper
      activeStep={activeStep}
      orientation="vertical"
      sx={{
        '& .MuiStepConnector-line': {
          borderLeftColor: 'divider',
          borderLeftWidth: 2,
          ml: 1,
        },
      }}
    >
      {steps.map((step, index) => {
        const isCurrentStep = activeStep === index;

        return (
          <Step key={step.label}>
            <StepLabel StepIconComponent={StepIcon}>
              <Typography
                sx={{ ml: 2 }}
                variant="overline"
              >
                {step.label}
              </Typography>
            </StepLabel>
            <StepContent
              sx={{
                borderLeftColor: 'divider',
                borderLeftWidth: 2,
                ml: '20px',
                ...(isCurrentStep && {
                  py: 4,
                }),
              }}
            >
              {step.content}
            </StepContent>
          </Step>
        );
      })}
    </Stepper>
  );
};