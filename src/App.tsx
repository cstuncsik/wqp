import React, { FC, useEffect, useState, useContext } from 'react'

import { Header } from 'components/Header/Header'
import { Member } from 'components/Members/MemberTypes'
import { Members } from './components/Members/Members'
import { getMe, getMembers } from 'components/Members/MemberServices'
import { ErrorContext } from 'components/Error/Error'

import 'App.scss'

export const App: FC = () => {
  const [me, setMe] = useState<Member | null>(null)
  const [members, setMembers] = useState<Member[]>([])
  const { addErrorMessage } = useContext(ErrorContext)

  useEffect(() => {
    getMe()
      .then(({ data }) => {
        setMe(data)
      })
      .catch(error => {
        addErrorMessage('Loading logged in user data failed')
      })
    getMembers()
      .then(({ data }) => {
        setMembers(data)
      })
      .catch(error => {
        addErrorMessage('Loading members data failed')
      })
  }, [])

  return (
    <div className="App">
      <Header me={me} />
      <Members members={members} />
    </div>
  )
}
