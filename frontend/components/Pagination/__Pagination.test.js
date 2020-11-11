import { render } from '@testing-library/react';
const { perPage } = require('../../config')
import Pagination, { PAGINATION_QUERY } from './index';

describe('<Pagination/>', () => {

  it('renders pagination for 18 items', () => {
    const { container, findByTestId, getByTestId, debug, query } = render(
      <Pagination page={1} totalCount={18} />
    );

    expect(getByTestId('totalPages')).toHaveTextContent('5');
    expect(container).toMatchSnapshot();
  });

  it('disables prev button on first page', () => {
    const { getByText, findByTestId } = render(
      <Pagination page={1} totalCount={20} />
    );
    expect(getByText(/Prev/)).toHaveAttribute('aria-disabled', 'true');
    expect(getByText(/Next/)).toHaveAttribute('aria-disabled', 'false');
  });

  it('disables next button on last page', () => {
    const { getByText, findByTestId } = render(
      <Pagination page={5} totalCount={5 * perPage} />
    );
    expect(getByText(/Prev/)).toHaveAttribute('aria-disabled', 'false');
    expect(getByText(/Next/)).toHaveAttribute('aria-disabled', 'true');
  });

  it('enables all buttons on a middle page', () => {
    const { getByText, findByTestId } = render(
      <Pagination page={3} totalCount={20} />
    );
    expect(getByText(/Prev/)).toHaveAttribute('aria-disabled', 'false');
    expect(getByText(/Next/)).toHaveAttribute('aria-disabled', 'false');
  });
});
