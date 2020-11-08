import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import Header from '../Header';
import Meta from '../Meta';
import { theme, StyledPage, Inner } from './styles'
class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          <Meta />
          <Header />
          <Inner>{this.props.children}</Inner>
        </StyledPage>
      </ThemeProvider>
    );
  }
}

export default Page;
