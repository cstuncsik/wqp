import { Dictionary } from 'helpers/types'

export interface Member {
  person_id: string
  firstname: string
  lastname: string
  title: string
  business_unit: string
  is_user: boolean
}

export interface MembersFCProps {
  members: Member[]
}

export interface MemberAccessLevel {
  id: 'read' | 'write' | 'admin'
  label: string
}

export interface MemberRoleSettings {
  role: 'customer' | 'employee' | 'manager'
  access_level: MemberAccessLevel['id']
}

export type MemberWithRole = Member & MemberRoleSettings

export interface MemberRole {
  id: MemberRoleSettings['role']
  label: string
  accessLevels: MemberAccessLevel['id'][]
}

export interface MemberRowFCProps {
  idx: number
  selectedMember: MemberWithRole
  selectableMembers: MemberWithRole[]
  removeMember: (idx: number) => void
  updateMember: (idx: number, data: MemberWithRole) => void
  switchMember: (idx: number, newMemberId: string) => void
  roles: Dictionary<MemberRole>
  accessLevels: Dictionary<MemberAccessLevel>
}

export type MemberResult = Partial<MemberWithRole>
