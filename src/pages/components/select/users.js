import Autocomplete from 'components/formik/autocomplete';
import useUsers from 'hooks/useUsers';
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { Divider, Grid, Typography } from '@mui/material';
import Avatar from 'components/avatar';
import { stringAvatar } from 'utils';
import { debounce } from 'lodash';
import { useField, useFormikContext } from 'formik';

const UserSelect = ({ label, name, ...props }) => {
  const { getUsers, users, getUser, isLoading, setUsers } = useUsers();

  const [field] = useField(name);
  useEffect(() => {
    if (!!field.value) getUser(field.value);

    return () => {};
  }, []);

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
    <>
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
          { id, first_name, last_name, balance, username, phone_number, telegram_username }
        ) => (
          <Fragment key={id}>
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

                  {balance && (
                    <Typography variant="body1" component={'div'}>
                      {balance}
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
          </Fragment>
        )}
        {...props}
      />
    </>
  );
};

export default UserSelect;
