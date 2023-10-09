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
    fontFamily: [
      ' -apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Helvetica',
      'Arial',
      'sans-serif',
      'Apple Color Emoji',
      'Segoe UI Emoji',
      'Segoe UI Symbol'
    ].join(','),
    fontSize: 20,
    fontWeight: 500,
    h4: {
      fontWeight: 700
    },
    body1: {
      fontWeight: 500,
      color: 'rgb(99, 115, 129)'
    }
  },
  palette: {
    mode: 'light',
    primary: { main: 'rgb(118, 53, 220,0.9)' },
    secondary: { main: 'rgb(99, 115, 129,0.9)' },
    success: { main: 'rgb(17, 141, 87)' },
    error: { main: '#f7474aE6' },
    danger: { main: '#f5ae16E6' }
  },
  components: {
    MuiChip: {
      variants: [
        {
          props: { variant: 'chip' },
          style: {
            borderRadius: 6,
            padding: '0px 6px',
            height: '24px'
          }
        },
        {
          props: { variant: 'chip', color: 'info' },
          style: {
            background: 'rgba(0, 184, 217, 0.16)',
            color: 'rgb(0, 108, 156)'
          }
        },
        {
          props: { variant: 'chip', color: 'success' },
          style: {
            background: 'rgba(34, 197, 94, 0.16)',
            color: 'rgb(17, 141, 87)'
          }
        },
        {
          props: { variant: 'chip', color: 'secondary' },
          style: {
            background: 'rgba(145, 158, 171, 0.16)',
            color: 'rgb(99, 115, 129)'
          }
        },
        {
          props: { variant: 'chip', color: 'danger' },
          style: {
            background: 'rgba(255, 171, 0, 0.16)',
            color: 'rgb(183, 110, 0)'
          }
        },
        {
          props: { variant: 'chip', color: 'error' },
          style: {
            background: 'rgba(255, 86, 48, 0.16)',
            color: 'rgb(183, 29, 24)'
          }
        }
      ]
    }
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
