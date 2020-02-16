// Login Screen
import React, { Component } from 'react';
import { Image, Button, StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Input } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { Auth } from 'aws-amplify';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleSignIn = () => {
    const { email, password } = this.state;
    Auth.signIn(email, password)
      // Navigate to Home screen if successful
      .then(user => this.props.navigation.navigate('Home'))
      // Display error if failed
      .catch(err => console.log(err));
  }

  render() {
    return (

      // Allows scrolling and shifts up or down if pressing inputs
      <KeyboardAwareScrollView
        style={styles.container} 
        contentContainerStyle={{ 
          justifyContent: 'flex-start', 
          alignItems: 'center', 
          paddingTop: 90, 
          paddingBottom: 300}}
        behavior="padding" enabled>
        <Image
          source={ require('../Pages/logo-symbol.png') }
          style={styles.image}
        />

        <Text style={styles.slogan}>"A workout Every Day for Every Body"</Text>
        <Text style={ styles.title }>Welcome</Text>

        <View style={ styles.input }>
          <Input // Begin Sign In form
            label='Email:'
            onChangeText={
              // Set this.state.email to the input value
            ( value) => this.setState({ email: value })
            }
            placeholder=''
            inputContainerStyle = {{ borderBottomWidth: 0 }}
          />
        </View>

        <View style={ styles.input }>
          <Input
            label='Password:'
            onChangeText={
              // Set this.state.password to the input value
              (value) => this.setState({ password: value })
            }
            placeholder=''
            inputContainerStyle = {{ borderBottomWidth: 0 }}
            secureTextEntry
          />
        </View>

        <View>
          <LinearGradient
            start={[0, 0.5]}
            end={[1, 0.5]}
            colors={['cyan', 'green', 'cyan']}
            style={styles.linearGradient}>
             <TouchableHighlight
                style={ styles.linearGradient }
                onPress={ this.handleSignIn }
                underlayColor='#00cccc'
             >
                <Text style={styles.buttonText}>Login</Text>
              </TouchableHighlight> 
          </LinearGradient>
        </View>
        
          <TouchableOpacity
            style={ styles.button, {paddingVertical: 10} }
            onPress={ user => this.props.navigation.navigate('SignUp') }
          >
            <View>
              <Text style={styles.buttonText}>Sign Up</Text>
            </View>
          </TouchableOpacity>

<Button style = { styles.button } onPress={ () => this.props.navigation.navigate('Home') } title="Home"/>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#4d4d4d',
    },
    title: {
      fontSize: 32,
      textAlign: 'center',
      margin: 10,
      color: '#00cccc',
    },
    slogan: {
      marginTop: 5,
      marginBottom: 50,
      fontSize: 20,
      textAlign: 'center',
      color: 'white',
    },
    image: {
      marginBottom: 10,
      height: 100, 
      width: 350, 
      resizeMode: 'contain',
    },
    linearGradient: {
      justifyContent: 'center',
      borderRadius: 20,
      height: 45,
      width: 350,
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
    buttonText: {
      justifyContent:'center',
      fontSize: 20,
      textAlign: 'center',
      color: 'white',
    }
});