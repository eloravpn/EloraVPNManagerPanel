const columns = [
  {
    headerName: 'Owner',
    field: 'owner_family',
    width: 100
  },
  {
    headerName: 'Card Number',
    field: 'card_number',
    width: 100
  },
  {
    headerName: 'Account Number',
    field: 'account_number',
    width: 150
  },
  {
    headerName: 'Status',
    field: 'enable',
    width: 50,
    renderCell: 'status'
  },
  {
    headerName: 'Modified',
    field: 'modified_at',
    renderCell: 'date',
    width: 100
  }
];

export default columns;
