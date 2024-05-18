import { memo, useCallback, useEffect, useRef, useState } from 'react';
import CustomGrid from 'components/grid_data';
import { Box } from '@mui/system';
import { Stack, Typography } from '@mui/material';
import columns from './columns';
import HttpService from 'components/httpService';
import AddEdit from './add_edit';
import CustomDrawer from 'components/drawer';
import { Form, Formik } from 'formik';
import api from 'components/httpService/api';
import { Alert, Danger } from '../components/alert';
import Http from 'components/httpService/Http';
import { convertByteToInt } from 'utils';
import Chip from 'components/chip';
import { getReportAccounts } from 'services/reportsService';
import { Add } from '@mui/icons-material';
import Button from 'components/button';
import UsageAccount from './usages';
import UserSelect from 'pages/components/select/users';
import { useSearchParams } from 'react-router-dom';
import SelectBadge from 'components/formik/badge';
import Grid from 'components/grid';
import GLOBAL from 'components/variables';
import Notification from 'components/toast';

const pageName = 'Accounts';

const Accounts = () => {
  const createRef = useRef();
  const gridRef = useRef();
  const filterRef = useRef();
  const deleteRef = useRef();
  const resetRef = useRef();
  const usageRef = useRef();

  const [data] = useState([]);
  const [item, setItem] = useState([]);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isLoadingCopy, setIsLoadingCopy] = useState(false);
  const [report, setReport] = useState({ active: 0, total: 0 });
  let [searchParams] = useSearchParams();

  const getReport = useCallback(async () => {
    try {
      const data = await getReportAccounts();
      setReport(data);
    } catch (e) {
      console.log(e);
    }
  }, []);
  useEffect(() => {
    getReport();
    const timer = setInterval(() => {
      getReport();
    }, 30000);
    return () => {
      clearInterval(timer);
    };
  }, [getReport, searchParams]);

  const handleAlert = ({ row }, nameRef) => {
    setItem(row);
    nameRef.current.open();
  };
  const handleEdit = ({ row }) => {
    createRef.current.changeStatus();
    setItem({ ...row, data_limit: convertByteToInt(row.data_limit) });
  };
  const handleCopyLink = async ({ row }) => {
    try {
      await navigator.clipboard.writeText(row?.subscription_url);
      Notification.success('Text copied to clipboard');
    } catch (err) {
      Notification.error('Faild copy link');
    }
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
      .delete(`${api.accounts}/${item?.id}`)
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

  const handleReset = () => {
    setIsLoadingCopy(true);
    HttpService()
      .post(`${api.accounts}/${item?.id}/${api.resetTraffic}`)
      .then((res) => {
        editRow(res.data);
        resetRef.current.close();
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
          user_id: searchParams.get('userId') || null,
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
              <UserSelect name="user_id" label={'Users'} />
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
      <Alert
        refrence={resetRef}
        onSubmit={handleReset}
        onDeleteLoading={isLoadingCopy}
        title={`Are you sure want to Reset Traffic?`}
      />
      <AddEdit
        pageName={pageName}
        refrence={createRef}
        initial={item}
        createRow={createRow}
        editRow={editRow}
      />
      <UsageAccount pageName={pageName} refrence={usageRef} initial={item} />
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
          <Box display={'flex'}>
            <Chip variant="chip" color="success" label={`Active: ${report.active}`} />
            <Chip variant="chip" color="error" label={`Disable: ${report.total - report.active}`} />
            <Chip variant="chip" color="info" label={`Total: ${report.total}`} />
          </Box>
        </Box>

        <CustomGrid
          name="accounts"
          url={api.accounts}
          refrence={gridRef}
          data={data}
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
            },
            {
              onClick: handleCopyLink,
              icon: 'content_copy',
              color: 'primary',
              name: 'Copy Link'
            },
            {
              onClick: (data) => handleAlert(data, resetRef),
              icon: 'refresh',
              color: 'primary',
              name: 'Reset'
            },
            {
              onClick: (data) => handleAlert(data, usageRef),
              icon: 'bar_chart',
              color: 'primary',
              name: 'Usage'
            }
          ]}
          paginateServ={true}
          showFilter={() => filterRef.current.onChange()}
          defaultSort={{ value: 'expire', ASC: true }}
        />
      </>
    </>
  );
};

export default memo(Accounts);
