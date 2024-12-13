import { memo, useState } from 'react';
import { DialogActions, Grid, IconButton, Stack, Tooltip } from '@mui/material';
import { Form, Formik } from 'formik';
import TextField from 'components/formik/textfield';
import * as yup from 'yup';
import HttpService from 'components/httpService';
import api from 'components/httpService/api';
import Http from 'components/httpService/Http';
import Button from 'components/button';

const isValidIP = (value) => {
  // IPv4
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  // IPv6
  const ipv6Regex = /^([0-9a-fA-F]{0,4}:){1,7}[0-9a-fA-F]{0,4}$/;
  // Special cases
  const specialCases = ['0.0.0.0', '::', '127.0.0.1', '::1'];

  return specialCases.includes(value) || ipv4Regex.test(value) || ipv6Regex.test(value);
};

const validationSchema = yup.object({
  UVICORN_HOST: yup
    .string()
    .required('Host is required')
    .test('is-valid-host', 'Must be a valid IP address (IPv4 or IPv6)', isValidIP),
  UVICORN_PORT: yup
    .number()
    .required('Port is required')
    .min(1, 'Port must be greater than 0')
    .max(65535, 'Port must be less than 65536')
    .test('is-valid-port', 'Port 80 and 443 require root privileges', (value) => {
      return !(value === 80 || value === 443);
    }),
  SUBSCRIPTION_BASE_URL: yup
    .string()
    .required('Subscription Base URL is required')
    .url('Must be a valid URL')
    .matches(/\/api\/sub$/, 'URL must end with /api/sub')
});

const initialForm = {};

const Basic = (props) => {
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
                  id={'UVICORN_HOST'}
                  name={'UVICORN_HOST'}
                  label="Uvicorn host"
                  type="text"
                  placeholder="0.0.0.0"
                />

                <TextField
                  id={'UVICORN_PORT'}
                  name={'UVICORN_PORT'}
                  label="Uvicorn port"
                  type="text"
                />

                <TextField
                  id={'CUSTOM_BASE_URL'}
                  name={'CUSTOM_BASE_URL'}
                  label="Custom Base URL"
                  type="text"
                />

                <div className="flex items-center gap-2">
                  <TextField
                    id={'SUBSCRIPTION_BASE_URL'}
                    name={'SUBSCRIPTION_BASE_URL'}
                    label="Subscription Base URL"
                    type="text"
                  />
                </div>
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

export default memo(Basic);
