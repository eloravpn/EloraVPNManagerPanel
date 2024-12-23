const columns = [
  {
    headerName: 'Remark',
    field: 'remark'
  },
  {
    headerName: 'Domain',
    field: 'domain',
    width: 100
  },
  {
    headerName: 'Type',
    field: JSON.stringify([
      { name: 'type', color: 'success' },
      { name: 'network', color: 'secondary' },
      { name: 'path', color: 'error' }
    ]),
    renderCell: 'multiBadge'
  },
  {
    headerName: 'Enable',
    field: 'enable',
    renderCell: 'status',
    width: 70
  },
  {
    headerName: 'Develop',
    field: 'develop',
    renderCell: 'status',
    width: 70
  },
  {
    headerName: 'Modified',
    field: 'modified_at',
    renderCell: 'date',
    width: 150
  }
];

export default columns;
