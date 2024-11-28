import { DialogActions, Grid, Typography } from '@mui/material';
import Button from 'components/button';
import MultipleSelect from 'components/formik/multiSelect';
import Switch from 'components/formik/switch';
import TextField from 'components/formik/textfield';
import HttpService from 'components/httpService';
import api from 'components/httpService/api';
import Http from 'components/httpService/Http';
import { Form, Formik } from 'formik';
import useHostZones from 'hooks/useHostZones';
import useServices from 'hooks/useServices';
import DataLimit from 'pages/components/dataLimit';
import { memo, useEffect, useState } from 'react';
import { convertToByte } from 'utils';
import * as yup from 'yup';

const validationSchema = yup.object({
  name: yup.string().required(),
  price: yup.string().required(),
  data_limit: yup.string().required(),
  enable: yup.boolean().required(),
  host_zone_ids: yup.array().required(),
  ip_limit: yup.number().required()
});
var initialForm = {
  name: '',
  duration: 1,
  data_limit: 0,
  price: 0,
  discount: 0,
  enable: true,
  host_zone_ids: [],
  ip_limit: 0
};

const AddEdit = (props) => {
  const { refrence, initial, createRow, editRow } = props;
  const [postDataLoading, setPostDataLoading] = useState(false);
  const { getService, service, isLoadingGetService } = useServices();
  const { getHostZones, hostZones } = useHostZones();
  const {} = useServices();
  useEffect(() => {
    getHostZones();
    if (initial?.id) getService(initial.id);
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
  if (isLoadingGetService)
    return (
      <Typography textAlign={'center'} variant="body2">
        Please Wait...
      </Typography>
    );

  return (
    <Formik
      enableReinitialize
      initialValues={service || initialForm}
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
              <TextField name="ip_limit" label="IP Limit" />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField label="Discount" id={'discount'} name={'discount'} type="text" price />
            </Grid>
            <Grid item xs={12} md={6}>
              <DataLimit />
            </Grid>
            <Grid item xs={12} md={6}>
              <MultipleSelect
                name="host_zone_ids"
                label="Host Zone"
                labelName={'name'}
                options={hostZones}
                // isLoading={isLoadingHostZones}
              />
            </Grid>
            <Grid item xs={6}>
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
              Cancel
            </Button>
          </DialogActions>
        </Form>
      )}
    </Formik>
  );
};

export default memo(AddEdit);
