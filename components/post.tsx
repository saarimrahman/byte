import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props {
  title: string;
  image_url: string;
  caption: string;
  long_summary: string;
  source_url: string;
  source: string;
}

const Post = (props: Props) => {
  const navigation = useNavigation<StackNavigationProp<any>>();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.push('SinglePost', {
            title: props.title,
            caption: props.long_summary,
            source_url: props.source_url,
            image_url: props.image_url,
            source: props.source,
          });
        }}>
        <View style={styles.sourceContainer}>
          {/* <Image
          style={styles.sourceLogo}
          source={{
            uri:
              'https://i.pinimg.com/originals/5e/af/20/5eaf20e1a08c73f59d40ab3ba5bffaae.png',
          }}
        /> */}
        </View>
        <Image style={styles.image} source={{uri: props.image_url}} />

        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.source}>{props.source}</Text>

        <Text style={styles.caption}>{props.caption}</Text>
        <View style={styles.footer}>
          <Text style={styles.source}>2 hours ago</Text>
          <TouchableOpacity onPress={() => console.log('Favorite')}>
            <Icon name="favorite-outline" size={25} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Share')}>
            <Icon name="ios-share" size={25} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log(props.source_url)}>
            <Icon name="link" size={25} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginVertical: 10,
    marginHorizontal: 5,
    borderColor: 'grey',
    borderRadius: 10,
    borderWidth: 0.5,
  },
  title: {
    // height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    // marginBottom: 1,
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  caption: {
    color: 'black',
    fontWeight: '300',
    fontSize: 12,
    marginHorizontal: 10,
    marginBottom: 5,
  },
  image: {
    flex: 1,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    borderRadius: 5,
  },
  footer: {
    // color: 'blue',
    // fontFamily: 'Verdana',
    // fontSize: 10,
    // textAlign: 'center',
    marginHorizontal: 10,
    marginBottom: 5,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingLeft: 250,
  },
  sourceContainer: {
    flexDirection: 'row',
  },
  source: {
    fontSize: 10,
    color: 'grey',
    paddingLeft: 10,

    // marginHorizontal: 10,
  },
  sourceLogo: {
    // flex: 1,
    height: 'auto',
    width: 'auto',
    paddingLeft: 50,
  },
});

export default Post;
