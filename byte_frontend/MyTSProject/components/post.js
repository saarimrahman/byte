import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Post(props) {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
            <Image style={styles.image} source={{ uri: props.image_url }} />
            <Text style={styles.caption}>{props.caption}</Text>
            <View style={styles.title} >
                <TouchableOpacity onPress={() => {
                    navigation.push("Post", {
                        title: props.title, 
                        summary: props.long_summary,
                        source_url: props.source_url, 
                        image_url: props.image_url
                    });
                }}> 
                    <Text style={styles.button}>Read More</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => console.log("Share")}>
                    <Text style={styles.button}>Share</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => console.log("Favorite")}>
                    <Text style={styles.button}>Favorite</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => console.log(props.source_url)}>
                    <Text style={styles.button}>Source</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        marginVertical: 10,
        backgroundColor: "whitesmoke",
    },
    title: {
        height: 40, 
        flex: 1, 
        flexDirection: "row", 
        alignItems: 'center', 
        justifyContent: "space-between", 
        marginHorizontal: 10, 
        marginBottom: 10,
        fontSize: 20,
    },
    caption: {
        color: "black",
        fontWeight: '300',
        fontSize: 15,
        marginHorizontal: 10,
        marginBottom: 5,
    },
    image: {
        flex: 1,
        height: 150,
        alignItems: "center",
        justifyContent: 'center',
        margin: 5,
        backgroundColor: "rgb(220, 220, 220)"
    },
    button: {
        color: "blue",
        fontFamily: "Verdana",
        fontSize: 10,
        textAlign: "center",
    }
})

export default Post;