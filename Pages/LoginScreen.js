// Login Screen
import React, { Component } from 'react';
import { Image, Button, StyleSheet, Text, View, Modal } from 'react-native';
import { Input } from 'react-native-elements';
import { Auth } from 'aws-amplify';

export default class LoginScreen extends Component {
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

  handleSignIn = () => {
    const { email, password } = this.state;
    Auth.signIn(email, password)
      // Navigate to Home screen if successful
      .then(user => this.props.navigation.navigate('Progress'))
      // Display error if failed
      .catch(err => console.log(err));
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
        this.props.navigation.navigate('Progress')
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Login Screen</Text>
        <Input // Begin Sign Up form
          label='Email'
          leftIcon={{ type: 'font-awesome', name: 'envelope' }}
          onChangeText={
            // Set this.state.email to the input value
            (value) => this.setState({ email: value })
          }
          placeholder=''
        />
        <Input
          label='Password'
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={
            // Set this.state.password to the input value
            (value) => this.setState({ password: value })
          }
          placeholder=''
          secureTextEntry
        />
        <Input
          label='Confirm Password'
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={
            // Set this.state.confirmPassword to the input value
            (value) => this.setState({ confirmPassword: value })
          }
          placeholder=''
          secureTextEntry
        />
        <Button
          style={ styles.button }
          onPress={ this.handleSignUp }
          title='Submit'
        />
        <Input // Begin Sign In form
          label='Email'
          leftIcon={{ type: 'font-awesome', name: 'envelope' }}
          onChangeText={
            // Set this.state.email to the input value
            (value) => this.setState({ email: value })
          }
          placeholder=''
        />
        <Input
          label='Password'
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={
            // Set this.state.password to the input value
            (value) => this.setState({ password: value })
          }
          placeholder=''
          secureTextEntry
        />
        <Button
          style={ styles.button }
          onPress={ this.handleSignIn }
          title='Submit'
        />
        <Modal // pops up once Sign Up form is submitted. expecting confirmation code
          visible={ this.state.modalVisible }
        >
          <View
            style={ styles.container }
          >
            <Input
              label='Confirmation Code'
              leftIcon={{ type: 'font-awesome', name: 'lock' }}
              onChangeText={
                // Set this.state.confirmationCode to the input value
                (value) => this.setState({ confirmationCode: value })
              }
            />
            <Button
              title='Submit'
              onPress={ this.handleConfirmationCode }
            />
          </View>
        </Modal>
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
});