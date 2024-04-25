import PropTypes from 'prop-types';
import Edit02Icon from '@untitled-ui/icons-react/build/esm/Edit02';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

import { SeverityPill } from 'src/components/severity-pill';
import { PropertyList } from 'src/components/property-list';
import { PropertyListItem } from 'src/components/property-list-item';

const statusMap = {
  canceled: 'warning',
  complete: 'success',
  pending: 'info',
  rejected: 'error',
};

export const NumeroDetalhes = (props) => {
  const { onApprove, onEdit, onReject, number } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  const align = lgUp ? 'horizontal' : 'vertical';
  const createdAt = number.createdAt
  const statusColor = statusMap[number.status];
  const totalAmount = number.totalSpent

  return (
    <Stack spacing={6}>
      <Stack spacing={3}>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Typography variant="h6">
            Details
          </Typography>
          <Button
            color="inherit"
            onClick={onEdit}
            size="small"
            startIcon={(
              <SvgIcon>
                <Edit02Icon />
              </SvgIcon>
            )}
          >
            Edit
          </Button>
        </Stack>
        <PropertyList>
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="ID"
            value={number.id}
          />
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Number"
            value={number.number}
          />
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Total Envios com sucesso"
          >
            <Typography
              color="text.secondary"
              variant="body2"
            >
              {number.totalDeliverys}
            </Typography>
            <Typography
              color="text.secondary"
              variant="body2"
            >
              campo 2
            </Typography>
            <Typography
              color="text.secondary"
              variant="body2"
            >
              compo 3
            </Typography>
            <Typography
              color="text.secondary"
              variant="body2"
            >
              campo 4
            </Typography>
          </PropertyListItem>
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Date"
            value={createdAt}
          />
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Total ja gasto"
            value={number.totalSpent}
          />
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Total Amount"
            value={totalAmount}
          />
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Status"
          >
            <SeverityPill color={statusColor}>
              {number.status}
            </SeverityPill>
          </PropertyListItem>
        </PropertyList>
        <Stack
          alignItems="center"
          direction="row"
          flexWrap="wrap"
          justifyContent="flex-end"
          spacing={2}
        >
          <Button
            onClick={onApprove}
            size="small"
            variant="contained"
          >
            Salvar
          </Button>
          <Button
            color="error"
            onClick={onReject}
            size="small"
            variant="outlined"
          >
            Fechar
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

NumeroDetalhes.propTypes = {
  onApprove: PropTypes.func,
  onEdit: PropTypes.func,
  onReject: PropTypes.func,
  number: PropTypes.object,
};
