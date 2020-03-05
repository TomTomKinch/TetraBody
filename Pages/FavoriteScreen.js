// Favorite Screen
import React, { Component } from 'react';
import { Image, Button, StyleSheet, Text, View, SafeAreaView, ScrollView, FlatList, TouchableHighlight } from 'react-native';
import { Auth } from 'aws-amplify';
import tetraAPI from '../API.js';
import { Video } from 'expo-av';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { userId } from "./HomeScreen";

//This is where we get info for the feed, the default feed just shows recent videos
export default class HomeScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
        isLoading: true,
        page: 0,   //Current amount of pages in the feed
        data: [],  //Array of video data
        
        
    }
  }

  async getFavorite(){
    var DATA = await tetraAPI.getFavoriteVideos(userId) 
    
      this.setState({ 
            isLoading: false,
            page: 0,
            dataPosts: DATA,
      }, function() {
      //Call a function to pull the initial records
        this.addItems(0);
      });
    
  
  }

  //Executes on page load
  componentDidMount() {
    this.getFavorite()
    //getSub()
  }
  //This handles when a user favorites a video. If favorited is 0 ( false ), change to 1 ( true )
  //If favorited is 1, change to 0
  //
  handleFavorite = item => {
    if(item.favorited == 0){
      tetraAPI.addUserVideoStat(1, 0, userId, item.videoID);
      tetraAPI.updateUserVideoFavorite(userId, item.videoID, 1);
      //UPDATE FIRST
      //if affected rows = 0, add stat 
      //otherwise dont add
      //if anon, dont allow favorite api call
    }
    else{
      tetraAPI.updateUserVideoFavorite(userId, item.videoID, 0);
      
    }
    this.setState({page: 0});
    this.setState({data: []});
    this.getFavorite();
  };
  //This handles when a user clicks on a video, update the view count of that video
  handleVideoClicked = item => {
    tetraAPI.tetraUpdatevideoPopularity(userId, item.videoID)
    this.props.navigation.navigate('VideoPlayer', { 
      videoData: item });
  };
  handleReload = () => {
    this.setState({page: 0});
    this.setState({data: []});
      this.getFavorite();
  };
  // This adds items from the feed
  addItems = (page) => {
    //Change the number 5 to change the number of new videos per page
    const newItems=[]
    for(var i = page * 5, il = i + 5; i < il && i < this.state.dataPosts.length; i++){
      newItems.push(this.state.dataPosts[i]);
    }

    this.setState({
      data: [...this.state.data, ...newItems]
    });
    
  }
  // This handles when we reach the end of the feed, and there's more to display
  handleScroll = () => {
    this.setState({
      page: this.state.page + 1
    }, () => {
      this.addItems(this.state.page);
    });
  }
  
  //An individual feed item
  renderItem = ({ item }) => {
    
    
    return (
      <SafeAreaView style={{flexDirection: 'row', height: 100, width: '98%', backgroundColor: '#1c1c1c', margin: 10
      , justifyContent: 'center', textAlign: 'center', borderRadius: 10
      }}>
        <View style={ styles.thumbnail }>
        <Video
            source={{ uri: item.videoID}}
            resizeMode="cover"
            style={{ width: "100%", height: "100%" }}
          />
        </View>
        <View style={ styles.videoTextArea}>
        <TouchableHighlight
          onPress={ () => this.handleVideoClicked(item) }
        >
          <Text style={ styles.videoTitle }>{item.videoName}</Text>
        </TouchableHighlight>
          
          <Text style={ styles.videoStat }>
            Uploader: {item.uploadUserName}{"\n"}
            Uploaded: {item.videoDateTime.split("T")[0]}{"\n"}
            Views: {item.views}                    Likes: {item.likes}
          </Text>
        <TouchableHighlight
          style={ styles.faveIcon }
          onPress={ () => this.handleFavorite(item) }
        >
             <Icon
              name={ item.favorited == 1 ? 'heartbeat' : 'heart'}
              size={25}
              style={ { 
                color: item.favorited == 1 ? "#00cccc" : "#FFFFFF",
                position: 'absolute',
                width: 25,
                bottom: 0,
                right: 5,
              } }
              /> 
        </TouchableHighlight>
         
          
        </View>
        
      </SafeAreaView>
  
    );
  }

  //Feed Area
  render() {
    return (
      <SafeAreaView style={ styles.container }> 

        <View style={ styles.sortArea }>  
          <TouchableHighlight
            //Reloading button
            style={ { 
              padding: 5,
              margin: 5,
              position: 'relative',
              width: '50%',
              backgroundColor: this.state.sort == "recent" ? "#00cccc" : "#FFFFFF",
              borderRadius: 10,
            } }
            onPress={ () => this.handleReload()}
          >
            <Text style={ styles.sortText }>Reload Favorites</Text>
          </TouchableHighlight>
          
        </View> 
        <FlatList
        style={{ width: '100%', marginRight: 10}}
        //IMPORTANT: The following line calls for the database
        data={this.state.data}
        extraData={this.state.data}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={this.renderItem}
        onEndReached={this.handleScroll}
        onEndThreshold={0}
        />
        
        
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4d4d4d',
  },
  title: {
    paddingTop: 45,
    fontSize: 32,
    textAlign: 'center',
    margin: 30,
    color: '#00cccc',
    marginTop: 65,
  },
  sortArea:{
    margin: 5,
    padding: 5,
    top: 20,
    width: '98%',
    alignSelf: "flex-start",
    flexDirection: "row",
    justifyContent: "center",
},
sortText:{
  textAlign: "center",
},
  item: {
    backgroundColor: '#333333',
    padding: 40,
    marginVertical: 8,
    marginHorizontal: 60,
  },
  scroll:{
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
    color: '#FFFFFF',
  },
  thumbnail:{
    flex: 30,
    flexDirection: 'row',
    margin: 10,
    backgroundColor: '#555555',
    textAlign: 'center',
    justifyContent: 'center',
  },
  
  videoTitle:{
    position: 'relative',
    top: 0,
    textAlign: 'center',
    fontSize: 20,
    color: '#00cccc',
    
  },
  videoDesc:{
    textAlign: 'left',
    color: '#555555',
  },
  videoStat:{
    position: 'absolute',
    bottom: 5,
    color: '#FFFFFF',
  },
  videoTextArea:{
    flex: 75,
    width: '90%',
    // justifyContent: 'center',
    textAlign: 'center',
  },
  faveIcon:{
    position: 'absolute',
    width: 25,
    bottom: 0,
    right: 5,
  },
  

  

});
