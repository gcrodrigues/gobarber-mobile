import React, { useCallback, useRef } from 'react'
import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'

import { Button, Input } from '../../components'
import { useAuth } from '../../hooks/auth'
import getValidationErrors from '../../utils/getValidationErrors'
import * as S from './styles'

import logoImg from '../../assets/logo.png'

interface SignInFormData {
  email: string
  password: string
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const passwordInputRef = useRef<TextInput>(null)
  const navigation = useNavigation()
  const { signIn } = useAuth()

  const handleSignIn = useCallback(
    async ({ email, password }: SignInFormData) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail required')
            .email('Please enter a valid email'),
          password: Yup.string().required('Password required'),
        })

        await schema.validate(
          { email, password },
          {
            abortEarly: false,
          },
        )

        await signIn({ email, password })
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error)
          formRef.current?.setErrors(errors)
          return
        }
        Alert.alert(
          'Authentication error',
          'An error occurred when trying to login.',
        )
      }
    },
    [signIn],
  )

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

            <Form ref={formRef} onSubmit={handleSignIn}>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus()
                }}
              />
              <Input
                ref={passwordInputRef}
                secureTextEntry
                name="password"
                icon="lock"
                placeholder="Password"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />

              <Button onPress={() => formRef.current?.submitForm()}>
                Sign in
              </Button>
            </Form>

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
