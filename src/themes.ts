import { createGlobalStyle } from 'styled-components';

export const lightTheme = {
  body: '#fff',
  fontColor: '#18181B',
};

export const darkTheme = {
  body: '#18181B',
  fontColor: '#fff',
};

type ThemeType = typeof lightTheme;

export const GlobalStyles = createGlobalStyle<{ theme: ThemeType }>`

body{
  background-color:${(props) => props.theme.body};
  color: ${(props) => props.theme.fontColor};
  font-family: Roboto,
}
`;
