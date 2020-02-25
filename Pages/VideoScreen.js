// Video Screen
import React, { Component } from 'react';
import { Image, Button, StyleSheet, Text, View, SafeAreaView, ScrollView, FlatList, TouchableHighlight} from 'react-native';
import { Header } from 'react-native-elements';
import { Auth } from 'aws-amplify';
import tetraAPI from '../API.js';
import { Video } from 'expo-av';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { userId, getSub } from '../App'

export default class VideoScreen extends Component {

    constructor(props){
      super(props);
      this.state = {
          isLoading: true,
          
       }
    }

    render(){

      const {goBack} = this.props.navigation;

      return (
        <View style={styles.container}>
            <Header
                //headerTitle="header"
                containerStyle={styles.Header}
            >
                <TouchableHighlight onPress={() => goBack()} underlayColor="#00cccc" style={styles.highlight}>
                    <Icon // Go back to previous page
                        name={'chevron-circle-left'}
                        size={25}
                        color="white"
                    />
                </TouchableHighlight>
            </Header>

            <Video
                source={{ uri: 'https://file-examples.com/wp-content/uploads/2017/04/file_example_MP4_1280_10MG.mp4' }}
                shouldPlay
                useNativeControls
                style={{ width: "100%", height: "45%" }}
            />
        </View>
      );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: '#4d4d4d',
    },

      Header:{
      backgroundColor: 'black',
      alignItems: 'center',
      borderBottomWidth: 0,
    },

      buttonText: {
      justifyContent:'center',
      fontSize: 20,
      textAlign: 'center',
      color: 'white',
      paddingVertical: 5 
    },

      highlight:{
      paddingVertical: 8, 
      paddingHorizontal: 13, 
      width:54, height: 40, 
      borderRadius: 30
    },
  });