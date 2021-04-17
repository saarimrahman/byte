import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {
  SinglePostNavigationProp,
  SinglePostRouteProp,
} from '../utils/navigation-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props {
  navigation: SinglePostNavigationProp;
  route: SinglePostRouteProp;
}

function SinglePost(props: Props) {
  const {source, source_url, title, image_url, caption} = props.route.params;

  return (
    <View style={styles.container}>
      <View style={styles.sourceContainer}>
        {/* <Image
          style={styles.sourceLogo}
          source={{
            uri:
              'https://i.pinimg.com/originals/5e/af/20/5eaf20e1a08c73f59d40ab3ba5bffaae.png',
          }}
        /> */}
      </View>
      <Text style={styles.source}>{source}</Text>
      <Image style={styles.image} source={{uri: image_url}} />

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.source}>By Alice, Bob, Malory</Text>
      <Text style={styles.source}>April 14, 2021 at 11:26 a.m. PDT</Text>

      <Text style={styles.caption}>{caption}</Text>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => console.log('Favorite')}>
          <Icon name="favorite-outline" size={25} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('Share')}>
          <Icon name="ios-share" size={25} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log(source_url)}>
          <Icon name="link" size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
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
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    borderRadius: 5,
  },
  footer: {
    marginHorizontal: 10,
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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

export default SinglePost;
