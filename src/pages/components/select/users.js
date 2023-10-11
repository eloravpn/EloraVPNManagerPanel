import Autocomplete from 'components/formik/autocomplete';
import useUsers from 'hooks/useUsers';
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { Divider, Grid, Typography } from '@mui/material';
import Avatar from 'components/avatar';
import { stringAvatar } from 'utils';
import { debounce } from 'lodash';
import { useField, useFormikContext } from 'formik';
import Chip from 'components/chip';

const UserSelect = ({ label, name, ...props }) => {
  const { getUsers, users, user, getUser, isLoading, setUsers, setUser } = useUsers();

  const [field] = useField(name);
  const { setFieldValue } = useFormikContext();
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

  const handleDelete = () => {
    setFieldValue(name, '');
    setUser(false);
  };

  if (user) return <Chip label={user.full_name} onDelete={handleDelete} isLoading={isLoading} />;
  return (
    <>
      <Autocomplete
        label={label}
        options={users}
        name={name}
        isLoading={isLoading}
        lableName="username"
        onInputChange={(event, newInputValue) => {
          console.log('🚀 ~ UserSelect ~ newInputValue:', newInputValue);
          console.log('🚀 ~ UserSelect ~ event:', event);
          debouncedResults(newInputValue);
        }}
        renderOption={(
          props,
          { id, first_name, last_name, username, phone_number, telegram_username }
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
