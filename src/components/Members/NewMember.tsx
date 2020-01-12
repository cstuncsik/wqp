import React, { FC, useState, ChangeEvent } from 'react'

import { Member } from 'components/Members/MemberTypes'
import 'components/Members/NewMember.scss'
import { uuidv4 } from 'helpers/string'

const createEmptyMember = (): Member => ({
  firstname: '',
  lastname: '',
  title: '',
  person_id: '',
  business_unit: '',
  is_user: false
})

export const NewMember: FC = () => {
  const [opened, setOpened] = useState<boolean>(false)
  const [newMember, setNewMember] = useState<Member>(createEmptyMember)

  const openOverlay = (): void => {
    setOpened(true)
    setNewMember(createEmptyMember())
  }

  const closeOverlay = (): void => {
    setOpened(false)
  }

  const updateMemberPropFromString = (e: ChangeEvent<HTMLInputElement>) => {
    setNewMember({ ...newMember, [e.target.name]: e.target.value })
  }

  const createNewMember = () => {
    setNewMember({ ...newMember, person_id: uuidv4() })
  }

  return (
    <div className="New-member">
      <button type="button" onClick={openOverlay}>
        New user
      </button>
      <div className={`New-member-overlay${opened ? ' New-member-overlay__opened' : ''}`} onClick={closeOverlay}>
        <div
          className="New-member-content"
          onClick={e => {
            e.stopPropagation()
          }}
        >
          <div className="New-member-content-header">
            <h2>Create member</h2>
            <button type="button" onClick={closeOverlay}>
              X
            </button>
          </div>
          <div className="New-member-content-form">
            <div className="New-member-content-form-input">
              <label htmlFor="firstname">First name</label>
              <input
                value={newMember.firstname}
                id="firstname"
                name="firstname"
                type="text"
                onChange={updateMemberPropFromString}
              />
            </div>
            <div className="New-member-content-form-input">
              <label htmlFor="title">Title</label>
              <input
                value={newMember.title}
                id="title"
                name="title"
                type="text"
                onChange={updateMemberPropFromString}
              />
            </div>
            <div className="New-member-content-form-input">
              <label htmlFor="lastname">Last name</label>
              <input
                value={newMember.lastname}
                id="lastname"
                name="lastname"
                type="text"
                onChange={updateMemberPropFromString}
              />
            </div>
            <div className="New-member-content-form-input">
              <label htmlFor="business_unit">Business unit</label>
              <input
                value={newMember.business_unit}
                id="business_unit"
                name="business_unit"
                type="text"
                onChange={updateMemberPropFromString}
              />
            </div>
            <div className="New-member-content-form-input">
              <input
                checked={newMember.is_user}
                id="is_user"
                name="is_user"
                type="checkbox"
                onChange={({ target }) => {
                  setNewMember({ ...newMember, is_user: target.checked })
                }}
              />
              <label htmlFor="is_user">User status</label>
              <small>Designates whether the person can login into application</small>
            </div>
          </div>
          <div className="New-member-content-footer">
            <button type="button" onClick={closeOverlay}>
              Cancel
            </button>
            <button type="button" onClick={createNewMember}>
              Create member
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
