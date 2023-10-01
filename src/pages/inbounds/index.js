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
import api from 'components/httpService/api';
import { Danger } from '../components/alert';
import Http from 'components/httpService/Http';
import Button from 'components/button';
import SelectBadge from 'components/formik/badge';
import useHosts from 'hooks/useHosts';
import Select from 'components/formik/select';
import Grid from 'components/grid';
import GLOBAL from 'components/variables';

const pageName = 'Inbounds';

const Inbounds = () => {
  const createRef = useRef();
  const gridRef = useRef();
  const filterRef = useRef();
  const deleteRef = useRef();

  const { getHosts, hosts, isLoading } = useHosts();

  useEffect(() => {
    getHosts();
    return () => {};
  }, [getHosts]);

  const [item, setItem] = useState([]);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const handleAlert = ({ row }) => {
    setItem(row);
    deleteRef.current.open();
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
      .delete(`${api.inbounds}/${item?.id}`)
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

  return (
    <>
      <Formik
        initialValues={{
          enable: -1,
          host_id: null
        }}
        onSubmit={(values) => {
          gridRef.current.filters(values);
          filterRef.current.onChange();
        }}
      >
        <CustomDrawer ref={filterRef}>
          <Form>
            <Stack display={'block'} spacing={2}>
              <Select name="host_id" label="Host" options={hosts} isLoading={isLoading} />
              <SelectBadge name="enable" options={GLOBAL.allEnableStatus} label={'Status'} />
            </Stack>
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
      <AddEdit
        pageName={pageName}
        refrence={createRef}
        initial={item}
        createRow={createRow}
        editRow={editRow}
      />
      <Box>
        <Typography variant="h4" gutterBottom>
          {pageName}
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
          name="inbounds"
          url={api.inbounds}
          refrence={gridRef}
          columns={columns}
          rowActions={[
            {
              onClick: handleAlert,
              icon: 'delete',
              color: 'red',
              name: 'Delete'
            },
            {
              onClick: handleEdit,
              icon: 'edit',
              color: 'primary',
              name: 'Edit'
            }
          ]}
          paginateServ={false}
          // refresh={}
          showFilter={() => filterRef.current.onChange()}
          sortItem={[
            { id: 'created', name: 'Created' },
            { id: 'modified', name: 'Modified' },
            { id: 'remark', name: 'Remark' },
            { id: 'address', name: 'Address' },
            { id: 'sni', name: 'SNI' },
            { id: 'request_host', name: 'Request Host' }
          ]}
        />
      </Box>
    </>
  );
};

export default Inbounds;
