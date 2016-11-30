import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View } from 'react-native';

import ElementSelector from './ElementSelector.js';
import Keyboard from './Keyboard.js';
import CalculatorPanel from './Calculator.js';

class UserInputToElement extends Component {
	constructor(props) {
		super(props);
		this.state = {text: '', elements: [], multiplier:[]};

		this.getKeypress = this.getKeypress.bind(this);
		this.getElement = this.getElement.bind(this);
		this.getEdit = this.getEdit.bind(this);
	}


	getKeypress(newText){
		console.log("------------------------------------------");
		console.log(this)
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
		console.log("User selected an element");
		console.log(newElement);

		this.state.elements.push(newElement);
		this.state.multiplier.push(1);

		console.log(this.state)

	}


	getEdit(input, element, i){
		console.log("------------------------------------------");
		
		console.log(input + " one " + element.elementName + " at position: " + i);

		if (input == '+'){
			this.state.multiplier[i] += 1;
		}
		else if (input == '-'){
			this.state.multiplier[i] -= 1;
		}


		if (this.state.multiplier[i] == 0){

			this.state.multiplier.pop(i);
			this.state.elements.pop(i);
		}
		
		console.log(this.state);
	}


	render() {
		return (

		  <View style={{padding: 10}}>
		   
		    <ElementSelector userInput={this.state.text} newElement={this.getElement}/>

		    <CalculatorPanel selectedElements={this.state.elements} elementMultipliers={this.state.multiplier} newEdit={this.getEdit}/>

		    <Keyboard newKeyPress={this.getKeypress}/>

		  </View>
		);
	}
}


AppRegistry.registerComponent('MobileMolecularWeight', () => UserInputToElement);