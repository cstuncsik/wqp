import React from 'react'
import { render } from '@testing-library/react'

import App from 'App'

describe('App', () => {
  test('renders components', () => {
    const { getByTestId } = render(<App />)
    const header = getByTestId('header')
    const members = getByTestId('members')
    expect(header).toBeInTheDocument()
    expect(members).toBeInTheDocument()
  })
})
