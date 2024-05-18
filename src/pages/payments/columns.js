const columns = [
  {
    headerName: 'User',
    field: 'user.full_name',
    width: 150,
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
    width: 200,
    renderCell: 'orderStatus'
  },
  {
    headerName: 'Modified',
    field: 'modified_at',
    renderCell: 'date',
    width: 150
  }
];

export default columns;
