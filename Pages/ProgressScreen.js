// Progress Screen
import React, { Component } from 'react';
import { Image, Button, StyleSheet, Text, View } from 'react-native';
import tetraAPI from '../API.js';

export default class ProgressScreen extends Component {
  render() {
    return (
      <View style={ styles.container }>
        <Text style={ styles.title }>Progress</Text>
        
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