// Login Screen
import React, { Component } from 'react';
import { Image, Button, StyleSheet, Text, View, Modal } from 'react-native';
import { Input } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { Auth } from 'aws-amplify';

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
      <View style={styles.container}>

        <Image
          source={ require('../Pages/logo-symbol.png') }
          style={styles.image}
        />

        <Text style={styles.slogan}>"A workout Every Day for Every Body"</Text>


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
              <Button
                style={ styles.button }
                onPress={ this.handleSignIn }
                title='Login'
                color= 'white'
              />
          </LinearGradient>
        </View>
        
        <View>
          <Button
            style={ styles.button }
            onPress={ user => this.props.navigation.navigate('SignUp') }
            title='Sign Up'
            color='white'
          />
        </View>
        
<Button style = { styles.button } onPress={ () => this.props.navigation.navigate('Home') } title="Home"/>
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
  slogan: {
    marginBottom: 50,
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
  },
  image: {
    marginTop: 100,
    marginBottom: 10,
    height: 100, 
    width: 100, 
    resizeMode: 'contain',
  },
  linearGradient: {
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 20,
    marginTop:16,
    height: 45,
    width:350,
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