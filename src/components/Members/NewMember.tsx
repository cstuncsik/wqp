import React, { FC, useState, ChangeEvent, useContext, useCallback } from 'react'

import { Member } from 'components/Members/MemberTypes'
import 'components/Members/NewMember.scss'
import { uuidv4 } from 'helpers/string'
import { AppContext } from 'AppContext'

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
  const { availableMembers, setAvailableMembers, addMessage } = useContext(AppContext)

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
    setAvailableMembers([...availableMembers, { ...newMember, person_id: uuidv4() }])
    closeOverlay()
    addMessage({ type: 'success', text: 'Succesfully created a new member' })
  }

  const firstnameInput = useCallback((input: HTMLInputElement) => {
    if (input !== null) {
      input.focus()
    }
  }, [])

  return (
    <div className="New-member">
      <button type="button" onClick={openOverlay}>
        New user
      </button>
      {opened && (
        <div className="New-member-overlay" onClick={closeOverlay}>
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
                  tabIndex={1}
                  ref={firstnameInput}
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
                  tabIndex={3}
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
                  tabIndex={2}
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
                  tabIndex={4}
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
                  tabIndex={5}
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
      )}
    </div>
  )
}
