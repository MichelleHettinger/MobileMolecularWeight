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
    //this.auth = firebase.auth();

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

        <Button onPress={this.login.bind(this)}><Text>Login</Text></Button>

      </View>

    );
  }

  login(){
    this.setState({
      loading: true
    });

    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      if error throw error;

      // ...
    }).then((userData) => {

      console.log("it works");



    })




    // // Log in and display an alert to tell the user what happened.
    // firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password
    // ).then((userData) =>
    //   {

    //     this.setState({
    //       loaded: false
    //     });

    //     AsyncStorage.setItem('userData', JSON.stringify(userData));

    //     this.props.navigator.push({
    //       component: Main
    //     });
    //   }
    // ).catch((error) =>
    //     {
    //       this.setState({
    //         loaded: false
    //       });

    //       alert('Login Failed. Please try again ' +error);
    // });



    
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