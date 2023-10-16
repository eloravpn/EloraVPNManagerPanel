const columns = [
  {
    headerName: 'ID',
    field: 'id',
    width: 200
  },

  {
    headerName: 'User',
    field: 'user.full_name',
    width: 200,
    renderCell: 'complexField'
  },
  {
    headerName: 'Type',
    field: 'type',
    width: 200
  },
  {
    headerName: 'Total',
    field: 'total',
    width: 200
  },
  {
    headerName: 'Method',
    field: 'method',
    width: 200
  },
  {
    headerName: 'Status',
    field: 'status',
    width: 200
  }
];

export default columns;
