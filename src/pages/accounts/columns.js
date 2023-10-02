const columns = [
  {
    headerName: 'Full Name',
    field: 'full_name',
    width: 200
  },
  {
    headerName: 'Usage',
    field: JSON.stringify(['used_traffic', 'used_traffic_percent', 'data_limit']),
    renderCell: 'progress'
  },
  {
    headerName: 'Usage',
    field: 'expired_at',
    renderCell: 'progressDay'
  },
  {
    headerName: 'Status',
    field: 'enable',
    renderCell: 'status',
    width: 20
  }
];

export default columns;
