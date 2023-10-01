const columns = [
  {
    headerName: 'Remark',
    field: 'remark'
  },
  {
    headerName: 'Domain',
    field: 'domain'
  },
  // {
  //   headerName: 'Domain',
  //   field: 'inbound.remark'
  // },
  {
    headerName: 'Type',
    field: JSON.stringify([
      { name: 'type', color: 'success' },
      { name: 'network', color: 'secondary' },
      { name: 'finger_print', color: 'primary' },
      { name: 'path', color: 'error' }
    ]),
    renderCell: 'multiBadge'
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
