import React from 'react';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/login'
import InitialInfo from './components/initial-info'
import Feed from './components/feed'
import SinglePost from './components/single-post'
import Register from './components/register';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* screenOptions={{headerShown: false}} */}
      <Stack.Navigator >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Feed" component={Feed} />
        <Stack.Screen name="InitialInfo" component={InitialInfo} />
        <Stack.Screen name="Post" component={SinglePost} />

      </Stack.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
