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
  CARD_NUMBER: yup.string().nullable(),
  CARD_OWNER: yup.string().nullable()
});

const initialForm = {};

const Payment = (props) => {
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
                  id={'CARD_NUMBER'}
                  name={'CARD_NUMBER'}
                  label="Card number"
                  type="text"
                  helperText="Enter the card number that show to new Users"
                />

                <TextField
                  id={'CARD_OWNER'}
                  name={'CARD_OWNER'}
                  label="Card Owner"
                  type="text"
                  helperText="Enter the caard owner"
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

export default memo(Payment);
