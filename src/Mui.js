import { createTheme, ThemeProvider } from '@mui/material/styles';
import { cssTransition, ToastContainer } from 'react-toastify';
import { useMediaQuery } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { memo } from 'react';
import 'dayjs/locale/en-gb';
/* If use RTL use button code */

// const jss = create({
//   plugins: [...jssPreset().plugins, rtl()],
// });

// RTL
// const cacheRtl = createCache({
//   key: "muirtl",
//   stylisPlugins: [prefixer, rtlPlugin],
// });

const theme = createTheme({
  typography: {
    fontFamily: ['roboto', '"Segoe UI"', 'Roboto'].join(','),
    fontSize: 19,
    body1: {
      color: 'rgb(99, 115, 129)'
    }
  },
  palette: {
    mode: 'light',
    primary: { main: 'rgb(118, 53, 220)' },
    secondary: { main: 'rgb(99, 115, 129)' },
    success: { main: '#00956f' },
    error: { main: '#f7474a' },
    danger: { main: '#f5ae16' }
  }
});

const swirl = cssTransition({
  enter: 'fade-in',
  exit: 'fade-out'
});

const Mui = (props) => {
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'en-gb'}>
      <ThemeProvider theme={theme}>
        <ToastContainer
          position={fullScreen ? 'bottom-center' : 'bottom-left'}
          limit={2}
          hideProgressBar={true}
          newestOnTop
          closeOnClick={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={true}
          transition={swirl}
          theme="light"
          rtl={true}
        />
        {/* RTL CODE HERE */}
        {/* <StylesProvider jss={jss}> */}
        {/* <div dir="rtl"> */}
        {props.children}
        {/* </div> */}
        {/* </StylesProvider> */}
      </ThemeProvider>
    </LocalizationProvider>
  );
};
export default memo(Mui);