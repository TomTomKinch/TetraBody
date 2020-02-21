// Favorite Screen
import React, { Component } from 'react';
import { Image, Button, StyleSheet, Text, View, SafeAreaView, ScrollView, FlatList, TouchableHighlight } from 'react-native';
import { Auth } from 'aws-amplify';
import tetraAPI from '../API.js';
import { Video } from 'expo-av';
import Icon from 'react-native-vector-icons/FontAwesome5';

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

  async getRecent(){
    var DATA = await tetraAPI.getFavoriteVideos("erik") 
    
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
    this.getRecent()
  }
  

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
            onPress={ () => this.props.navigation.navigate('Login') }
            source={{ uri: item.videoID}}
            resizeMode="cover"
            style={{ width: "100%", height: "100%" }}
          />
        </View>
        <View style={ styles.videoTextArea}>
        <TouchableHighlight
          onPress={ () => this.props.navigation.navigate('Favorite') }
        >
          <Text style={ styles.videoTitle }>{item.videoName}</Text>
        </TouchableHighlight>
          <Text style={ styles.videoDesc }>{item.description}</Text>
          <Text style={ styles.videoStat }>
            Uploader: {item.videoAuthor}               Uploaded: {item.videoDate}{"\n"}
            Views: {item.videoViews}                    Likes: {item.videoLikes}
          </Text>
        <TouchableHighlight
          style={ styles.faveIcon }
          onPress={ () => this.props.navigation.navigate('Favorite') }
        >
             <Icon
              name={'heart'}
              size={25}
              style={ styles.faveIcon }
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
        <Text style={ styles.title }>Favorites for current user</Text>
        <FlatList
        style={{ width: '100%', marginRight: 10}}
        //IMPORTANT: The following line calls for the database
        data={this.state.data}
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
    color: '#FFFFFF',
  },

  

});
