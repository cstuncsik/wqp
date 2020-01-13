import React, { FC, Fragment } from 'react'

import { MemberAccessLevel, MemberRole, MemberRoleSettings, MemberRowFCProps } from 'components/Members/MemberTypes'

export const MemberRow: FC<MemberRowFCProps> = ({
  idx,
  selectedMember,
  selectableMembers,
  removeMember,
  updateMember,
  switchMember,
  roles,
  accessLevels
}) => {
  return (
    <Fragment>
      <select
        name="member"
        disabled={selectableMembers.length === 1}
        value={selectedMember.person_id}
        onChange={({ target }) => {
          switchMember(idx, target.value)
        }}
      >
        {selectableMembers.map(option => (
          <option key={option.person_id} value={option.person_id}>
            {option.firstname} {option.lastname}
          </option>
        ))}
      </select>
      <select
        name="role"
        value={selectedMember.role}
        onChange={({ target }) => {
          selectedMember.role = target.value as MemberRoleSettings['role']
          selectedMember.access_level = roles[selectedMember.role].accessLevels[0]
          updateMember(idx, selectedMember)
        }}
      >
        {Object.keys(roles).map(key => {
          const role: MemberRole = roles[key]
          return (
            <option key={role.id} value={role.id}>
              {role.label}
            </option>
          )
        })}
      </select>
      <select
        name="accessLevel"
        disabled={roles[selectedMember.role].accessLevels.length === 1}
        value={selectedMember.access_level}
        onChange={({ target }) => {
          selectedMember.access_level = target.value as MemberAccessLevel['id']
          updateMember(idx, selectedMember)
        }}
      >
        {roles[selectedMember.role].accessLevels.map(accessLevel => (
          <option key={accessLevel} value={accessLevels[accessLevel].id}>
            {accessLevels[accessLevel].label}
          </option>
        ))}
      </select>
      <div>
        <button type="button" onClick={() => removeMember(idx)}>
          X
        </button>
      </div>
    </Fragment>
  )
}
