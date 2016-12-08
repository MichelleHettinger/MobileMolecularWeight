import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import Button from 'react-native-button';


var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;



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

					<Text style={[styles.acronym]}>

						{element.elementAcronym}

						<Text style={[styles.subscript]}>
							{this.props.elementMultipliers[i]}
						</Text>

					</Text>

					<Button onPress={() => this._handlePress("-", element, i)} style={[styles.minus]}> - </Button>
				</View>
			)
		}.bind(this))

		return (
			<View style={[styles.calculationPanel]}>

				<View style={[styles.MWTView]}>
					<Text style={[styles.MWTText]}>
						Molecular Weight: {this.props.total.toFixed(3)} g/mol
					</Text>
				</View>

				<View style={[styles.elementRows]}>
					{elementsToDisplay}
				</View>

			</View>

		)
	}
}

const styles = StyleSheet.create({
	calculationPanel: {
		height: height*0.28,
		width: width*0.96,

		borderRadius: 4,
		borderWidth: 1,
		borderColor: 'black',
	},

	MWTView: {
		height: height*0.031,
		width: width*0.96,
	},

	MWTText: {
		textAlign: "center",
		color: 'black',
	},

	elementRows: {
		flexWrap: 'wrap',
		flexDirection: 'row',

		marginLeft: width*0.033, 
	},

	elementDiv: {
		width: width*0.11,
		height: height*0.11,

		marginTop: height*0.01,
		marginBottom: 0,

		// borderRadius: 4,
		// borderWidth: 1,
		// borderColor: 'black',

	},

	plus: {
		fontSize: height*0.022,
	},

	minus: {
		color: 'red',
		fontSize: height*0.022,
	},

	acronym: {
		color: 'black',
		textAlign: 'center',
		fontSize: height*0.03,
 	},

	subscript: {
		color: 'black',
		fontWeight: 'bold',

		fontSize: height*0.015,
	},


});