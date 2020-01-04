import React, { FC, useEffect, useState } from 'react'

import { Header } from 'components/Header/Header'
import { Member } from 'components/Members/MemberTypes'
import { Members } from './components/Members/Members'
import { getMe } from 'components/Members/MemberServices'
import 'App.scss'

const App: FC = () => {
  const [me, setMe] = useState<Member | null>(null)

  useEffect(() => {
    getMe().then(({ data }) => {
      setMe(data)
    })
  }, [])

  return (
    <div className="App">
      <Header me={me} />
      <Members />
    </div>
  )
}

export default App
