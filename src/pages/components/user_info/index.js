import { Box, Skeleton, Typography } from '@mui/material';
import Avatar from 'components/avatar';
import Grid from 'components/grid';
import { stringAvatar } from 'utils';

const UserInfo = ({ user, isLoading, children, secondaryCard = false }) => {
  const {
    username,
    phone_number,
    telegram_username,
    last_name,
    first_name,
    telegram_chat_id,
    accounts
  } = user;
  return (
    <>
      <Grid
        sx={(theme) => {
          return {
            background: theme.palette.primary.main,
            p: 3,
            borderRadius: 5,
            color: 'white',
            mb: 2
          };
        }}
      >
        <Grid container alignItems="flex-start">
          <Grid item sx={{ display: 'flex', width: 50 }}>
            <Avatar {...stringAvatar(username || 'No Name')} />
          </Grid>
          <Grid item sx={{ width: 'calc(100% - 50px)', wordWrap: 'break-word' }}>
            {isLoading && <Skeleton animation="wave" width={150} />}
            {isLoading && <Skeleton animation="wave" width={250} />}
            {first_name && (
              <Typography variant="h6" component={'div'}>
                {first_name}
                {last_name && ` ${last_name}`}
              </Typography>
            )}
            {telegram_username && (
              <Typography variant="h6">
                {' '}
                <a href={`https://t.me/${telegram_username}`} target="_blank">
                  Telegram: @{telegram_username}
                </a>
              </Typography>
            )}
            {telegram_chat_id && <Typography variant="h6">ChatID: {telegram_chat_id} </Typography>}
            {phone_number && <Typography variant="h6">Phone Number: {phone_number} </Typography>}
            {accounts && <Typography variant="h6">Total Account: {accounts?.length} </Typography>}
            {children}
          </Grid>
        </Grid>
      </Grid>
      {secondaryCard ? (
        <Grid
          sx={(theme) => {
            return {
              background: theme.palette.primary.main,
              p: 3,
              borderRadius: 5,
              color: 'white',
              mb: 2
            };
          }}
        >
          <Box display={'flex'} flexDirection={'column'}>
            {secondaryCard}
          </Box>
        </Grid>
      ) : null}
    </>
  );
};

export default UserInfo;
