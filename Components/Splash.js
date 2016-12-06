import React, { Component } from 'react';
import { Text, TextInput, View, Navigator, StyleSheet, Dimensions } from 'react-native';
import Button from 'react-native-button';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class Splash extends Component {

	componentWillMount(){
		var navigator = this.props.navigator;

		// setTimeout(() => {

		// 	navigator.replace({id: 'Login'});

		// }, 1000)
	}


	render(){
		return (
			<Navigator renderScene = {this.renderScene.bind(this)}/>
		)
	}


	renderScene(route, navigator){
		return (
			<View>

				<View style={[styles.authView]}>
					<Button onPress={this.goToLogin.bind(this)}><Text style={[styles.buttonText, styles.loginText]}>Log In</Text></Button>
					<Button onPress={this.goToSignUp.bind(this)} ><Text style={[styles.buttonText, styles.signupText]}>Sign Up</Text></Button>
				</View>

				<View style={[styles.startView]}>
					<Button onPress={this.goToMain.bind(this)}><Text style={[styles.buttonText, styles.startText]}>Just Start</Text></Button>
				</View>
			</View>



		)

	}

	goToLogin(){
		this.props.navigator.push({
			id: 'LoginPage',
			name: 'Login',
		})
	}

	goToMain(){
		this.props.navigator.push({
			id: 'MainPage',
			name: 'Main',
		})
	}

	goToSignUp(){
		this.props.navigator.push({
			id: 'SignupPage',
			name: 'Signup',
		})
	}
}

const styles = StyleSheet.create({

	buttonText: {
		fontSize: 30,
		textAlign: 'center',


		paddingLeft: 3,
		paddingRight: 3,
		backgroundColor: '#499AB5FF',
		borderRadius: 4,		
	},

	authView: {
		flexWrap: 'wrap',
		flexDirection: 'row',

		position: 'absolute',
		left: width*0.18,
		top: height*0.3,
	},

	startView:{
		width: width*0.37,
		height: height*0.2,

		position: 'absolute',
		top: height*0.5,
		left: width*0.28,

	},


	loginText: {
		marginRight: width*0.05,

	},

	signupText:{
		marginLeft: width*0.05,
	},

	startText: {


	},
});