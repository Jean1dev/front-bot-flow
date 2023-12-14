import User01Icon from '@untitled-ui/icons-react/build/esm/User01';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import SvgIcon from '@mui/material/SvgIcon';

import { usePopover } from 'src/hooks/use-popover';

import { AccountPopover } from './account-popover';

export const AccountButton = () => {
  const user = {
    id: '5e86809283e28b96d2d38537',
    avatar: '/assets/avatars/avatar-anika-visser.png',
    name: 'Anika Visser',
    email: 'anika.visser@devias.io'
  };
  const popover = usePopover();

  return (
    <>
      <Box
        component={ButtonBase}
        onClick={popover.handleOpen}
        ref={popover.anchorRef}
        sx={{
          alignItems: 'center',
          display: 'flex',
          borderWidth: 2,
          borderStyle: 'solid',
          borderColor: 'divider',
          height: 40,
          width: 40,
          borderRadius: '50%',
        }}
      >
        <Avatar
          sx={{
            height: 32,
            width: 32,
          }}
          src={user.avatar}
        >
          <SvgIcon>
            <User01Icon />
          </SvgIcon>
        </Avatar>
      </Box>
      <AccountPopover
        anchorEl={popover.anchorRef.current}
        onClose={popover.handleClose}
        open={popover.open}
      />
    </>
  );
};
