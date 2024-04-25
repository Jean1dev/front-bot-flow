import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { SeverityPill } from 'src/components/severity-pill';

const statusMap = {
  complete: 'success',
  pending: 'info',
  canceled: 'warning',
  rejected: 'error',
};

export const NumerosListTable = (props) => {
  const {
    count = 0, items = [], onPageChange = () => {
    }, onRowsPerPageChange, onSelect, page = 0, rowsPerPage = 0,
  } = props;
  
  return (
    <div>
      <Table>
        <TableBody>
          {items.map((number) => {
            const createdAtDay = number.createdAt
            const totalAmount = number.totalSpent
            const statusColor = statusMap[number.status] || 'warning';

            return (
              <TableRow
                hover
                key={number.id}
                onClick={() => onSelect?.(number.id)}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: (theme) => theme.palette.mode === 'dark'
                        ? 'neutral.800'
                        : 'neutral.200',
                      borderRadius: 2,
                      maxWidth: 'fit-content',
                      ml: 3,
                      p: 1,
                    }}
                  >
                    <Typography
                      align="center"
                      variant="subtitle2"
                    >
                      {createdAtDay}
                    </Typography>
                    <Typography
                      align="center"
                      variant="h6"
                    >
                      {number.nick}
                    </Typography>
                  </Box>
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="subtitle2">
                      {number.number}
                    </Typography>
                    <Typography
                      color="text.secondary"
                      variant="body2"
                    >
                      Total
                      {' '}
                      {totalAmount}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <SeverityPill color={statusColor}>
                    {number.status}
                  </SeverityPill>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

NumerosListTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelect: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
};
