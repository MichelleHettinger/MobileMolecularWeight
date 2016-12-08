import React, { Component } from 'react';
import  {AppRegistry, StyleSheet, Text, TextInput, View, AsyncStorage, Navigator } from 'react-native';
import Button from 'react-native-button';


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
      loaded: true
    });

    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      alert("Error " + errorCode + ". " + errorMessage)

      // ...
    }).then((userData) => {

      console.log(userData);

      var uID = userData.uid;
      var email = userData.email;
      var displayName = userData.displayName;


      this.props.navigator.push({
        component: Main
      });

    })

    
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

const styles = StyleSheet.create({
    thing: {
      

    },


});
