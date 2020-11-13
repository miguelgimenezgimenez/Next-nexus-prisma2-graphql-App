import { render } from '@testing-library/react'
const { PER_PAGE } = require('../../constants')
import Pagination from './index'

describe('<Pagination/>', () => {

  it('renders pagination for 18 items', () => {
    const { container, getByTestId } = render(
      <Pagination page={1} totalCount={18} />
    )

    expect(getByTestId('totalPages')).toHaveTextContent('5')
    expect(container).toMatchSnapshot()
  })

  it('disables prev button on first page', () => {
    const { getByText } = render(
      <Pagination page={1} totalCount={20} />
    )
    expect(getByText(/Prev/)).toHaveAttribute('aria-disabled', 'true')
    expect(getByText(/Next/)).toHaveAttribute('aria-disabled', 'false')
  })

  it('disables next button on last page', () => {
    const { getByText } = render(
      <Pagination page={5} totalCount={5 * PER_PAGE} />
    )
    expect(getByText(/Prev/)).toHaveAttribute('aria-disabled', 'false')
    expect(getByText(/Next/)).toHaveAttribute('aria-disabled', 'true')
  })

  it('enables all buttons on a middle page', () => {
    const { getByText } = render(
      <Pagination page={3} totalCount={20} />
    )
    expect(getByText(/Prev/)).toHaveAttribute('aria-disabled', 'false')
    expect(getByText(/Next/)).toHaveAttribute('aria-disabled', 'false')
  })
})
