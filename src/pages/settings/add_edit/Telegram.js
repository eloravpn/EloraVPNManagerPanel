import { memo, useState } from 'react';
import { DialogActions, Grid } from '@mui/material';
import { Form, Formik } from 'formik';
import TextField from 'components/formik/textfield';
import * as yup from 'yup';
import HttpService from 'components/httpService';
import api from 'components/httpService/api';
import Http from 'components/httpService/Http';
import Button from 'components/button';

const validationSchema = yup.object({
  TELEGRAM_API_TOKEN: yup.string(),
  TELEGRAM_PAYMENT_API_TOKEN: yup.string(),
  TELEGRAM_ADMIN_USER_NAME: yup.string(),
  TELEGRAM_ADMIN_ID: yup.number()
});

const initialForm = {};

const TelgramSettings = (props) => {
  const { initial } = props;
  const [postDataLoading, setPostDataLoading] = useState(false);

  const handleUpdate = (values) => {
    setPostDataLoading(true);
    HttpService()
      .post(`${api.settings}/bulk`, {
        settings: { ...values }
      })
      .then((res) => {
        Http.success(res);
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
        handleUpdate(values);
      }}
    >
      {() => (
        <Form>
          <Grid container spacing={12} rowSpacing={2}>
            <Grid item xs={12} md={12}>
              <TextField
                id={'TELEGRAM_API_TOKEN'}
                name={'TELEGRAM_API_TOKEN'}
                label="Telgeram API Token"
                type="text"
                helperText="Enter your Telegram Bot API token obtained from BotFather"
              />

              <TextField
                id={'TELEGRAM_PAYMENT_API_TOKEN'}
                name={'TELEGRAM_PAYMENT_API_TOKEN'}
                label="Telgeram Payment API Token"
                type="text"
                helperText="Enter your Telegram Payment Bot API token obtained from BotFather"
              />

              <TextField
                id={'TELEGRAM_ADMIN_ID'}
                name={'TELEGRAM_ADMIN_ID'}
                label="Telgeram Admin ID"
                type="text"
                helperText="Enter your Telegram Admin Id from @userinfo bot to recieve usefull notifications."
              />

              <TextField
                id={'TELEGRAM_ADMIN_USER_NAME'}
                name={'TELEGRAM_ADMIN_USER_NAME'}
                label="Telgeram Admin User Name"
                type="text"
                helperText="Enter your Telegram Admin username for use in telegram bot helps and support links"
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
              Save
            </Button>
          </DialogActions>
        </Form>
      )}
    </Formik>
  );
};

export default memo(TelgramSettings);
