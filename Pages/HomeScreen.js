// Home Screen
import React, { Component } from 'react';
import { Image, Button, StyleSheet, Text, View, SafeAreaView, ScrollView, FlatList } from 'react-native';
import { Auth } from 'aws-amplify';
import Icon from 'react-native-vector-icons/FontAwesome5';

//Placeholder data to put into the scrolling feed once the database ready for integration
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    desc: 'This is the description of the first video, lets test the length of the box!',
    icon: 'flight-takeoff'
  },
  {
    id: 'a',
    title: 'Second Item',
    desc: 'Second Desc',
    icon: 'flight-takeoff'
  },
  
];





export default class HomeScreen extends Component {
  // This eventually belongs in the drawer navigation in App.js
  handleSignOut = () => {
    Auth.signOut()
      .then(() => this.props.navigation.navigate('Login'))
      .catch(err => console.log(err));
  }
  
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
            style={{color: '#FFFFFF'}}
          />
        </View>
        <View style={ styles.videoTextArea}>
          <Text style={ styles.videoTitle }>{item.title}</Text>
          <Text style={ styles.videoDesc }>{item.desc}</Text>
        </View>
      </SafeAreaView>
  
    );
  }

  render() {
    return (
      <SafeAreaView style={ styles.container }>
        <Text style={ styles.title }>TetraBody - Video Feed</Text>
        <FlatList
        style={{ width: '100%', marginRight: 10}}
        data={DATA}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
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
    textAlign: 'center',
    fontSize: 20,
    color: '#555555',
  },
  videoDesc:{
    textAlign: 'center',
    color: '#555555',
  },
  videoTextArea:{
    flex: 75,
    width: '90%',
    justifyContent: 'center',
    textAlign: 'center',
  }

});
