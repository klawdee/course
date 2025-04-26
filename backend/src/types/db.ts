import { Optional } from "sequelize"

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
    password?: string
}

export type userUpdatePassword = {
    password: string
}

export interface userCreation extends user{}

export interface todoList {
    id?: number
    user_id?: number
    topic: string
}

export interface todoListCreation extends todoList{}


export interface todoItem {
    id: number
    todo_list_id: number
    text: string
    done: boolean
}


export interface todoItemCreation extends Optional<todoItem, 'id'>{}