const columns = [
  {
    headerName: 'User',
    field: 'user.full_name',
    width: 100,
    renderCell: 'complexField'
  },
  {
    headerName: 'Total',
    field: 'total',
    width: 150,
    renderCell: 'price'
  },
  {
    headerName: 'Method',
    field: 'method',
    width: 100,
    renderCell: 'typeIcon'
  },
  {
    headerName: 'Status',
    field: 'status',
    width: 100,
    renderCell: 'orderStatus'
  },
  {
    headerName: 'Created',
    field: 'created_at',
    renderCell: 'date',
    width: 120
  }
];

export default columns;
