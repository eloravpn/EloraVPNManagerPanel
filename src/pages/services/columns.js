const columns = [
  {
    headerName: 'Name',
    field: 'name',
    width: 200
  },
  {
    headerName: 'Enable',
    field: 'enable',
    renderCell: 'status',
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
