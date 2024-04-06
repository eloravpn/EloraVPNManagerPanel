import { Add, Send } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Button from 'components/button';
import CustomDrawer from 'components/drawer';
import Grid from 'components/grid';
import CustomGrid from 'components/grid_data';
import HttpService from 'components/httpService';
import Http from 'components/httpService/Http';
import api from 'components/httpService/api';
import GLOBAL from 'components/variables';
import { Form, Formik } from 'formik';
import { memo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { convertByteToInt } from 'utils';
import { Danger } from '../components/alert';
import AddEdit from './add_edit';
import BulkSend from './bulk_send';
import columns from './columns';
import Information from './info';

const pageName = 'Noifications';
const url = api.notifications;

const Notifications = () => {
  const navigate = useNavigate();

  const createRef = useRef();
  const gridRef = useRef();
  const filterRef = useRef();
  const deleteRef = useRef();
  const infoRef = useRef();
  const createBulkSendRef = useRef();

  const [data] = useState([]);
  const [item, setItem] = useState([]);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const handleAlert = ({ row }, nameRef) => {
    setItem(row);
    nameRef.current.open();
  };

  const HandleInfo = ({ row }) => {
    infoRef.current.changeStatus();
    setItem({ ...row, data_limit: convertByteToInt(row.data_limit) });
  };
  const handleEdit = ({ row }) => {
    createRef.current.changeStatus();
    setItem({ ...row, data_limit: convertByteToInt(row.data_limit) });
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
      .delete(`${url}/${item?.id}`)
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
          enable: null,
          status: null
        }}
        onSubmit={(values) => {
          gridRef.current.filters(values);
          filterRef.current.onChange();
        }}
      >
        <CustomDrawer ref={filterRef}>
          <Form>
            <Stack spacing={1} paddingLeft={1}></Stack>
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
        title={`Are you sure want Delete "${item?.name ?? 'No Name'}" ?`}
      />

      <Information pageName={pageName} refrence={infoRef} initial={item} />

      <AddEdit
        pageName={pageName}
        refrence={createRef}
        initial={item}
        createRow={createRow}
        editRow={editRow}
      />
      <BulkSend pageName={'Bulk Send'} refrence={createBulkSendRef} />
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
        <Button
          sx={{ mb: 1 }}
          onClick={() => {
            createBulkSendRef.current.changeStatus();
            setItem('');
          }}
          icon={<Send />}
        >
          Send Bulk
        </Button>
        <CustomGrid
          name="notifications"
          tabsName="status"
          tabs={[{ name: 'All', id: null }, ...GLOBAL.statusNotifications]}
          url={url}
          refrence={gridRef}
          data={data}
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
              onClick: HandleInfo,
              icon: 'info',
              color: 'primary',
              name: 'Info'
            }
          ]}
          paginateServ={true}
          showFilter={() => filterRef.current.onChange()}
          propsFilter={[{ status: '' }]}
          sortItem={[
            { id: 'created', name: 'Created' },
            { id: 'modified', name: 'Modified' },
            { id: 'price', name: 'Price' },
            { id: 'duration', name: 'Duration' },
            { id: 'data_limit', name: 'Data Limit' }
          ]}
          defaultSort={{ value: 'created', ASC: false }}
        />
      </Box>
    </>
  );
};

export default memo(Notifications);
