import React, { Component } from 'react';
import  {AppRegistry, StyleSheet, Text, TextInput, View, AsyncStorage, Navigator } from 'react-native';
import Button from 'react-native-button';


//Set up and initialize Firebase
import * as firebase from 'firebase';
var config = {
  apiKey: "AIzaSyBQUQPgITUNyCSsjufVVhJp-4laWw21QdU",
  authDomain: "mobile-molecular-weight-85984.firebaseapp.com",
  databaseURL: "https://mobile-molecular-weight-85984.firebaseio.com",
  storageBucket: "mobile-molecular-weight-85984.appspot.com",
  messagingSenderId: "837319764944"
};

firebase.initializeApp(config);

export default class login extends Component {

  constructor(props){
    super(props);
    this.itemsRef = firebase.database().ref();

    this.state = {
      email: '',
      password: '',
      loaded: true
    }
  }


  render(){
    return (
      <Navigator renderScene={this.renderScene.bind(this)}/>
    )
  }


  renderScene(route, navigator){
    return (

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


      </View>

    );
  }

  login(){

    this.setState({
      loaded: false
    });

    firebase.authWithPassword({
      "email": this.state.email,
      "password": this.state.password
    }, (error, user_data) => {

      this.setState({
        loaded: true
      });

      if(error){
        alert('Login Failed. Please try again');
      }else{
        AsyncStorage.setItem('user_data', JSON.stringify(user_data));
        this.props.navigator.push({
          component: Account
        });
      }
    });
  }

  goToSignup(){
    this.props.navigator.push({
      component: Signup
    });
  }

  goToMain(){
    this.props.navigator.push({
      component: Main
    });
  }

}

AppRegistry.registerComponent('MobileMolecularWeight', () => login);