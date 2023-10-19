import { Fragment, memo, useEffect, useState } from 'react';
import { Box, DialogActions, Divider, Grid, Skeleton, Stack, Typography } from '@mui/material';
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
import useOrders from 'hooks/useOrders';
import GLOBAL from 'components/variables';
import Autocomplete from 'components/formik/autocomplete';

const validationSchema = yup.object({
  user_id: yup.number().required(),
  order_id: yup.number().required()
});

const initialForm = {
  user_id: 0,
  order_id: 0,
  total: 0,
  method: 'MONEY_ORDER',
  status: 'PENDING'
};

const AddEdit = (props) => {
  const { refrence, initial, createRow, editRow } = props;

  const [postDataLoading, setPostDataLoading] = useState(false);

  const { getUser, user, isLoading: isLoadingUser, setUser } = useUsers();
  const { orders, isLoading: isLoadingOrders, getOrders } = useOrders();

  useEffect(() => {
    getOrders();
    if (initial.user_id) getUser(initial.user_id);
    return () => {};
  }, []);

  const handleCreate = (values) => {
    setPostDataLoading(true);
    HttpService()
      .post(api.payments, values)
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
      .put(`${api.payments}/${initial?.id}`, formValues(initialForm, values))
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
                {/* {user.accounts && (
                  <>
                    <Typography variant="h6" component={'div'}>
                      Day:
                      {user.accounts.find((i) => i.id === values.account_id).id}
                    </Typography>
                    <Typography variant="h6" component={'div'}>
                      Usage:
                      {convertByteToInt(
                        user.accounts.find((i) => i.id === values.account_id).used_traffic
                      )}
                    </Typography>
                    <Typography variant="h6" component={'div'}>
                      Email:
                      {user.accounts.find((i) => i.id === values.account_id).email}
                    </Typography>
                  </>
                )} */}
              </UserInfo>
            )}
            <Grid container spacing={12} rowSpacing={2} justifyContent={'center'}>
              {!user && (
                <Grid item xs={12}>
                  <UserSelect name="user_id" label="Users" />
                </Grid>
              )}
              <Grid item xs={12}>
                <Autocomplete
                  getOptionLabel={(option) =>
                    `${convertByteToInt(option.data_limit).toFixed(1)} Gb - ${getDayPersian(
                      getExpireTime(option.duration)
                    )}`
                  }
                  renderOption={(props, { id, data_limit, duration }) => (
                    <Fragment key={id}>
                      <li {...props}>
                        <Box>
                          Usage: {convertByteToInt(data_limit).toFixed(1)} GB/{' '}
                          {getDayPersian(getExpireTime(duration))}
                        </Box>
                      </li>
                      <Divider />
                    </Fragment>
                  )}
                  label={'Order'}
                  name="order_id"
                  options={orders}
                  isLoading={isLoadingOrders}
                  onChange={(order) => {
                    if (!order) {
                      setUser(null);
                      return;
                    }
                    setFieldValue('status', order.status);
                    setFieldValue('total', order.total);
                    setUser(order.user);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Select
                  label={'Status'}
                  name="status"
                  options={GLOBAL.statusPayment}
                  disabled={!!values.order_id}
                />
              </Grid>
              <Grid item xs={12}>
                <Select label={'Methode'} name="method" options={GLOBAL.methods} />
              </Grid>
              <Grid item xs={12}>
                <TextField label={'Total'} price name="total" disabled={!!values.order_id} />
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
    </>
  );
};

export default memo(AddEdit);
