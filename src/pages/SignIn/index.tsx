import React from 'react'
import { Image } from 'react-native'

import * as S from './styles'

import logoImg from '../../assets/logo.png'

const SignIn: React.FC = () => {
  return (
    <S.Container>
      <Image source={logoImg} />
      <S.Title>Faça seu login</S.Title>
    </S.Container>
  )
}

export default SignIn