import { Box, DialogActions, Divider, Grid } from '@mui/material';
import Button from 'components/button';
import Autocomplete from 'components/formik/autocomplete';
import Select from 'components/formik/select';
import TextField from 'components/formik/textfield';
import HttpService from 'components/httpService';
import api from 'components/httpService/api';
import Http from 'components/httpService/Http';
import GLOBAL from 'components/variables';
import { Form, Formik } from 'formik';
import useOrders from 'hooks/useOrders';
import useUsers from 'hooks/useUsers';
import UserSelect from 'pages/components/select/users';
import UserInfo from 'pages/components/user_info';
import { OrderInfo } from 'pages/components/user_info/OrderInfo';
import { Fragment, memo, useEffect, useState } from 'react';
import { convertByteToInt, formValues, getDayPersian, getExpireTime } from 'utils';
import * as yup from 'yup';
import usePaymentAccounts from '../../../hooks/usePaymentAccounts';
import DatePicker from '../../../components/formik/date_picker';
import CheckBox from '../../../components/formik/checkbox';

const validationSchema = yup.object({
  user_id: yup.number().required()
});

const initialForm = {
  user_id: 0,
  order_id: 0,
  verify: true,
  payment_account_id: 0,
  paid_at: new Date().getTime(),
  total: 0,
  method: 'MONEY_ORDER',
  status: 'PAID'
};

const AddEdit = (props) => {
  const { refrence, initial, createRow, editRow } = props;

  const [postDataLoading, setPostDataLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const { getUser, user, isLoading: isLoadingUser, setUser } = useUsers();
  const { orders, isLoading: isLoadingOrders, getOrders } = useOrders();
  const {
    paymentAccounts,
    isLoading: isLoadingPaymentAccounts,
    getPaymentAccounts
  } = usePaymentAccounts();

  useEffect(() => {
    if (initial?.user_id) getOrders({ user_id: initial.user_id || null });
    if (initial.user_id) getUser(initial.user_id);
    getPaymentAccounts();
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
            <Grid container spacing={2} rowSpacing={2} justifyContent={'center'}>
              {!user && (
                <Grid item xs={12}>
                  <UserSelect
                    name="user_id"
                    label="Select User"
                    onChange={(user) => {
                      if (user) getOrders({ user_id: user.id });
                      setBalance(user.balance);
                    }}
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <OrderInfo orders={orders} user={user} balance={balance} />
              </Grid>
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
                          ID: {id} Usage: {convertByteToInt(data_limit).toFixed(1)} GB{' '}
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
                    if (!order && initial.id) {
                      setUser(null);
                      return;
                    }
                    setFieldValue('status', order.status);
                    setFieldValue('total', order.total);
                    setFieldValue('user_id', order.user_id);
                    setUser(order.user);
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Autocomplete
                  getOptionLabel={(option) => `${option.card_number}`}
                  renderOption={(props, { id, card_number }) => (
                    <Fragment key={id}>
                      <li {...props}>
                        <Box>{card_number}</Box>
                      </li>
                      <Divider />
                    </Fragment>
                  )}
                  label={'Payment Account'}
                  name="payment_account_id"
                  options={paymentAccounts}
                  isLoading={isLoadingPaymentAccounts}
                />
              </Grid>

              <Grid item xs={6}>
                <DatePicker name="paid_at" label="Date Picker" />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label={'Total'}
                  price
                  name="total"
                  disabled={!!values.order_id || (initial.id && condition.includes(values.status))}
                />
              </Grid>

              <Grid item xs={4}>
                <Select
                  label={'Status'}
                  name="status"
                  options={GLOBAL.statusPayment}
                  disabled={!!values.order_id || (initial.id && condition.includes(values.status))}
                />
              </Grid>

              <Grid item xs={4}>
                <Select
                  label={'Methode'}
                  name="method"
                  options={GLOBAL.methods}
                  disabled={initial.id && condition.includes(values.status)}
                />
              </Grid>

              <Grid item xs={4}>
                <CheckBox name="verify" label="Verified?" />
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
