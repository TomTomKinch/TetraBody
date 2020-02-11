// Sign Up Screen
import React, { Component } from 'react';
import { Image, Button, StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import { Input } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { Auth } from 'aws-amplify';
import { TouchableHighlight } from 'react-native-gesture-handler';

export default class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      confirmationCode: '',
      modalVisible: false,
    };
  }

  handleSignUp = () => {
    // Show the current state object
    const { email, password, confirmPassword } = this.state;

    if (password == confirmPassword) {
      Auth.signUp({
        username: email,
        password,
        attributes: { email },
      })
      // On success, show Confirmation Code Modal
      .then(() => this.setState({ modalVisible: true }))
      // On failure display error in console
      .catch(err => console.log(err));
    } else {
      alert('Passwords do not match.');
    }
  }

  handleConfirmationCode = () => {
    const { email, confirmationCode } = this.state;
    Auth.confirmSignUp(email, confirmationCode, {})
      .then(() => {
        this.setState({ modalVisible: false });
        this.props.navigation.navigate('Home')
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <View style={styles.container}>
          <Image
          source={ require('../Pages/logo-symbol.png') }
          style={styles.image}
          />

        <Text style={styles.title}>Create Your Account</Text>

        <View style={ styles.input }>
            <Input // Begin Sign Up form
              label='Email:'
              onChangeText={
                // Set this.state.email to the input value
                (value) => this.setState({ email: value })
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

        <View style={ styles.input }>
            <Input
              label='Confirm Password'
              onChangeText={
                // Set this.state.confirmPassword to the input value
                (value) => this.setState({ confirmPassword: value })
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
                style={ styles.button }
                onPress={ this.handleSignUp }
              >
                <Text style={styles.slogan}>Sign Up</Text>
              </TouchableHighlight>
          </LinearGradient>
        </View>
        
        <Modal // pops up once Sign Up form is submitted. expecting confirmation code
          visible={ this.state.modalVisible }
        >
          <View
            style={ styles.container }
          >
            <View style={ styles.input }>
               <Input
                label='Confirmation Code'
                onChangeText={
                  // Set this.state.confirmationCode to the input value
                  (value) => this.setState({ confirmationCode: value })
                }
                />
            </View>
           
            <View>
              <LinearGradient
                    start={[0, 0.5]}
                    end={[1, 0.5]}
                    colors={['cyan', 'green', 'cyan']}
                    style={styles.linearGradient}>
               <TouchableOpacity
                style={ styles.button }
                onPress={ this.handleConfirmationCode }
               >
                  <Text style={styles.slogan}>Submit</Text>
               </TouchableOpacity>
              </LinearGradient>
            </View>

          </View>
        </Modal>
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
        marginTop: 5,
        marginBottom: 50,
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
      },
      image: {
        marginTop: 100,
        marginBottom: 10,
        height: 50, 
        width: 50, 
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