import CustomGrid from './GridDesktop';
import GridMobile from './GridMobileV2';
import useMediaQuery from '@mui/material/useMediaQuery';

const Grid = ({ refrence, ...props }) => {
  const width = useMediaQuery('(min-width:600px)');
  return (
    <>
      {width ? <CustomGrid ref={refrence} {...props} /> : <GridMobile ref={refrence} {...props} />}
    </>
  );
};

export default Grid;
