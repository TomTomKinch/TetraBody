// Video Screen
import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import { Header } from 'react-native-elements';
import { Video } from 'expo-av';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { tetraAPI } from '../API.js';
import { userId, getSub } from '../App';

export default class VideoScreen extends Component {

    constructor(props){
      super(props);
      this.state = {
          isLoading: true,
      }
    }
    
    //This handles when a user favorites a video. If favorited is 0 ( false ), change to 1 ( true )
    //If favorited is 1, change to 0
    handleFavorite = item => {
      if(item.favorited == 0){
        console.log("favorited");
        tetraAPI.updateUserVideoFavorite("erik", item.videoID, 1)
      }
      else{
        console.log("unfavorite");
        tetraAPI.updateUserVideoFavorite("erik", item.videoID, 0)
      }
    }

    render(){

      const {goBack} = this.props.navigation;
      //Save the variable from navigating here as a shorter alias
      var item = this.props.navigation.state.params.videoData;
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
              source={{ uri: item.videoID }}
              shouldPlay
              useNativeControls
              style={{ width: "100%", height: "45%" }}
            />
            <View style={ styles.videoText }>
            <TouchableHighlight
          style={ styles.faveIcon }
          onPress={ () => this.handleFavorite(item.favorited) }
        >
             <Icon
              name={ item.favorited == 1 ? 'heartbeat' : 'heart'}
              size={25}
              style={ { 
                color: item.favorited == 1 ? "#00cccc" : "#FFFFFF",
                position: 'absolute',
                width: 25,
                right: 5,
              } }
              /> 
        </TouchableHighlight>
              <Text style={ styles.videoTitle }>{item.videoName}</Text>
              
              <Text style={ styles.videoStat }>
                Views: {item.views}     Likes: {item.likes}{"\n"}
                Uploader: {item.videoUploadName}      Uploaded: {item.videoDateTime}
                
              </Text>
              <Text style={ styles.videoDesc }>{item.description}</Text>
            </View>

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

    videoText:{
      backgroundColor: "#333333",
      borderRadius: 5,
      margin: 10,
      padding: 10,
      width: '98%',
    },

    videoTitle: {
      textAlign: "left",
      fontSize: 20,
      color: "#00cccc",
      marginBottom: 10,
    },
    videoDesc: {
      textAlign: "left",
      color: "#555555"
    },
    videoStat: {
      bottom: 0,
      color: "#FFFFFF",
      marginBottom: 10,
    },
    faveIcon: {
      position: "absolute",
      width: 25,
      top: 10,
      right: 5,
    },
  });