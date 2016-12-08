import React, { Component } from 'react';
import Button from 'react-native-button';
import { Text, View, StyleSheet, Dimensions } from 'react-native';

import ElementSelector from './ElementSelector.js';


var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;



export default class KeyboardComponent extends Component {
	constructor(props, context) {
		super(props, context);
	}
	_handlePress(input) {
		this.props.newKeyPress(input)
	}
 
render() {

	var keyRow1 = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
	var keyRow2 = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
	var keyRow3 = ['z', 'x', 'c', 'v', 'b', 'n', 'm', '<-'];


	var mapRow1 = keyRow1.map(function(letter, i){
    return (
      <Button
      	key={i}
        style={[styles.button]}
        onPress={() => this._handlePress(letter.toLowerCase())}>

        {letter.toUpperCase()}

      </Button>
    );
	}.bind(this));

	var mapRow2 = keyRow2.map(function(letter, i){
    return (
      <Button
      	key={i}
        style={[styles.button]}
        styleDisabled={{color: 'red'}}
        onPress={() => this._handlePress(letter.toLowerCase())}>
        {letter.toUpperCase()}
      </Button>
    );
	}.bind(this));

	var mapRow3 = keyRow3.map(function(letter, i){
    return (
      <Button
      	key={i}
        style={[styles.button]}
        styleDisabled={{color: 'red'}}
        onPress={() => this._handlePress(letter.toLowerCase())}>
        {letter.toUpperCase()}
      </Button>
    );
	}.bind(this));


	return (
		<View style={[styles.allRows]} >

			<View style={[styles.inputView]}>
				<Text style={[styles.inputText]}>{this.props.userInput.toUpperCase()}</Text>
			</View>

			<View>
				<View style={[styles.row1]}>{mapRow1}</View>
				<View style={[styles.row2]}>{mapRow2}</View>
				<View style={[styles.row3]}>{mapRow3}</View>
			</View>


		</View>
	);
}
};

const styles = StyleSheet.create({
	allRows: {
		width: width*0.96,

		// borderRadius: 4,
		// borderWidth: 1,
		// borderColor: 'black',
	},

	button:{
		color: "white",
		backgroundColor: "grey",

		width: width*0.08,
		height: height*0.045,
		fontSize: height*0.03,

		marginLeft: width*0.006,
		marginRight: width*0.006,
	},

	inputText:{
		textAlign: 'center',
	},
	inputView:{
		height: height*0.03,
	},

	row1: {
		flexDirection: 'row',
		marginTop: height*0.006,
		marginBottom: height*0.003,
		marginLeft: width*0.018,
	},

	row2: {
		flexDirection: 'row',
		marginTop: height*0.006,
		marginBottom: height*0.006,
		marginLeft: width*0.065,
	},

	row3: {
		flexDirection: 'row',
		marginTop: height*0.003,
		marginBottom: height*0.006,
		marginLeft: width*0.12,

	}
});