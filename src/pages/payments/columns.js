const columns = [
  {
    headerName: 'ID',
    field: 'id',
    width: 200
  },
  {
    headerName: 'User',
    field: 'user.full_name',
    width: 200,
    renderCell: 'complexField'
  },
  {
    headerName: 'Total',
    field: 'total',
    width: 200,
    renderCell: 'price'
  },
  {
    headerName: 'Method',
    field: 'method',
    width: 200,
    renderCell: 'typeIcon'
  },
  {
    headerName: 'Status',
    field: 'status',
    width: 200,
    renderCell: 'orderStatus'
  }
];

export default columns;
