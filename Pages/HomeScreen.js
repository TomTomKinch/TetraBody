// Home Screen
import React, { Component } from 'react';
import { Image, Button, StyleSheet, Text, View, SafeAreaView, ScrollView, FlatList } from 'react-native';
import { Auth } from 'aws-amplify';
import tetraAPI from '../API.js';
import Icon from 'react-native-vector-icons/FontAwesome5';

//This is where we get info for the feed, the default feed just shows recent videos





export default class HomeScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
        data: [],
    }
  }

  async getRecent(){
    var DATA = await tetraAPI.getRecentVideos() 
        this.setState({ 
            data: DATA,
        })
  }
  componentDidMount() {
    this.getRecent()
  }
  // This eventually belongs in the drawer navigation in App.js
  handleSignOut = () => {
    Auth.signOut()
      .then(() => this.props.navigation.navigate('Login'))
      .catch(err => console.log(err));
  }
  
  //An individual feed item
  renderItem = ({ item }) => {
    return (
      //Placeholder for a video to select
      <SafeAreaView style={{flexDirection: 'row', height: 100, width: '98%', backgroundColor: '#1c1c1c', margin: 10
      , justifyContent: 'center', textAlign: 'center', borderRadius: 10
      }}>
        <View style={ styles.thumbnail }>
          <Icon
            name={'tv'}
            size={50}
            style={{color: '#FFFFFF', top: 15}}
          />
        </View>
        <View style={ styles.videoTextArea}>
          <Text style={ styles.videoTitle }>{item.videoName}</Text>
          <Text style={ styles.videoDesc }>{item.description}</Text>
          {/*<Text style={ styles.videoStat }>Views: {item.views} Faves: {item.faves}</Text>*/}
          
        </View>
        
      </SafeAreaView>
  
    );
  }

  //Feed Area
  render() {
    return (
      <SafeAreaView style={ styles.container }>
        <Text style={ styles.title }>TetraBody - Video Feed</Text>
        <FlatList
        style={{ width: '100%', marginRight: 10}}
        //IMPORTANT: The following line calls for the database
        data={this.state.data}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.videoID}
        renderItem={this.renderItem}
        />
        
        <Button style = { styles.button } onPress={ this.handleSignOut } title="Sign Out"/>
        {/* <Button style = { styles.button } onPress={ () => this.props.navigation.navigate('Login') } title="Login"/> */}
        {/* <Button style = { styles.button } onPress={ () => this.props.navigation.navigate('Profile') } title="Profile"/> */}
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
    //overflow-y: scroll,
  },
  thumbnail:{
    flex: 25,
    flexDirection: 'row',
    margin: 10,
    backgroundColor: '#111111',
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
    position: 'relative',
    bottom: 5,
    textAlign: 'left',
    color: '#777777',
  },
  videoTextArea:{
    flex: 75,
    width: '90%',
    justifyContent: 'center',
    textAlign: 'center',
  }
  

});
