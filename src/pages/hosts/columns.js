const columns = [
  {
    headerName: 'Name',
    field: 'name'
  },
  {
    headerName: 'Domain',
    field: 'domain'
  },

  {
    headerName: 'IP',
    field: 'ip'
  },
  {
    headerName: 'MASTER',
    field: 'master',
    renderCell: 'status'
  },

  {
    headerName: 'Enable',
    field: 'enable',
    renderCell: 'status'
  }
];

export default columns;
