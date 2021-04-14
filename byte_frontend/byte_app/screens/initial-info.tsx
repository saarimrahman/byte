import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {InitialInfoNavigationProp} from '../utils/navigation-types';
import Tags from 'react-native-tags';

interface Props {
  navigation: InitialInfoNavigationProp;
}

const InitialInfo = (props: Props) => {
  const [profession, setProfession] = useState<string>();
  const [location, setLocation] = useState<string>();
  const [industry, setIndustry] = useState<string>();
  const [interests, setInterests] = useState<string[]>([]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tell Us About Yourself</Text>

      <Text style={styles.inputLabel}>Profession</Text>
      <TextInput
        style={styles.inputBox}
        onChangeText={setProfession}
        value={profession}
        placeholder="Profession"
      />

      <Text style={styles.inputLabel}>Location </Text>
      <TextInput
        style={styles.inputBox}
        onChangeText={setLocation}
        value={location}
        placeholder="Location"
      />

      <Text style={styles.inputLabel}>Area of Practice</Text>
      <TextInput
        style={styles.inputBox}
        onChangeText={setIndustry}
        value={industry}
        placeholder="Area of Practice"
      />

      <Text style={styles.inputLabel}>Interest(s)</Text>
      <Text style={styles.inputHelp}>
        Enter your interests below seperated by spaces.
      </Text>
      <Text style={styles.inputHelp}>Tap on an interest to remove it.</Text>

      <Tags
        textInputProps={{
          placeholder: 'Enter your interests here',
        }}
        initialTags={['COVID-19']}
        onChangeTags={setInterests}
        onTagPress={(index, tagLabel, event, deleted) =>
          console.log(
            index,
            tagLabel,
            event,
            deleted ? 'deleted' : 'not deleted',
          )
        }
        containerStyle={styles.tagContainer}
        inputStyle={styles.tagInput}
        renderTag={({tag, index, onPress, deleteTagOnPress, readonly}) => (
          <TouchableOpacity key={`${tag}-${index}`} onPress={onPress}>
            <Text style={styles.tag}>{tag}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity onPress={() => props.navigation.navigate('Feed')}>
        <Text style={styles.button}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: 'black',
    fontFamily: 'Verdana',
    fontSize: 20,
    margin: 10,
    paddingLeft: 20,
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
    borderRadius: 5,
    borderWidth: 0.2,
    paddingLeft: 10,
    paddingVertical: 7,
    marginTop: 5,
  },
  inputHelp: {
    fontSize: 10,
    color: 'grey',
    marginHorizontal: 30,
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
  tag: {
    color: 'white',
    fontFamily: 'Verdana',
    // marginTop: 20,
    padding: 5,
    fontSize: 15,
    fontWeight: '200',
    textAlign: 'center',
    // marginHorizontal: 40,
    borderColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: 'grey',
  },
  tagContainer: {
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  tagInput: {
    fontSize: 15,
    fontWeight: '100',
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 0.2,
    paddingLeft: 10,
    color: 'black',
  },
});

export default InitialInfo;
