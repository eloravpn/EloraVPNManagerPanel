import { memo, useState } from 'react';
import { DialogActions, Grid, Stack } from '@mui/material';
import { Form, Formik } from 'formik';
import TextField from 'components/formik/textfield';
import CheckBox from 'components/formik/checkbox';
import Button from 'components/button';
import HttpService from 'components/httpService';
import Http from 'components/httpService/Http';
import api from 'components/httpService/api';
import * as yup from 'yup';
import UserSelect from 'pages/components/select/users';
import Modal from '../../../../components/modal';

const initialForm = {
  card_number: '',
  account_number: '',
  owner_name: '',
  bank_name: '',
  owner_family: '',
  payment_notice: '',
  enable: true,
  min_payment_for_bot: 0,
  max_daily_transactions: 100,
  min_payment_amount: 0,
  max_daily_amount: 1000000000,
  min_daily_amount: 0,
  user_id: null
};

const validationSchema = yup.object({
  card_number: yup.string().required().length(16, 'Card number must be exactly 16 digits'),
  account_number: yup.string().nullable().max(24, 'Account number must be at most 24 characters'),
  owner_name: yup.string().required('Owner name is required'),
  bank_name: yup.string().required('Bank name is required'),
  owner_family: yup.string().required('Owner family name is required'),
  min_payment_for_bot: yup.number().min(0),
  max_daily_transactions: yup.number().min(0),
  min_payment_amount: yup.number().min(0),
  max_daily_amount: yup.number().min(0),
  min_daily_amount: yup.number().min(0),
  user_id: yup.number().nullable()
});

const AddEdit = (props) => {
  const { refrence, initial, createRow, editRow } = props;
  const [postDataLoading, setPostDataLoading] = useState(false);

  const handleCreate = (values) => {
    setPostDataLoading(true);
    HttpService()
      .post(api.paymentAccounts, values)
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
      .put(`${api.paymentAccounts}/${initial?.id}`, values)
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
    <Modal
      ref={refrence}
      onBackClose={false}
      maxWidth="sm"
      icon="manage_accounts"
      title={`${props?.initial?.id ? 'Edit' : 'Create'}`}
    >
      <Formik
        enableReinitialize
        initialValues={initial || initialForm}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          initial.id ? handleEdit(values) : handleCreate(values);
        }}
      >
        {() => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <UserSelect name="user_id" label="User" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField name="owner_name" label="Owner Name" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField name="owner_family" label="Owner Family Name" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField name="bank_name" label="Bank Name" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField name="card_number" label="Card Number" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField name="account_number" label="Account Number" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="min_payment_for_bot"
                  label="Minimum Payment for Bot"
                  type="number"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  name="max_daily_transactions"
                  label="Max Daily Transactions"
                  type="number"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField name="min_payment_amount" label="Min Daily Amount" type="number" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField name="max_daily_amount" label="Max Daily Amount" type="number" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField name="min_daily_amount" label="Min Daily Amount" type="number" />
              </Grid>
              <Grid item xs={12}>
                <CheckBox name="enable" label="Enable Account" />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  id={'payment_notice'}
                  name={'payment_notice'}
                  label="Payment Notice"
                  type="text"
                  minRows={4}
                  multiline
                />
              </Grid>
            </Grid>
            <DialogActions>
              <Button
                autoFocus
                variant="outlined"
                type="submit"
                isLoading={postDataLoading}
                color="primary"
              >
                {initial.id ? 'Update' : 'Create'}
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => refrence.current.changeStatus()}
              >
                Cancel
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default memo(AddEdit);
