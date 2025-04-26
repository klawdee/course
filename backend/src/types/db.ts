import * as appTypes from '../types/types'

export type paramsId = {
    id: number
}
export type paramsUserId = {
    user_id: number
}

export interface user  {
    id?: number
    email: string
    name: string
    password_hash?: string
}

export type userUpdatePassword = {
    password: string
}

export interface userCreationAttributes extends Omit<user, 'password_hash'> {
    password_hash: string
}

export interface permissionAttributes {
  id: number;
  userId: number;
  body: appTypes.role;
}

export interface permissionCreationAttributes extends Partial<permissionAttributes> {}
