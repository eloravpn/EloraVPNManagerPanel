import { memo, useEffect, useState } from 'react';
import { DialogActions, Grid } from '@mui/material';
import { Form, Formik } from 'formik';
import TextField from 'components/formik/textfield';
import * as yup from 'yup';
import HttpService from 'components/httpService';
import api from 'components/httpService/api';
import Http from 'components/httpService/Http';
import Button from 'components/button';
import UserSelect from 'pages/components/select/users';
import useUsers from 'hooks/useUsers';
import Select from 'components/formik/select';
import UserInfo from 'pages/components/user_info';
import GLOBAL from 'components/variables';
import { formValues } from 'utils';

const validationSchema = yup.object({
  user_id: yup.number().required(),
  payment_id: yup.number().required(),
  order_id: yup.number().required()
});

const initialForm = {
  user_id: 0,
  order_id: 0,
  payment_id: 0,
  amount: 0,
  type: 'BONUS',
  total: '',
  description: ''
};

const AddEdit = (props) => {
  const { refrence, initial, createRow, editRow } = props;
  const [postDataLoading, setPostDataLoading] = useState(false);

  const { getUser, user, isLoading: isLoadingUser } = useUsers();
  // const { getPayments, payments, isLoading: isLoadingPayments } = usePayments();
  // const { orders, isLoading: isLoadingOrders, getOrders } = useOrders();

  useEffect(() => {
    // getOrders();
    // getPayments();
    if (initial.user_id) getUser(initial.user_id);
    return () => {};
  }, []);

  const handleCreate = (values) => {
    setPostDataLoading(true);
    HttpService()
      .post(api.transactions, {
        ...values
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
      .put(`${api.transactions}/${initial?.id}`, formValues(initialForm, values))
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
        {({ values }) => (
          <Form>
            {user && (
              <UserInfo user={user} isLoading={isLoadingUser}>
                {/* <Typography variant="h6" component={'div'}>
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
                </Typography> */}
              </UserInfo>
            )}
            <Grid container spacing={12} rowSpacing={2} justifyContent={'center'}>
              {!user && (
                <Grid item xs={12}>
                  <UserSelect name="user_id" label="Users" />
                </Grid>
              )}
              {/* <Grid item xs={12}>
                <Select
                  label={'Orders'}
                  name="order_id"
                  labelName={'user_id'}
                  options={orders}
                  isLoading={isLoadingOrders}
                />
              </Grid>
              <Grid item xs={12}>
                <Select
                  label={'Payments'}
                  name="payment_id"
                  labelName={'id'}
                  options={payments}
                  isLoading={isLoadingPayments}
                />
              </Grid> */}
              <Grid item xs={12}>
                <Select label={'Type'} name="type" options={GLOBAL.typeTransaction} />
              </Grid>
              <Grid item xs={12}>
                <TextField label={'Total'} name="total" price />
              </Grid>
              <Grid item xs={12}>
                <TextField label={'Description'} name="description" multiline rows={4} />
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
