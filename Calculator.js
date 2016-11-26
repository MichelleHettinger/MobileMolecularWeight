import React, { Component } from 'react';
import Button from 'react-native-button';
import {StyleSheet, View, Text} from 'react-native';

// import ElementsArray from './ElementsArray.js';

export default class ElementCalculator extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedAtoms:[],
			atomMultiplier:[],
			total:0,
			baseTotal: 0,
		};
	}

	_handlePress(input, i) {
		if (input == '+'){
			console.log("one more atom")

			console.log(this.state.selectedAtoms)

		}
		else if (input == '-'){
			console.log("one less atom")
		}
	}

	render(){

		var elementsToDisplay = this.props.selectedElements.map(function(element, i){

			return (
				<View key={i} style={[styles.elementDiv]}>
					<Button key={i} onPress={() => this._handlePress('+', i)} style={[styles.plusMinus]}> + </Button>

					<Text style={[styles.acronym]}>{element.elementAcronym}</Text>
					<Text style={[styles.subscript]}>{this.state.atomMultiplier[i]}</Text>

					<Button onPress={() => this._handlePress("-")} style={[styles.plusMinus]}> - </Button>
				</View>
			)
		}.bind(this))

		return (
			<View style={[styles.calculationPanel]}>
				{elementsToDisplay}
			</View>
		)
	}
}

const styles = StyleSheet.create({

	elementDiv: {
		width: 30*1.3,
		height: 50*1.3 ,

			borderRadius: 4,
			borderWidth: 1,
			borderColor: 'black',

	},

	plusMinus: {
		margin: 0,
		fontSize: 10*1.3,
	},

	acronym: {
		marginLeft: 8,
		fontSize: 15 *1.3,
		margin: 0,
	},

	subscript: {

	},

	calculationPanel: {
		flexWrap: 'wrap',
		flexDirection: 'row',

		height: 150,
		width: 440*0.8,
		marginLeft: 5,

		position: 'absolute',
		top: 250,

			borderRadius: 4,
			borderWidth: 1,
			borderColor: 'black',
	},
});