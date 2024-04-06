const columns = [
  {
    headerName: 'Message',
    field: 'message',
    width: 200
  },
  {
    headerName: 'Status',
    field: 'status',
    width: 100
  },
  {
    headerName: 'Approve',
    field: 'approve',
    renderCell: 'status',
    width: 100
  },
  {
    headerName: 'Type',
    field: 'type',
    width: 100
  },
  {
    headerName: 'Detail',
    field: 'details',
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
