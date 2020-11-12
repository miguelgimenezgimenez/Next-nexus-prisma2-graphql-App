import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';

import { mockBrand } from '../../utils/testUtils';
import Nav from '../components/Nav';
import { GET_BRANDS_QUERY, LocalStateProvider } from '../../LocalState'

const fakeBrands = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(id => mockBrand({ id }))

const brandMocks = [
  {
    request: { query: GET_BRANDS_QUERY },
    result: {
      data: {
        getAllBrands: {
          brands: fakeBrands
        },
      },
    },
  },
];

describe('<Nav/>', () => {
  it('renders a minimal nav when signed out', async () => {
    const { container } = render(
      <LocalStateProvider>
        <MockedProvider mocks={notSignedInMocks}>
          <Nav />
        </MockedProvider>
      </LocalStateProvider>
    );
    expect(container).toMatchSnapshot();
  });

  it('renders full nav when signed in', async () => {
    const { container } = render(
      <LocalStateProvider>
        <MockedProvider mocks={signedInMocks}>
          <Nav />
        </MockedProvider>
      </LocalStateProvider>
    );
    await screen.findByText('Account');
    expect(container).toMatchSnapshot();
    expect(container).toHaveTextContent('Sign Out');
    expect(container).toHaveTextContent('My Cart');
  });

  it('renders the amount of items in the cart', async () => {
    render(
      <LocalStateProvider>
        <MockedProvider mocks={signedInMocksWithCartItems}>
          <Nav />
        </MockedProvider>
      </LocalStateProvider>
    );
    await screen.findByText('Account');
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});
