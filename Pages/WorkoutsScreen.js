// Workouts Screen
import React, { Component } from 'react';
import { Image, Button, StyleSheet, Text, View, Dimensions } from 'react-native';

export default class WorkoutsScreen extends Component {
  render() {
    return (
      <View style={styles.main}>
            <View style={styles.monthHeader}><Text style={styles.imageText}>January</Text></View>
            <View style={styles.daysHeaderHolder}>
              <View style={styles.daysHeader}><Text style={styles.imageText}>Sun</Text></View>
              <View style={styles.daysHeader}><Text style={styles.imageText}>Mon</Text></View>
              <View style={styles.daysHeader}><Text style={styles.imageText}>Tues</Text></View>
              <View style={styles.daysHeader}><Text style={styles.imageText}>Wed</Text></View>
              <View style={styles.daysHeader}><Text style={styles.imageText}>Thurs</Text></View>
              <View style={styles.daysHeader}><Text style={styles.imageText}>Fri</Text></View>
              <View style={styles.daysHeader}><Text style={styles.imageText}>Sat</Text></View>
            </View>
            <View style={styles.daysMainHolder}>
              <View style={styles.weeksHolder}>
                <View style={styles.weekendsCell}><Text style={styles.calendarText}>1</Text></View>
                <View style={styles.daysCell}><Text style={styles.calendarText}>2</Text></View>
                <View style={styles.daysCell}><Text style={styles.calendarText}>3</Text></View>
                <View style={styles.daysCell}><Text style={styles.calendarText}>4</Text></View>
                <View style={styles.daysCell}><Text style={styles.calendarText}>5</Text></View>
                <View style={styles.daysCell}><Text style={styles.calendarText}>6</Text></View>
                <View style={styles.weekendsCell}><Text style={styles.calendarText}>7</Text></View>
              </View>

              <View style={styles.weeksHolder}>
                <View style={styles.weekendsCell}><Text style={styles.calendarText}>8</Text></View>
                <View style={styles.daysCell}><Text style={styles.calendarText}>9</Text></View>
                <View style={styles.daysCell}><Text style={styles.calendarText}>10</Text></View>
                <View style={styles.daysCell}><Text style={styles.calendarText}>11</Text></View>
                <View style={styles.daysCell}><Text style={styles.calendarText}>12</Text></View>
                <View style={styles.daysCell}><Text style={styles.calendarText}>13</Text></View>
                <View style={styles.weekendsCell}><Text style={styles.calendarText}>14</Text></View>
              </View>

              <View style={styles.weeksHolder}>
                <View style={styles.weekendsCell}><Text style={styles.calendarText}>15</Text></View>
                <View style={styles.daysCell}><Text style={styles.calendarText}>16</Text></View>
                <View style={styles.daysCell}><Text style={styles.calendarText}>17</Text></View>
                <View style={styles.daysCell}><Text style={styles.calendarText}>18</Text></View>
                <View style={styles.daysCell}><Text style={styles.calendarText}>19</Text></View>
                <View style={styles.daysCell}><Text style={styles.calendarText}>20</Text></View>
                <View style={styles.weekendsCell}><Text style={styles.calendarText}>21</Text></View>
              </View>

              <View style={styles.weeksHolder}>
                <View style={styles.weekendsCell}><Text style={styles.calendarText}>22</Text></View>
                <View style={styles.daysCell}><Text style={styles.calendarText}>23</Text></View>
                <View style={styles.daysCell}><Text style={styles.calendarText}>24</Text></View>
                <View style={styles.daysCell}><Text style={styles.calendarText}>25</Text></View>
                <View style={styles.daysCell}><Text style={styles.calendarText}>26</Text></View>
                <View style={styles.daysCell}><Text style={styles.calendarText}>27</Text></View>
                <View style={styles.weekendsCell}><Text style={styles.calendarText}>28</Text></View>
              </View>

              <View style={styles.weeksHolder}>
                <View style={styles.weekendsCell}><Text style={styles.calendarText}>29</Text></View>
                <View style={styles.daysCell}><Text style={styles.calendarText}>30</Text></View>
                <View style={styles.daysCell}><Text style={styles.calendarText}>31</Text></View>
                <View style={styles.daysCell}><Text style={styles.calendarText}></Text></View>
                <View style={styles.daysCell}><Text style={styles.calendarText}></Text></View>
                <View style={styles.daysCell}><Text style={styles.calendarText}></Text></View>
                <View style={styles.weekendsCell}><Text style={styles.calendarText}></Text></View>
              </View>
            </View>
            <View style={styles.infoMainHolder}>
               <View style={styles.infoHeader}><Text style={styles.imageText}>Info goes here</Text>
               </View>
               <Text style={styles.imageText}>Day Detail</Text>
            </View>
           
      </View>
    );
  }
}

var screenWidth = (window.innerWidth > 0) ? window.innerWidth : Dimensions.get('window').width;
var screenWidth2 = (window.innerWidth > 0) ? window.innerWidth : Dimensions.get('window').width;

const styles = StyleSheet.create({
  //Sets all text to this color by default
  main: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: "#777777",
    justifyContent: 'space-between',
    color: "#FFFFFF",
  },
  //This area is the box on the top of the app
  monthHeader: {
    backgroundColor: "#008F80",
    flexDirection: 'row',
    flex: 10,
    margin: 5,
    width: screenWidth-10,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  //Icons that appear in the top of the overlay
  daysHeaderHolder: {
    flex: 3,
    flexDirection: 'row',
    //backgroundColor: "#FF8F80",
    width: screenWidth-10,
    height: 10,
    margin: 5,
    justifyContent: 'space-between',
  },
  daysHeader: {
    flex: 7,
    backgroundColor: "#008F80",
    width: 100,
    height: 20,
    margin: 2,
    
  },
  daysMainHolder: {
    flexDirection: 'column',
    flex: 50,
    height: 50,
    width: screenWidth-10,
    margin: 5,
    justifyContent: 'space-evenly',
    backgroundColor: "#008F80",
    
  },
  daysCell: {

    flex: 7,
    height: 50,
    width: 150,
    backgroundColor: "#FFFFFF",
    margin: 2,
  },
  weekendsCell: {

    flex: 7,
    height: 50,
    width: 150,
    backgroundColor: "#45C5C4",
    margin: 2,
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
  //Container to have video info
  weeksHolder:{
    flexDirection: 'row',
    width: screenWidth-10,
    textAlign: 'center',
    backgroundColor: "#666666",
    justifyContent: 'space-between',
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
  imageText: {
    margin: 0,
    marginTop: 0,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: "#FFFFFF",
  },
  calendarText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: "#000000",
  },
  //Icons that appear in the bottom of the overlay
  bottomIcons: {
    height: 50,
    width: 50,
  },
});