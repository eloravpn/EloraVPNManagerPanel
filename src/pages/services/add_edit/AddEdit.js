import { memo, useEffect, useState } from 'react';
import { DialogActions, Grid } from '@mui/material';
import { Form, Formik } from 'formik';
import TextField from 'components/formik/textfield';
import * as yup from 'yup';
import HttpService from 'components/httpService';
import api from 'components/httpService/api';
import Http from 'components/httpService/Http';
import Switch from 'components/formik/switch';
import Button from 'components/button';
import DataLimit from 'pages/components/dataLimit';
import { convertToByte } from 'utils';
import useHostZones from 'hooks/useHostZones';
import Select from 'components/formik/select';

const validationSchema = yup.object({
  name: yup.string().required(),
  price: yup.string().required(),
  data_limit: yup.string().required(),
  enable: yup.boolean().required(),
  host_zone_id: yup.number().required()
});
const initialForm = {
  name: '',
  duration: 1,
  data_limit: 0,
  price: 0,
  discount: 0,
  enable: true,
  host_zone_id: ''
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
            <Grid item xs={12} md={6}>
              <TextField id={'name'} name={'name'} label="Name" type="text" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField id={'duration'} name={'duration'} label="Duration" type="tel" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField id={'price'} name={'price'} label="Price" type="text" price />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField label="Discount" id={'discount'} name={'discount'} type="text" price />
            </Grid>
            <Grid item xs={12} md={6}>
              <DataLimit />
            </Grid>
            <Grid item xs={6}>
              <Switch name={'enable'} id="enable" label="Enable" />
            </Grid>
            <Grid item xs={6}>
              <Select
                name="host_zone_id"
                label="Host Zone"
                labelName={'name'}
                options={hostZones}
                // isLoading={isLoadingHostZones}
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
