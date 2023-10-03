import MuiGrid from '@mui/material/Grid';
const Grid = (props) => {
  return <MuiGrid {...props}>{props.children}</MuiGrid>;
};

export default Grid;
