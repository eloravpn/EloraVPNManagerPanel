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
    headerName: 'Order Status',
    field: 'order.status',
    width: 200,
    renderCell: 'complexField'
  },
  {
    headerName: 'Type',
    field: 'type',
    width: 200
  },
  {
    headerName: 'Description',
    field: 'description'
  }
];

export default columns;
