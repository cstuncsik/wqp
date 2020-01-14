import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import { Members } from 'components/Members/Members'
import { AppContext } from 'AppContext'

describe('Members component', () => {
  it('renders empty list and "Add new member" button disabled when there is no data', () => {
    const { container } = render(<Members />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders empty list and "Add new member" button enabled when there is at least one member', () => {
    const { container } = render(
      <AppContext.Provider
        value={{
          messages: [],
          addMessage: () => {},
          availableMembers: [
            {
              person_id: '1b31592d-3d8a-42ff-9a8a-a373b10c2ade',
              firstname: 'Csaba',
              lastname: 'Tuncsik',
              title: 'Frontend developer',
              business_unit: 'Product',
              is_user: true
            }
          ],
          setAvailableMembers: () => {}
        }}
      >
        <Members />
      </AppContext.Provider>
    )
    expect(container.firstChild).toMatchSnapshot()
  })

  it('renders list after clicking "Add new member" button when there is at least one member', () => {
    const { container, getByText } = render(
      <AppContext.Provider
        value={{
          messages: [],
          addMessage: () => {},
          availableMembers: [
            {
              person_id: '1b31592d-3d8a-42ff-9a8a-a373b10c2ade',
              firstname: 'Csaba',
              lastname: 'Tuncsik',
              title: 'Frontend developer',
              business_unit: 'Product',
              is_user: true
            }
          ],
          setAvailableMembers: () => {}
        }}
      >
        <Members />
      </AppContext.Provider>
    )
    fireEvent.click(getByText('Add new member'))
    expect(container.firstChild).toMatchSnapshot()
  })
})
