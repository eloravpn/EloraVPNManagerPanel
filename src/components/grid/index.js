import MuiGrid from '@mui/material/Grid';
const Grid = ({ container, spacing, rowSpacing, children, item, xs }) => {
  return (
    <MuiGrid
      container={container}
      spacing={spacing}
      rowSpacing={rowSpacing}
      item={item}
      md={xs}
      xs={12}
    >
      {children}
    </MuiGrid>
  );
};

export default Grid;
