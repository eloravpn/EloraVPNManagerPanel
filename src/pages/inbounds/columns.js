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
    headerName: 'SNI',
    field: 'sni'
  },
  {
    headerName: 'Type',
    field: 'type'
  },
  {
    headerName: 'Enable',
    field: 'enable',
    renderCell: 'status'
  },
  {
    headerName: 'Develop',
    field: 'develop',
    renderCell: 'status'
  }
];

export default columns;
