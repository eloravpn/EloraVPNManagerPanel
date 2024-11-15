const columns = [
  {
    headerName: 'User',
    field: 'user.full_name',
    renderCell: 'complexField',
    width: 150
  },
  {
    headerName: 'Account Email',
    field: 'account.email',
    renderCell: 'complexField',
    width: 80
  },
  {
    headerName: 'Total',
    field: 'total',
    renderCell: 'total',
    width: 100
  },
  {
    headerName: 'Status',
    field: 'status',
    renderCell: 'orderStatus',
    width: 120
  },
  {
    headerName: 'Created',
    field: 'created_at',
    renderCell: 'date',
    width: 120
  },
  {
    headerName: 'Modified',
    field: 'modified_at',
    renderCell: 'date',
    width: 120
  }
];

export default columns;
