const columns = [
  {
    headerName: 'User',
    field: 'user.full_name',
    renderCell: 'complexField'
  },

  {
    headerName: 'User',
    field: 'user.full_name',
    width: 200,
    renderCell: 'complexField'
  },
  {
    headerName: 'Order Status',
    field: 'order.status',
    width: 200,
    renderCell: 'complexField'
  },
  {
    headerName: 'Type',
    field: 'type',
    width: 200
  },
  {
    headerName: 'Type',
    field: 'type',
    renderCell: 'typeIcon'
  },
  {
    headerName: 'Amount',
    field: 'amount',
    renderCell: 'transactionStatus'
  },
  {
    headerName: 'Created',
    field: 'created_at',
    renderCell: 'date'
  }
];

export default columns;
