import { Fragment, memo, useEffect, useState } from 'react';
import { Alert, AlertTitle, Box, DialogActions, Divider, Grid, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import TextField from 'components/formik/textfield';
import * as yup from 'yup';
import HttpService from 'components/httpService';
import api from 'components/httpService/api';
import Http from 'components/httpService/Http';
import {
  convertToByte,
  getDayPersian,
  getExpireTime,
  stringAvatar,
  convertByteToInt,
  separateNum,
  formValues
} from 'utils';
import Button from 'components/button';
import UserSelect from 'pages/components/select/users';
import useUsers from 'hooks/useUsers';
import Avatar from 'components/avatar';
import Select from 'components/formik/select';
import useServices from 'hooks/useServices';
import Durations from 'pages/components/durations';
import DataLimit from 'pages/components/dataLimit';
import UserInfo from 'pages/components/user_info';
import GLOBAL from 'components/variables';
import Autocomplete from 'components/formik/autocomplete';
import {
  AttachEmail,
  AvTimer,
  DataUsage,
  Fingerprint,
  NotInterested,
  TaskAlt
} from '@mui/icons-material';

const validationSchema = yup.object({
  user_id: yup.number().required(),
  service_id: yup.number().nullable()
});

const initialForm = {
  account_id: 0,
  service_id: '',
  user_id: 0,
  duration: 1,
  total: 0,
  total_discount_amount: 0,
  status: 'PENDING',
  data_limit: 0
};

const AddEdit = (props) => {
  const { refrence, initial, createRow, editRow } = props;
  const [postDataLoading, setPostDataLoading] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const { getUser, user, isLoading: isLoadingUser } = useUsers();

  const { services, isLoading, getServices } = useServices();

  useEffect(() => {
    getServices();
    if (initial.user_id) getUser(initial.user_id);
    return () => {};
  }, []);

  const handleCreate = (values) => {
    setPostDataLoading(true);
    HttpService()
      .post(api.orders, {
        ...values,
        data_limit: convertToByte(values.data_limit)
      })
      .then((res) => {
        Http.success(res);
        refrence.current.changeStatus();
        createRow && createRow(res.data);
      })
      .catch((err) => Http.error(err))
      .finally(() => {
        setPostDataLoading(false);
      });
  };

  const handleEdit = (values) => {
    setPostDataLoading(true);
    HttpService()
      .put(
        `${api.orders}/${initial?.id}`,
        formValues(initialForm, {
          ...values,
          data_limit: convertToByte(values.data_limit)
        })
      )
      .then((res) => {
        Http.success(res);
        refrence.current.changeStatus();
        editRow(res.data);
      })
      .catch((err) => Http.error(err))
      .finally(() => {
        setPostDataLoading(false);
      });
  };

  const handleBlurUserId = async (user) => {
    setAccounts(user?.accounts);
  };
  const condition = ['CANCELED', 'COMPLETED'];
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initial || initialForm}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          initial.id ? handleEdit(values) : handleCreate(values);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            {user && (
              <UserInfo user={user} isLoading={isLoadingUser}>
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
              </UserInfo>
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
                  <Grid item xs={12}>
                    <Autocomplete
                      label={'Account'}
                      name="account_id"
                      options={accounts}
                      getOptionLabel={(option) =>
                        `ID: ${option.id}  Usage: ${convertByteToInt(option.used_traffic).toFixed(
                          1
                        )}/${convertByteToInt(option.data_limit).toFixed(
                          1
                        )} - Until ${getDayPersian(option.modified_at)}`
                      }
                      renderOption={(
                        props,
                        { id, full_name, data_limit, expired_at, used_traffic, email, enable }
                      ) => (
                        <Fragment key={id}>
                          <li {...props}>
                            <Grid container>
                              <Grid item sx={{ display: 'flex', width: 50 }}>
                                <Avatar {...stringAvatar(full_name || 'No Name')} />
                              </Grid>
                              <Grid
                                item
                                sx={{ width: 'calc(100% - 50px)', wordWrap: 'break-word' }}
                              >
                                {full_name && (
                                  <Typography variant="body1" component={'div'}>
                                    {full_name}
                                  </Typography>
                                )}

                                <Grid container spacing={1} alignItems={'stretch'}>
                                  <Grid item>
                                    <Fingerprint color="primary" />
                                  </Grid>
                                  <Grid item>{id}</Grid>
                                </Grid>
                                <Grid container spacing={1} alignItems={'stretch'}>
                                  <Grid item>
                                    <DataUsage color="primary" />
                                  </Grid>
                                  <Grid item>
                                    {convertByteToInt(used_traffic).toFixed(1)}/
                                    {convertByteToInt(data_limit).toFixed(1)} GB
                                  </Grid>
                                </Grid>
                                <Grid container spacing={1} alignItems={'stretch'}>
                                  <Grid item>
                                    <AvTimer color="primary" />
                                  </Grid>
                                  <Grid item>{getDayPersian(expired_at)}</Grid>
                                </Grid>
                                <Grid container spacing={1} alignItems={'stretch'}>
                                  <Grid item>
                                    <AttachEmail color="primary" />
                                  </Grid>
                                  <Grid item>{email}</Grid>
                                </Grid>
                                <Grid container spacing={1} alignItems={'stretch'}>
                                  <Grid item>
                                    {enable ? (
                                      <TaskAlt color="primary" />
                                    ) : (
                                      <NotInterested color="error" />
                                    )}
                                  </Grid>
                                  <Grid item>{enable ? 'Active' : 'Deactive'}</Grid>
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
                </>
              )}
              <Grid item xs={12}>
                <Select
                  label={'Status'}
                  name="status"
                  options={GLOBAL.statusOrder}
                  disabled={initial.id && condition.includes(values.status)}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  getOptionLabel={(option) => option.name}
                  label={'Services'}
                  name="service_id"
                  options={[{ id: 0, name: 'None' }, ...services]}
                  isLoading={isLoading}
                  disabled={initial.id && condition.includes(values.status)}
                  onChange={(service) => {
                    setFieldValue('duration', service.duration || 0);
                    setFieldValue('data_limit', service.data_limit || 0);
                    setFieldValue('total', service.price || 0);
                    setFieldValue('total_discount_amount', service.discount || 0);
                  }}
                  renderOption={(props, { id, price, discount, name }) => (
                    <Fragment key={id}>
                      <li {...props}>
                        {id === 0 ? (
                          `${name} `
                        ) : (
                          <>
                            <Typography component={'span'}>
                              {name} {` ${discount ? 'Price: ' : ''}`}:
                            </Typography>
                            <Typography
                              component={'span'}
                              sx={{
                                ...(discount
                                  ? {
                                      WebkitTextDecorationLine: 'line-through',
                                      WebkitTextDecorationColor: 'red',
                                      textDecoration: 'line-through red 2px'
                                    }
                                  : '')
                              }}
                            >
                              {` ${discount ? separateNum(price) : ''}`}
                            </Typography>
                            <Typography component={'span'}>
                              {` Total: ${separateNum(price - discount)} `}
                            </Typography>
                          </>
                        )}
                      </li>
                    </Fragment>
                  )}
                />
              </Grid>

              {values.service_id ? (
                <Grid item xs={12}>
                  <Box textAlign={'left'} m={1}>
                    <Alert severity="info">
                      <AlertTitle>Info</AlertTitle>
                      <Typography fontWeight={800} component={'span'}>
                        DataUsage:
                      </Typography>{' '}
                      <Typography component={'span'}>
                        {convertByteToInt(values.data_limit).toFixed(1)}GB
                      </Typography>
                      <br />
                      <Typography fontWeight={800} component={'span'}>
                        Price:
                      </Typography>{' '}
                      <Typography component={'span'}>
                        {separateNum(values.total - values.total_discount_amount)}
                      </Typography>
                      <br />
                      <Typography fontWeight={800} component={'span'}>
                        Duration:
                      </Typography>{' '}
                      <Typography component={'span'}>{values.duration}</Typography>
                      <br />
                      <Typography fontWeight={800} component={'span'}>
                        Until:
                      </Typography>{' '}
                      <Typography component={'span'}>
                        {getDayPersian(getExpireTime(values.duration))}
                      </Typography>
                    </Alert>
                  </Box>
                </Grid>
              ) : (
                <>
                  <Grid item xs={12}>
                    <TextField
                      label={'Total'}
                      price
                      name="total"
                      disabled={
                        !!values.service_id || (initial.id && condition.includes(values.status))
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label={'Total Discount'}
                      name="total_discount_amount"
                      disabled={
                        !!values.service_id || (initial.id && condition.includes(values.status))
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Durations
                      disabled={
                        !!values.service_id || (initial.id && condition.includes(values.status))
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <DataLimit
                      disabled={
                        !!values.service_id || (initial.id && condition.includes(values.status))
                      }
                    />
                  </Grid>
                </>
              )}
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
    </>
  );
};

export default memo(AddEdit);
