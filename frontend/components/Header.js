import Link from 'next/link';
import styled from 'styled-components';
import NProgress from 'nprogress';
import Router from 'next/router';
import Nav from './Nav';
// import Cart from './Cart';
// import Search from './Search';

Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

const Logo = styled.div`
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  padding:2rem;
  a {
    img {
      width:20rem;
    }

  }
  @media (max-width: 1300px) {
    margin: 0;
    text-align: center;
  }
`;
const StyledHeader = styled.header`
  .bar {
    border-bottom: 10px solid ${props => props.theme.black};
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
    @media (max-width: 1300px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }
  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid ${props => props.theme.lightgrey};
  }
`;

const Header = () => (
  <StyledHeader>
    <div className="bar">
      <Logo>
        <Link href="/">
          <a>
          <img src="./static/gs-logo.png" alt=""/>
          </a>
        </Link>
      </Logo>
      <Nav />
    </div>
    <div className="sub-bar">
      {/* <Search /> */}
    </div>
    {/* <Cart /> */}
  </StyledHeader>
);

export default Header;
