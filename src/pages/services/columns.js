const columns = [
  {
    headerName: 'Name',
    field: 'name',
    width: 200
  },
  {
    headerName: 'Duration',
    field: 'duration',
    width: 100
  },

  {
    headerName: 'Price',
    field: 'price',
    renderCell: 'price'
  },
  {
    headerName: 'Data(GB)',
    field: 'data_limit',
    renderCell: 'datalimit'
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
    renderCell: 'date'
  }
];

export default columns;
