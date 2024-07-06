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
import { convertByteToInt, emailGenerator, getExpireTime, uuidGenerator } from 'utils';
import Button from 'components/button';
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import SelectBadge from 'components/formik/badge';
import Grid from 'components/grid';
import GLOBAL from 'components/variables';
import AddEditAccount from 'pages/accounts/add_edit';
import config from 'config';
import CheckBox from 'components/formik/checkbox';
import FormObserver from 'components/formik/observer';
const pageName = 'Users';

const Users = () => {
  const navigate = useNavigate();

  const createRef = useRef();
  const gridRef = useRef();
  const filterRef = useRef();
  const deleteRef = useRef();
  const createAccountRef = useRef();

  const [data] = useState([]);
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
      .delete(`${api.users}/${item?.id}`)
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

  const handleAccAccount = (data) => {
    setItem({
      user_id: data.id,
      email: emailGenerator(),
      uuid: uuidGenerator(),
      enable: true,
      data_limit: 0,
      expired_at: getExpireTime(config.defaultExpireAt)
    });
    createAccountRef.current.changeStatus();
  };

  return (
    <>
      <Formik
        initialValues={{
          enable: null
        }}
        onSubmit={(values) => {
          gridRef.current.filters(values);
          filterRef.current.onChange();
        }}
      >
        <CustomDrawer ref={filterRef}>
          <Form>
            <Stack spacing={1} paddingLeft={1}>
              <SelectBadge name="enable" options={GLOBAL.enableStatus} label={'Status'} />
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
      <AddEditAccount pageName={pageName} refrence={createAccountRef} initial={item} />
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
          name="users"
          url={api.users}
          refrence={gridRef}
          data={data}
          columns={columns}
          searchChildren={
            <Formik initialValues={{ is_debt: false }}>
              {({ values }) => (
                <Form>
                  <FormObserver onChange={(values) => gridRef.current.filters(values)} />
                  <CheckBox name="is_debt" label={'Is debt'} />
                </Form>
              )}
            </Formik>
          }
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
              onClick: ({ row }) => navigate(`/accounts?userId=${row.id}`),
              icon: 'manage_accounts',
              color: 'primary',
              name: 'Mange Accounts'
            },
            {
              onClick: handleAccAccount,
              icon: 'person_add',
              color: 'primary',
              name: 'Add Account'
            }
          ]}
          paginateServ={true}
          showFilter={() => filterRef.current.onChange()}
          sortItem={[
            { id: 'created', name: 'Created' },
            { id: 'modified', name: 'Modified' },
            { id: 'first_name', name: 'First Name' },
            { id: 'last_name', name: 'Last Name' },
            { id: 'telegram_username', name: 'Telegram Username' }
          ]}
          defaultSort={{ value: 'created', ASC: false }}
        />
      </Box>
    </>
  );
};

export default memo(Users);
