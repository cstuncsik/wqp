import React, { FC, Fragment, createContext, useState } from 'react'

import { ErrorMessage, ErrorContextProps, ErrorFCProps } from 'components/Error/ErrorTypes'

import 'components/Error/Error.scss'

const defaultErrorContextValue: ErrorContextProps = {
  errorMessages: [],
  addErrorMessage: (text: string) => {}
}
const ErrorContext = createContext(defaultErrorContextValue)
const { Provider } = ErrorContext

const ErrorMessageItem: FC<ErrorFCProps> = ({ errorMessage, onClose }) => (
  <li>
    {errorMessage.text}
    <button type="button" onClick={onClose}>
      X
    </button>
  </li>
)

const ErrorMessagesProvider: FC = ({ children }) => {
  const [errorMessages, setErrorMessages] = useState<ErrorMessage[]>([])

  const addErrorMessage = (text: string): void => {
    setErrorMessages([...errorMessages, { id: String(Date.now() + Math.random()), text }])
  }

  const removeErrorMessage = (message: ErrorMessage): void => {
    setErrorMessages(errorMessages.filter(msg => msg.id !== message.id))
  }

  return (
    <Provider
      value={{
        errorMessages,
        addErrorMessage
      }}
    >
      <Fragment>
        <div className="Error-container">
          {errorMessages.length > 0 && (
            <ul>
              {errorMessages.map(errorMessage => (
                <ErrorMessageItem
                  key={errorMessage.id}
                  {...{
                    errorMessage,
                    onClose: () => {
                      removeErrorMessage(errorMessage)
                    }
                  }}
                />
              ))}
            </ul>
          )}
        </div>
        {children}
      </Fragment>
    </Provider>
  )
}

export { ErrorContext, ErrorMessagesProvider }
