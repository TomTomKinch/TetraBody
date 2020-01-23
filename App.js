import React, { Component } from 'react';
import {Root} from "native-base";
import { Button, View, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import SearchBar from 'react-native-searchbar';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen from './Pages/LoginScreen.js';
import HomeScreen from './Pages/HomeScreen.js';
import FavoriteScreen from './Pages/FavoriteScreen.js';
import WorkoutsScreen from './Pages/WorkoutsScreen.js';
import ProgressScreen from './Pages/ProgressScreen.js';

export default class App extends Component {
  render() {
    return (
      <Root>
        <AppContainer/>
      </Root> 
    );
  }
}

// Bottom navigation to go to Home, Favorite, Workouts, and Progress pages
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

}, {
  tabBarOptions: {
    activeTintColor: '#00cccc',
    inactiveTintColor: 'white',
    style: {
      backgroundColor: '#121212',
      borderTopWidth: 0,
      shadowOffset: { width: 5, height: 3 },
      shadowColor: 'black',
      shadowOpacity: 0.5,
      elevation: 5,
      paddingVertical: 5
    },
  }

},{
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(createStackNavigator({
  Login: LoginScreen,
  bottomTabNavigator: bottomTabNavigator
  },{
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#121212",
        shadowColor: 'black',
        shadowOpacity: 0.5,
        borderBottomWidth: 0
      },

      // Top left header contains TetraBody logo
      headerLeft: () => 
        <Image
          source={ require('./Pages/logo.png') }
            style={
            { 
              flex: 1,
              height: 20, 
              width: 100, 
              marginLeft: 10, 
              resizeMode: 'contain',
            }
          }
        />,
      
      // Top right header contains Search and Account buttons
      headerRight: () =>
        <View style={{ flexDirection: 'row', marginRight: 20 }}>
          <TouchableOpacity style={{ paddingHorizontal: 15 }}>
            <Icon name='search' size={25} color={'white'} onPress ={() => this.searchBar.show()}/>

              <SearchBar style={{}}
                ref={(ref) => this.searchBar = ref}
              />

          </TouchableOpacity>

          <TouchableOpacity style={{ paddingHorizontal: 15 }}>
            <Icon name='user-circle' size={25} color={'white'} />
          </TouchableOpacity>
        </View>

    }
  
  // App starts at the Login Page
  },{
    initialRouteName: 'Login',
  }

));