import * as React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import NoSsr from '@mui/material/NoSsr';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { deepPurple } from '@mui/material/colors';
import AvatarMD from '@mui/material/Avatar';

const customTheme = createTheme({
  palette: {
    primary: {
      main: deepPurple[500]
    }
  }
});

const StyledAvatar = styled(AvatarMD)`
  ${({ theme }) => `
  cursor: pointer;
  border: none;
  transition: ${theme.transitions.create(['transform'], {
    duration: theme.transitions.duration.standard
  })};
  &:hover {
    transform: scale(1.1);
  }
  `}
`;

export default function Avatar({ src, alt, children, ...props }) {
  return (
    <NoSsr>
      <MuiThemeProvider theme={customTheme}>
        <ThemeProvider theme={customTheme}>
          <StyledAvatar src={src} alt={alt} {...props}>
            {children}
          </StyledAvatar>
        </ThemeProvider>
      </MuiThemeProvider>
    </NoSsr>
  );
}
