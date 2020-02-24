import React, { Component } from 'react';
import { Button, StyleSheet, Text, View, TouchableHighlight, TouchableNativeFeedback, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Header } from 'react-native-elements'
import { LinearGradient } from 'expo-linear-gradient';
import { tetraAPI } from '../API.js'
import tempJson from './temp.json'
import { globalEmail } from './LoginScreen'

export default class ProfileScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoaded: false,
            data: [],
            userName: null,
            dateCreated: null,
            accountType: null,
            email: null, 
        }
    }

    async getUserInfo(name) {
        //let response = tempJson;    //Local Call
        let response = await tetraAPI.getUser(name);  //Actual API Call
        let APIobj = response[0];
        let userName = APIobj.userName;
        let dateCreated = APIobj.dateCreated;
        let accountType = APIobj.accountType;
        let email = globalEmail; //Set on LoginScreen.js
        this.setState({
            isLoaded: true,
            data: APIobj,
            userName: userName,
            dateCreated: dateCreated,
            accountType: accountType,
            email: email, 
        })
    }

    //Runs code when app loads
    componentDidMount() {
        this.getUserInfo('erik'); //change to globalEmail
    }

    render() {

        const {goBack} = this.props.navigation;

        return (
            <View style={styles.container}>

                <Header
                    headerTitle="header"
                    containerStyle={styles.Header}
                >
                    <TouchableHighlight onPress={() => goBack()} underlayColor="#00cccc" style={styles.highlight}>
                        <Icon // Go back to previous page
                            name={'times'}
                            size={25}
                            color="white"
                        />
                    </TouchableHighlight>
                </Header>

                <Text style={styles.title}>Account</Text>
                {/* <Button onPress={ () => this.getUserInfo() } title="TEST"/> */}
                <Image style={styles.avatar} source={ require('./default-profile.png') }></Image>
                <Text style={styles.body}>{this.state.userName} </Text>
                <Text style={styles.body}>{this.state.accountType} </Text>

                <LinearGradient
                    start={[0, 0.5]}
                    end={[1, 0.5]}
                    colors={['cyan', 'green', 'cyan']}
                    style={styles.linearGradient}>
                    
                    <TouchableHighlight // Sign out of you account back to Login Page
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
      justifyContent: 'flex-start',
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
    Header:{
        backgroundColor: 'black',
        alignItems: 'center',
        borderBottomWidth: 0,
    },
    highlight:{
        paddingVertical: 8, 
        paddingHorizontal: 13, 
        width:45, height: 45, 
        borderRadius: 30
    }
  });