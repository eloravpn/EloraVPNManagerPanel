import { DialogActions, Grid } from '@mui/material';
import Button from 'components/button';
import TextField from 'components/formik/textfield';
import HttpService from 'components/httpService';
import Http from 'components/httpService/Http';
import api from 'components/httpService/api';
import { Form, Formik } from 'formik';
import { memo, useState } from 'react';
import * as yup from 'yup';
import AddOneFrom from '../AddOne';

const validationSchema = yup.object({
  message: yup.string().required(),
  account_ids: yup.string().required()
});
const initialForm = {
  account_ids: '',
  level: 0,
  message: '',
  status: 'pending',
  user_id: '',
  type: 'general',
  engine: 'telegram',
  approve: false
};

const BulkSend = (props) => {
  const { refrence } = props;
  const [postDataLoading, setPostDataLoading] = useState(false);

  const handleSubmit = (values) => {
    setPostDataLoading(true);
    HttpService()
      .post(`${api.notifications}/bulk_send`, {
        ...values,
        account_ids: values.account_ids.split('\n')
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
          <Grid container spacing={3} rowSpacing={2} justifyContent={'center'}>
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
            <AddOneFrom />
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
