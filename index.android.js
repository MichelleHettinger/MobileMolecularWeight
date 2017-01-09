import React, { Component } from 'react';
import { Text, View, TextInput, Modal, StyleSheet, Dimensions, AppRegistry} from 'react-native';
import Button from 'react-native-button';

import ElementsArray from './Components/ElementsArray.js';

import ElementSelector from './Components/ElementSelector.js';
import CalculatorPanel from './Components/CalcPanel.js';
import Keyboard from './Components/Keyboard.js';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

//Set up and initialize Firebase
import * as firebase from 'firebase';
const config = {
  apiKey: "AIzaSyBQUQPgITUNyCSsjufVVhJp-4laWw21QdU",
  authDomain: "mobile-molecular-weight-85984.firebaseapp.com",
  databaseURL: "https://mobile-molecular-weight-85984.firebaseio.com",
  storageBucket: "mobile-molecular-weight-85984.appspot.com",
  messagingSenderId: "837319764944"
};

//Only one instance of firebase can run at a time
firebase.initializeApp(config);

class ChemistryApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      elementsFound: [],
      elements: [], multipliers:[],
      total: 0,

      email: '',
      password: '',

      newEmail: '',
      newUsername: '',

      user: {},
      userSavedCompounds: {},

      logged: false,
      
      loginModalVisible: false,
      accountModalVisible: false,
    };

    //LoginModal methods
    this.grabUserEmail = this.grabUserEmail.bind(this);
    this.grabUserPassword = this.grabUserPassword.bind(this);
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);

    //MyAccountModal methods
    this.grabNewEmail = this.grabNewEmail.bind(this);
    this.grabNewUserName = this.grabNewUserName.bind(this);
    this.grabNewPassword = this.grabNewPassword.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.resetPassword = this.resetPassword.bind(this);

    //Methods getting data from other components
    this.getKeypress = this.getKeypress.bind(this);
    this.findElements = this.findElements.bind(this);
    this.getElement = this.getElement.bind(this);
    this.getEdit = this.getEdit.bind(this);

    //Methods for header when logged in
    this.loggedHeader = this.loggedHeader.bind(this);
    this.logout = this.logout.bind(this);

    //Methods for header when not logged in
    this.notLoggedHeader = this.notLoggedHeader.bind(this);

    //Keyboard and element selector components
    this.keyboardRend = this.keyboardRend.bind(this);
    this.elemSelectorRend = this.elemSelectorRend.bind(this);

    this.calcPanelRend = this.calcPanelRend.bind(this);
    this.updateMainState = this.updateMainState.bind(this);
    this.updateDeleted = this.updateDeleted.bind(this);
    this.updateSavedCompounds = this.updateSavedCompounds.bind(this);
  }

  //LoginModal methods
  grabUserEmail(userEmail){
    //console.log(userEmail)

    this.setState({
      email: userEmail,
    });
  }
  grabUserPassword(userPassword){
    //console.log(userPassword)

    this.setState({
      password: userPassword,
    });
  }
  setLoginModalVisible(visible){
    this.setState({loginModalVisible: visible});
  }
  login(){
    //Login and then get the users saved data.

    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(error => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("Error " + errorCode + ". " + errorMessage)

    }).then( user => {
      //console.log(user);
      if(user){
        firebase.database().ref('users/' + user.uid + '/compounds').once('value').then( snapshot => {

          //Grab 'snapshot' of the users saved compounds.
          const allCompounds = snapshot.val();

          //console.log(allCompounds)


          this.setState({
            user:user,
            userSavedCompounds: allCompounds,
            logged:true,
            loginModalVisible: false,
          });
        });
      }
    });
  }
  signup(){
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // ...

      alert("Error " + errorCode + ". " + errorMessage)

    }).then((newUserData) => {

      //console.log(newUserData);
      this.setLoginModalVisible(false);

 
    });
  }

  //MyAccountModal methods
  grabNewEmail(newEmail){
    this.setState({
      newEmail: newEmail,
    })
  }
  grabNewUserName(newUsername){
    this.setState({
      newUsername: newUsername,
    });
  }
  grabNewPassword(newPassword){
    this.setState({
      newPassword: newPassword,
    });
  }
  setAccountModalVisible(visible){

    this.setState({accountModalVisible: visible})
  }
  updateProfile(){
    //This is where the submit button goes
    
    //Listener for firebase user login
    const user = firebase.auth().currentUser;

    if (this.state.newEmail.length > 0){
      user.updateEmail(this.state.newEmail).catch(function(error){
        //Error hapened
        alert("Update error. " + error);

      }).then((result)=>{
        // Update successful.
        //console.log("Email Updated")

        this.setState({newEmail: ''})

      })
    }

    if (this.state.newUsername.length > 0){
      user.updateProfile({

        displayName: this.state.newUsername,

      }).catch(function(error){
        //Error hapened
        alert("Update error. " + error);

      }).then((result)=>{
        // Update successful.
        //console.log("Name Updated")

        this.setState({newUsername: ''})
      })
    }
  }
  resetPassword(){

    auth.sendPasswordResetEmail(this.state.email).catch(function(error){
      //Error hapened
      alert("Update error. " + error);

    }).then((result)=>{
      // Update successful.
      //console.log("Email sent!")
      //console.log(result);

    })
  }

  //Methods getting data from other components
  getKeypress(newText){
    //console.log("------------------------------------------");
    //console.log("User pressed: " + newText);

    let totalText = '';

    if (newText == '<-'){
      totalText = this.state.text.slice(0, -1);
    }
    else {
      totalText = this.state.text + newText;
    }

    this.setState({
      text: totalText,
    }, () => {this.findElements(totalText)} )

    //console.log(this.state)
  }
  findElements (userInput) {
    //Find the right elements, then setState for found elements.

    let listElements = [];
    let listElements2 = [];
    let listElements3 = [];

    // Loop through every typed letter
    for (let i=0; i<userInput.length; i++){

      if (i==0){
        //Loop through all elements
        for (let j=0; j<ElementsArray.length;j++){
          //If the letters at position i match, push that element to the array
          if (userInput.charAt(i) == ElementsArray[j].elementName.charAt(i).toLowerCase() || userInput.charAt(i) == ElementsArray[j].elementAcronym.charAt(i).toLowerCase()){
            listElements.push(ElementsArray[j]);
          } 
        }         
      }

      else if (i==1){
        //Loop through the first list of elements
        for (let j=0; j<listElements.length;j++){
          //If the letters at position i match, push that element to a new array
          if (userInput.charAt(i) == listElements[j].elementName.charAt(i).toLowerCase() || userInput.charAt(i) == listElements[j].elementAcronym.charAt(i).toLowerCase()){
            listElements2.push(listElements[j]);
          } 
        }
      }

      else if (i==2){
        //Loop through the second list of elements
        for (let j=0; j<listElements2.length;j++){
          //If the letters at position i match, push that element to a new array
          if (userInput.charAt(i) == listElements2[j].elementName.charAt(i).toLowerCase() || userInput.charAt(i) == listElements2[j].elementAcronym.charAt(i).toLowerCase()){
            listElements3.push(listElements2[j]);
          } 
        }
      }   
    }

    //Depending on how many letters were typed in, display the appropriate array
    if (userInput.length == 0){
      this.setState({
        elementsFound: listElements,
      })
    }
    else if (userInput.length == 1){
      //console.log(listElements);
      this.setState({
        elementsFound: listElements,
      })
    }
    else if (userInput.length == 2){
      //console.log(listElements2);
      this.setState({
        elementsFound: listElements2,
      })
    }
    else if (userInput.length == 3){
      //console.log(listElements3);
      this.setState({
        elementsFound: listElements3,
      })      }
    else if (userInput.length >= 4){
      this.setState({
        elementsFound: listElements3,
      })
    }
  }
  getElement(newElement){
    //console.log("------------------------------------------");
    //console.log("User selected " + newElement.elementName);

    // Push the element and multiplier into their respective arrays
    let currentElements = this.state.elements;
    let currentMultipliers = this.state.multipliers;
    let currentTotal = this.state.total;

    currentElements.push(newElement);
    currentMultipliers.push(1);
    currentTotal += newElement.mass;

    this.setState({
      total: currentTotal,
      elements: currentElements,
      multiplier: currentMultipliers
    });

    //console.log(this.state);
  }
  getEdit(input, element, i){
    //console.log("------------------------------------------");
    //console.log(input + " one " + element.elementName + " at position: " + i);

    //console.log(i)

    if (input == '+'){
      this.state.multipliers[i] += 1;
      this.state.total += element.mass;
    }
    else if (input == '-'){
      this.state.multipliers[i] -= 1;
      this.state.total -= element.mass;
    }

    for (let j=0; j<this.state.multipliers.length; j++){
      if (this.state.multipliers[j] == 0){
        this.state.multipliers.splice(j, 1);
        this.state.elements.splice(j, 1);
      }
    }

    this.setState({
      total: this.state.total,
      elements: this.state.elements,
      multiplier: this.state.multipliers
    })

    //console.log(this.state);
  }

  //Methods for header when logged in
  loggedHeader(){

    //console.log(this.state.user)

    //Keep this conditional
    if (this.state.logged){
      return(
        <View>
          <View>
            <Modal
              animationType={"none"} 
              transparent={false}
              visible={this.state.accountModalVisible}
              onRequestClose={()=>this.setAccountModalVisible(false)}
            >
              <View>
                <View style={[styles.border,{marginBottom:height*0.01}]}>
                  <Text style={[styles.centerBlack,{fontSize:height*0.045}]}>Mobile Molecular Weight</Text>
                  <Text style={[styles.centerBlack]}>Thank you for using Mobile Molecular Weight!</Text>
                </View>
                <View style={[{marginTop:height*0.01,marginLeft:width*0.1}]}>
                  <View >
                    <View style={[{height: height*0.055}, styles.flexRow]}>
                      <View style={[{width:width*0.3,height:height*0.1}]}>
                        <Text style={{color:'black',textAlign:'right'}}>Email:</Text>
                      </View>
                      <TextInput style={[{height:height*0.09,width:width*0.5,marginTop:-18}]}
                        underlineColorAndroid={'white'}
                        editable={false}
                        placeholder={this.state.user.email}
                      />
                    </View>
                    <View style={[{height: height*0.055}, styles.flexRow]}>
                      <View style={[{width:width*0.3,height:height*0.1}]}>
                        <Text style={{color:'black',textAlign:'right'}}>Username:</Text>
                      </View>
                      <TextInput style={[{height:height*0.09,width:width*0.5,marginTop:-18}]}
                        editable={false}
                        underlineColorAndroid={'white'}
                        placeholder={this.state.user.displayName}
                      />
                    </View>
                    <View style={[{height: height*0.055}, styles.flexRow]}>
                      <View style={[{width:width*0.3,height:height*0.1}]}>
                        <Text style={{color:'black',textAlign:'right'}}>New Name:</Text>
                      </View>
                      <TextInput style={[{height:height*0.09,width:width*0.5,marginTop:-18}]}
                        onChangeText={this.grabNewUserName}
                        value={this.state.newUsername}
                        placeholder={"Alias"}
                      />
                    </View>
                    <View style={[{height: height*0.055}, styles.flexRow]}>
                      <View style={[{width:width*0.3,height:height*0.1}]}>
                        <Text style={{color:'black',textAlign:'right'}}>New Email:</Text>
                      </View>
                      <TextInput style={[{height:height*0.09,width:width*0.5,marginTop:-18}]}
                        onChangeText={this.grabNewEmail}
                        value={this.state.newEmail}
                        placeholder={"Email Address"}
                      />
                    </View>
                  </View>
                </View>
                <View>
                  <View style={[styles.border,{width:width*0.35,marginLeft:width*0.31,marginBottom:height*0.05}]}>
                    <Button onPress={ this.resetPassword }>
                      <Text style={[styles.centerBlack]}>Reset Password?</Text>
                    </Button>
                  </View>
                  <View style={[styles.flexRow,{height:height*0.04,width:width*0.35,marginLeft:width*0.32}]}>
                    <View style={[{width: width*0.11,marginRight: width*0.045}]}>
                      <Button onPress={()=>this.setAccountModalVisible(false)}>
                        <Text style={{color: 'black'}}>Close</Text>
                      </Button>
                    </View>
                    <View style={[{width:width*0.13,marginLeft:width*0.045}]}>
                      <Button onPress={this.updateProfile}>
                        <Text style={{color: 'black'}}>Submit</Text>
                      </Button>
                    </View>     
                  </View>
                </View>
              </View>
            </Modal>
          </View>
          <View style={[styles.border,styles.header]}>
            <Text style={[styles.centerBlack,{fontSize:width*0.05}]}>Mobile Molecular Weight</Text>
            <View style={[styles.flexRow,{height:height*0.05}]}>
              <View style={[{width:width*0.23,marginLeft:width*0.375}]}>
                <Button onPress={()=>this.setAccountModalVisible(true)}>
                  <Text style={{color:'black'}}>My Account</Text>
                </Button>
              </View>
              <View style={[{width:width*0.15,marginLeft:width*0.165}]}>
                <Button onPress={this.logout}>
                  <Text>Log Out</Text>
                </Button>
              </View>
            </View>
          </View>
        </View>
      ) 
    }
  }
  logout(){
    firebase.auth().signOut().catch(function(error){

      alert("Error " + error);

    }).then(function() {

      this.setState({
        logged: false,
      });

      alert("You have signed out");

    }.bind(this))
  }

  //Methods for header when not logged in
  notLoggedHeader(){
    return(
      <View>
        <View>
          <Modal
            animationType={"none"} 
            transparent={false}
            visible={this.state.loginModalVisible}
            onRequestClose={()=>this.setLoginModalVisible(false)}
          >
            <View style={[{marginTop:height*0.01,marginLeft:0}]}>
              <View style={[styles.border,{marginBottom:height*0.05}]}>
                <Text style={[styles.centerBlack,{fontSize:height*0.045}]}>Mobile Molecular Weight</Text>
                <Text style={[styles.centerBlack]}>Log in or create an account to save your molecules.</Text>
              </View>
              <View style={[{marginLeft:width*0.1,marginBottom:height*0.01}]}>
                <View style={[styles.flexRow,{marginLeft:width*0.16,width:width*0.85,height:height*0.055}]}>
                  <Text style={{color:'black'}}>Email:</Text>
                  <TextInput style={[styles.loginTextInput]}
                    underlineColorAndroid={'white'}
                    autoFocus={true}
                    onChangeText={this.grabUserEmail}
                    placeholder={"Email Address"}
                  />
                </View>
                <View style={[styles.flexRow,{marginLeft:width*0.089,width:width*0.85,height:height*0.055}]}>
                  <Text style={{color:'black'}}>Password:</Text>
                  <TextInput style={[styles.loginTextInput]}
                    onChangeText={this.grabUserPassword}
                    secureTextEntry={true}
                    placeholder={"Password"}
                  />
                </View>
              </View>
              <View style={[styles.flexRow,{width:width*0.3,height:height*0.04,marginLeft:width*0.33}]}>
                <View style={[{marginRight:width*0.03}]}>
                  <Button onPress={this.signup}>
                    <Text style={{color:'black'}}>Sign Up</Text>
                  </Button>
                </View>
                <View style={[]}>
                  <Button onPress={this.login}>
                    <Text style={{color:'black'}}>Log In</Text>
                  </Button>
                </View>
              </View>
            </View>
          </Modal>
        </View>
        <View style={[styles.border,styles.header]}>
          <Text style={[styles.centerBlack,{fontSize:height*0.03}]}>Mobile Molecular Weight</Text>
          <View style={[{width:width*0.25,marginLeft:width*0.35}]}>
            <Button onPress={()=>this.setLoginModalVisible(true)}>
              <Text style={[styles.centerBlack]}>Login/Sign Up</Text>
            </Button>
          </View>
        </View>
      </View>
    )
  }

  //Keyboard and element selector components
  keyboardRend(){
    return (
      <Keyboard
        getKeyPress={this.getKeypress}
        userInput={this.state.text}
      />
    )
  }
  elemSelectorRend(){
    return (
      <ElementSelector
        elementsFound={this.state.elementsFound}
        getElement={this.getElement}
      />
    )
  }

  //Calc panel methods
  calcPanelRend(){
    return (
      <CalculatorPanel
        mainState={this.state}
        getPlusMinus={this.getEdit}
        updateMainState={this.updateMainState}
        updateDeleted={this.updateDeleted}
        updateSaved={this.updateSavedCompounds}
      />
    )
  }
  updateMainState(compoundX){
    //console.log(compoundX);
    //console.log(this.state.userSavedCompounds);

    const newElements = this.state.userSavedCompounds[compoundX].elements;
    const newMultipliers = this.state.userSavedCompounds[compoundX].multipliers;
    const newTotal = parseFloat(this.state.userSavedCompounds[compoundX].total);

    this.setState({
      elements: newElements,
      multipliers: newMultipliers,
      total: newTotal,
    })
  }
  updateDeleted(compoundX){

    const userID = this.state.user.uid;

    firebase.database().ref('users/' + userID + '/compounds/' + compoundX).set({null}, () => {
      //console.log('Wrote to database');
      //$("#outerSavedDiv").empty();

      firebase.database().ref('users/' + userID + '/compounds').once('value').then( snapshot => {
        //Grab 'snapshot' of the users saved compounds.
        const allCompounds = snapshot.val();

        //console.log(allCompounds);

        this.setState({
          userSavedCompounds: allCompounds,
        });

      });
    });
  }
  updateSavedCompounds (allCompounds) {
    this.setState({
      userSavedCompounds: allCompounds
    });
  }

  render() {

    const notLogged = this.notLoggedHeader();
    const keyboard = this.keyboardRend();
    const selector = this.elemSelectorRend();
    const calcpanel = this.calcPanelRend();

    //If user is logged in
    if (this.state.logged){
      const logged = this.loggedHeader();
      return (
        <View style={[styles.main]}>
            {logged}
            {selector}
            {calcpanel}
            {keyboard}
        </View>
      )
    }

    //Else if no one is logged in
    return (
      <View style={[styles.main]}>
          {notLogged}
          {selector}
          {calcpanel}
          {keyboard}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  border: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'black',
  },
  flexRow: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  centerBlack:{
    textAlign: 'center',
    color: 'black',
  },
  main: {
    marginTop: height*0.01,
    marginLeft: width*0.02,
  },
  header: {
    width: width*0.96,
    height: height*0.08,
  },
  loginTextInput: {
    width: width*0.6,
    height: height*0.09,
    marginBottom: 0,
    top: -1*height*0.03,
  },
});

AppRegistry.registerComponent('MobileMolecularWeight', () => ChemistryApp);