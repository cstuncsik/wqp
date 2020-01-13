import React, { FC, useEffect, useState, useContext } from 'react'

import { Header } from 'components/Header/Header'
import { Member } from 'components/Members/MemberTypes'
import { Members } from './components/Members/Members'
import { getMe, getMembers } from 'components/Members/MemberServices'
import { AppContext } from 'AppContext'
import { NewMember } from 'components/Members/NewMember'

import 'App.scss'
import 'components/Message/Message.scss'

export const App: FC = () => {
  const [me, setMe] = useState<Member | null>(null)
  const { addMessage, availableMembers, setAvailableMembers } = useContext(AppContext)

  useEffect(() => {
    getMe()
      .then(({ data }) => {
        setMe(data)
      })
      .catch(error => {
        addMessage({ type: 'error', text: 'Loading logged in user data failed' })
      })
    getMembers()
      .then(({ data }) => {
        setAvailableMembers(data)
      })
      .catch(error => {
        addMessage({ type: 'error', text: 'Loading members data failed' })
      })
  }, [])

  return (
    <div className="App">
      <Header me={me} />
      <NewMember />
      {availableMembers.length > 0 && <Members />}
    </div>
  )
}
