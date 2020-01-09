import React, { FC, useEffect, useState, Fragment } from 'react'

import {
  Member,
  MemberAccessLevel,
  MemberRole,
  MemberRoleSettings,
  MembersFCProps,
  MemberWithRole,
  MemberResult
} from 'components/Members/MemberTypes'
import { Dictionary } from 'helpers/types'
import { MemberRow } from 'components/Members/MemberRow'
import { pick } from 'helpers/object'

import 'components/Members/Members.scss'

const roles: Dictionary<MemberRole> = {
  customer: {
    id: 'customer',
    label: 'Customer',
    accessLevels: ['read', 'write']
  },
  employee: {
    id: 'employee',
    label: 'Employee',
    accessLevels: ['write', 'admin']
  },
  manager: {
    id: 'manager',
    label: 'Manager',
    accessLevels: ['admin']
  }
}

const accessLevels: Dictionary<MemberAccessLevel> = {
  read: {
    id: 'read',
    label: 'Read'
  },
  write: {
    id: 'write',
    label: 'Write'
  },
  admin: {
    id: 'admin',
    label: 'Admin'
  }
}

const memberDefaultRoleProps: MemberRoleSettings = { role: 'customer', access_level: 'read' }

export const Members: FC<MembersFCProps> = ({ members }) => {
  const [selectedMembers, setSelectedMembers] = useState<MemberWithRole[]>([])
  const [availableMembers, setAvailableMembers] = useState<Member[]>([])
  const [membersResult, setMembersResult] = useState<{ members: MemberResult[] }>({ members: [] })

  const addMember = (): void => {
    const added: MemberWithRole = { ...availableMembers.shift()!, ...memberDefaultRoleProps }
    setSelectedMembers(selectedMembers.concat(added))
  }

  const removeMember = (idx: number): void => {
    const removed: MemberWithRole = selectedMembers.splice(idx, 1)[0]
    setSelectedMembers(selectedMembers)
    setAvailableMembers(availableMembers.concat(removed))
  }

  const updateMember = (idx: number, data: MemberWithRole): void => {
    selectedMembers[idx] = data
    setSelectedMembers([...selectedMembers])
  }

  const switchMember = (idx: number, newMemberId: string): void => {
    const newMemberIdx: number = availableMembers.findIndex(member => member.person_id === newMemberId)
    const removedAvailableMember: Member = availableMembers.splice(newMemberIdx, 1)[0]
    const added: MemberWithRole = { ...removedAvailableMember, ...memberDefaultRoleProps }
    const removed: MemberWithRole = selectedMembers.splice(idx, 1, added)[0]
    setAvailableMembers(availableMembers.concat(removed))
  }

  const createMembersResult = (): void => {
    setMembersResult({ members: selectedMembers.map(pick(['person_id', 'role', 'access_level'])) })
  }

  useEffect(() => {
    setAvailableMembers([...members])
  }, [members])

  return (
    <div className="Members" data-testid="members">
      {members.length > 0 ? (
        <Fragment>
          <div className="Members-data">
            <h2>Member</h2>
            <h2>Role</h2>
            <h2>Access Level</h2>
            <span>
              <button type="button" onClick={addMember} disabled={!availableMembers.length}>
                Add new member
              </button>
            </span>
            {selectedMembers.map((selectedMember, idx) => {
              const selectableMembers: MemberWithRole[] = availableMembers.reduce(
                (additionalSelectableMembers, member) =>
                  selectedMember.person_id !== member.person_id
                    ? additionalSelectableMembers.concat({ ...member, role: 'customer', access_level: 'read' })
                    : additionalSelectableMembers,
                [selectedMember]
              )
              return (
                <MemberRow
                  key={selectedMember.person_id}
                  {...{
                    idx,
                    selectedMember,
                    selectableMembers,
                    removeMember,
                    updateMember,
                    switchMember,
                    roles,
                    accessLevels
                  }}
                />
              )
            })}
          </div>
          <div className="Members-result">
            <button type="button" onClick={createMembersResult}>
              Save result
            </button>
            {membersResult.members.length > 0 && <pre>{JSON.stringify(membersResult, null, 2)}</pre>}
          </div>
        </Fragment>
      ) : (
        <h2>No available members</h2>
      )}
    </div>
  )
}
