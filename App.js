import React, { Component } from 'react';
import {Root} from "native-base";
import { Text, View, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
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
  
    Home: { 
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon
            name={'home'}
            size={20}
            style={{ color: tintColor }}
          />
        )
      }
    },
    
    Favorite: { 
      screen: FavoriteScreen,
      navigationOptions: { 
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon
            name={'heart'}
            size={20}
            style={{ color: tintColor }}
          />
        )
      }
    },

    Workouts: {
      screen: WorkoutsScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon
            name={'calendar-alt'}
            size={20}
            style={{ color: tintColor }}
          />
        )
      }
    },

    Progress: { 
    screen: ProgressScreen,
    navigationOptions: {
      tabBarIcon: ({ tintColor, focused }) => (
        <Icon
          name={'chart-line'}
          size={20}
          style={{ color: tintColor }}
        />
      )
    }
  },

},{
    initialRouteName: 'Home',
  },
);

const AppContainer = createAppContainer(createStackNavigator({
  bottomTabNavigator: bottomTabNavigator
  },{
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#121212",
        borderBottomWidth: 0
      },
      headerLeft: <Image
        source={ require('./Pages/TetraLogo.png') }
        style={{ flex: 1, height: 20, width: 98, marginLeft: 1, resizeMode: 'contain',}}
      />,
      headerRight: (
        <View style={{ flexDirection: 'row', marginRight: 10 }}>
          <TouchableOpacity style={{ paddingHorizontal: 15 }}>
            <Icon name='search' size={25} color={'#fff'} />
          </TouchableOpacity>
          <TouchableOpacity style={{ paddingHorizontal: 15 }}>
            <Icon name='user-circle' size={25} color={'#fff'} />
          </TouchableOpacity>
        </View>
      )
    }
  }
));