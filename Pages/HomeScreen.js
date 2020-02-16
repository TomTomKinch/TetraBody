// Home Screen
import React, { Component } from 'react';
import { Image, Button, StyleSheet, Text, View, SafeAreaView, ScrollView, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

//Placeholder data to put into the scrolling feed once the database ready for integration
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Video Title',
    desc: 'This is the description of the first video, lets test the length of the box! YEAH',
    views: '200',
    faves: '100',
    icon: 'flight-takeoff'
  },
  {
    id: 'a',
    title: 'Second Item',
    desc: 'Second Desc',
    icon: 'flight-takeoff',
    views: '200',
    faves: '100',
  },
  
];





export default class HomeScreen extends Component {
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
          <Text style={ styles.videoTitle }>{item.title}</Text>
          <Text style={ styles.videoDesc }>{item.desc}</Text>
          <Text style={ styles.videoStat }>Views: {item.views} Faves: {item.faves}</Text>
          
        </View>
        
      </SafeAreaView>
  
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={ styles.title }>TetraBody</Text>

        <FlatList
        style={{ width: '100%', marginRight: 10}}
        data={DATA}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={this.renderItem}
        />
        
        
      
        
        <Button style = { styles.button } onPress={ () => this.props.navigation.navigate('Login') } title="Sign Out"/>
      </View>
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
