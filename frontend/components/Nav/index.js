import Link from 'next/link';

import NavStyles from './styles';

function Nav() {
  return (
    <NavStyles data-testid="nav">
      <Link href="/phones">
        <a>Phones</a>
      </Link>
      <Link href="/phones">
        <a>Phones</a>
      </Link>
      <Link href="/phones">
        <a>Phones</a>
      </Link>
      <Link href="/phones">
        <a>Phones</a>
      </Link>

    </NavStyles>
  );
}

export default Nav;
