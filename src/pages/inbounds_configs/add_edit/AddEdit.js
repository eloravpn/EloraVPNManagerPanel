import { memo, useEffect, useState } from 'react';
import { DialogActions, Grid, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import TextField from 'components/formik/textfield';
import Select from 'components/formik/select';
import * as yup from 'yup';
import HttpService from 'components/httpService';
import api from 'components/httpService/api';
import Http from 'components/httpService/Http';
import Switch from 'components/formik/switch';
import useInbounds from 'hooks/useInbound';
import Button from 'components/button';

const validationSchema = yup.object({
  remark: yup.string().required(),
  inbound_id: yup.number().required(),
  port: yup.number().required(),
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
const securities = [
  { id: 'tls', name: 'TLS' },
  { id: 'reality', name: 'REALITY' },
  { id: 'none', name: 'None' }
];
const networks = [
  { id: 'ws', name: 'Websocket' },
  { id: 'tcp', name: 'TCP' },
  { id: 'grpc', name: 'gRPC' }
];
const fingerPrints = [
  { id: 'none', name: 'None' },
  { id: 'chrome', name: 'Chrome' },
  { id: 'firefox', name: 'FireFox' }
];

const initialForm = {
  host: '',
  id: '',
  remark: '',
  port: 0,
  domain: '',
  request_host: '',
  sni: '',
  address: '',
  path: '',
  pbk: '',
  sid: '',
  spx: '',
  security: 'tls',
  type: 'vless',
  enable: false,
  develop: false,
  finger_print: 'none',
  network: 'ws',
  inbound_id: ''
};

const AddEdit = (props) => {
  const { refrence, initial, createRow, editRow } = props;
  const [postDataLoading, setPostDataLoading] = useState(false);

  const { getInbounds, inbounds, isLoading } = useInbounds();

  useEffect(() => {
    getInbounds();
    return () => {};
  }, [getInbounds]);

  const handleCreate = (values) => {
    setPostDataLoading(true);
    HttpService()
      .post(api.inboundConfigs, values)
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
      .put(`${api.inboundConfigs}/${initial?.id}`, values)
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
              <TextField name="port" label="Port" />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField name="domain" label="Domain" />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField name="host" label="Request Host" />
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
              <TextField name="pbk" label="PBK" />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField name="sid" label="SID" />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField name="spx" label="SPX" />
            </Grid>
            <Grid item xs={12} md={4}>
              <Select name="security" label="Security" options={securities} />
            </Grid>{' '}
            <Grid item xs={12} md={4}>
              <Select name="finger_print" label="Finger Print" options={fingerPrints} />
            </Grid>{' '}
            <Grid item xs={12} md={4}>
              <Select name="type" label="Type" options={types} />
            </Grid>{' '}
            <Grid item xs={12} md={4}>
              <Select name="network" label="Network" options={networks} />
            </Grid>
            <Grid item xs={12} md={4}>
              <Select
                name="inbound_id"
                label="Inbounds"
                labelName2={(item) => (
                  <Typography variant="body1" display={'flex'}>
                    <Typography fontWeight={800}>{item.host?.name}</Typography>
                    {'(' + item.remark + ')'}
                  </Typography>
                )}
                options={inbounds}
                isLoading={isLoading}
              />
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
