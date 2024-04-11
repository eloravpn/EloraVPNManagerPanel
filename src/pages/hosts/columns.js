const columns = [
  {
    headerName: 'ID',
    field: 'id'
  },
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
  },
  {
    headerName: 'Modified',
    field: 'modified_at',
    renderCell: 'date'
  }
];

export default columns;
