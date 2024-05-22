import type { Group } from './group.interface'

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user'
}

export interface User {
  id: number
  fullname: string
  email: string
  phoneNumber?: string
  jobTitle?: string
  password: string
  role: UserRole
  group: Group | null
}
