import { memo, useState } from 'react';
import { DialogActions, Grid } from '@mui/material';
import { Form, Formik } from 'formik';
import TextField from 'components/formik/textfield';
import * as yup from 'yup';
import HttpService from 'components/httpService';
import api from 'components/httpService/api';
import Http from 'components/httpService/Http';
import Switch from 'components/formik/switch';
import Button from 'components/button';

const validationSchema = yup.object({
  username: yup.string().required(),
  telegram_chat_id: yup.number(),
  enable: yup.boolean().required(),
  banned: yup.boolean().required()
});
const initialForm = {
  id: null,
  username: null,
  first_name: '',
  last_name: null,
  description: null,
  telegram_chat_id: 0,
  telegram_username: null,
  phone_number: '',
  password: null,
  enable: true,
  banned: false,
  force_join_channel: false
};

const AddEdit = (props) => {
  const { refrence, initial, createRow, editRow } = props;
  const [postDataLoading, setPostDataLoading] = useState(false);

  const handleCreate = (values) => {
    setPostDataLoading(true);
    HttpService()
      .post(api.users, {
        ...values
      })
      .then((res) => {
        Http.success(res);
        refrence.current.changeStatus();
        createRow(res.data);
      })
      .catch((err) => Http.error(err))
      .finally(() => {
        setPostDataLoading(false);
      });
  };

  const handleEdit = (values) => {
    setPostDataLoading(true);
    HttpService()
      .put(`${api.users}/${initial?.id}`, {
        ...values
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

  return (
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
          <Grid container spacing={12} rowSpacing={2}>
            <Grid item xs={12} md={6}>
              <TextField id={'first_name'} name={'first_name'} label="First Name" type="text" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField id={'last_name'} name={'last_name'} label="Last Name" type="text" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField id={'username'} name={'username'} label="Username" type="text" />
            </Grid>
            <Grid item xs={12} md={6}>
              {!initial.id ? (
                <TextField
                  label="Password"
                  disabled={!!initial.id}
                  id={'password'}
                  name={'password'}
                  type="text"
                />
              ) : null}
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Telegram Chat ID"
                id={'telegram_chat_id'}
                name={'telegram_chat_id'}
                type="text"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Telegram Username"
                id={'telegram_username'}
                name={'telegram_username'}
                type="text"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Phonenumber"
                id={'phone_number'}
                name={'phone_number'}
                type="text"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Switch name={'enable'} id="enable" label="Enable" />
              <Switch name={'banned'} id="banned" label="Banned" />
              <Switch
                name={'force_join_channel'}
                id="force_join_channel"
                label="Force Join Channel"
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
  );
};

export default memo(AddEdit);
