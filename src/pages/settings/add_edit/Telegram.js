import { memo, useState } from 'react';
import { DialogActions, Grid, Stack } from '@mui/material';
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
  BOT_USER_NAME: yup.string(),
  TELEGRAM_CHANNEL: yup.string(),
  TELEGRAM_CHANNEL_URL: yup.string(),
  IPHONE_HELP_POST_URL: yup.string(),
  ANDROID_HELP_POST_URL: yup.string(),
  WINDOWS_HELP_POST_URL: yup.string(),
  MAC_HELP_POST_URL: yup.string(),
  TELEGRAM_ADMIN_ID: yup.number(),
  TEST_SERVICE_ID: yup.number()
});

const initialForm = {
  TELEGRAM_API_TOKEN: '',
  TELEGRAM_PAYMENT_API_TOKEN: '',
  TELEGRAM_ADMIN_USER_NAME: '',
  BOT_USER_NAME: '',
  TELEGRAM_CHANNEL: '',
  TELEGRAM_CHANNEL_URL: '',
  IPHONE_HELP_POST_URL: '',
  ANDROID_HELP_POST_URL: '',
  WINDOWS_HELP_POST_URL: '',
  MAC_HELP_POST_URL: '',
  TELEGRAM_ADMIN_ID: 0,
  TEST_SERVICE_ID: 0
};

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
              <Stack spacing={4}>
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
                <TextField
                  id={'BOT_USER_NAME'}
                  name={'BOT_USER_NAME'}
                  label="Telgeram Bot User Name"
                  type="text"
                  helperText="Enter your Telegram Bot User Name"
                />
                <TextField
                  id={'TELEGRAM_CHANNEL'}
                  name={'TELEGRAM_CHANNEL'}
                  label="Telgeram Channel"
                  type="text"
                  helperText="Enter your Telegram Channel"
                />
                <TextField
                  id={'TELEGRAM_CHANNEL_URL'}
                  name={'TELEGRAM_CHANNEL_URL'}
                  label="Telgeram Channel URL"
                  type="text"
                  helperText="Enter your Telegram Channel URL ex: https://t.me/elora"
                />
                <TextField
                  id={'IPHONE_HELP_POST_URL'}
                  name={'IPHONE_HELP_POST_URL'}
                  label="Iphone help post url in your channel"
                  type="text"
                  helperText="ex: https://t.me/elora/21"
                />
                <TextField
                  id={'ANDROID_HELP_POST_URL'}
                  name={'ANDROID_HELP_POST_URL'}
                  label="Android help post url in your channel"
                  type="text"
                  helperText="ex: https://t.me/elora/21"
                />
                <TextField
                  id={'WINDOWS_HELP_POST_URL'}
                  name={'WINDOWS_HELP_POST_URL'}
                  label="Windows help post url in your channel"
                  type="text"
                  helperText="ex: https://t.me/elora/21"
                />
                <TextField
                  id={'MAC_HELP_POST_URL'}
                  name={'MAC_HELP_POST_URL'}
                  label="MAC book help post url in your channel"
                  type="text"
                  helperText="ex: https://t.me/elora/21"
                />
                <TextField
                  id={'TEST_SERVICE_ID'}
                  name={'TEST_SERVICE_ID'}
                  label="Test service ID"
                  type="text"
                  helperText="Enter the id of a service that you want to give as Test service to your Cutomers!"
                />
              </Stack>
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
