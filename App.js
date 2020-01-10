import React, { Component } from 'react';
import {Root} from "native-base";
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from './Pages/HomeScreen.js';
import LoginScreen from './Pages/LoginScreen.js';


/*  Page Stack for Page Navigation  */
// Different Navigation Screens
const AppPageNavigator = createStackNavigator({
    Home: { screen: HomeScreen },
    Login: { screen: LoginScreen },
  },
  {
     initialRouteName: 'Home', // Indicates which screen to navigate to first
  },
);

const AppContainer = createAppContainer(AppPageNavigator);

export default class App extends Component {
  render() {
    return (
      <Root>
        <AppContainer />
      </Root> 
    );
  }
}
