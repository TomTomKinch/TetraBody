// Progress Screen
import React, { Component } from 'react';
import { Button, StyleSheet, Text, View, Picker, ScrollView, TextInput } from 'react-native';
import { Input } from 'react-native-elements';
import { tetraAPI } from '../API.js'
import { globalEmail } from './LoginScreen'
import Modal from "react-native-modal";
import PureChart from 'react-native-pure-chart';
import Icon from "react-native-vector-icons/FontAwesome5";
import { userId } from "./HomeScreen";

var USERNAME =userId;

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
      isAddStatVisible: false,
      statObj: "",
      statData: []
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
      await tetraAPI.addUserStat(this.state.statToChange, USERNAME, this.state.statToChangeValue); //Add Stat
      await this.getUserStatsSnapshot(USERNAME);
      this.forceUpdate();
      console.log('Updated Stat');
    }
    else{
      console.log("Didnt ADD");
    }
  }

  async getStatWrapper(userName, statToFind) {
    let response = await tetraAPI.getUserStat(userName, statToFind);
    //var testOutput = []
    //this.stateObj = JSON.stringify(response);
    let statOutput = ""
    let statDataTemp = []
    response.map((s) => {
      let name = s.statName;
      let value = s.statValue;
      let date = s.statDate;//.split("T")[0];
      statDataTemp.push({x: date.split("T")[0], y: value});
      //console.log(name);
      statOutput = statOutput + name + ": " + value + " " + date + "\n";
    });
    this.setState({statObj: statOutput});
    this.setState({statData: statDataTemp});
  }

  //Runs code when app loads
  async componentDidMount() {
    await this.getUserStatsSnapshot(USERNAME);
    console.log("----------------");
    await this.getStatList();
  }

  render() {
    return (
      <View style={ styles.container }>
        <ScrollView>
        {/*<Text style={ styles.title }>Progress</Text>*/}
        {/*<Text style = {styles.text}> Stats : </Text>*/}
        <Text></Text>
        <View style= { styles.addStatInput }>
        <Text>Click to add stat</Text>
        <Icon
                name={'plus-square'}
                size={100}
                style={{ 
                  
                }}
                onPress={ () => {
                  this.setState({ isAddStatVisible: true });
                }}
                />
          
        </View>
        {Object.keys(this.state.statNameList).map((key) => {  
          var statName = this.state.statNameList[key];
          var statVal = this.state.statValueList[key];
          return (
            <View style = { styles.input }>
              <Input 
                labelStyle = {{color: 'black'}}
                label = { statName + ' : ' + statVal }
                placeholder = 'Enter New Value'
                //{this.state.statValueList[key]}
                onChangeText = { async (newVal) => {
                  //Change FrontEnd
                  this.setState({ statToChangeValue: newVal });
                  var Name = this.state.statList[key];
                  this.changeStat(Name, key);
                  //Change Backend
                  tetraAPI.updateUserStat(this.state.statNameList[key], this.state.statDateList[key], newVal, USERNAME); //stat, date, value, name
                  await this.getUserStatsSnapshot(USERNAME);
                  this.forceUpdate();
                }}
              />              
              <Icon
                name={'chart-line'}
                size={50}
                style={{ 
                  alignContent: 'flex-end'
                }}
                onPress={ () => {
                  this.getStatWrapper(userId, this.state.statNameList[key]);
                  console.log(this.state.statNameList[key]);
                  this.setState({ isModalVisible: true });
                }}
              />
            </View>
          )
        })}
          <View>
            <Modal isVisible={this.state.isModalVisible}
             style={styles.input}
              onBackdropPress={() => this.setState({ isModalVisible: false })}
            >
              <View style={{ flex: 1 }}>
                <Text>{this.state.statObj.split(' ')[0]}</Text>
                
                <PureChart data={this.state.statData} type='line' height={250}/>
              </View>
            </Modal>
            <Modal isVisible={this.state.isAddStatVisible}
            style={styles.input}
            onBackdropPress={() => this.setState({ isAddStatVisible: false })}>
            <View style={{ flex: 1 }}>
            <Text>Add a Stat to Track</Text>
          <Picker 
            mode="dropdown" 
            style={{height: 30, width: '90%', minWidth: 250}}
            selectedValue = {this.state.statPos}
            onValueChange={(statPos) => {
              var statName = this.state.statList[statPos];
              this.changeStat(statName, statPos);
            }}
          >
            <Picker.Item label='Add a Stat to Track' value='0'/>
            {this.state.statList.map((item, index) => {
              return ( <Picker.Item label = {item} value={index} />);
            })}
          </Picker>
          <TextInput style={{height: '15%', minHeight: 40, minWidth: '90%', borderColor: 'black', borderWidth: 1, backgroundColor: '#457d7b', marginTop: 15, marginBottom: 15, padding: 5}} placeholder = 'Value' onChangeText={ (value) => this.setState({ statToChangeValue: value })}></TextInput>
          <Button color="black" title = 'Update' onPress={ () => this.updateStat() }/>
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
    paddingTop: 20,
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
    //width:250,
    backgroundColor:"#519c99",
    borderRadius:25,
    //height:200,
    marginBottom:20,
    justifyContent:"center",
    alignItems: 'center',
    padding:5
  },
  input: {
    fontSize: 30,
    width:"90%",
    maxHeight:"50%",
    minWidth:250,
    backgroundColor:"#519c99",
    borderRadius:25,
    //height:150,
    alignItems: 'center',
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
});