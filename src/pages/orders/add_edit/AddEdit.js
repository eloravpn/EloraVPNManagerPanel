import { Fragment, memo, useEffect, useState } from 'react';
import {
  Alert,
  AlertTitle,
  Box,
  DialogActions,
  Divider,
  Grid,
  Skeleton,
  Typography
} from '@mui/material';
import { Form, Formik } from 'formik';
import TextField from 'components/formik/textfield';
import * as yup from 'yup';
import HttpService from 'components/httpService';
import api from 'components/httpService/api';
import Http from 'components/httpService/Http';
import Switch from 'components/formik/switch';
import Slider from 'components/formik/slider';
import Date from 'components/formik/date_picker';
import Chip from 'components/chip';
import {
  convertToByte,
  getDayPersian,
  getExpireTime,
  uuidGenerator,
  emailGenerator,
  stringAvatar,
  convertByteToInt,
  separateNum,
  formValues
} from 'utils';
import dayjs from 'dayjs';
import Button from 'components/button';
import UserSelect from 'pages/components/select/users';
import config from 'config';
import useUsers from 'hooks/useUsers';
import SelectBadge from 'components/formik/badge';
import Avatar from 'components/avatar';
import Select from 'components/formik/select';
import useServices from 'hooks/useServices';
import Durations from 'pages/components/durations';
import DataLimit from 'pages/components/dataLimit';
import UserInfo from 'pages/components/user_info';
import GLOBAL from 'components/variables';
import Autocomplete from 'components/formik/autocomplete';
import { AvTimer, CalendarMonthOutlined, DataUsage } from '@mui/icons-material';

const validationSchema = yup.object({
  user_id: yup.number().required(),
  service_id: yup.number().required()
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
                  )}
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
                        { id, data_limit, duration, used_traffic, modified_at }
                      ) => (
                        <Fragment key={id}>
                          <li {...props}>
                            <Grid container alignItems="center">
                              <Grid
                                item
                                sx={{ width: 'calc(100% - 50px)', wordWrap: 'break-word' }}
                              >
                                {data_limit && (
                                  <>
                                    <Typography
                                      display={'flex'}
                                      alignItems={'center'}
                                      variant="body1"
                                      component={'div'}
                                    >
                                      <DataUsage color="primary" />$
                                      {convertByteToInt(used_traffic).toFixed(1)}/$
                                      {convertByteToInt(data_limit).toFixed(1)}
                                    </Typography>
                                  </>
                                )}
                                <Box
                                  component="li"
                                  sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                                  {...props}
                                >
                                  <img
                                    loading="lazy"
                                    width="20"
                                    srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                    src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                    alt=""
                                  />
                                  {option.label} ({option.code}) +{option.phone}
                                </Box>
                                {duration && (
                                  <Typography variant="body1" component={'div'}>
                                    <AvTimer color="primary" />
                                    {duration}
                                  </Typography>
                                )}
                                {modified_at && (
                                  <Typography
                                    display={'flex'}
                                    alignItems={'center'}
                                    variant="body1"
                                    component={'div'}
                                  >
                                    <CalendarMonthOutlined color="primary" />
                                    {getDayPersian(modified_at)}
                                  </Typography>
                                )}
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
                <Select label={'Status'} name="status" options={GLOBAL.statusOrder} />
              </Grid>
              <Grid item xs={12}>
                <Select
                  label={'Services'}
                  name="service_id"
                  options={[{ id: 0, name: 'None' }, ...services]}
                  isLoading={isLoading}
                  onChange={(service) => {
                    setFieldValue('duration', service.duration || 0);
                    setFieldValue('data_limit', convertByteToInt(service.data_limit) || 0);
                    setFieldValue('total', service.price || 0);
                    setFieldValue('total_discount_amount', service.total_discount_amount || 0);
                  }}
                />
              </Grid>

              {values.service_id ? (
                <Grid item xs={12}>
                  <Box textAlign={'left'} m={1}>
                    <Alert severity="info">
                      <AlertTitle>Warning</AlertTitle>
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
                      <Typography component={'span'}>{separateNum(values.total)}</Typography>
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
                    <TextField label={'Total'} price name="total" disabled={!!values.service_id} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label={'Total Discount'}
                      name="total_discount_amount"
                      disabled={!!values.service_id}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Durations disabled={!!values.service_id} />
                  </Grid>
                  <Grid item xs={12}>
                    <DataLimit disabled={!!values.service_id} />
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
