import { memo, useEffect, useState } from 'react';
import { Box, DialogActions, Grid, Skeleton, Typography } from '@mui/material';
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
  stringAvatar
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

const statuses = [
  { name: 'OPEN', id: 'OPEN' },
  { name: 'PENDING', id: 'PENDING' },
  { name: 'CANCELED', id: 'CANCELED' },
  { name: 'PAID', id: 'PAID' },
  { name: 'COMPLETED', id: 'COMPLETED' }
];

const validationSchema = yup.object({
  user_id: yup.number().required(),
  service_id: yup.number().required()
});

const initialForm = {
  account_id: '',
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
  // const { getUser, user, isLoading } = useUsers();

  const { services, isLoading, getServices } = useServices();

  useEffect(() => {
    getServices();
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
      .put(`${api.orders}/${initial?.id}`, {
        ...values,
        data_limit: convertToByte(values.data_limit)
      })
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
            <Grid container spacing={12} rowSpacing={2} justifyContent={'center'}>
              <Grid item xs={12}>
                <UserSelect name="user_id" label="Users" onBlur={handleBlurUserId} />
              </Grid>
              <Grid item xs={12}>
                <Select
                  label={'Account'}
                  name="account_id"
                  options={accounts}
                  labelName={'full_name'}
                  disabled={!values.user_id}
                />
              </Grid>
              <Grid item xs={12}>
                <Select label={'Status'} name="status" options={statuses} />
              </Grid>
              <Grid item xs={12}>
                <Select
                  label={'Services'}
                  name="service_id"
                  options={[{ id: '', name: 'None' }, ...services]}
                  isLoading={isLoading}
                  onChange={(service) => {
                    setFieldValue('duration', service.duration || 0);
                    setFieldValue('data_limit', service.data_limit || 0);
                    setFieldValue('total', service.price || 0);
                    setFieldValue('total_discount_amount', service.total_discount_amount || 0);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField label={'Total'} name="total" disabled={!!values.service_id} />
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
