import Link from 'next/link';
import { useLocalState } from '../../LocalState';

import NavStyles from './styles';

function Nav() {

  const data = useLocalState()

  return (
    <NavStyles >
      {data.brands.map(brand => (

        <Link
          data-testid="brand_nav"
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
