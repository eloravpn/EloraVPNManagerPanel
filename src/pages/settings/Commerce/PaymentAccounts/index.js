import { Add } from '@mui/icons-material';
import Button from 'components/button';
import CustomGrid from 'components/grid_data';
import HttpService from 'components/httpService';
import Http from 'components/httpService/Http';
import api from 'components/httpService/api';
import { memo, useRef, useState } from 'react';
import { Danger } from 'pages/components/alert';
import AddEdit from './AddEdit';
import columns from './columns';
import usePaymentAccounts from '../../../../hooks/usePaymentAccounts';

const PaymentAccounts = () => {
  const createRef = useRef();
  const gridRef = useRef();
  const deleteRef = useRef();
  const { paymentAccounts } = usePaymentAccounts();

  const [item, setItem] = useState([]);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

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
      .delete(`${api.paymentAccounts}/${item?.id}`)
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
      <Danger
        refrence={deleteRef}
        onDelete={handleDelete}
        onDeleteLoading={isLoadingDelete}
        title={`Are you sure want Delete "${item?.owner_name ?? 'No Name'}" ?`}
      />

      <AddEdit
        pageName="Payment Account"
        refrence={createRef}
        initial={item}
        createRow={createRow}
        editRow={editRow}
      />

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
        name="payment_accounts"
        url={api.paymentAccounts}
        refrence={gridRef}
        columns={columns}
        data={[]}
        paginateServ={true}
        defaultSort={{ value: 'modified', ASC: false }}
        showFilter={() => filterRef.current.onChange()}
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
          }
        ]}
        sortItem={[
          { id: 'created', name: 'Created' },
          { id: 'modified', name: 'Modified' }
        ]}
        defaultSort={{ value: 'created', ASC: false }}
      />
    </>
  );
};

export default memo(PaymentAccounts);
