// Progress Screen
import React, { Component } from 'react';
import { Image, Button, StyleSheet, Text, View } from 'react-native';
import { Input } from 'react-native-elements';
import { tetraAPI } from '../API.js'
import { globalEmail } from './LoginScreen'

export default class ProgressScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoadaded: false,
      email: null,
      stats: [],
      statsName: [],
      statsVal: [],
    }
  } 
  async getUserStats(name) {
    let response = await tetraAPI.getUserStatSnapshot(name);  //API Call
    let APIobj = response[0];
    console.log(APIobj);
    let email = globalEmail; //Set on LoginScreen.js
    this.setState({
      isLoaded: true,
      stats: APIobj,
      email: email,
    });
  }

  renderUserStats() {
    for (var key in this.state.stats) {
      if (this.state.stats.hasOwnProperty(key)) {
          console.log(key + " | " + this.state.stats[key]);
      }
    }
    console.log(this.state.stats);
  }
    //Runs code when app loads
  async componentDidMount() {
    await this.getUserStats('erik'); //change to globalEmail
    console.log("----------------");
    if(this.state.isLoaded == true){
      this.renderUserStats();
    }
  }

  render() {
    return (
      <View style={ styles.container }>
        <Text style={ styles.title }>Progress</Text>
        <Text style = {styles.text}> Stats : </Text>
        {Object.keys(this.state.stats).map((key) => {  
          return <Text> {this.state.stats[key]} </Text>
          // return <Input 
          //   label = {key}
          //   placeholder = {this.state.stats[key]}
          //   style = {styles.input}
          //   onChangeText = { (enteredText) => {
          //     console.log("enteredText: " + enteredText);
          //     this.setState( () => { 
          //       const updatedStatVal = Object.keys(this.state.stats).map((statName, check) => {
          //         if(enteredText === this.state.stats[statName]) {  //Check if enteredText equal to current value
          //           console.log("stat: " + this.state.stats[statName] + " is equal to " + enteredText);
          //           return this.state.stats[statName];
          //         }
          //         else {  //Else if enteredText is not equal
          //           console.log("stat: " + this.state.stats[statName] + " is not equal to " + enteredText);
          //           return enteredText;
          //        }
          //       });
          //     });
          //       //this.SetState({stats : updatedStats});
          //     // await tetraAPI.updateUserStat(key, '2/17', text, 'erik'); //Do this on an Update button
          //   }}
          // />
        })}
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
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
    color: '#00cccc',
  },
  text: {
    fontSize: 20,
    backgroundColor: 'grey',
    margin: 10,
    color: '#00cccc',
  },
  input: {
    width:"85%",
    backgroundColor:"#c7ffe3",
    borderRadius:25,
    height:75,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
});