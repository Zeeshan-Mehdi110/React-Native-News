import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import NewsOverView from '../screens/NewsOverView';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Saved from '../screens/Saved';
import Home from '../screens/Home';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const HomeScreen = () => {
    return (
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
          options={{
            tabBarIcon(props) {
              return (
                <Icon
                  name={props.focused ? 'home-circle' : 'home-circle-outline'}
                  {...props}
                />
              );
            }
          }}
          name="Home"
          component={Home}
        />
        <Tab.Screen
          options={{
            tabBarIcon(props) {
              return (
                <Icon
                  name={
                    props.focused
                      ? 'content-save-all'
                      : 'content-save-all-outline'
                  }
                  {...props}
                />
              );
            }
          }}
          name="Saved"
          component={Saved}
        />
      </Tab.Navigator>
    );
  };

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
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
