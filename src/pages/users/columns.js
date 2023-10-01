const columns = [
  {
    headerName: 'Name',
    field: 'username'
  },
  {
    headerName: 'Enable',
    field: 'enable',
    renderCell: 'status'
  },
  {
    headerName: 'Type',
    field: JSON.stringify([
      { name: 'username', color: 'success' },
      { name: 'telegram_chat_id', color: 'secondary' },
      { name: 'telegram_username', color: 'primary' }
    ]),
    renderCell: 'multiBadge'
  }
];

export default columns;
