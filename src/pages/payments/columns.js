const columns = [
  {
    headerName: 'ID',
    field: 'id',
    width: 100
  },
  {
    headerName: 'User',
    field: 'user.full_name',
    width: 150,
    renderCell: 'complexField'
  },
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
    width: 100,
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
