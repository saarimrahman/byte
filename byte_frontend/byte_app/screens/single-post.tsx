import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList } from 'react-native';
import Post from '../components/post'

function SinglePost({ route, navigation }) {
    const { source_url, title, summary, image_url } = route.params;

    return (
        <Post caption={summary} title={title} image_url={image_url} source_url={source_url}/>
    );
}

export default SinglePost;