const columns = [
  {
    headerName: 'Full Name',
    field: 'full_name',
    width: 120
  },
  {
    headerName: 'Service Title',
    field: 'service_title',
    width: 150
  },
  {
    headerName: 'Usage',
    field: JSON.stringify(['used_traffic', 'used_traffic_percent', 'data_limit']),
    renderCell: 'progress',
    width: 250
  },
  {
    headerName: 'Usage',
    field: 'expired_at',
    renderCell: 'progressDay',
    width: 200
  },
  {
    headerName: 'Status',
    field: 'enable',
    renderCell: 'status',
    width: 50
  },
  {
    headerName: 'Modified',
    field: 'modified_at',
    renderCell: 'date'
  }
];

export default columns;
