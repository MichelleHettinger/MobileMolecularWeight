import React, { Component } from 'react';
import { Text, View, TextInput, Modal, StyleSheet, Dimensions } from 'react-native';
import Button from 'react-native-button';


var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;


export default class loggedOut extends Component {

	constructor(props) {
		super(props);

		this.state = {

			email: '',
			password: '',
			logged: false,
			
			loginModalVisible: false,
			accountModalVisible: false,
		};
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


			if (userData){
				this.setLoginModalVisible(!this.state.loginModalVisible);
				// var uID = userData.uid;
				// var email = userData.email;
				// var displayName = userData.displayName;


				this.setState({
					logged: true,
				});
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


	render(){

		return (
			<View>

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
								<Text style={[styles.modalText]}>Log in or create an account to save your molecules.</Text>
							</View>

							<View style={styles.authFields}>
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

			</View>
		)


	}


}



const styles = StyleSheet.create({
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
    modalText: {
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
    authFields: {
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