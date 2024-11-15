import { Close, MonetizationOn, Person, PhoneAndroid, Telegram } from '@mui/icons-material';
import {
  Box,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  Skeleton,
  TextField,
  Typography
} from '@mui/material';
import Avatar from 'components/avatar';
import Drawer from 'components/drawer_v2';
import { useFormikContext } from 'formik';
import useUsers from 'hooks/useUsers';
import { debounce } from 'lodash';
import { Fragment, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { separateNum, stringAvatar } from 'utils';

const UserSelect = ({ name, onBlur, onChange }) => {
  const { getUsers, users, isLoading, setUsers } = useUsers();

  const drawerRef = useRef();
  const [user, setUser] = useState(null);
  const { setFieldValue } = useFormikContext();

  const handleChange = useCallback((e) => {
    if (e.target.value !== '') getUsers(e.target.value.replace('@', ''));
    else setUsers([]);
  }, []);

  const debouncedResults = useMemo(() => debounce(handleChange, 500), [handleChange]);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  }, [debouncedResults]);

  const handleSelect = (USER) => {
    const { username, first_name } = USER;
    setFieldValue(name, USER.id);
    drawerRef.current.onChange();
    setUser({ username, first_name });
    onBlur && onBlur(USER);
    onChange && onChange(USER);
  };

  return (
    <>
      <Box
        className="badge"
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        onClick={() => drawerRef.current.onChange()}
      >
        <Box display={'flex'} alignItems={'center'}>
          <Person sx={{ marginRight: 1, fontSize: 25 }} color="primary" />
          {user ? user.first_name || user.username : 'Select User'}
        </Box>
        <IconButton
          size="sm"
          onClick={() => {
            setFieldValue(name, null);
            setUser(null);
          }}
        >
          <Close color="secondary" fontSize="sm" />
        </IconButton>
      </Box>
      <Drawer ref={drawerRef} anchor="bottom">
        <Box
          display={'flex'}
          flexDirection={'column'}
          flexShrink={1}
          overflow={'hidden'}
          height={'60vh'}
        >
          <Box width={'100%'} justifyContent={'space-between'} alignItems={'center'} marginY={1}>
            <Box
              display="flex"
              alignItems={'center'}
              justifyContent={'space-between'}
              mb={1}
              mx={2}
            >
              <Typography variant="h6">Select User</Typography>
              <IconButton onClick={() => drawerRef.current.onChange()}>
                <Close />
              </IconButton>
            </Box>
            <Box mx={2}>
              <TextField fullWidth onChange={debouncedResults} placeholder="Search..." />
            </Box>
          </Box>
          <Box overflow="auto" maxHeight={'99vh'}>
            {users.length === 0 && !isLoading && (
              <Box textAlign={'center'} m={10}>
                {' '}
                No Found User.
              </Box>
            )}
            <List>
              {isLoading ? (
                [...Array(10)].map((e, i) => (
                  <Box display={'flex'} alignItems={'center'} m={1} key={i}>
                    <Box mr={2}>
                      <Skeleton animation="wave" variant="circular" width={40} height={40} />
                    </Box>
                    <Box width={'100%'}>
                      <Skeleton
                        animation="wave"
                        height={10}
                        width="80%"
                        style={{ marginBottom: 6 }}
                      />
                      <Skeleton animation="wave" height={10} width="40%" />
                    </Box>
                  </Box>
                ))
              ) : (
                <>
                  {users.map((user, idx) => (
                    <Fragment key={idx}>
                      <ListItem onClick={() => handleSelect(user)}>
                        <Grid container>
                          <Grid item sx={{ display: 'flex', width: 50 }}>
                            <Avatar {...stringAvatar(user?.username || 'No Name')} />
                          </Grid>
                          <Grid item sx={{ width: 'calc(100% - 50px)', wordWrap: 'break-word' }}>
                            {user?.first_name && (
                              <Typography variant="body1" component={'div'}>
                                {user?.first_name}
                                {user?.last_name && ` ${user?.last_name}`}
                              </Typography>
                            )}
                            <Grid container spacing={1} alignItems={'stretch'}>
                              <Grid item>
                                <MonetizationOn color="primary" />
                              </Grid>
                              <Grid item>{user?.balance ? separateNum(user?.balance) : 0}</Grid>
                            </Grid>
                            <Grid container spacing={1} alignItems={'stretch'}>
                              <Grid item>
                                <Person color="primary" />
                              </Grid>
                              <Grid item>{user?.username}</Grid>
                            </Grid>
                            {user?.phone_number && (
                              <Grid container spacing={1} alignItems={'stretch'}>
                                <Grid item>
                                  <PhoneAndroid color="primary" />
                                </Grid>
                                <Grid item>{user?.phone_number}</Grid>
                              </Grid>
                            )}
                            {user?.telegram_username && (
                              <Grid container spacing={1} alignItems={'stretch'}>
                                <Grid item>
                                  <Telegram color="primary" />
                                </Grid>
                                <Grid item>{user?.telegram_username}</Grid>
                              </Grid>
                            )}
                          </Grid>
                        </Grid>
                      </ListItem>
                      <Divider />
                    </Fragment>
                  ))}
                </>
              )}
            </List>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default memo(UserSelect);
