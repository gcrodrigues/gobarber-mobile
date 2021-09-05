import { IUser } from '../user/types'

export interface SignInCredentials {
  email: string
  password: string
}

export interface AuthResponseData {
  token: string
  user: IUser
}
