import { Fragment, memo, useEffect, useState } from 'react';
import { Box, DialogActions, Divider, Grid, Slide } from '@mui/material';
import Fade from '@mui/material/Fade';
import { Form, Formik } from 'formik';
import TextField from 'components/formik/textfield';
import * as yup from 'yup';
import HttpService from 'components/httpService';
import api from 'components/httpService/api';
import Http from 'components/httpService/Http';
import { getDayPersian, getExpireTime, convertByteToInt, formValues } from 'utils';
import Button from 'components/button';
import UserSelect from 'pages/components/select/users';
import useUsers from 'hooks/useUsers';
import Select from 'components/formik/select';
import UserInfo from 'pages/components/user_info';
import useOrders from 'hooks/useOrders';
import GLOBAL from 'components/variables';
import Autocomplete from 'components/formik/autocomplete';
import AddEditOrder from 'pages/orders/add_edit/AddEdit';
const validationSchema = yup.object({
  user_id: yup.number().required()
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
  const [showCreateOrder, setShowCreateOrder] = useState(false);
  const [initialOrder, setInitialOrder] = useState({ user_id: 0 });
  const { getUser, user, isLoading: isLoadingUser, setUser } = useUsers();
  const { orders, isLoading: isLoadingOrders, getOrders } = useOrders();

  useEffect(() => {
    getOrders({ user_id: initial.user_id || null });
    if (initial.user_id) getUser(initial.user_id);
    return () => {};
  }, []);

  const handleCreate = (values) => {
    setPostDataLoading(true);
    HttpService()
      .post(api.payments, values)
      .then((res) => {
        Http.success(res);
        setInitialOrder({
          ...{
            account_id: 0,
            service_id: '',
            duration: 1,
            total: 0,
            total_discount_amount: 0,
            status: 'PAID',
            data_limit: 0,
            ip_limit: 0
          },
          user_id: res.data.user_id
        });
        setShowCreateOrder(true);
        // refrence.current.changeStatus();
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
      {!showCreateOrder && (
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
              {user && <UserInfo user={user} isLoading={isLoadingUser}></UserInfo>}
              <Grid container spacing={12} rowSpacing={2} justifyContent={'center'}>
                {!user && (
                  <Grid item xs={12}>
                    <UserSelect name="user_id" label="Users" />
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Select
                    label={'Status'}
                    name="status"
                    options={GLOBAL.statusPayment}
                    disabled={
                      !!values.order_id || (initial.id && condition.includes(values.status))
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Select
                    label={'Methode'}
                    name="method"
                    options={GLOBAL.methods}
                    disabled={initial.id && condition.includes(values.status)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label={'Total'}
                    price
                    name="total"
                    disabled={
                      !!values.order_id || (initial.id && condition.includes(values.status))
                    }
                  />
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
                  Next
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
      )}
      <Fade in={showCreateOrder}>
        <div>{showCreateOrder && <AddEditOrder refrence={refrence} initial={initialOrder} />}</div>
      </Fade>
    </>
  );
};

export default memo(AddEdit);
