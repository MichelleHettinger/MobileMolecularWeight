import React, { Component } from 'react';
import Button from 'react-native-button';
import {StyleSheet, View, Text} from 'react-native';

export default class ElementCalculator extends Component {
	constructor(props) {
		super(props);
	}

	_handlePress(input, element, i) {
		this.props.newEdit(input, element, i);
	}


	render(){


		// Upon tapping a selected atom, loop all atoms
		var elementsToDisplay = this.props.selectedElements.map(function(element, i){

			return (
				<View key={i} style={[styles.elementDiv]}>
					<Button key={i} onPress={() => this._handlePress('+', element, i)} style={[styles.plus]}> + </Button>

					<Text style={[styles.acronym]}>{element.elementAcronym}</Text>
					<Text style={[styles.subscript]}>{this.props.elementMultipliers[i]}</Text>

					<Button onPress={() => this._handlePress("-", element, i)} style={[styles.minus]}> - </Button>
				</View>
			)
		}.bind(this))

		return (
			<View style={[styles.calculationPanel]}>
				{elementsToDisplay}

				<Text>
					{this.props.total.toFixed(3)}
				</Text>

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

	plus: {
		margin: 0,
		fontSize: 10*1.3,
	},

	minus: {
		position: "relative",
		top: -10,
		color: 'red',
		fontSize: 15,

	},

	acronym: {
		marginLeft: 8,
		fontSize: 15 *1.3,
		margin: 0,
	},

	subscript: {

		position: 'relative',
		left: 25,
		top: -5,

		fontSize: 10,

		height: 12,
		width: 12,

	},

	calculationPanel: {
		flexWrap: 'wrap',
		flexDirection: 'row',

		height: 150,
		width: 430*0.8,
		marginLeft: 0,

		position: 'absolute',
		top: 250,

			borderRadius: 4,
			borderWidth: 1,
			borderColor: 'black',
	},
});