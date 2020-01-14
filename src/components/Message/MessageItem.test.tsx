import React from 'react'
import { render } from '@testing-library/react'

import { MessageItem } from 'components/Message/MessageItem'
import { Message } from 'components/Message/MessageTypes'

const messageTypes: Message['type'][] = ['success', 'info', 'warning', 'error']
const testCases: [Message['type'], Message][] = messageTypes.map(type => [
  type,
  {
    id: '1b31592d-3d8a-42ff-9a8a-a373b10c2ade',
    type,
    text: type + ' message text'
  }
])

describe('MessageItem component', () => {
  test.each(testCases)('renders %s message', (type, message) => {
    const { container } = render(<MessageItem message={message} onClose={() => {}} />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
