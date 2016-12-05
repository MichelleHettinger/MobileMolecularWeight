import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Button from 'react-native-button';

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
				<Text style={[styles.MWT]}>
					Molecular Weight: {this.props.total.toFixed(3)} g/mol
				</Text>

				{elementsToDisplay}

			</View>

		)
	}
}

const styles = StyleSheet.create({

	MWT: {
		marginBottom: 1,
		height: 20,
		width: 220*1.5,
		textAlign: "center",


	},

	elementDiv: {
		width: 30*1.5,
		height: 50*1.5 ,

		marginTop: 2,
		marginLeft: 1.5,

			borderRadius: 4,
			borderWidth: 1,
			borderColor: 'black',

	},

	plus: {
		margin: 0,
		fontSize: 10*1.5,
	},

	minus: {
		position: "relative",
		top: -10,
		color: 'red',
		fontSize: 15,

	},

	acronym: {
		marginLeft: 8,
		fontSize: 13 *1.5,
		margin: 0,
	},

	subscript: {

		position: 'relative',
		left: 30,
		top: -10,

		fontSize: 10,

		height: 12,
		width: 12,

	},

	calculationPanel: {
		flexWrap: 'wrap',
		flexDirection: 'row',

		height: 120*1.5,
		width: 220*1.5,

		marginBottom: 10,
		marginLeft: 0,

		position: 'relative',
		top: 0,

			borderRadius: 4,
			borderWidth: 1,
			borderColor: 'black',
	},
});