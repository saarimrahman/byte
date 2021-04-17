import React from 'react';
import 'react-native-gesture-handler';
import {useColorScheme} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './screens/login';
import Register from './screens/register';
import Feed from './screens/feed';
import InitialInfo from './screens/initial-info';
import SinglePost from './screens/single-post';
import {RootStackParamList} from './utils/navigation-types';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const scheme = useColorScheme();

  return (
    // TODO: figure out theming; see react native paper
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      {/* screenOptions={{headerShown: false}} */}
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          // options={{title: 'My home'}}
        />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen
          name="InitialInfo"
          component={InitialInfo}
          options={{title: 'Tell us about yourself'}}
        />
        <Stack.Screen name="Feed" component={Feed} />
        <Stack.Screen name="SinglePost" component={SinglePost} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });
