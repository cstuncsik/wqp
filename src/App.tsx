import React, { FC, useEffect, useState } from 'react'

import { Header } from 'components/Header/Header'
import { Member } from 'components/Members/MemberTypes'
import { Members } from './components/Members/Members'
import { getMe, getMembers } from 'components/Members/MemberServices'
import 'App.scss'

const App: FC = () => {
  const [me, setMe] = useState<Member | null>(null)
  const [members, setMembers] = useState<Member[]>([])

  useEffect(() => {
    getMe().then(({ data }) => {
      setMe(data)
    })
    getMembers().then(({ data }) => {
      setMembers(data)
    })
  }, [])

  return (
    <div className="App">
      <Header me={me} />
      <Members members={members} />
    </div>
  )
}

export default App
