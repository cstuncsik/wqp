import { Message } from 'components/Message/MessageTypes'

export interface AppContextProps {
  messages: Message[]
  addMessage: (message: Omit<Message, 'id'>) => void
}
