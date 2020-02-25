// Progress Screen
import React, { Component } from 'react';
import { Button, StyleSheet, Text, View, Picker, ScrollView} from 'react-native';
import { Input } from 'react-native-elements';
import { tetraAPI } from '../API.js'
import { globalEmail } from './LoginScreen'
import Modal from "react-native-modal";

export default class ProgressScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoadaded: false,
      email: null,
      statList: [],
      stats: [],
      statNameList: [],
      statValueList: [],
      statDateList: [],
      statToChange: null,
      statPos: 0,
      statToChangeValue: null,
      isModalVisible: false,
    }
  } 

  //Calls API to get Current User Stats
  async getUserStatsSnapshot(name) {
    let response = await tetraAPI.getUserStatSnapshot(name);  //API Call
    console.log(response);
    var statNameList = [];
    var statValueList = [];
    var statDateList = [];
    response.map((s) => {
      let name = s.statName;
      let value = s.statValue;
      let date = s.statDate;
      statNameList.push(name);
      statValueList.push(value);
      statDateList.push(date);
    });
    let email = globalEmail; //Set on LoginScreen.js
    this.setState({
      isLoaded: true,
      email: email,
      statNameList: statNameList,
      statValueList: statValueList,
      statDateList: statDateList,
    });
  }

  // Calls API to get available stats (for Add Stat DropDown)
  async getStatList() {
    let response = await tetraAPI.getStatList();  //API Call
    var statTable = [];
    response.map((s) => {
      let val = s.statName;
      statTable.push(val);
    });
    this.setState({
      isLoaded: true,
      statList: statTable,
    })
  }

  //Sets State to Change a stat
  changeStat(statName, statPos) {
    //console.log(statName);
    this.setState({
      statPos: statPos,
      statToChange: statName
    });
  }

  //Calls API to update a stat
  async updateStat() {
    console.log(this.state.statToChange);
    console.log(this.state.statToChangeValue);
    if(this.state.statToChange != null && this.state.statToChangeValue != null){
      await tetraAPI.addUserStat(this.state.statToChange, 'erik', this.state.statToChangeValue); //Add Stat
      await this.getUserStatsSnapshot('erik');
      this.forceUpdate();
      console.log('Updated Stat');
    }
    else{
      console.log("Didnt ADD");
    }
  }

  //Runs code when app loads
  async componentDidMount() {
    await this.getUserStatsSnapshot('erik'); //change to globalEmail
    console.log("----------------");
    await this.getStatList();
  }

  render() {
    return (
      <View style={ styles.container }>
        <ScrollView>
        <Text style={ styles.title }>Progress</Text>
        <Text style = {styles.text}> Stats : </Text>
        <View style= { styles.addStatInput }>
          <Text>Add Stat</Text>
          <Picker 
            mode="dropdown" 
            style={{height: 30, width: 280}}
            selectedValue = {this.state.statPos}
            onValueChange={(statPos) => {
              var statName = this.state.statList[statPos];
              this.changeStat(statName, statPos);
            }}
          >
            <Picker.Item label='Add a Stat' value='0'/>
            {this.state.statList.map((item, index) => {
              return ( <Picker.Item label = {item} value={index} />);
            })}
          </Picker>
          <Input placeholder = 'Value' onChangeText={ (value) => this.setState({ statToChangeValue: value })}></Input>
          <Button title = 'Update' onPress={ () => this.updateStat() }/>
        </View>
        {Object.keys(this.state.statNameList).map((key) => {  
          return <Text 
          style={ styles.input }
          onPress={ () => {
            console.log(this.state.statNameList[key]);
            this.setState({ isModalVisible: true });
          }}
          > {this.state.statNameList[key]}: {this.state.statValueList[key]}</Text>
        })}
          <View>
            <Modal isVisible={this.state.isModalVisible}
              onBackdropPress={() => this.setState({ isModalVisible: false })}
            >
              <View style={{ flex: 1 }}>
                <Text style={styles.input}>I am the modal content!</Text>
              </View>
            </Modal>
          </View>
        </ScrollView>
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
  text: {
    fontSize: 20,
    backgroundColor: 'grey',
    margin: 10,
    color: '#00cccc',
  },
  addStatInput: {
    width:"85%",
    backgroundColor:"#c7ffe3",
    borderRadius:25,
    height:200,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  input: {
    width:"85%",
    backgroundColor:"#c7ffe3",
    borderRadius:25,
    height:75,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
});