import { JoinLeft, JoinRight } from '@mui/icons-material'
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';

const options = [
  {
    label: 'Left-to-right',
    value: 'ltr',
    icon: (
      <SvgIcon fontSize="small">
        <JoinLeft />
      </SvgIcon>
    ),
  },
  {
    label: 'Right-to-left',
    value: 'rtl',
    icon: (
      <SvgIcon fontSize="small">
        <JoinRight />
      </SvgIcon>
    ),
  },
];

export const OptionsDirection = (props) => {
  const { onChange, value } = props;

  return (
    <Stack spacing={1}>
      <Typography
        color="text.secondary"
        variant="overline"
      >
        Orientation
      </Typography>
      <Stack
        alignItems="center"
        direction="row"
        flexWrap="wrap"
        gap={2}
      >
        {options.map((option) => (
          <Chip
            icon={option.icon}
            key={option.label}
            label={option.label}
            onClick={() => onChange?.(option.value)}
            sx={{
              borderColor: 'transparent',
              borderRadius: 1.5,
              borderStyle: 'solid',
              borderWidth: 2,
              ...(option.value === value && {
                borderColor: 'primary.main',
              }),
            }}
          />
        ))}
      </Stack>
    </Stack>
  );
};
