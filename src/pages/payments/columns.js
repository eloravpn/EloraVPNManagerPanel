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
    width: 80,
    renderCell: 'orderStatus'
  },
  {
    headerName: 'Verify',
    field: 'verify',
    width: 80,
    renderCell: 'status'
  },
  {
    headerName: 'Modified',
    field: 'modified_at',
    renderCell: 'date',
    width: 120
  },
  {
    headerName: 'Paid',
    field: 'paid_at',
    renderCell: 'date',
    width: 120
  }
];

export default columns;
