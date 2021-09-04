import styled, { css } from 'styled-components/native'
import FeatherIcon from 'react-native-vector-icons/Feather'

interface ContainerProps {
  isFocused: boolean
  isErrored: boolean
}
interface IconProps {
  isFocused: boolean
  isFilled: boolean
  isErrored: boolean
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: #232129;
  border-radius: 10px;
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;
  border-width: 2px;
  border-color: #232129;

  ${({ isErrored }) =>
    isErrored &&
    css`
      border-color: #c53030;
    `}

  ${({ isFocused }) =>
    isFocused &&
    css`
      border-color: #f29000;
    `}
`

export const TextInput = styled.TextInput`
  flex: 1;
  color: #fff;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
`

export const Icon = styled(FeatherIcon)<IconProps>`
  margin-right: 16px;
  color: #666360;
  font-size: 20px;

  ${({ isErrored }) =>
    isErrored &&
    css`
      color: #c53030;
    `}

  ${({ isFocused, isFilled }) =>
    (isFocused || isFilled) &&
    css`
      color: #f29000;
    `}
`
