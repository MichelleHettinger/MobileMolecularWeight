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

//Only one instance of firebase can run at a time
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

			newEmail: '',
			newUsername: '',

			logged: false,
			
			loginModalVisible: false,
			accountModalVisible: false,
		};

		this.getKeypress = this.getKeypress.bind(this);
		this.getElement = this.getElement.bind(this);
		this.getEdit = this.getEdit.bind(this);
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

		}).then((userData) => {

			console.log(userData);

			if (userData){
				this.setLoginModalVisible(!this.state.loginModalVisible);

				this.setState({
					logged: true,
				});
			}
			else {
				console.log("Failed to login")
			}
		})
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


	updateProfile(){

		//Listener for firebase user login
		var user = firebase.auth().currentUser;


		user.updateEmail(this.state.newEmail).catch(function(error){
			//Error hapened
			alert("Update error. " + error);

		}).then((result)=>{
			// Update successful.
			console.log("Email Updated")
			console.log(user);
		})
	
	}

	resetPassword(){

		auth.sendPasswordResetEmail(this.state.email).catch(function(error){
			//Error hapened
			alert("Update error. " + error);

		}).then((result)=>{
			// Update successful.
			console.log("Email sent!")
			console.log(result);

		})
	}

	render() {
		//Listener for firebase user login
		var user = firebase.auth().currentUser;

		if (!user){ console.log("Welcome to Mobile Molecular Weight") }

		//If user is logged in
		if (user){
			return (
				<View style={[styles.main]}>
					<View>
						<Modal
							animationType={"none"} 
							transparent={false}
							visible={this.state.accountModalVisible}
							onRequestClose={ () => {alert("Modal closed")} }
						>
							<View>

								<View style={[styles.accountModalHeading]}>
									<Text style={[styles.modalTitle]}>Mobile Molecular Weight</Text>
									<Text style={[styles.accountModalText, {marginLeft: width*0.09}]}>Thank you for using Mobile Molecular Weight!</Text>
								</View>


								<View style={[styles.accountModalContent]}>


									<View >
										<View style={styles.accountAuthFields}>
											<View style={[styles.modalAuth, styles.accountUsername]}>
												<Text style={{color:'black'}}>Username: </Text>
												<TextInput style={[styles.accountTextInput, {marginLeft: width*0.01}]}
													onChangeText={ (text) => this.setState({newUsername: text}) }
													editable={false}
													underlineColorAndroid={'white'}
													placeholder={user.displayName}
												/>
											</View>

											<View style={[styles.modalAuth, styles.accountEmail]}>
												<Text style={{color:'black'}}>Email: </Text>
												<TextInput style={[styles.accountTextInput,  {marginLeft: width*0.1}]}
													underlineColorAndroid={'white'}
													editable = {false}
													placeholder={user.email}
												/>
											</View>
										</View>

										<View style={styles.accountAuthFields}>

											<View style={[styles.modalAuth, styles.newUsername]}>
												<Text style={{color:'black'}}>New Name: </Text>
												<TextInput style={[styles.accountTextInput, {marginLeft: width*0.007}]}
													onChangeText={ (text) => this.setState({newEmail: text}) }
													value={this.state.newUsername}
													placeholder={"Alias"}
												/>
											</View>

											<View style={[styles.modalAuth, styles.newEmail]}>
												<Text style={{color:'black'}}>New Email: </Text>
												<TextInput style={[styles.accountTextInput, {marginLeft: width*0.008}]}
													onChangeText={ (text) => this.setState({newEmail: text}) }
													value={this.state.newEmail}
													placeholder={"Email Address"}
												/>
											</View>
										</View>
									</View>


									<View style={[styles.resetPasswordView]}>
										<Button onPress={ this.resetPassword.bind(this) }>
											<Text style={{color: 'black', textAlign: 'center'}}>Reset Password?</Text>
										</Button>
									</View>

									<View style={styles.accountModalButtons}>
										<View style={[styles.cancelAccountView]}>
											<Button onPress={ ()=>{ this.setAccountModalVisible(!this.state.accountModalVisible)} }>
												<Text style={{color: 'black'}}>Close</Text>
											</Button>
										</View>

										<View style={[styles.submitAccountView]}>
											<Button onPress={ this.updateProfile.bind(this) }>
												<Text style={{color: 'black'}}>Submit</Text>
											</Button>
										</View>			
									</View>

								</View>

							</View>

						</Modal>
					</View>

					<View style={[styles.header]}>

						<Text style={[styles.headerTitle]}>Mobile Molecular Weight</Text>

						<View style={[styles.accountButtons]}>

							<View style={styles.myAccountButtonView}>
								<Button onPress={ () => {this.setAccountModalVisible(true)} }>
									<Text style={{color: 'black'}}>My Account</Text>
								</Button>
							</View>

							<View style={styles.logoutButtonView}>
								<Button onPress={ this.logout.bind(this) }>
									<Text>Log Out</Text>
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
							<View style={[styles.loginModalContent]}>

								<View style={[styles.loginModalHeading]}>
									<Text style={[styles.modalTitle]}>Mobile Molecular Weight</Text>
									<Text style={[styles.loginModalText]}>Log in or create an account to save your molecules.</Text>
								</View>

								<View style={styles.loginAuthFields}>
									<View style={[styles.modalAuth, styles.modalEmail]}>
										<Text style={{color:'black'}}>Email: </Text>
										<TextInput style={[styles.loginTextInput]}
											underlineColorAndroid={'white'}
											autoFocus={true}
											onChangeText={ (text) => this.setState({email: text}) }
											value={this.state.email}
											placeholder={"Email Address"}
										/>
									</View>

									<View style={[styles.modalAuth, styles.modalPass]}>
										<Text style={{color:'black'}}>Password: </Text>
										<TextInput style={[styles.loginTextInput]}
											onChangeText={ (text) => this.setState({password: text}) }
											value={this.state.password}
											secureTextEntry={true}
											placeholder={"Password"}
										/>
									</View>
								</View>

								<View style={[styles.loginModalButtons]}>

									<View style={[styles.signupView]}>
										<Button onPress={this.signup.bind(this)}>
											<Text style={{color:'black'}}>Sign Up</Text>
										</Button>
									</View>

									<View style={[styles.loginView]}>
										<Button onPress={this.login.bind(this)}>
											<Text style={{color:'black'}}>Log In</Text>
										</Button>
									</View>

									<View style={[styles.cancelLoginView]}>
										<Button onPress={ ()=>{ this.setLoginModalVisible(!this.state.loginModalVisible)} }>
											<Text style={{color:'black'}}>Close</Text>
										</Button>
									</View>

								</View>
							</View>
						</Modal>
					</View>

					<View style={[styles.header]}>

						<Text style={[styles.headerTitle]}>Mobile Molecular Weight</Text>

						<View style={[styles.loginHeaderButton]}>
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

	//	Account Modal //
    accountModalContent: {
    	marginTop: height*0.01,
    	marginLeft: 0,
    },
	accountModalHeading: {
    	marginBottom: height*0.01,

		borderRadius: 4,
		borderWidth: 1,
		borderColor: 'black',
	},
    accountModalText: {
    	color: 'black',
    	marginLeft: width*0.06,
    },
    accountTextInput: {
    	width: width*0.6,
    	height: height*0.09,
    	marginBottom: 0,

    	top: -1*height*0.03,
    },
    accountAuthFields: {
		marginLeft: width*0.12,
		marginBottom: height*0.01,

		width: width*0.7,

    },
	accountEmail: {
		marginLeft:0,
	},
	accountUsername:{
		marginBottom: 0,
	},
	newEmail: {
		marginLeft: 0,
	},
	newusername: {

	},
	accountModalButtons: {
		flexWrap: 'wrap',
		flexDirection: 'row',

		height: height*0.04,
		width: width*0.35,
		marginLeft: width*0.32,
	},
	submitAccountView: {
		width: width*0.13,
		marginLeft: width*0.045,
	},
	cancelAccountView: {
		width: width*0.11,
		marginRight: width*0.045,
	},
	resetPasswordView: {

		width: width*0.35,
		marginLeft: width*0.31,
		marginBottom: height*0.05,


		borderRadius: 4,
		borderWidth: 1,
		borderColor: 'black',
	},








    main: {
    	marginTop: height*0.01,
    	marginLeft: width*0.02,
    },

    //Both headers
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
    headerButtonText: {
    	textAlign: 'center',
    	fontSize: height*0.02
    },

    //Both modals
    modalTitle: {
    	textAlign: 'center',
    	fontSize: height*0.045,
    	color: 'black',
    },
    loginModalText: {
    	color: 'black',
    	marginLeft: width*0.06,
    },

    //View tag for login/signup button
    loginHeaderButton: {
    	width: width*0.25,
    	marginLeft: width*0.35,
    },

    //View tag for everything in the login modal
    loginModalContent: {
    	marginTop: height*0.01,
    	marginLeft: 0,


		// borderRadius: 4,
		// borderWidth: 1,
		// borderColor: 'black',
    },

    //View for the heading with login/signup button
    loginModalHeading: {
    	marginBottom: height*0.05,

		borderRadius: 4,
		borderWidth: 1,
		borderColor: 'black',
    },

    //View tag for each auth input element
    loginAuthFields: {
		marginLeft: width*0.15,
		marginBottom: height*0.01,
    },
    modalAuth: {
    	flexWrap: 'wrap',
    	flexDirection: 'row',

		width: width*0.85,
		height: height*0.055,

    },

    //The view tags for input field
    modalEmail: {
    	marginLeft: width*0.16,
    },
    modalPass: {
    	marginLeft: width*0.089,
    },

    //Text box
    loginTextInput: {
    	width: width*0.6,
    	height: height*0.09,
    	marginBottom: 0,

    	top: -1*height*0.03,

		// borderRadius: 4,
		// borderWidth: 1,
		// borderColor: 'black',
    },

    //Log in
    loginModalButtons:{
    	flexWrap: 'wrap',
    	flexDirection: 'row',

    	width: width*0.3,
    	height: height*0.05,
    	marginLeft: width*0.33,


		// borderRadius: 4,
		// borderWidth: 1,
		// borderColor: 'black',

    },

    //View tags for the buttons
    loginView: {

    },
    cancelLoginView: {
    	marginLeft: width*0.08,
    },
    signupView:{
    	marginRight: width*0.03,
    },



    //View tag for logged in header buttons
    accountButtons: {
    	flexWrap: 'wrap',
    	flexDirection: 'row',

    	height: height*0.05,
    },
	myAccountButtonView: {
		width: width*0.23,
		marginLeft: width*0.375,
	},
	logoutButtonView: {
		width: width*0.15,
		marginLeft: width*0.165,
	},




});

AppRegistry.registerComponent('MobileMolecularWeight', () => ChemistryApp);