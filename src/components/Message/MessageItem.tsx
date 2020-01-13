import React, { FC } from 'react'
import { MessageItemFCProps } from 'components/Message/MessageTypes'

export const MessageItem: FC<MessageItemFCProps> = ({ message, onClose }) => {
  return (
    <div className={`Message-item Message-item__${message.type}`}>
      {message.text}
      <button type="button" onClick={onClose}>
        X
      </button>
    </div>
  )
}
