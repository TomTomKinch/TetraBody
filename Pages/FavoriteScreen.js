// Favorite Screen
import React, { Component } from 'react';
import { Image, Button, StyleSheet, Text, View } from 'react-native';

export default class FavoriteScreen extends Component {
  render() {
    return (
      <View style={ styles.container }>
        <Text style={ styles.title }>Favorite</Text>
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