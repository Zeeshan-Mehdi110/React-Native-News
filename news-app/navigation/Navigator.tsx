import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StyleSheet, Text, View } from 'react-native'
import NewsOverView from '../components/NewsOverView'

const Stack = createNativeStackNavigator()

const AppNavigator = () => {
  const Home = () => {
    return (
      <View>
        <Text>Home</Text>
      </View>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={Home} />
        <Stack.Screen name="NewsOverView" component={NewsOverView} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigator

const styles = StyleSheet.create({})
