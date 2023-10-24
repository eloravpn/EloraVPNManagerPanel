import { memo, useEffect, useState } from 'react';
import { DialogActions, Grid } from '@mui/material';
import { Form, Formik } from 'formik';
import TextField from 'components/formik/textfield';
import Select from 'components/formik/select';
import * as yup from 'yup';
import HttpService from 'components/httpService';
import api from 'components/httpService/api';
import Http from 'components/httpService/Http';
import Switch from 'components/formik/switch';
import Button from 'components/button';
import useHostZones from '../../../hooks/useHostZones';

const validationSchema = yup.object({
  name: yup.string().required(),
  port: yup.number().required(),
  host_zone_id: yup.number().required(),
  type: yup.string().required(),
  enable: yup.boolean().required(),
  master: yup.boolean().required(),
  ip: yup
    .string()
    .matches(
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
      'Is not in correct IP Address'
    )
    .required(),
  domain: yup
    .string()
    .matches(
      /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/,
      'Is not in correct Domain'
    )
    .required()
});

const types = [{ id: 'X-UI-MHSANAEI', name: 'X-UI-MHSANAEI' }];

const initialForm = {
  name: '',
  domain: '',
  port: '',
  username: '',
  password: '',
  ip: '',
  api_path: '/panel/api',
  enable: true,
  master: false,
  type: '',
  host_zone_id: ''
};

const AddEdit = (props) => {
  const { refrence, initial, createRow, editRow } = props;
  const [postDataLoading, setPostDataLoading] = useState(false);
  const { getHostZones, hostZones, isLoading } = useHostZones();

  useEffect(() => {
    getHostZones();
    return () => {};
  }, [getHostZones]);

  const handleCreate = (values) => {
    setPostDataLoading(true);
    HttpService()
      .post(api.hosts, values)
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
      .put(`${api.hosts}/${initial?.id}`, values)
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
      initialValues={initial || initialForm}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        initial.id ? handleEdit(values) : handleCreate(values);
      }}
    >
      {() => (
        <Form>
          <Grid container spacing={12} rowSpacing={2}>
            <Grid item xs={12} md={4}>
              <TextField name="name" label="name" />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField name="domain" label="domain" />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField name="port" label="port" />
            </Grid>

            <Grid item xs={12} md={4}>
              <Select name="type" label="type" options={types} />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField name="username" label="username" />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField name="password" label="password" type="password" />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField name="ip" label="ip" />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField name="api_path" label="api_path" />
            </Grid>
            <Grid item xs={12} md={4}>
              <Select
                name="host_zone_id"
                label="HostZones"
                labelName={'name'}
                options={hostZones}
                isLoading={isLoading}
                displayEmpty={true}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Switch name="enable" label="Enable" />
              <Switch name="master" label="Master" />
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
