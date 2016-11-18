import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View } from 'react-native';

import ElementSelector from './ElementSelector.js';
import Keyboard from './Keyboard.js';
import Calculator from './Calculator.js';

class UserInputToElement extends Component {
	constructor(props) {
		super(props);
		this.state = {text: '', elements: [], multiplier:[]};

		this.getKeypress = this.getKeypress.bind(this);
		this.getElement = this.getElement.bind(this);
	}


	getKeypress(newText){
		console.log("----------------------")
		console.log("User pressed a letter")
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

	getElement(newElement){
		console.log("----------------------");
		console.log("User selected an element");
		console.log(newElement);

		this.state.elements.push(newElement);
		this.state.multiplier.push(1);


		console.log(this.state.elements);
		console.log(this.state.multiplier);


	}

	render() {
		return (

		  <View style={{padding: 10}}>
		   
		    <ElementSelector userInput={this.state.text} newElement={this.getElement}/>

		    <Calculator selectedElements={this.state.elements} elementMultipliers={this.state.multiplier}/>

		    <Keyboard newKeyPress={this.getKeypress}/>

		  </View>
		);
	}
}


AppRegistry.registerComponent('MobileMolecularWeight', () => UserInputToElement);