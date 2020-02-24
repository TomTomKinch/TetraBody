// Sign Up Screen
import React, { Component } from 'react';
import { Image, Button, StyleSheet, Text, View, Modal } from 'react-native';
import { Input } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { Auth } from 'aws-amplify';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

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

  SignUp = async () => {
    // Show the current state object
    const { email, password, confirmPassword } = this.state;
    email = email.toLowerCase();
    
    if (password == confirmPassword) {
      try {
        await Auth.signUp({
          username: email,
          password,
          attributes: { email },
        })
        console.log('SignUp success')
        // On success, show Confirmation Code Modal
        this.setState({ modalVisible: true })
      } catch (err) {
        // On failure display error in console
        console.log('SignUp error:', err)
      }
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
      <KeyboardAwareScrollView 
        style={styles.container} 
        contentContainerStyle={{ 
          justifyContent: 'flex-start', 
          alignItems: 'center', 
          paddingTop: 100, 
          paddingBottom:500}}
        behavior="padding" enabled>
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
              <Button
                style={ styles.button }
                onPress={ this.SignUp }
                title='Sign Up'
                color= 'white'
              />
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
               <TouchableHighlight
                style={ styles.linearGradient }
                onPress={ this.handleConfirmationCode }
                underlayColor='#00cccc'
               >
                  <Text style={styles.buttonText}>Submit</Text>
               </TouchableHighlight>
              </LinearGradient>
            </View>

          </View>
        </Modal>
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