import { Tab } from '@mui/material';
import TabsMD from '@mui/material/Tabs';
import { styled } from '@mui/material/styles';

const StyledTabs = styled((props) => <TabsMD {...props} />)({});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
  textTransform: 'none',
  fontSize: theme.typography.pxToRem(16),
  color: '#000',
  '&.Mui-selected': {
    color: '#000'
  },
  '&.Mui-focusVisible': {
    backgroundColor: 'rgba(100, 95, 228, 0.32)'
  }
}));

const Tabs = ({ name, value, tabs, onChange }) => {
  return (
    <StyledTabs
      value={value}
      onChange={onChange}
      variant="scrollable"
      scrollButtons
      allowScrollButtonsMobile
      aria-label="scrollable force tabs example"
    >
      {tabs.map(({ name: label, id: value, icon }, idx) => (
        <StyledTab name={name} label={label} key={idx} value={value} />
      ))}
    </StyledTabs>
  );
};

Tabs.defaultProps = {
  value: null,
  tabs: []
};

export default Tabs;
