import { render, screen } from '@testing-library/react'
import { MockedProvider } from '@apollo/react-testing'
import ListItem from './index'
import { mockPhone } from '../../utils/testUtils'

const phone = mockPhone()


describe('<ListItem/>', () => {
  it('renders and matches the snapshot', () => {
    const { container } = render(
      <MockedProvider>
        <ListItem item={phone} pathname={'/phone'} />
      </MockedProvider>
    )
    expect(container).toMatchSnapshot()
  })

  it('renders the image properly', () => {
    render(
      <MockedProvider>
        <ListItem item={phone} />
      </MockedProvider>
    )
    const img = screen.getByAltText(phone.name)
    expect(img).toBeInTheDocument()
  })

  it('renders the name', () => {
    const { container } = render(
      <MockedProvider>
        <ListItem item={phone} pathname="/phone" />
      </MockedProvider>
    )
    expect(screen.getByText(`${phone.name}`)).toBeInTheDocument()
    const link = container.querySelector('a')
    expect(link).toHaveAttribute('href', `/phone?id=${phone.id}`)
    expect(link).toHaveTextContent(phone.name)
  })

  it('renders out the buttons properly', () => {
    render(
      <MockedProvider>
        <ListItem item={phone} />
      </MockedProvider>
    )

    const edit = screen.getByText(/Edit/i)
    expect(edit.href).toContain(`/update?id=${phone.id}`)

    const deleteItem = screen.getByText(/delete/i)
    expect(deleteItem).toHaveProperty('type', 'button')
    expect(deleteItem).toBeInTheDocument()
  })
})
