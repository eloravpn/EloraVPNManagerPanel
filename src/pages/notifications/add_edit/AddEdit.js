import { DialogActions, Grid } from '@mui/material';
import Button from 'components/button';
import TextField from 'components/formik/textfield';
import HttpService from 'components/httpService';
import Http from 'components/httpService/Http';
import api from 'components/httpService/api';
import { Form, Formik } from 'formik';
import useHostZones from 'hooks/useHostZones';
import { memo, useEffect, useState } from 'react';
import { convertToByte } from 'utils';
import * as yup from 'yup';

const validationSchema = yup.object({
  name: yup.string().required(),
  price: yup.string().required(),
  data_limit: yup.string().required(),
  enable: yup.boolean().required(),
  host_zone_id: yup.number().required(),
  ip_limit: yup.number().required()
});
const initialForm = {
  message: '',
  type: 1
};

const AddEdit = (props) => {
  const { refrence, initial, createRow, editRow } = props;
  const [postDataLoading, setPostDataLoading] = useState(false);
  const { getHostZones, hostZones } = useHostZones();

  useEffect(() => {
    getHostZones();
    return () => {};
  }, [getHostZones]);

  const handleCreate = (values) => {
    setPostDataLoading(true);
    HttpService()
      .post(api.services, {
        ...values,
        data_limit: convertToByte(values.data_limit)
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
        ...values,
        data_limit: convertToByte(values.data_limit)
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

export default memo(AddEdit);
