const columns = [
  {
    headerName: 'First Name',
    field: 'first_name',
    width: 200
  },
  {
    headerName: 'Last Name',
    field: 'last_name',
    width: 200
  },
  {
    headerName: 'Type',
    field: JSON.stringify([
      { name: 'username', color: 'success' },
      { name: 'telegram_chat_id', color: 'secondary' },
      { name: 'telegram_username', color: 'primary' }
    ]),
    renderCell: 'multiBadge'
  },
  {
    headerName: 'Enable',
    field: 'enable',
    renderCell: 'status',
    width: 100
  }
];

export default columns;
