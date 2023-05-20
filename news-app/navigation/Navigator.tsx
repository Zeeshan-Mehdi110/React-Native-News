import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StyleSheet, Text, View } from 'react-native'
import NewsOverView from '../screens/NewsOverView'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Saved from '../screens/Saved'
import Home from '../screens/Home'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const AppNavigator = () => {
  const HomeScreen = () => {
    return (
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Saved" component={Saved} />
      </Tab.Navigator>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="HomeScreen"
          component={HomeScreen}
        />
        <Stack.Screen name="NewsOverView" component={NewsOverView} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator

const styles = StyleSheet.create({})
