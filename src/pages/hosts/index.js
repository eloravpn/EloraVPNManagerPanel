import { useRef, useState } from 'react';
import CustomGrid from 'components/grid_data';
import { Add } from '@mui/icons-material';
import { Box, Grid, Stack, Typography } from '@mui/material';
import columns from './columns';
import HttpService from 'components/httpService';
import AddEdit from './add_edit';
import CustomDrawer from 'components/drawer';
import { Form, Formik } from 'formik';
import api from 'components/httpService/api';
import { Alert, Danger } from 'pages/components/alert';
import Http from 'components/httpService/Http';
import Button from 'components/button';
import SelectBadge from 'components/formik/badge';
import GLOBAL from 'components/variables';

const pageName = 'Hosts';

const Hosts = () => {
  const createRef = useRef();
  const gridRef = useRef();
  const filterRef = useRef();
  const deleteRef = useRef();
  const copyRef = useRef();

  const [item, setItem] = useState([]);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isLoadingCopy, setIsLoadingCopy] = useState(false);

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
      .delete(`${api.hosts}/${item?.id}`)
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
      .post(`${api.hosts}/${item?.id}/copy`)
      .then(() => {
        gridRef.current.createRow(item);
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
          host_id: ''
        }}
        onSubmit={(values) => {
          gridRef.current.filters(values);
          filterRef.current.onChange();
        }}
      >
        <CustomDrawer ref={filterRef}>
          <Form>
            <Stack spacing={1}>
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
            </Stack>
          </Form>
        </CustomDrawer>
      </Formik>

      <Alert
        refrence={copyRef}
        onSubmit={handleCopy}
        onDeleteLoading={isLoadingCopy}
        title={`Are you sure to copy this inbound config?`}
      />
      <Danger
        refrence={deleteRef}
        onDelete={handleDelete}
        onDeleteLoading={isLoadingDelete}
        title={`Are you sure want Delete "${item?.name}" ?`}
      />
      <AddEdit
        pageName={pageName}
        refrence={createRef}
        initial={item}
        createRow={createRow}
        editRow={editRow}
      />
      <>
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
        </Box>
        <CustomGrid
          name="hosts"
          url={api.hosts}
          refrence={gridRef}
          columns={columns}
          rowActions={[
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
          paginateServ={false}
          showFilter={() => filterRef.current.onChange()}
          sortItem={[
            { id: 'created', name: 'Created' },
            { id: 'modified', name: 'Modified' },
            { id: 'domain', name: 'Domain' },
            { id: 'name', name: 'Name' },
            { id: 'ip', name: 'IP' }
          ]}
          defaultSort={{ value: 'created', ASC: false }}
        />
      </>
    </>
  );
};

export default Hosts;
