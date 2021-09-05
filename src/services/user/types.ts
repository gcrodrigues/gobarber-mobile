export interface IUser {
  id: string
  name: string
  email: string
  avatar: string
  created_at: Date
  updated_at: Date
}

export interface SignUpData {
  name: string
  email: string
  password: string
}
