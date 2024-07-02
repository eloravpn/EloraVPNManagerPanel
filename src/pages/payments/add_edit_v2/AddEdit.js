import { DialogActions, duration, Grid } from '@mui/material';
import Fade from '@mui/material/Fade';
import Button from 'components/button';
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
import AddEditOrder from 'pages/orders/add_edit/AddEdit';
import { memo, useEffect, useState } from 'react';
import { formValues } from 'utils';
import * as yup from 'yup';
import ServicesSelect from 'pages/components/select/services';
const validationSchema = yup.object({
  user_id: yup.number().required()
});

const initialForm = {
  user_id: 0,
  order_id: 0,
  service_id: '',
  total: 0,
  method: 'MONEY_ORDER',
  status: 'PAID'
};

const AddEdit = (props) => {
  const { refrence, initial, createRow, editRow } = props;

  const [postDataLoading, setPostDataLoading] = useState(false);
  const [showCreateOrder, setShowCreateOrder] = useState(false);
  const [initialOrder, setInitialOrder] = useState({ user_id: 0, dis: 100 });
  const [service, setService] = useState({});
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

        const obj = {
          duration: service.duration,
          data_limit: service.data_limit,
          total: service.price,
          total_discount_amount: service.discount,
          extra_discount: 0,
          dis: 0
        };
        setInitialOrder({
          account_id: 0,
          status: 'PAID',
          ip_limit: 0,
          service_id: values?.service_id,
          user_id: res.data.user_id,
          ...(service?.id ? { ...obj } : {})
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
          {({ values, setFieldValue }) => (
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
                  <ServicesSelect
                    label="Service"
                    name="service_id"
                    onChange={(service) => {
                      setService(service);
                      setFieldValue('total', +service.price - +service?.discount);
                    }}
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
      <>
        <>
          {showCreateOrder && (
            <AddEditOrder refrence={refrence} initial={initialOrder} initialOrder={initialOrder} />
          )}
        </>
      </>
    </>
  );
};

export default memo(AddEdit);
