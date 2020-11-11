import Link from 'next/link';
import { useLocalState } from '../../LocalState';

import NavStyles from './styles';

function Nav() {
  const data = useLocalState()

  return (
    <NavStyles data-testid="nav">
      {data.brands.map(brand => (

        <Link
          key={brand.id}
          href={{
            pathname: '/phones',
            query: { brand_id: brand.id },
          }}
        >
          <a>{brand.name}</a>
        </Link>
      ))}

    </NavStyles>
  );
}

export default Nav;
