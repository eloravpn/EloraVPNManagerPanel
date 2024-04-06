import { DialogActions, Grid } from '@mui/material';
import Button from 'components/button';
import TextField from 'components/formik/textfield';
import HttpService from 'components/httpService';
import Http from 'components/httpService/Http';
import api from 'components/httpService/api';
import { Form, Formik } from 'formik';
import useHostZones from 'hooks/useHostZones';
import { memo, useEffect, useState } from 'react';
import * as yup from 'yup';

const validationSchema = yup.object({
  message: yup.string().required(),
  account_ids: yup.string().required()
});
const initialForm = {
  message: '',
  account_ids: ''
};

const BulkSend = (props) => {
  const { refrence } = props;
  const [postDataLoading, setPostDataLoading] = useState(false);

  const handleSubmit = (values) => {
    setPostDataLoading(true);
    HttpService()
      .post(`${api.notifications}/bulk_send`, {
        ...values
      })
      .then((res) => {
        Http.success(res);
        refrence.current.changeStatus();
      })
      .catch((err) => Http.error(err))
      .finally(() => {
        setPostDataLoading(false);
      });
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialForm}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form>
          <Grid container spacing={12} rowSpacing={2}>
            <Grid item xs={12}>
              <TextField
                id={'account_ids'}
                name={'account_ids'}
                label="Account IDs"
                type="text"
                minRows={4}
                multiline
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id={'message'}
                name={'message'}
                label="Message"
                type="text"
                minRows={4}
                multiline
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

export default memo(BulkSend);
