import Autocomplete from 'components/formik/autocomplete';
import useUsers from 'hooks/useUsers';
import { Fragment, memo, useCallback, useEffect, useMemo } from 'react';
import { Divider, Grid, Typography } from '@mui/material';
import Avatar from 'components/avatar';
import { separateNum, stringAvatar } from 'utils';
import { debounce } from 'lodash';
import { useField } from 'formik';
import { MonetizationOn, Person, PhoneAndroid, Telegram } from '@mui/icons-material';

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
              <Grid container>
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
                  <Grid container spacing={1} alignItems={'stretch'}>
                    <Grid item>
                      <MonetizationOn color="primary" />
                    </Grid>
                    <Grid item>{balance ? separateNum(balance) : 0}</Grid>
                  </Grid>
                  <Grid container spacing={1} alignItems={'stretch'}>
                    <Grid item>
                      <Person color="primary" />
                    </Grid>
                    <Grid item>{username}</Grid>
                  </Grid>
                  {phone_number && (
                    <Grid container spacing={1} alignItems={'stretch'}>
                      <Grid item>
                        <PhoneAndroid color="primary" />
                      </Grid>
                      <Grid item>{phone_number}</Grid>
                    </Grid>
                  )}
                  {telegram_username && (
                    <Grid container spacing={1} alignItems={'stretch'}>
                      <Grid item>
                        <Telegram color="primary" />
                      </Grid>
                      <Grid item>{telegram_username}</Grid>
                    </Grid>
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

export default memo(UserSelect);
