import React from 'react'
import { render } from '@testing-library/react'

import { Header } from 'components/Header/Header'
import { Member } from 'components/Members/MemberTypes'

describe('Header component', () => {
  it('shows user name if given a valid user', () => {
    const me: Member = {
      person_id: '1b31592d-3d8a-42ff-9a8a-a373b10c2ade',
      firstname: 'Csaba',
      lastname: 'Tuncsik',
      title: 'Frontend developer',
      business_unit: 'Product',
      is_user: true
    }
    const { container } = render(<Header me={me} />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('shows a message if not given a user', () => {
    const me = null
    const { container } = render(<Header me={me} />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
