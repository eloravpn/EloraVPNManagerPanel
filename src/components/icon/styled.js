import styled from 'styled-components';

export const MaterialIcon = styled.span`
  font-size: ${(props) => (props.size ? props.size : '2.5rem')};
  color: ${(props) => color[props?.color]};
`;

export const IconContainer = styled.div`
  min-width: ${(props) => (props.size ? props.size : '55px')};
  width: ${(props) => (props.size ? props.size : '55px')};
  height: ${(props) => (props.size ? props.size : '55px')};
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  background: ${(props) =>
    props.opacity !== 'false' ? `${colorContainer[props?.color]}4D` : colorContainer[props?.color]};
  cursor: pointer;
`;

const colorContainer = {
  secondary: '#17999c',
  primary: 'rgb(118, 53, 220)',
  red: '#ffdae8',
  green: '#d6eee4',
  blue: '#573e80',
  lightBlue: '#573e80',
  orange: '#ffe6dc',
  darkBlue: '#573e80',
  darkGreen: '#339c6e',
  darkRed: '#801f17',
  white: '#fff',
  pPurple: '#66399f',
  pBlue: '#6865b8',
  pOrange: '#c96b86',
  pOrangeLight: '#c77770',
  pPink: '#cc519f',
  pLightPurpule: '#885dc6',
  pBlueDark: '#6d67bf',
  pLightBlue: '#4c7cc4',
  pGreenDark: '#37a1ae',
  pGreen: '#6dad92',
  pGreenLight: '#98bf92',
  pYellow: '#d4b767',
  pYellowDark: '#c7995e',
  pBrown: '#a98994',
  pBrownDark: '#908394',
  pGray: '#878ea8',
  fDarkBlue: '#3f51b5',
  fPurple: '#673bb7',
  fLighPurple: '#9c27b3',
  fRed: '#ea1e63',
  fOrange: '#f44236',
  fLightGreen: '#4fae53',
  fDarkGreen: '#009788',
  fLightBlue: '#00bcd5',
  fSoftBlue: '#03a9f5',
  fBlue: '#2196f3',
  fBrown: '#795547',
  fDarkOrange: '#fe5722',
  fDarkYellow: '#ff9504',
  fYellow: '#febc04',
  fGreen: '#8bc24a',
  fGray: '#607d8b',
  fBlack: '#565050'
};

export const color = {
  secondary: '#17999c',
  primary: 'rgb(118, 53, 220)',

  red: '#801f17',
  green: '#319e6f',
  blue: '#fff',
  darkBlue: '#573e80',
  lightBlue: '#fff',
  orange: '#fe834e',
  white: '#fff',
  pPurple: '#66399f',
  pBlue: '#6865b8',
  pOrange: '#c96b86',
  pOrangeLight: '#c77770',
  pPink: '#cc519f',
  pLightPurpule: '#885dc6',
  pBlueDark: '#6d67bf',
  pLightBlue: '#4c7cc4',
  pGreenDark: '#37a1ae',
  pGreen: '#6dad92',
  pGreenLight: '#98bf92',
  pYellow: '#d4b767',
  pYellowDark: '#c7995e',
  pBrown: '#a98994',
  pBrownDark: '#908394',
  pGray: '#878ea8'
};
