// Home Screen
import React, { Component } from 'react';
import { Image, Button, StyleSheet, Text, View, SafeAreaView, ScrollView, FlatList } from 'react-native';

//Placeholder data to put into the scrolling feed once the database ready for integration
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '4',
    title: 'FOURTH Item',
  },
  {
    id: '5',
    title: 'Vth Item',
  },
];

//Placerholder for a video to select
function Item({ title }) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

export default class HomeScreen extends Component {
  render() {
    return (
<<<<<<< HEAD
      <SafeAreaView style={ styles.container }>
        <Text style={ styles.title }>TetraBody - Video Feed</Text>
        <FlatList
        data={DATA}
        renderItem={({ item }) => <Item title={item.title} />}
        keyExtractor={item => item.id}
        />
        
        <Button style = { styles.button } onPress={ () => this.props.navigation.navigate('Login') } title="Login"/>
      </SafeAreaView>
=======
      <View style={ styles.container }>
        <Text style={ styles.title }>TetraBody</Text>
        <Text style={ styles.title }>(Home Page)</Text>
        <Button style = { styles.button } onPress={ () => this.props.navigation.navigate('Login') } title="Sign Out"/>
      </View>
>>>>>>> origin/master
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#4d4d4d',
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    margin: 10,
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
  }

});
