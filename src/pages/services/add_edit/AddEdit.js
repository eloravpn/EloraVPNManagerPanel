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
  name: yup.string().required(),
  price: yup.string().required(),
  data_limit: yup.string().required(),
  enable: yup.boolean().required()
});
const initialForm = {
  name: '',
  duration: 1,
  data_limit: 0,
  price: 0,
  discount: 0,
  enable: true
};

const AddEdit = (props) => {
  const { refrence, initial, createRow, editRow } = props;
  const [postDataLoading, setPostDataLoading] = useState(false);

  const handleCreate = (values) => {
    setPostDataLoading(true);
    HttpService()
      .post(api.services, {
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
      .put(`${api.services}/${initial?.id}`, {
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
              <TextField id={'name'} name={'name'} label="Name" type="text" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField id={'duration'} name={'duration'} label="Duration" type="tel" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField id={'price'} name={'price'} label="Price" type="text" />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField label="Discount" id={'discount'} name={'discount'} type="text" />
            </Grid>
            <Grid item xs={12} md={6}>
              <Switch name={'enable'} id="enable" label="Enable" />
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
