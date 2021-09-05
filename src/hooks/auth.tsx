import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react'
import AsyncStorage from '@react-native-community/async-storage'

import { IUser } from '../services/user/types'
import { AuthService } from '../services'

interface AuthResponseData {
  token: string
  user: IUser
}

interface SignInCredentials {
  email: string
  password: string
}

interface IAuthContext {
  user: IUser
  signIn(credentials: SignInCredentials): Promise<void>
  signOut(): void
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthResponseData>({} as AuthResponseData)

  useEffect(() => {
    async function loadStorageData() {
      const [token, user] = await AsyncStorage.multiGet([
        '@GoBarber:token',
        '@GoBarber:user',
      ])

      if (token[1] && user[1])
        setData({ token: token[1], user: JSON.parse(user[1]) })
    }

    loadStorageData()
  }, [])

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@GoBarber:token', '@GoBarber:user'])

    setData({} as AuthResponseData)
  }, [])

  const signIn = useCallback(async (data: SignInCredentials) => {
    const { token, user } = await AuthService.authenticate(data)

    await AsyncStorage.multiSet([
      ['@GoBarber:token', token],
      ['@GoBarber:user', JSON.stringify(user)],
    ])

    setData({ token, user })
  }, [])
  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): IAuthContext {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
