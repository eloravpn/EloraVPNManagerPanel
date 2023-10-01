const columns = [
  {
    headerName: 'Full Name',
    field: 'full_name'
  },
  {
    headerName: 'Status',
    field: 'enable',
    renderCell: 'status'
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
  }
];

export default columns;
