import {
  AttachEmail,
  AvTimer,
  Close,
  DataUsage,
  Fingerprint,
  MoneyOff,
  NotInterested,
  TaskAlt
} from '@mui/icons-material';
import {
  Alert,
  AlertTitle,
  Box,
  DialogActions,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Typography
} from '@mui/material';
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
import { Form, Formik, useFormikContext } from 'formik';
import useOrders from 'hooks/useOrders';
import useUsers from 'hooks/useUsers';
import DataLimit from 'pages/components/dataLimit';
import Durations from 'pages/components/durations';
import ServicesSelect from 'pages/components/select/services';
import UserSelect from 'pages/components/select/users';
import UserInfo from 'pages/components/user_info';
import { OrderInfo } from 'pages/components/user_info/OrderInfo';
import { Fragment, memo, useEffect, useState } from 'react';
import {
  convertByteToInt,
  convertToByte,
  formValues,
  getDayPersian,
  getExpireTime,
  separateNum,
  stringAvatar
} from 'utils';
import * as yup from 'yup';

const initialForm = {
  account_id: 0,
  service_id: '',
  user_id: 0,
  duration: 1,
  total: 0,
  total_discount_amount: 0,
  status: 'PAID',
  data_limit: 0,
  ip_limit: 0,
  extra_discount: 0,
  dis: 0,
  is_debt: false
};

const validationSchema = yup.object({
  user_id: yup.number().required(),
  ip_limit: yup.number(),
  service_id: yup.number().nullable()
});

const ExtraField = (props) => {
  const {
    values: { dis, total, total_discount_amount },
    setFieldValue
  } = useFormikContext();

  useEffect(() => {
    // set the value of textC, based on textA and textB
    setFieldValue(props.name, ((+total - +total_discount_amount) * +dis) / 100);
  }, [dis]);

  return <TextField {...props} />;
};

const AddEdit = (props) => {
  const { refrence, initial, createRow, editRow, initialOrder } = props;

  const [postDataLoading, setPostDataLoading] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [balance, setBalance] = useState(0);
  const { getUser, user, isLoading: isLoadingUser } = useUsers();
  const { orders, isLoading: isLoadingOrders, getOrders } = useOrders();

  useEffect(() => {
    if (initial.user_id) getUser(initial.user_id);
    if (initial.user_id) getOrders({ user_id: initial?.user_id, sort: '-modified' });
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
    setBalance(user?.balance);
    setAccounts(user?.accounts);
    getOrders({ user_id: user?.id, sort: '-modified' });
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
            <Grid container spacing={2} rowSpacing={2} justifyContent={'center'}>
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
              <Grid item xs={12}>
                <OrderInfo orders={orders} user={user} balance={balance} />
              </Grid>

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

              {values.service_id ? (
                <></>
              ) : (
                <Grid item xs={12} md={6}>
                  <TextField name="ip_limit" label="IP Limit" />
                </Grid>
              )}
              <Grid item xs={12} md={values.service_id ? 12 : 6}>
                <Select label={'Status'} name="status" options={GLOBAL.statusOrder} />
              </Grid>
              <Grid item xs={12}>
                <ServicesSelect
                  label={'Service'}
                  name="service_id"
                  disabled={initial.id && condition.includes(values.status)}
                  onChange={(service) => {
                    if (service) {
                      setFieldValue('duration', service.duration || 0);
                      setFieldValue('data_limit', service.data_limit || 0);
                      setFieldValue('total', service.price || 0);
                      setFieldValue('total_discount_amount', service.discount || 0);
                      setFieldValue('extra_discount', 0);
                      setFieldValue('dis', 0);
                    }
                  }}
                  onClear={() => {
                    setFieldValue('duration', 0);
                    setFieldValue('data_limit', 0);
                    setFieldValue('total', 0);
                    setFieldValue('total_discount_amount', 0);
                    setFieldValue('extra_discount', 0);
                    setFieldValue('dis', 0);
                  }}
                />
              </Grid>
              {!initial?.id && (
                <>
                  <Grid item xs={3}>
                    <TextField
                      label={'Discoount percent'}
                      type="number"
                      name="dis"
                      InputProps={{
                        endAdornment: <InputAdornment position="end">%</InputAdornment>
                      }}
                    />
                  </Grid>
                  <Grid item xs={9}>
                    <ExtraField
                      label={'Extera discount amount'}
                      price
                      name="extra_discount"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => setFieldValue('extra_discount', 0)}>
                              <Close />
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                </>
              )}
              {balance - (values.total - values.extra_discount - values?.total_discount_amount) <
                0 && (
                <Grid item xs={12}>
                  <Box display={'flex'} alignItems={'center'} justifyContent={'flex-start'}>
                    <CheckBox name="is_debt" label={`Do you want negative User balance ?`} />
                    <Typography component={'div'} variant="body2" color={'error'}>
                      ({' '}
                      {separateNum(
                        balance -
                          (values.total - values.extra_discount - values?.total_discount_amount)
                      )}
                      )
                    </Typography>
                    <Button
                      sx={{ ml: 1 }}
                      onClick={() => {
                        setFieldValue('is_debt', false);
                        setFieldValue(
                          'extra_discount',
                          Math.abs(
                            balance -
                              (values.total - values.extra_discount - values?.total_discount_amount)
                          )
                        );
                      }}
                      size="small"
                      color={'primary'}
                    >
                      Add to Discount
                    </Button>
                  </Box>
                </Grid>
              )}

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
                        Total Price:
                      </Typography>{' '}
                      <Typography component={'span'}>
                        {separateNum(
                          values.total - values.extra_discount - values?.total_discount_amount
                        )}
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
                  <Grid item xs={9}>
                    <TextField
                      label={'Total'}
                      price
                      name="total"
                      disabled={
                        !!values.service_id || (initial.id && condition.includes(values.status))
                      }
                    />
                  </Grid>
                  <Grid item xs={3}>
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
