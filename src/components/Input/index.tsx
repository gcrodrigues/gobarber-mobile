import React, {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useCallback,
} from 'react'
import { TextInputProps } from 'react-native'
import { useField } from '@unform/core'

import * as S from './styles'

interface InputProps extends TextInputProps {
  name: string
  icon: string
}

interface InputValueReference {
  value: string
}

interface InputRef {
  focus(): void
}

const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = (
  { name, icon, ...rest },
  ref,
) => {
  const inputElementRef = useRef<any>(null)
  const { registerField, defaultValue = '', fieldName, error } = useField(name)
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue })

  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)

  const handleInputFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  const handleInputBlur = useCallback(() => {
    setIsFocused(false)
    setIsFilled(!!inputValueRef.current.value)
  }, [])

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value: string) {
        inputValueRef.current.value = value
        inputElementRef.current.setNativeProps({ text: value })
      },
      clearValue() {
        inputValueRef.current.value = ''
        inputElementRef.current.clear()
      },
    })
  }, [registerField, fieldName])

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus()
    },
  }))

  return (
    <S.Container isErrored={!!error} isFocused={isFocused}>
      <S.Icon
        isErrored={!!error}
        isFilled={isFilled}
        isFocused={isFocused}
        name={icon}
      />
      <S.TextInput
        ref={inputElementRef}
        keyboardAppearance="dark"
        placeholderTextColor="#666360"
        defaultValue={defaultValue}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onChangeText={(value) => (inputValueRef.current.value = value)}
        {...rest}
      />
    </S.Container>
  )
}

export default forwardRef(Input)
