const columns = [
  {
    headerName: 'ID',
    field: 'id',
    width: 200
  },
  {
    headerName: 'Total',
    field: 'total',
    width: 200,
    renderCell: 'price'
  },
  {
    headerName: 'Method',
    field: 'method',
    width: 200
  },
  {
    headerName: 'Status',
    field: 'status',
    width: 200,
    renderCell: 'orderStatus'
  }
];

export default columns;
