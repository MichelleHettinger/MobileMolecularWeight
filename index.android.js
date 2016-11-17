import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View } from 'react-native';

import ElementSelector from './ElementSelector.js';
import Keyboard from './Keyboard.js';

class UserInputToElement extends Component {
	constructor(props) {
		super(props);
		this.state = {text: ''};

		this.changeState = this.changeState.bind(this);
	}


	changeState(newText){
		console.log("----------------------")
		console.log(this.state.text)
		console.log(newText)

		if (newText == '<-'){
			totalText = this.state.text.slice(0, -1)
		}
		else {
			totalText = this.state.text + newText;
		}

		this.setState({
			text: totalText
		})
	}

	render() {
		return (
		  <View style={{padding: 10}}>
		   

		    <ElementSelector userInput={this.state.text}/>

		    <Keyboard changeState={this.changeState}/>

		  </View>
		);
	}
}


AppRegistry.registerComponent('MobileMolecularWeight', () => UserInputToElement);