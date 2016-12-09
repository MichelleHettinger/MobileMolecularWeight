import React, { Component } from 'react';
import { Text, View, TextInput, Modal, StyleSheet, Dimensions, AppRegistry} from 'react-native';
import Button from 'react-native-button';

import ElementSelector from './Components/ElementSelector.js';
import CalculatorPanel from './Components/CalcPanel.js';
import Keyboard from './Components/Keyboard.js';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;



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

class ChemistryApp extends Component {
	constructor(props) {
		super(props);

		this.state = {
			text: '',
			elements: [], multiplier:[],
			total: 0,

			email: '',
			password: '',
			logged: false,
			
			loginModalVisible: false,
			accountModalVisible: false,
		};

		this.getKeypress = this.getKeypress.bind(this);
		this.getElement = this.getElement.bind(this);
		this.getEdit = this.getEdit.bind(this);

		this.logout = this.logout.bind(this, this.state.logged);
	}

	getKeypress(newText){
		console.log("------------------------------------------");
		console.log("User pressed: " + newText)

		if (newText == '<-'){
			var totalText = this.state.text.slice(0, -1)
		}
		else {
			var totalText = this.state.text + newText;
		}

		this.state.text = totalText;

		this.setState({
			text: totalText,
		})

		console.log(this.state)
	}
	getElement(newElement){
		console.log("------------------------------------------");
		console.log("User selected " + newElement.elementName);

		// Push the element and multiplier into their respective arrays
		this.state.elements.push(newElement);
		this.state.multiplier.push(1);

		this.state.total += newElement.mass;

		this.setState({
			total: this.state.total,
			elements: this.state.elements,
			multiplier: this.state.multiplier
		});

		console.log(this.state);
	}
	getEdit(input, element, i){
		console.log("------------------------------------------");
		console.log(input + " one " + element.elementName + " at position: " + i);

		console.log(i)

		if (input == '+'){
			this.state.multiplier[i] += 1;
			this.state.total += element.mass;
		}
		else if (input == '-'){
			this.state.multiplier[i] -= 1;
			this.state.total -= element.mass;
		}

		for (var j=0; j<this.state.multiplier.length; j++){
			if (this.state.multiplier[j] == 0){
				this.state.multiplier.splice(j, 1);
				this.state.elements.splice(j, 1);
			}
		}

		this.setState({
			total: this.state.total,
			elements: this.state.elements,
			multiplier: this.state.multiplier
		})

		console.log(this.state);
	}

	setLoginModalVisible(visible){
		this.setState({loginModalVisible: visible});
	}
	setAccountModalVisible(visible){
		this.setState({accountModalVisible: visible})
	}


	login(){

		firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;

			alert("Error " + errorCode + ". " + errorMessage)

			// ...
		}).then((userData) => {

			console.log(userData);
			this.setLoginModalVisible(!this.state.loginModalVisible);
			// var uID = userData.uid;
			// var email = userData.email;
			// var displayName = userData.displayName;

			console.log(this)

			this.setState({
				logged: true,
			});

		})
	}

	logout(){

		firebase.auth().signOut().catch(function(error){

			alert("Error " + error);

		}).then(function() {

			// console.log(this.state)

			this.setState({
				logged: false,
			});


			alert("You have signed out");
		}.bind(this))
	}

	signup(){
		firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  // ...

		  alert("Error " + errorCode + ". " + errorMessage)

		}).then((newUserData) => {

			console.log(newUserData);
			this.setLoginModalVisible(!this.state.loginModalVisible);

		});
	}




	render() {

		var user = firebase.auth().currentUser;

		//If user is logged in
		if (this.state.logged){

			console.log(user);

			return (
				<View style={[styles.main]}>
					<View>
						<Modal
							animationType={"none"} 
							transparent={false}
							visible={this.state.accountModalVisible}
							onRequestClose={ () => {alert("Modal closed")} }
						>
							<View style={[styles.modalContent]}>

								<View style={[styles.modalHeading]}>
									<Text style={[styles.modalTitle]}>Mobile Molecular Weight</Text>
									<Text style={[styles.modalText]}> Welcome {this.state.email}</Text>
								</View>


								<View style={[styles.modalButtons]}>

									<View style={[styles.cancelView]}>
										<Button onPress={ ()=>{ this.setAccountModalVisible(!this.state.accountModalVisible)} }>
											<Text>Cancel</Text>
										</Button>
									</View>

								</View>
							</View>
						</Modal>
					</View>

					<View style={[styles.header]}>

						<Text style={[styles.headerTitle]}>Mobile Molecular Weight</Text>

						<View style={[styles.accountButtons]}>

							<View>
								<Button onPress={ () => {this.setAccountModalVisible(true)} }>
									<Text style={[styles.headerButtonText]}>My Account</Text>
								</Button>
							</View>

							<View>
								<Button onPress={ this.logout.bind(this) }>
									<Text style={[styles.headerButtonText]}>Log Out</Text>
								</Button>
							</View>

						</View>
					</View>

				    <ElementSelector userInput={this.state.text} newElement={this.getElement}/>

				    <CalculatorPanel selectedElements={this.state.elements} elementMultipliers={this.state.multiplier} total={this.state.total} newEdit={this.getEdit} />

				    <Keyboard newKeyPress={this.getKeypress} userInput={this.state.text}/>
				</View>
			)
		}

		//Else if no one is logged in
		else {
			return (
				<View style={[styles.main]}>
					<View>
						<Modal
							animationType={"none"} 
							transparent={false}
							visible={this.state.loginModalVisible}
							onRequestClose={ () => {alert("Modal closed")} }
						>
							<View style={[styles.modalContent]}>

								<View style={[styles.modalHeading]}>
									<Text style={[styles.modalTitle]}>Mobile Molecular Weight</Text>
									<Text style={[styles.modalText]}>Login to save your molecules! Don't have an account? One will be created for you.</Text>
								</View>

								<View style={[styles.modalAuth, styles.modalEmail]}>
									<Text>Email: </Text>
									<TextInput style={[styles.textInput]}
										underlineColorAndroid={'white'}
										autoFocus={true}
										onChangeText={ (text) => this.setState({email: text}) }
										value={this.state.email}
										placeholder={"Email Address"}
									/>
								</View>

								<View style={[styles.modalAuth, styles.modalPass]}>
									<Text>Password: </Text>
									<TextInput style={[styles.textInput]}
										onChangeText={ (text) => this.setState({password: text}) }
										value={this.state.password}
										secureTextEntry={true}
										placeholder={"Password"}
									/>
								</View>

								<View style={[styles.modalButtons]}>

									<View style={[styles.loginView]}>
										<Button onPress={this.login.bind(this)}>
											<Text>Log In</Text>
										</Button>
									</View>

									<View style={[]}>
										<Button onPress={this.signup.bind(this)}>
											<Text>Sign Up</Text>
										</Button>
									</View>

									<View style={[styles.cancelView]}>
										<Button onPress={ ()=>{ this.setLoginModalVisible(!this.state.loginModalVisible)} }>
											<Text>Cancel</Text>
										</Button>
									</View>

								</View>
							</View>
						</Modal>
					</View>

					<View style={[styles.header]}>

						<Text style={[styles.headerTitle]}>Mobile Molecular Weight</Text>

						<View style={[styles.headerButton]}>
							<Button onPress={ () => {this.setLoginModalVisible(true)} }>
								<Text style={[styles.headerButtonText]}>Login/Sign Up</Text>
							</Button>
						</View>
					</View>

				    <ElementSelector userInput={this.state.text} newElement={this.getElement}/>

				    <CalculatorPanel selectedElements={this.state.elements} elementMultipliers={this.state.multiplier} total={this.state.total} newEdit={this.getEdit} />

				    <Keyboard newKeyPress={this.getKeypress} userInput={this.state.text}/>
				</View>
			)
		}
	}
}

const styles = StyleSheet.create({
    main: {
    	marginTop: height*0.01,
    	marginLeft: width*0.02,
    },

    header: {

		width: width*0.96,
		height: height*0.08,


		borderRadius: 4,
		borderWidth: 1,
		borderColor: 'black',
    },
    headerTitle: {
    	textAlign: 'center',
    	color: 'black',
    	fontSize: width*0.05,
    },
    headerButton: {
    	width: width*0.25,
    	marginLeft: width*0.32,

    },
    headerButtonText: {
    	textAlign: 'center',
    	fontSize: height*0.02
    },

    textInput: {
    	width: width*0.6,
    	height: height*0.09,
    	marginBottom: 0,

    	top: -1*height*0.03,

		// borderRadius: 4,
		// borderWidth: 1,
		// borderColor: 'black',

    },

    modalContent: {
    	marginTop: height*0.01,
    	marginLeft: 0,


		// borderRadius: 4,
		// borderWidth: 1,
		// borderColor: 'black',

    },

    modalHeading: {
    	marginBottom: height*0.05,

		borderRadius: 4,
		borderWidth: 1,
		borderColor: 'black',
    },

    modalTitle: {
    	textAlign: 'center',
    	fontSize: height*0.045,
    },

    modalText: {

    },

    modalAuth: {
    	flexWrap: 'wrap',
    	flexDirection: 'row',

		width: width*0.85,
		height: height*0.05,

		marginLeft: width*0.05,
		marginBottom: height*0.01,

    },
    modalEmail: {
    	marginLeft: width*0.16,
    },
    modalPass: {
    	marginLeft: width*0.089,
    },
    modalButtons:{
    	flexWrap: 'wrap',
    	flexDirection: 'row',

    	width: width*0.3,
    	marginLeft: width*0.4,

    },
    loginView: {
    	marginRight: width*0.03,
    },
    cancelView: {
    	marginLeft: width*0.03,
    },

    accountButtons: {
    	flexWrap: 'wrap',
    	flexDirection: 'row',
    },

});

AppRegistry.registerComponent('MobileMolecularWeight', () => ChemistryApp);