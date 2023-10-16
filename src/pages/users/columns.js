const columns = [
  {
    headerName: 'Full Name',
    field: 'full_name',
    width: 200
  },
  {
    headerName: 'Balance',
    field: 'balance',
    width: 200,
    renderCell: 'price'
  },
  {
    headerName: 'Type',
    field: JSON.stringify([
      { name: 'username', headerName: 'Username', color: 'success' },
      { name: 'telegram_chat_id', headerName: 'Telegram Chat ID', color: 'secondary' },
      { name: 'telegram_username', headerName: 'Telegram Username', color: 'primary' }
    ]),
    renderCell: 'multiBadge'
  },
  {
    headerName: 'Enable',
    field: 'enable',
    renderCell: 'status',
    width: 100
  },
  {
    headerName: 'Modified',
    field: 'modified_at',
    renderCell: 'date',
    width: 100
  }
];

export default columns;
