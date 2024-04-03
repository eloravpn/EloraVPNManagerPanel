const columns = [
  {
    headerName: 'Remark',
    field: 'remark'
  },
  // {
  //   headerName: 'Host',
  //   field: 'host.name'
  // },

  {
    headerName: 'Domain',
    field: 'domain'
  },
  {
    headerName: 'Key',
    field: 'key',
    width: 50
  },
  {
    headerName: 'Host',
    field: 'host.name',
    renderCell: 'complexField'
  },
  {
    headerName: 'Host Domain',
    field: 'host.domain',
    renderCell: 'complexField'
  },
  {
    headerName: 'Type',
    field: 'type',
    width: 85
  },
  {
    headerName: 'Enable',
    field: 'enable',
    renderCell: 'status',
    width: 85
  },
  {
    headerName: 'Develop',
    field: 'develop',
    renderCell: 'status',
    width: 85
  },
  {
    headerName: 'Modified',
    field: 'modified_at',
    renderCell: 'date'
  }
];

export default columns;
