import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, TextInput, View } from 'react-native';
import Button from 'react-native-button';

//Post-login page
import Main from './Main';

//Firebase
import Firebase from 'firebase';
let app = new Firebase("https://mobile-molecular-weight-85984.firebaseio.com/");

export default class signup extends Component {

  constructor(props){
    super(props);

    this.state = {
      loaded: true,
      email: '',
      password: ''
    };
  }

  signup(){

    this.setState({
      loaded: false
    });

    //Create user, if error alert. Otherwise set state with new email, pass and loaded.
    app.createUser({
      'email': this.state.email,
      'password': this.state.password
    }, (error, userData) => {

      if(error){
        switch(error.code){

          case "EMAIL_TAKEN":
            alert("The new user account cannot be created because the email is already in use.");
          break;

          case "INVALID_EMAIL":
            alert("The specified email is not a valid email.");
          break;

          default:
            alert("Error creating user:");
        }

      }else{
        alert('Your account was created!');
      }

      this.setState({
        email: '',
        password: '',
        loaded: true
      });

    });
  }

  goToLogin(){
    this.props.navigator.push({
      component: Main
    });
  }

  render() {
    return (
      <View>
        <View>

          <TextInput
              onChangeText={(text) => this.setState({email: text})}
              value={this.state.email}
          placeholder={"Email Address"}
          />
          <TextInput
            onChangeText={(text) => this.setState({password: text})}
            value={this.state.password}
            secureTextEntry={true}
            placeholder={"Password"}
          />
          <Button
            text="Signup"
            onpress={this.signup.bind(this)} />

          <Button
            text="Got an Account?"
            onpress={this.goToLogin.bind(this)} />
        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent('signup', () => signup);