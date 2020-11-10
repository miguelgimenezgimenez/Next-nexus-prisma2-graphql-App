import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import Header from '../Header';
import Meta from '../Meta';
import { StyledPage, Inner } from './styles';
import GlobalStyles from '../styles/GlobalStyles';
import theme from '../styles/theme';


class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          <GlobalStyles />
          <Meta />
          <Header />
          <Inner>{this.props.children}</Inner>
        </StyledPage>
      </ThemeProvider>
    );
  }
}

export default Page;