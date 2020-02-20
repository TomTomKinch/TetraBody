// Workouts Screen
import React, { Component } from 'react';
import { Image, Button, StyleSheet, Text, View, Dimensions } from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

var screenWidth = (window.innerWidth > 0) ? window.innerWidth : Dimensions.get('window').width;
var screenWidth2 = (window.innerWidth > 0) ? window.innerWidth : Dimensions.get('window').width;

export default class WorkoutsScreen extends Component {

    constructor(props){
      super(props);
      this.state = {
        events: '',
        selectedDate: ''
      }
    }

  render() {

    return (
      <View style={styles.main}>
            <View>
            <Calendar
                onDayPress={day => this.setState({ selectedDate: day.dateString })}
                markedDates={{
                            ...this.state.events,
                            [this.state.selectedDate]: {
                              ...this.state.events[this.state.selectedDate],
                              selected: true
                            }
                          }}
                  style={{
                    borderWidth: 1,
                    borderColor: 'gray',
                    height: 350
                  }}
                  // Specify theme properties to override specific styles for calendar parts. Default = {}
                  theme={{
                    //backgroundColor: '#ffffff',
                    calendarBackground: '#45C5C4',
                    textSectionTitleColor: 'black',
                    selectedDayBackgroundColor: '#008F80',
                    selectedDayTextColor: 'white',
                    todayTextColor: 'white',
                    dayTextColor: 'black',
                    textDisabledColor: 'transparent',
                    dotColor: '#00adf5',
                    selectedDotColor: '#45C5C4',
                    arrowColor: 'black',
                    //disabledArrowColor: '#d9e1e8',
                    monthTextColor: 'black',
                    indicatorColor: 'white',
                    textDayHeaderFontWeight: '300',
                    textDayFontSize: 16,
                    textMonthFontSize: 16,
                    textDayHeaderFontSize: 16
                  }}
              />
            </View>

            <View style={styles.infoMainHolder}>
               <View style={styles.infoHeader}><Text style={styles.imageText}>Info goes here</Text>
               </View>
            </View>
           
      </View>
    );
  }
}


const styles = StyleSheet.create({
  //Sets all text to this color by default
  main: {
    paddingTop: 55,
    flexDirection: 'column',
    flex: 1,
    backgroundColor: "#777777",
    justifyContent: 'space-between',
    color: "#FFFFFF",
  },
 
  //----------
  //This area spreads out the top and middle sections
  infoMainHolder: {
    flex: 30,
    //#008F80 Dark green
    backgroundColor: "#45C5C4",
    width: screenWidth-10,
    height: 100,
    alignItems: 'center',
    margin: 5,

  },
  infoHeader: {
    //#008F80 Dark green
    backgroundColor: "#008F80",
    width: screenWidth-10,
    height: 50,
    alignItems: 'center',
    margin: 0,
    justifyContent: 'center',
  },
 

  //----------
  //This area is the box on the bottom of the app
  bottomSection: {

    backgroundColor: "#000000",
    flexDirection: 'row',
    flex: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  
  },
  //Contains text and an image
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    textAlign: 'center',
    backgroundColor: "#000000",
    
  },
});