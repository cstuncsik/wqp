import React, { FC } from 'react'

import { HeaderFCProps } from 'components/Header/HeaderTypes'

import 'components/Header/Header.scss'

export const Header: FC<HeaderFCProps> = ({ me }) => {
  return (
    <header className="App-header" data-testid="header">
      {me ? (
        <h1>
          {me?.firstname} {me?.lastname}
        </h1>
      ) : (
        <h1>No user data</h1>
      )}
      <button type="button">New user</button>
    </header>
  )
}
