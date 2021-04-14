import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {RegisterNavigationProp} from '../utils/navigation-types';

interface Props {
  navigation: RegisterNavigationProp;
}

const Register = (props: Props) => {
  const [email, setEmail] = useState<string>();
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const [dateOfBirth, setDateOfBirth] = useState<Date>(new Date());
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
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Join MedByte today</Text>
        <Text style={styles.inputLabel}>First and Last Name</Text>

        <View style={styles.names}>
          <View style={styles.container}>
            <TextInput
              style={styles.inputBox}
              onChangeText={setFirstName}
              value={firstName}
              autoCapitalize="none"
              placeholder="First name"
            />
          </View>
          <View style={styles.container}>
            <TextInput
              style={styles.inputBox}
              onChangeText={setLastName}
              value={lastName}
              autoCapitalize="none"
              placeholder="Last name"
            />
          </View>
        </View>

        <Text style={styles.inputLabel}>Username</Text>
        <TextInput
          style={styles.inputBox}
          onChangeText={setUsername}
          value={username}
          autoCapitalize="none"
          placeholder="Username"
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
          placeholder="Password"
        />

        <Text style={styles.inputLabel}>Confirm Password</Text>
        <TextInput
          style={styles.inputBox}
          secureTextEntry={secureText}
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          placeholder="Confirm Password"
        />

        <Text style={styles.inputLabel}>Date of Birth</Text>
        <DatePicker
          style={styles.datePicker}
          date={dateOfBirth}
          onDateChange={setDateOfBirth}
          mode="date"
        />

        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          style={styles.inputBox}
          onChangeText={setEmail}
          value={email}
          autoCapitalize="none"
          placeholder="Email"
        />

        <TouchableOpacity onPress={() => register()}>
          <Text style={styles.button}>Sign Up</Text>
        </TouchableOpacity>
        <Text style={styles.inputCaption}>
          By clicking Sign Up, you are indicating that you have read and
          acknowledge the Terms of Service and Privacy Notice.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  title: {
    color: 'black',
    fontFamily: 'Verdana',
    fontSize: 20,
    margin: 10,
    fontWeight: 'bold',
    paddingLeft: 20,
    textAlign: 'center',
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
    borderColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: 'green',
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
  inputCaption: {
    fontFamily: 'Verdana',
    fontSize: 10,
    fontWeight: '100',
    marginTop: 5,
    marginHorizontal: 30,
    textAlign: 'center',
  },
  names: {
    flexDirection: 'row',
  },
  datePicker: {
    backgroundColor: 'white',
    marginHorizontal: 40,
    borderRadius: 5,
    borderWidth: 1,
    marginTop: 5,
  },
});

export default Register;
