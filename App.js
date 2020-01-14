import React, { Component } from 'react';
import {Root} from "native-base";
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from './Pages/HomeScreen.js';
import LoginScreen from './Pages/LoginScreen.js';
import FavoriteScreen from './Pages/FavoriteScreen.js';
import WorkoutsScreen from './Pages/WorkoutsScreen.js';
import ProgressScreen from './Pages/ProgressScreen.js';

export default class App extends Component {
  render() {
    return (
      <Root>
        <AppContainer />
      </Root> 
    );
  }
}

const bottomTabNavigator = createBottomTabNavigator(
  {
    Home: { screen: HomeScreen },
    Login: { screen: LoginScreen },
    Favorite: { screen: FavoriteScreen },
    Workouts: { screen: WorkoutsScreen },
    Progress: { screen: ProgressScreen },
  },
  {
    initialRouteName: 'Home',
  },
);

const AppContainer = createAppContainer(bottomTabNavigator);