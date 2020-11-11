import React from 'react';
import { ThemeProvider } from 'styled-components';

import Header from '../Header';
import Meta from '../Meta';
import { StyledPage, Inner } from './styles';
import GlobalStyles from '../styles/GlobalStyles';
import theme from '../styles/theme';



function Page({ children }) {
 
  return (
    <ThemeProvider theme={theme}>
      <StyledPage>
        <GlobalStyles />
        <Meta />
        <Header />
        <Inner>{children}</Inner>
      </StyledPage>
    </ThemeProvider>
  );

}

export default Page;