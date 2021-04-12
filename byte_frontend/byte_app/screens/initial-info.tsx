import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {StackNavigationProp} from '@react-navigation/stack';

interface Props {
  navigation: StackNavigationProp<any>;
}

const InitialInfo = (props: Props) => {
  const [profession, setProfession] = useState();
  const [location, setLocation] = useState();
  const [industry, setIndustry] = useState();
  const [interest, setInterest] = useState();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tell Us About Yourself</Text>
      <Text style={styles.inputLabel}>Profession</Text>
      <Picker
        style={styles.inputBox}
        selectedValue={profession}
        onValueChange={(itemValue, _) => setProfession(itemValue)}>
        <Picker.Item label="doctor" value="doctor" />
        <Picker.Item label="sonographer" value="sonographer" />
      </Picker>
      <Text style={styles.inputLabel}>Location </Text>
      <Picker
        style={styles.inputBox}
        selectedValue={location}
        onValueChange={(itemValue, _) => setLocation(itemValue)}>
        <Picker.Item label="Bay Area" value="Bay Area" />
        <Picker.Item label="Sacramento" value="Sacramento" />
      </Picker>
      <Text style={styles.inputLabel}>Practice / Industry </Text>
      <Picker
        style={styles.inputBox}
        selectedValue={industry}
        onValueChange={(itemValue, _) => setIndustry(itemValue)}>
        <Picker.Item label="oncology" value="oncology" />
        <Picker.Item label="pharmacy" value="pharmacy" />
      </Picker>
      <Text style={styles.inputLabel}>Interest(s)</Text>
      <Picker
        style={styles.inputBox}
        selectedValue={interest}
        onValueChange={(itemValue, _) => setInterest(itemValue)}>
        <Picker.Item label="Interest 1" value="Interest 1" />
        <Picker.Item label="Interest 2" value="Interest 2" />
        <Picker.Item label="Interest 3" value="Interest 3" />
      </Picker>
      <Picker
        style={styles.inputBox}
        selectedValue={interest}
        onValueChange={(itemValue, _) => setInterest(itemValue)}>
        <Picker.Item label="Interest 1" value="Interest 1" />
        <Picker.Item label="Interest 2" value="Interest 2" />
        <Picker.Item label="Interest 3" value="Interest 3" />
      </Picker>
      <Picker
        style={styles.inputBox}
        selectedValue={interest}
        onValueChange={(itemValue, _) => setInterest(itemValue)}>
        <Picker.Item label="Interest 1" value="Interest 1" />
        <Picker.Item label="Interest 2" value="Interest 2" />
        <Picker.Item label="Interest 3" value="Interest 3" />
      </Picker>
      <TouchableOpacity onPress={() => props.navigation.navigate('Feed')}>
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
    fontSize: 20,
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
});

export default InitialInfo;
