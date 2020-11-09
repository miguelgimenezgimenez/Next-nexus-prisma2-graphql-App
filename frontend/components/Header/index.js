import Link from 'next/link';
import NProgress from 'nprogress';
import Router from 'next/router';
import Nav from '../Nav';
import { Logo, StyledHeader } from './styles';


Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};


const Header = () => (
  <StyledHeader>
    <div className="bar">
      <Logo>
        <Link href="/">
          <a>
            <img src="./static/gs-logo.png" alt="" />
          </a>
        </Link>
      </Logo>
      <Nav />
    </div>
    <div className="sub-bar">

    </div>

  </StyledHeader>
);

export default Header;
