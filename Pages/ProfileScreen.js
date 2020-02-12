import React, { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { getUser } from '../API.js'
import tempJson from './temp.json'

export default class ProfileScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoaded: false,
            data: [],
            userName: null,
            dateCreated: null,
            accountType: null, 
        }
    }

    async getUserInfo(name) {
        let response = tempJson;    //Local Call
        //let response = await getUser('erik');  //Actual API Call
        let APIobj = response[0];
        let userName = APIobj.userName;
        let dateCreated = APIobj.dateCreated;
        let accountType = APIobj.accountType;
        this.setState({
            isLoaded: true,
            data: APIobj,
            userName: userName,
            dateCreated: dateCreated,
            accountType: accountType, 
        })
    }

    //Runs code when app loads
    componentDidMount() {
        this.getUserInfo('erik');    
    }

    render() {
        return (
            <View>
                <Button onPress={ () => this.props.navigation.navigate('Home') } title="Home"/>
                <Text>ProfilePage</Text>
                {/* <Button onPress={ () => this.getUserInfo() } title="TEST"/> */}
                <Text> Name : {this.state.userName} </Text>
                <Text> Date Created : {this.state.dateCreated} </Text>
                <Text> Account Type : {this.state.accountType} </Text>
            </View>
        );
    }
}