import React, { Component } from 'react';
import { Button, StyleSheet, Text, View, TouchableHighlight, Image, TouchableOpacity } from 'react-native';
import { Header } from 'react-native-elements'
import { getUser } from '../API.js'
import tempJson from './temp.json'
import { LinearGradient } from 'expo-linear-gradient';

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
            <View style={styles.container}>

                <Header
                    headerTitle="header"
                />

                <Text style={styles.title}>Account</Text>
                {/* <Button onPress={ () => this.getUserInfo() } title="TEST"/> */}
                <Image style={styles.avatar}></Image>
                <Text style={styles.body}>{this.state.userName} </Text>
                <Text style={styles.body}>{this.state.accountType} </Text>

                <LinearGradient
                    start={[0, 0.5]}
                    end={[1, 0.5]}
                    colors={['cyan', 'green', 'cyan']}
                    style={styles.linearGradient}>
                    
                    <TouchableHighlight
                    style={ styles.linearGradient }
                    onPress={ user => this.props.navigation.navigate('Login') }
                    underlayColor='#00cccc'
                    >
                        <View>
                            <Text style={styles.buttonText}>Sign Out</Text>
                        </View>
                    </TouchableHighlight>
                </LinearGradient>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
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
    body: {
        fontSize: 20,
        color: 'grey',
        paddingVertical: 5,
    },
    avatar: {
        width: 225,
        height: 225,
        borderRadius: 150,
        borderWidth: 5,
        borderColor: '#00cccc',
        marginBottom: 20,
        alignSelf:'center',
        position: 'relative',
        marginTop:50
    },
    buttonText: {
        justifyContent:'center',
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
        paddingVertical: 5 
    },
    linearGradient: {
        justifyContent: 'center',
        borderRadius: 20,
        height: 45,
        width: 125,
    },
  });