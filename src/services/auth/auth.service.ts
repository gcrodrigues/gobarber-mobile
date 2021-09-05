import api from '../api'

import { AuthResponseData, SignInCredentials } from './types'

const AuthService = {
  authenticate: async (data: SignInCredentials): Promise<AuthResponseData> => {
    const userAuthenticated = await api.post('/sessions', data)
    return userAuthenticated.data
  },
}

export default AuthService
