export interface Message {
  id: string
  type: 'success' | 'info' | 'warning' | 'error'
  text: string
}

export interface MessageItemFCProps {
  message: Message
  onClose: () => void
}
