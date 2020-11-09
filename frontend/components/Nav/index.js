import Link from 'next/link';

import NavStyles from './styles';

function Nav() {
  return (
    <NavStyles data-testid="nav">
      <Link href="/devices">
        <a>Devices</a>
      </Link>

    </NavStyles>
  );
}

export default Nav;
