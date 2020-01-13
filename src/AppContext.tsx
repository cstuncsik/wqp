import React, { FC, Fragment, createContext, useState } from 'react'

import { AppContextProps } from 'AppTypes'
import { MessageItem } from 'components/Message/MessageItem'
import { Message } from 'components/Message/MessageTypes'
import { Member } from 'components/Members/MemberTypes'
import { uuidv4 } from 'helpers/string'

const defaultAppContextValue: AppContextProps = {
  messages: [],
  addMessage: message => {},
  availableMembers: [],
  setAvailableMembers: availableMembers => {}
}

const AppContext = createContext(defaultAppContextValue)
const { Provider } = AppContext

const AppProvider: FC = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [availableMembers, setAvailableMembers] = useState<Member[]>([])

  const addMessage = (message: Omit<Message, 'id'>): void => {
    setMessages([...messages, { ...message, id: uuidv4() }])
  }

  const removeMessage = (message: Message): void => {
    setMessages(messages.filter(msg => msg.id !== message.id))
  }
  return (
    <Provider
      value={{
        messages,
        addMessage,
        availableMembers,
        setAvailableMembers
      }}
    >
      <Fragment>
        {messages.length > 0 && (
          <ul className="App-messages">
            {messages.map(message => (
              <MessageItem
                key={message.id}
                {...{
                  message,
                  onClose: () => {
                    removeMessage(message)
                  }
                }}
              />
            ))}
          </ul>
        )}
        {children}
      </Fragment>
    </Provider>
  )
}

export { AppContext, AppProvider }
