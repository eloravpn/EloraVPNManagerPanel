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
import useHosts from 'hooks/useHosts';
import Button from 'components/button';

const validationSchema = yup.object({
  remark: yup.string().required(),
  host_id: yup.number().required(),
  key: yup.number().required(),
  port: yup.number().required(),
  security: yup.string().required(),
  type: yup.string().required(),
  enable: yup.boolean().required(),
  develop: yup.boolean().required(),
  domain: yup
    .string()
    .matches(
      /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/,
      'Is not in correct Domain'
    )
    .required()
});

const types = [
  { id: 'vless', name: 'VLESS' },
  { id: 'vmess', name: 'VMESS' },
  { id: 'trojan', name: 'Trojan' },
  { id: 'shadowsocks', name: 'Shadowsocks' }
];

const flows = [
  { id: null, name: 'None' },
  { id: 'xtls-rprx-vision', name: 'xtls-rprx-vision' },
  { id: 'xtls-rprx-vision-udp443', name: 'xtls-rprx-vision-udp443' }
];

const securities = [
  { id: 'tls', name: 'TLS' },
  { id: 'reality', name: 'REALITY' },
  { id: 'none', name: 'None' }
];

const initialForm = {
  id: '',
  remark: '',
  key: '',
  host_id: '',
  port: '',
  domain: 'test.elora',
  request_host: '',
  sni: '',
  address: 'test.elora',
  path: '',
  enable: true,
  develop: false,
  type: 'vless',
  security: ''
};

const AddEdit = (props) => {
  const { refrence, initial, createRow, editRow } = props;
  const [postDataLoading, setPostDataLoading] = useState(false);

  const { getHosts, hosts, isLoading } = useHosts();

  useEffect(() => {
    getHosts();
    return () => {};
  }, [getHosts]);

  const handleCreate = (values) => {
    setPostDataLoading(true);
    HttpService()
      .post(api.inbounds, values)
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
      .put(`${api.inbounds}/${initial?.id}`, values)
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
              <TextField name="remark" label="Remark" />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField name="key" label="Key" helperText="Your inbounad id in X-UI panel" />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField name="port" label="Port" helperText="Your inbounad port in X-UI panel" />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                name="domain"
                label="Domain"
                helperText="Your inbounad domain in X-UI panel"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField name="request_host" label="Request Host" />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField name="sni" label="SNI" />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField name="address" label="Address" />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField name="path" label="Path" />
            </Grid>
            <Grid item xs={12} md={4}>
              <Select name="security" label="Security" options={securities} />
            </Grid>{' '}
            <Grid item xs={12} md={4}>
              <Select name="flow" label="Flow" options={flows} />
            </Grid>{' '}
            <Grid item xs={12} md={4}>
              <Select name="type" label="Type" options={types} />
            </Grid>{' '}
            <Grid item xs={12} md={4}>
              <Select name="host_id" label="Host" options={hosts} isLoading={isLoading} />
            </Grid>
            <Grid item xs={12} md={4}>
              <Switch name="enable" label="Enable" />
              <Switch name="develop" label="Develop" />
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
