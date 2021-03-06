import React from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import Routes from './routes'
import AppProvider from './hooks'

const App: React.FC = () => (
  <AppProvider>
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#312e38" />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Routes />
      </GestureHandlerRootView>
    </NavigationContainer>
  </AppProvider>
)

export default App
