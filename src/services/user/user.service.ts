import api from '../api'

import { SignUpData, IUser } from './types'

const UserService = {
  createUser: async (data: SignUpData): Promise<IUser> =>
    await api.post('/users', data),
}

export default UserService
