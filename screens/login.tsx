import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {LoginNavigationProp} from '../utils/navigation-types';

interface Props {
  navigation: LoginNavigationProp;
}

const Login = (props: Props) => {
  const [email, setEmail] = useState('saarimrahman@berkeley.edu');
  const [password, setPassword] = useState('password');
  const [secureText, setSecureText] = useState(true);

  const toggleShowPassword = () => {
    setSecureText(!secureText);
  };

  const logInPressed = () => {
    console.log('login pressed');
    props.navigation.navigate('Feed');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MedByte</Text>

      <Text style={styles.inputLabel}>Email</Text>
      <TextInput
        style={styles.inputBox}
        onChangeText={setEmail}
        value={email}
        autoCapitalize="none"
      />

      <View style={styles.showPassword}>
        <Text style={styles.inputLabel}>Password</Text>
        <TouchableOpacity onPress={() => toggleShowPassword()}>
          <Text style={styles.toggleText}>Show Password</Text>
          {/* <Icon name={iconName} style={[styles.toggletext]} /> */}
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.inputBox}
        secureTextEntry={secureText}
        onChangeText={setPassword}
        value={password}
      />

      <TouchableOpacity onPress={() => logInPressed()}>
        <Text style={styles.loginButton}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => props.navigation.navigate('Register')}>
        <Text style={styles.signUpButton}>Create New Account</Text>
      </TouchableOpacity>

      <Text style={styles.forgotPassword}>Forgot password?</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    // color: 'black',
    fontFamily: 'Verdana',
    fontSize: 45,
    margin: 10,
    paddingLeft: 20,
    paddingTop: 40,
    textAlign: 'center',
    // fontStyle: 'italic',
  },
  inputLabel: {
    fontFamily: 'Verdana',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 5,
    marginHorizontal: 30,
  },
  toggletext: {
    fontSize: 30,
    marginTop: 5,
    marginHorizontal: 35,
  },
  inputBox: {
    fontSize: 15,
    fontWeight: '100',
    backgroundColor: 'white',
    marginHorizontal: 30,
    // borderColor: 'silver',
    borderRadius: 5,
    borderWidth: 0.2,
    paddingLeft: 10,
    paddingVertical: 7,
  },
  loginButton: {
    color: 'white',
    fontFamily: 'Verdana',
    marginTop: 20,
    padding: 10,
    fontSize: 20,
    fontWeight: '200',
    textAlign: 'center',
    marginHorizontal: 40,
    borderColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: 'blue',
  },
  signUpButton: {
    color: 'white',
    fontFamily: 'Verdana',
    marginTop: 20,
    padding: 10,
    fontSize: 20,
    fontWeight: '200',
    textAlign: 'center',
    marginHorizontal: 40,
    borderColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: 'green',
  },
  forgotPassword: {
    color: 'blue',
    fontFamily: 'Verdana',
    marginTop: 20,
    padding: 10,
    fontSize: 10,
    fontWeight: '200',
    textAlign: 'center',
    marginHorizontal: 40,
  },
  showPassword: {
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 45,
  },
  toggleText: {
    paddingTop: 5,
    paddingRight: 30,
    color: 'blue',
  },
});

export default Login;
