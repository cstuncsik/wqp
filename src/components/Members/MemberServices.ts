import { AxiosPromise } from 'axios'
import { http } from 'services/http'
import { Member } from 'components/Members/MemberTypes'

export const getMe = (): AxiosPromise<Member> => http.get('/me')
export const getMembers = (): AxiosPromise<Member[]> => http.get('/members')
