import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import { NewMember } from 'components/Members/NewMember'

describe('NewMember component', () => {
  it('renders only a button', () => {
    const { container } = render(<NewMember />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders the new member form after clicking the button', () => {
    const { container, getByText } = render(<NewMember />)
    fireEvent.click(getByText('New user'))
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders only a button again after closing the form', () => {
    const { container, getByText } = render(<NewMember />)
    fireEvent.click(getByText('New user'))
    fireEvent.click(getByText('Cancel'))
    expect(container.firstChild).toMatchSnapshot()
  })
})
