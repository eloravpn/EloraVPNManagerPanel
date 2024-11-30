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
  UVICORN_HOST: yup.string().required(),
  SUBSCRIPTION_BASE_URL: yup.string().required(),
  UVICORN_PORT: yup.number().required()
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
                  label="Unicorn host"
                  type="text"
                  helperText="Enter the address that unicorn listent on this server"
                />

                <TextField
                  id={'UVICORN_PORT'}
                  name={'UVICORN_PORT'}
                  label="Unicorn port"
                  type="text"
                  helperText="Enter the unicorn port"
                />

                <TextField
                  id={'SUBSCRIPTION_BASE_URL'}
                  name={'SUBSCRIPTION_BASE_URL'}
                  label="Subscription Base URL"
                  type="text"
                  helperText="Enter the subscription Base URL"
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

export default memo(Basic);
