const columns = [
  {
    headerName: 'User',
    field: 'user.full_name',
    renderCell: 'complexField'
  },
  {
    headerName: 'Type',
    field: 'type',
    width: 150,
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
