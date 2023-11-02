const columns = [
  {
    headerName: 'Name',
    field: 'name',
    width: 200
  },

  {
    headerName: 'Max Account',
    field: 'max_account',
    width: 100
  },
  {
    headerName: 'Enable',
    field: 'enable',
    renderCell: 'status',
    width: 100
  },
  {
    headerName: 'Description',
    field: 'description'
  },
  {
    headerName: 'Modified',
    field: 'modified_at',
    renderCell: 'date',
    width: 100
  }
];

export default columns;
