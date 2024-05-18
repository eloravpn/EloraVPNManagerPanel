const columns = [
  {
    headerName: 'Full Name',
    field: 'full_name',
    width: 200
  },
  {
    headerName: 'Usage',
    field: JSON.stringify(['used_traffic', 'used_traffic_percent', 'data_limit']),
    renderCell: 'progress',
    width: 300
  },
  {
    headerName: 'Usage',
    field: 'expired_at',
    renderCell: 'progressDay',
    width: 300
  },
  {
    headerName: 'Status',
    field: 'enable',
    renderCell: 'status',
    width: 80
  },
  {
    headerName: 'Modified',
    field: 'modified_at',
    renderCell: 'date'
  }
];

export default columns;
