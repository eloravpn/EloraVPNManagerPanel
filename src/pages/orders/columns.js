const columns = [
  {
    headerName: 'ID',
    field: 'id',
    width: 100
  },
  {
    headerName: 'User',
    field: 'user.username',
    renderCell: 'complexField',
    width: 150
  },
  {
    headerName: 'Account',
    field: 'account.full_name',
    renderCell: 'complexField',
    width: 150
  },
  {
    headerName: 'Total',
    field: 'total',
    renderCell: 'price',
    width: 150
  },
  {
    headerName: 'Status',
    field: 'status',
    renderCell: 'orderStatus',
    width: 150
  }
];

export default columns;
