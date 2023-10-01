import Autocomplete from 'components/formik/autocomplete';
import useUsers from 'hooks/useUsers';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Divider, Grid, Typography } from '@mui/material';
import Avatar from 'components/avatar';
import { stringAvatar } from 'utils';
import { debounce } from 'lodash';

const UserSelect = ({ label, name }) => {
  const { getUsers, users, isLoading, setUsers } = useUsers();

  const handleChange = useCallback((e) => {
    if (e !== '') getUsers(e);
    else setUsers([]);
  }, []);

  const debouncedResults = useMemo(() => debounce(handleChange, 500), [handleChange]);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  }, [debouncedResults]);

  return (
    <Autocomplete
      label={label}
      options={users}
      name={name}
      isLoading={isLoading}
      lableName="username"
      onInputChange={(event, newInputValue) => {
        debouncedResults(newInputValue);
      }}
      renderOption={(
        props,
        { first_name, last_name, username, phone_number, telegram_username }
      ) => (
        <>
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item sx={{ display: 'flex', width: 50 }}>
                <Avatar {...stringAvatar(username || 'No Name')} />
              </Grid>
              <Grid item sx={{ width: 'calc(100% - 50px)', wordWrap: 'break-word' }}>
                {first_name && (
                  <Typography variant="body1" component={'div'}>
                    {first_name}
                    {last_name && last_name}
                  </Typography>
                )}

                {username && (
                  <Typography variant="body1" component={'div'}>
                    {username}
                  </Typography>
                )}
                {phone_number && (
                  <Typography variant="body1" component={'div'}>
                    {phone_number}
                  </Typography>
                )}
                {telegram_username && (
                  <Typography variant="body1" component={'div'}>
                    {phone_number ? ',' : ''} {telegram_username}
                  </Typography>
                )}
              </Grid>
            </Grid>
          </li>
          <Divider />
        </>
      )}
    />
  );
};

export default UserSelect;
