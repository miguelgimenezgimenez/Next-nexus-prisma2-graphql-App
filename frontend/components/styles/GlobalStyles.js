import { createGlobalStyle } from "styled-components"
import theme from './theme'

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'scout';
    src: url('/public/scout.ttf') format('ttf');
    font-weight: normal;
    font-style: normal;
  }
  html {
    box-sizing: border-box;
    font-size: 10px;
    height:100%;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    height:100%;
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
    font-family: 'scout';
  }
  a {
    text-decoration: none;
    color: ${theme.black};
  }
  #__next{
    height:100%;
  }
  button {  font-family: 'scout'; }
`;
export default GlobalStyles