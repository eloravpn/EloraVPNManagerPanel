import {
  AttachEmail,
  AvTimer,
  DataUsage,
  Fingerprint,
  NotInterested,
  TaskAlt
} from '@mui/icons-material';
import { DialogActions, Divider, Grid, Typography } from '@mui/material';
import Avatar from 'components/avatar';
import Button from 'components/button';
import Autocomplete from 'components/formik/autocomplete';
import CheckBox from 'components/formik/checkbox';
import Select from 'components/formik/select';
import TextField from 'components/formik/textfield';
import HttpService from 'components/httpService';
import Http from 'components/httpService/Http';
import api from 'components/httpService/api';
import GLOBAL from 'components/variables';
import { Form, Formik } from 'formik';
import useUsers from 'hooks/useUsers';
import UserSelect from 'pages/components/select/users';
import UserInfo from 'pages/components/user_info';
import { Fragment, memo, useEffect, useState } from 'react';
import { convertByteToInt, getDayPersian, stringAvatar } from 'utils';
import * as yup from 'yup';

const validationSchema = yup.object({
  message: yup.string().required()
});
const initialForm = {
  level: 0,
  message: '',
  status: 'PENDING',
  approve: '',
  user_id: '',
  account_id: '',
  type: '',
  engine: 'TELEGRAM',
  approve: false
};

const AddEdit = (props) => {
  const { refrence, initial, createRow, editRow } = props;
  const [postDataLoading, setPostDataLoading] = useState(false);

  const [accounts, setAccounts] = useState([]);
  const { getUser, user, isLoading: isLoadingUser } = useUsers();

  useEffect(() => {
    if (initial.user_id) getUser(initial.user_id);
    return () => {};
  }, []);

  const handleSubmit = (values) => {
    setPostDataLoading(true);
    HttpService()
      .post(`${api.notifications}`, {
        ...values
      })
      .then((res) => {
        Http.success(res);
        refrence.current.changeStatus();
        createRow(res.data);
      })
      .catch((err) => Http.error(err))
      .finally(() => {
        setPostDataLoading(false);
      });
  };

  const handleBlurUserId = async (user) => {
    setAccounts(user?.accounts);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialForm}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => (
        <Form>
          {user && (
            <UserInfo
              user={user}
              isLoading={isLoadingUser}
              {...(user?.accounts?.find((i) => i.id === values.account_id)?.id
                ? {
                    secondaryCard: (
                      <>
                        <Typography variant="h6" component={'div'}>
                          Day:
                          {user?.accounts?.find((i) => i.id === values.account_id)?.id}
                        </Typography>
                        <Typography variant="h6" component={'div'}>
                          Usage:
                          {convertByteToInt(
                            user?.accounts?.find((i) => i.id === values.account_id)?.used_traffic
                          ).toFixed(1)}
                          GB
                        </Typography>
                        <Typography variant="h6" component={'div'}>
                          Email:
                          {user?.accounts?.find((i) => i.id === values.account_id)?.email}
                        </Typography>
                      </>
                    )
                  }
                : {})}
            ></UserInfo>
          )}
          <Grid container spacing={12} rowSpacing={2} justifyContent={'center'}>
            {!user && (
              <>
                <Grid item xs={12}>
                  <UserSelect
                    name="user_id"
                    label="Users"
                    onBlur={handleBlurUserId}
                    onChange={() => {
                      setFieldValue('account_id', null);
                    }}
                  />
                </Grid>
              </>
            )}
            {!initial?.id && (
              <Grid item xs={12}>
                <Autocomplete
                  label={'Account'}
                  name="account_id"
                  options={user?.accounts || accounts}
                  getOptionLabel={(option) =>
                    `ID: ${option.id}  Usage: ${convertByteToInt(option.used_traffic).toFixed(
                      1
                    )}/${convertByteToInt(option.data_limit).toFixed(
                      1
                    )} - Until ${getDayPersian(option.expired_at)}`
                  }
                  renderOption={(
                    props,
                    { id, full_name, data_limit, expired_at, used_traffic, email, uuid, enable }
                  ) => (
                    <Fragment key={id}>
                      <li {...props}>
                        <Grid container>
                          <Grid item sx={{ display: 'flex', width: 50 }}>
                            <Avatar {...stringAvatar(full_name || 'No Name')} />
                          </Grid>
                          <Grid item sx={{ width: 'calc(100% - 50px)', wordWrap: 'break-word' }}>
                            {full_name && (
                              <Typography
                                variant="body1"
                                display={'flex'}
                                component={'div'}
                                alignItems={'center'}
                                gutterBottom
                              >
                                {enable ? (
                                  <TaskAlt color="primary" />
                                ) : (
                                  <NotInterested color="error" />
                                )}
                                {full_name}{' '}
                              </Typography>
                            )}
                            <Grid container>
                              <Grid item xs={6} md={4}>
                                <Grid container spacing={1} alignItems={'stretch'}>
                                  <Grid item>
                                    <Fingerprint color="primary" />
                                  </Grid>
                                  <Grid item>{id}</Grid>
                                </Grid>
                              </Grid>
                              <Grid item xs={6} md={4}>
                                <Grid container spacing={1} alignItems={'stretch'}>
                                  <Grid item>
                                    <DataUsage color="primary" />
                                  </Grid>
                                  <Grid item>
                                    {convertByteToInt(used_traffic).toFixed(1)}/
                                    {convertByteToInt(data_limit).toFixed(1)} GB
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid xs={6} md={4}>
                                <Grid container spacing={1} alignItems={'stretch'}>
                                  <Grid item>
                                    <AvTimer color="primary" />
                                  </Grid>
                                  <Grid item>{getDayPersian(expired_at)}</Grid>
                                </Grid>
                              </Grid>
                              <Grid xs={6} md={4}>
                                <Grid container spacing={1} alignItems={'stretch'}>
                                  <Grid item>
                                    <AttachEmail color="primary" />
                                  </Grid>
                                  <Grid item>{email}</Grid>
                                </Grid>
                              </Grid>
                              <Grid xs={12}>
                                <Grid container spacing={1} alignItems={'stretch'}>
                                  <Grid item>
                                    <AttachEmail color="primary" />
                                  </Grid>
                                  <Grid item>{uuid}</Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </li>

                      <Divider />
                    </Fragment>
                  )}
                  disabled={!values.user_id}
                />
              </Grid>
            )}

            <Grid item xs={12} md={6}>
              <Select
                id={'status'}
                name={'status'}
                label="Status"
                options={GLOBAL.statusNotifications}
              />
            </Grid>
            <Grid item xs={12}>
              <Select
                id={'engine'}
                name={'engine'}
                label="Engine"
                options={[
                  { id: 'TELEGRAM', name: 'Telegram' },
                  { id: 'EMAIL', name: 'Email' },
                  { id: 'SMS', name: 'SMS' }
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Select
                id={'type'}
                name={'type'}
                label="Type"
                options={[
                  { id: 'PAYMENY', name: 'PAYMENY' },
                  { id: 'ORDER', name: 'ORDER' },
                  { id: 'TRANSACTION', name: 'TRANSACTION' },
                  { id: 'GENERAL', name: 'GENERAL' },
                  { id: 'ACCOUNT', name: 'ACCOUNT' },
                  { id: 'USED_TRAFFICE', name: 'USED_TRAFFICE' },
                  { id: 'EXPIRE_TIME', name: 'EXPIRE_TIME' }
                ]}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id={'message'}
                name={'message'}
                label="Message"
                type="text"
                minRows={4}
                multiline
              />
            </Grid>
            <Grid item xs={12}>
              <CheckBox name="approve" label={'Approve'} />
            </Grid>
          </Grid>
          <DialogActions>
            <Button
              autoFocus
              variant={'outlined'}
              type="submit"
              isLoading={postDataLoading}
              color="primary"
            >
              Submit
            </Button>
            <Button
              variant={'outlined'}
              color="error"
              onClick={() => refrence.current.changeStatus()}
            >
              Cancell
            </Button>
          </DialogActions>
        </Form>
      )}
    </Formik>
  );
};

export default memo(AddEdit);
