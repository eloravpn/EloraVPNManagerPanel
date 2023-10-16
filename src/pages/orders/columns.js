const columns = [
  {
    headerName: 'ID',
    field: 'id',
    width: 200
  },
  {
    headerName: 'User',
    field: 'user.username',
    renderCell: 'complexField',
    width: 200
  },
  {
    headerName: 'Account',
    field: 'account.full_name',
    renderCell: 'complexField',
    width: 200
  },
  {
    headerName: 'Total',
    field: 'total',
    renderCell: 'price',
    width: 200
  },
  {
    headerName: 'Status',
    field: 'status',
    renderCell: 'orderStatus',
    width: 200
  }
];

export default columns;
