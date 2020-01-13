import { Message } from 'components/Message/MessageTypes'
import { Member } from 'components/Members/MemberTypes'

export interface AppContextProps {
  messages: Message[]
  addMessage: (message: Omit<Message, 'id'>) => void
  availableMembers: Member[]
  setAvailableMembers: (availableMembers: Member[]) => void
}
