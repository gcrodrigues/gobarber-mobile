import React from 'react'
import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'

import { Button, Input } from '../../components'
import * as S from './styles'

import logoImg from '../../assets/logo.png'

const SignIn: React.FC = () => {
  const navigation = useNavigation()
  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <S.Container>
            <Image source={logoImg} />

            <View>
              <S.Title>Sign in to your account</S.Title>
            </View>

            <Input name="email" icon="mail" placeholder="E-mail" />
            <Input name="password" icon="lock" placeholder="Password" />

            <Button
              onPress={() => {
                console.log('ok')
              }}
            >
              Sign in
            </Button>

            <S.ForgotPassword>
              <S.ForgotPasswordText>Forgot Password?</S.ForgotPasswordText>
            </S.ForgotPassword>
          </S.Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <S.CreateAccountButton
        onPress={() => navigation.navigate('SignUp' as never)}
      >
        <Icon name="log-in" size={20} color="#ff9000" />
        <S.CreateAccountButtonText>Create an account</S.CreateAccountButtonText>
      </S.CreateAccountButton>
    </>
  )
}

export default SignIn
