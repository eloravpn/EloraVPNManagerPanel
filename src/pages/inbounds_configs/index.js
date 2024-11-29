import { useEffect, useRef, useState } from 'react';
import CustomGrid from 'components/grid_data';
import { Box } from '@mui/system';
import { Add } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import columns from './columns';
import HttpService from 'components/httpService';
import AddEdit from './add_edit';
import CustomDrawer from 'components/drawer';
import { Form, Formik } from 'formik';
import Radio from 'components/formik/radio';
import api from 'components/httpService/api';
import { Alert, Danger } from '../components/alert';
import Http from 'components/httpService/Http';
import Button from 'components/button';
import useInbounds from 'hooks/useInbound';
import SelectBadge from 'components/formik/badge';
import Select from 'components/formik/select';
import Grid from 'components/grid';
import GLOBAL from 'components/variables';
import FormObserver from 'components/formik/observer';

const pageName = 'Inbound Config';

const InboundConfigs = () => {
  const createRef = useRef();
  const gridRef = useRef();
  const filterRef = useRef();
  const deleteRef = useRef();
  const copyRef = useRef();

  const [data] = useState([]);
  const [item, setItem] = useState([]);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isLoadingCopy, setIsLoadingCopy] = useState(false);

  const { getInbounds, inbounds, isLoading } = useInbounds();

  useEffect(() => {
    getInbounds();
    return () => {};
  }, [getInbounds]);

  const handleAlert = ({ row }, nameRef) => {
    setItem(row);
    nameRef.current.open();
  };

  const handleEdit = ({ row }) => {
    createRef.current.changeStatus();
    setItem(row);
  };

  const createRow = (data) => {
    gridRef.current.createRow(data);
    setItem({});
  };

  const editRow = (data) => {
    gridRef.current.editRow(data);
    setItem({});
  };

  const handleDelete = () => {
    setIsLoadingDelete(true);
    HttpService()
      .delete(`${api.inboundConfigs}/${item?.id}`)
      .then(() => {
        gridRef.current.deleteRow(item);
        deleteRef.current.close();
      })
      .catch((err) => {
        Http.error(err);
      })
      .finally(() => {
        setIsLoadingDelete(false);
      });
  };

  const handleCopy = () => {
    setIsLoadingCopy(true);
    HttpService()
      .post(`${api.inboundConfigs}/${item?.id}/copy`)
      .then((res) => {
        gridRef.current.createRow(res.data);
        copyRef.current.close();
      })
      .catch((err) => {
        Http.error(err);
      })
      .finally(() => {
        setIsLoadingCopy(false);
      });
  };

  return (
    <>
      <Formik
        initialValues={{
          enable: -1,
          inbound_id: null
        }}
        onSubmit={(values) => {
          gridRef.current.filters(values);
          filterRef.current.onChange();
        }}
      >
        <CustomDrawer ref={filterRef}>
          <Form>
            <SelectBadge name="enable" options={GLOBAL.allEnableStatus} label={'Status'} />

            <Grid container spacing={1}>
              <Grid item xs={9}>
                <Button fullWidth type={'submit'}>
                  Search
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button color="error" type={'reset'}>
                  reset
                </Button>
              </Grid>
            </Grid>
          </Form>
        </CustomDrawer>
      </Formik>
      <Danger
        refrence={deleteRef}
        onDelete={handleDelete}
        onDeleteLoading={isLoadingDelete}
        title={`Are you sure want Delete "${item?.remark ?? 'No Name'}" ?`}
      />
      <Alert
        refrence={copyRef}
        onSubmit={handleCopy}
        onDeleteLoading={isLoadingCopy}
        title={`Are you sure to copy this inbound config?`}
      />
      <AddEdit
        pageName={pageName}
        refrence={createRef}
        initial={item}
        createRow={createRow}
        editRow={editRow}
      />
      <Box>
        <Typography variant="h4" gutterBottom>
          Inbound Configs
        </Typography>

        <Button
          sx={{ mb: 1 }}
          onClick={() => {
            createRef.current.changeStatus();
            setItem('');
          }}
          icon={<Add />}
        >
          Create
        </Button>
        <CustomGrid
          name="inbound_configs"
          url={api.inboundConfigs}
          refrence={gridRef}
          data={data}
          columns={columns}
          searchChildren={
            <Formik
              initialValues={{
                inbound_id: '0'
              }}
            >
              <Form>
                <FormObserver onChange={(values) => gridRef.current.filters(values)} />
                <Box mx={1} width={1}>
                  <Select
                    fullWidth={true}
                    size="small"
                    name="inbound_id"
                    labelName2={(item) => (
                      <Typography variant="body1" display={'flex'}>
                        <Typography fontWeight={800}>{item.host?.name}</Typography>
                        {'(' + item.remark + ')'}
                      </Typography>
                    )}
                    label="Inbounds"
                    options={[{ id: '0', remark: 'All' }, ...inbounds]}
                    isLoading={isLoading}
                  />
                </Box>
              </Form>
            </Formik>
          }
          moreActions={[
            {
              onClick: (data) => handleAlert(data, deleteRef),
              icon: 'delete',
              color: 'red',
              name: 'Delete'
            },
            {
              onClick: handleEdit,
              icon: 'edit',
              color: 'primary',
              name: 'Edit'
            },
            {
              onClick: (data) => handleAlert(data, copyRef),
              icon: 'content_copy',
              color: 'primary',
              name: 'Copy'
            }
          ]}
          paginateServ={true}
          // refresh={}
          showFilter={() => filterRef.current.onChange()}
          sortItem={[
            { id: 'created', name: 'Created' },
            { id: 'modified', name: 'Modified' },
            { id: 'remark', name: 'Remark' },
            { id: 'address', name: 'Address' },
            { id: 'sni', name: 'SNI' },
            { id: 'host', name: 'Host' }
          ]}
          defaultSort={{ value: 'created', ASC: false }}
        />
      </Box>
    </>
  );
};

export default InboundConfigs;
