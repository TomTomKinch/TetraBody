import React, { Component, useRef } from 'react';
import {Root} from "native-base";
import { View, Image, TouchableOpacity, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import SearchHeader from 'react-native-search-header';
import HomeScreen from './Pages/HomeScreen.js';
import LoginScreen from './Pages/LoginScreen.js';
import FavoriteScreen from './Pages/FavoriteScreen.js';
import WorkoutsScreen from './Pages/WorkoutsScreen.js';
import ProgressScreen from './Pages/ProgressScreen.js';

const DEVICE_WIDTH = Dimensions.get(`window`).width;

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
const bottomTabNavigator = createBottomTabNavigator({
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
  tabBarOptions: {
    activeTintColor: '#00cccc',
    inactiveTintColor: 'white',
    style: {
      backgroundColor: 'black',
      borderTopWidth: 0,
      shadowOffset: { width: 5, height: 3 },
      shadowColor: 'black',
      shadowOpacity: 0.5,
      elevation: 5,
      paddingVertical: 5
    },
  }

},{
   initialRouteName: 'Login',
});

const AppContainer = createAppContainer(createStackNavigator({
  Login: { 
    screen: LoginScreen,
    navigationOptions: {
      headerShown: false,
    } 
  },

  bottomTabNavigator: bottomTabNavigator
  
  },{
  defaultNavigationOptions: {
    headerTitle: () => null,
      headerStyle: { 
        height: 56,
        backgroundColor: 'black',
        shadowColor: 'black',
        shadowOpacity: 0.5,
        borderBottomWidth: 0
      },

    headerLeft: () => {

    },

    // Right header contains logo, search button, and account button
    headerRight: () => {

      const searchHeaderRef = React.createRef(null);
      return(
         <View style = {{
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: 'black'
         }}>
           <View style = {{ 
             flexDirection: 'row',
             justifyContent: 'flex-end',
             alignItems: 'center',
             width: DEVICE_WIDTH,
             height: 56,
             marginTop: 7,
             backgroundColor: 'black',
             shadowColor: 'black',
             shadowOpacity: 0.5,
             borderBottomWidth: 0 
            }}>

           <Image
              source={ require('./Pages/logo.png') }
              style={{ 
                flex: 1,
                flexDirection: 'row',
                height: 23, 
                width: 100, 
                marginRight: 190, 
                resizeMode: 'contain',
              }}
           />
              
              <TouchableOpacity style={{ paddingHorizontal: 15 }}>
                <Icon name='search' size={20} color={'white'} onPress = {() => searchHeaderRef.current.show()}/>
              </TouchableOpacity>

              <TouchableOpacity style={{ paddingHorizontal: 15 }}>
               <Icon name='user-circle' size={20} color={'white'}/>
              </TouchableOpacity>
           </View>

           <SearchHeader
                ref = { searchHeaderRef }
                placeholder = 'Search...'
                placeholderColor = 'gray'
                pinnedSuggestions = {[ `react-native-search-header`, `react-native`, `javascript` ]}
                onClear = {() => {
                    console.log(`Clearing input!`);
                }}
                onGetAutocompletions = {async (text) => {
                    if (text) {
                        const response = await fetch(`http://suggestqueries.google.com/complete/search?client=firefox&q=${text}`, {
                            method: `get`
                        });
                        const data = await response.json();
                        return data[1];
                    } else {
                        return [];
                    }
                }}
             />
        </View>
        );
      }
    }
  }
));