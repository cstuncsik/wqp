import React, { FC } from 'react'

import 'components/Members/Members.scss'
import { MembersFCProps } from 'components/Members/MemberTypes'

export const Members: FC<MembersFCProps> = ({ members }) => {
  return (
    <div className="Members" data-testid="members">
      <pre>{JSON.stringify(members, null, 2)}</pre>
    </div>
  )
}
