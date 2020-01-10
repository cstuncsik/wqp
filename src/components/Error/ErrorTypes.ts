export interface ErrorMessage {
  id: string
  text: string
}

export interface ErrorContextProps {
  errorMessages: ErrorMessage[]
  addErrorMessage: (text: string) => void
}

export interface ErrorFCProps {
  errorMessage: ErrorMessage
  onClose: () => void
}
