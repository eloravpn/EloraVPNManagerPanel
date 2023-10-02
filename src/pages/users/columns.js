const columns = [
  {
    headerName: 'First Name',
    field: 'first_name'
  },
  {
    headerName: 'Last Name',
    field: 'last_name'
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
