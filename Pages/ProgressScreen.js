// Progress Screen
import React, { Component } from 'react';
import { Image, Button, StyleSheet, Text, View, Input } from 'react-native';
import { getUserStat, addUserStat } from '../API.js';
import { globalEmail } from './LoginScreen'

export default class ProgressScreen extends Component {

  constructor(props){
    super(props);
    this.state = {
        isLoaded: false,
        data: [],
        stat: null,
        value: null,
    }
  }

  async addStatInfo(stat, name, value) {
    let response = await addUserStat(stat, name, value);
    
  }

  async getStatInfo(name) {

    try {
      
      let response = await getUserStat(name);  //Actual API Call
      let APIobj = response[0];
      this.setState({
        isLoaded: true,
        data: APIobj,
      })

      if (!response.ok) {
        throw Error(response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  }

  //Runs code when app loads
  componentDidMount() {
    this.getStatInfo(globalEmail);
    this.addStatInfo(stat, globalEmail, value);
  }

  render() {
    return (
      <View style={ styles.container }>
        <Text style={ styles.title }>Progress</Text>
        <Button onPress={ () => this.getStatInfo() } title="TEST"/>

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
});