import React from 'react'
import { render, act, waitForElement } from '@testing-library/react'
import '../test/mocks/crypto'

import { App } from 'App'
import { AppProvider } from 'AppContext'

describe('App', () => {
  it('renders components', () => {
    const { container } = render(<App />)
    const header = container.querySelector('.Header')
    const newMember = container.querySelector('.New-member')
    const members = container.querySelector('.Members')
    expect(header).toBeInTheDocument()
    expect(newMember).toBeInTheDocument()
    expect(members).toBeInTheDocument()
  })

  it('renders error message if http request failed (not mocking the request)', async () => {
    await act(async () => {
      const { container } = render(
        <AppProvider>
          <App />
        </AppProvider>
      )
      await waitForElement(() => container.querySelector('.App-messages'))
      expect(container.querySelector('.Message-item__error')).toBeInTheDocument()
    })
  })
})
