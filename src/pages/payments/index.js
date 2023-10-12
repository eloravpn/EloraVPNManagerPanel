import { memo, useRef, useState } from 'react';
import CustomGrid from 'components/grid_data';
import { Box } from '@mui/system';
import { Stack, Typography } from '@mui/material';
import columns from './columns';
import HttpService from 'components/httpService';
import AddEdit from './add_edit';
import CustomDrawer from 'components/drawer';
import { Form, Formik } from 'formik';
import api from 'components/httpService/api';
import { Danger } from '../components/alert';
import Http from 'components/httpService/Http';
import { convertByteToInt } from 'utils';
import { Add } from '@mui/icons-material';
import Button from 'components/button';
import UserSelect from 'pages/components/select/users';
import { useSearchParams } from 'react-router-dom';
import SelectBadge from 'components/formik/badge';
import Grid from 'components/grid';
import GLOBAL from 'components/variables';
import useOrders from 'hooks/useOrders';
import Select from 'components/formik/select';

const pageName = 'Payments';

const Payments = () => {
  const createRef = useRef();
  const gridRef = useRef();
  const filterRef = useRef();
  const deleteRef = useRef();

  const { orders } = useOrders();
  let [searchParams] = useSearchParams();

  const [item, setItem] = useState([]);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const handleAlert = ({ row }, nameRef) => {
    setItem(row);
    nameRef.current.open();
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
      .delete(`${api.payments}/${item?.id}`)
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
          method: null,
          status: null,
          user_id: null
        }}
        onSubmit={(values) => {
          gridRef.current.filters(values);
          filterRef.current.onChange();
        }}
      >
        <CustomDrawer ref={filterRef}>
          <Form>
            <Stack spacing={1} paddingLeft={1} mb={2}>
              <Select name="method" label={'Methods'} options={GLOBAL.methods} />
              <Select name="status" label={'Status'} options={GLOBAL.statuses} />
              <UserSelect name="user_id" label={'Users'} />
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
        title={`Are you sure want Delete "${item?.full_name ?? 'No Name'}" ?`}
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
          name="payments"
          url={api.payments}
          refrence={gridRef}
          columns={columns}
          propsFilter={{
            user_id: searchParams.get('userId')
          }}
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
            }
          ]}
          paginateServ={true}
          showFilter={() => filterRef.current.onChange()}
          defaultSort={{ value: 'modified', ASC: false }}
          sortItem={[
            { id: 'created', name: 'Created' },
            { id: 'modified', name: 'Modified' },
            { id: 'total', name: 'Total' },
            { id: 'status', name: 'Status' }
          ]}
        />
      </Box>
    </>
  );
};

export default memo(Payments);
