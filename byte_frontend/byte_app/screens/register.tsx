import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {RegisterNavigationProp} from '../utils/navigation-types';

interface Props {
  navigation: RegisterNavigationProp;
}

const Register = (props: Props) => {
  const [email, setEmail] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const [dateOfBirth, setDateOfBirth] = useState<string>();
  const [secureText, setSecureText] = useState(true);

  const toggleShowPassword = () => {
    setSecureText(!secureText);
  };

  const register = () => {
    if (password === confirmPassword) {
      props.navigation.navigate('InitialInfo');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create your account</Text>

      <Text style={styles.inputLabel}>Email</Text>
      <TextInput
        style={styles.inputBox}
        onChangeText={setEmail}
        value={email}
        autoCapitalize="none"
      />

      <Text style={styles.inputLabel}>Username</Text>
      <TextInput
        style={styles.inputBox}
        onChangeText={setUsername}
        value={username}
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

      <Text style={styles.inputLabel}>Confirm Password</Text>
      <TextInput
        style={styles.inputBox}
        secureTextEntry={secureText}
        onChangeText={setConfirmPassword}
        value={confirmPassword}
      />

      <Text style={styles.inputLabel}>Date of birth</Text>
      <TextInput
        style={styles.inputBox}
        onChangeText={setDateOfBirth}
        value={dateOfBirth}
        autoCapitalize="none"
      />

      <TouchableOpacity onPress={() => register()}>
        <Text style={styles.button}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke',
  },
  title: {
    color: 'black',
    fontFamily: 'Verdana',
    fontSize: 45,
    margin: 10,
    paddingLeft: 20,
    paddingTop: 40,
    textAlign: 'center',
  },
  inputLabel: {
    fontFamily: 'Verdana',
    fontSize: 20,
    fontWeight: '100',
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
    borderColor: 'silver',
    borderRadius: 5,
    borderWidth: 0.2,
    paddingLeft: 10,
    paddingVertical: 7,
    marginTop: 5,
  },
  button: {
    color: 'white',
    fontFamily: 'Verdana',
    marginTop: 20,
    padding: 10,
    fontSize: 20,
    fontWeight: '200',
    textAlign: 'center',
    marginHorizontal: 40,
    borderColor: 'white',
    borderRadius: 1,
    borderWidth: 2,
    backgroundColor: 'blue',
  },
  showPassword: {
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 45,
  },
  toggleText: {
    paddingRight: 30,
    color: 'blue',
  },
});

export default Register;
