const columns = [
  {
    headerName: 'User',
    field: 'user.full_name',
    width: 150,
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
    width: 200,
    renderCell: 'date'
  }
];

export default columns;
