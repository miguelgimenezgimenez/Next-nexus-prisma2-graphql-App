import { createGlobalStyle } from "styled-components"
import styled from 'styled-components';

export const theme = {
  red: '#FF0000',
  black: '#393939',
  backgroundColor:"#f6f6f6",
  grey: '#3A3A3A',
  lightgrey: '#E1E1E1',
  offWhite: '#EDEDED',
  maxWidth: '1000px',
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
};

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'radnika_next';
    src: url('/public/scout.ttf') format('ttf');
    font-weight: normal;
    font-style: normal;
  }
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
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
  button {  font-family: 'scout'; }
`;


export const Title = styled.h3`
  margin: 0 1rem;
  text-align: center;
  /* text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1); */
  a {
    font-weight: 300;
    font-style: normal;
    font-stretch: normal;
    
    display: inline;
    line-height: 1.3;
    font-size: 3rem;
    text-align: center;
    color: #000;
    padding: 0 1rem;
  }
`;


export const Center = styled.div`
text-align: center;
`;

export const ItemsList = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
grid-gap: 60px;
max-width: ${props => props.theme.maxWidth};
margin: 0 auto;
`;

