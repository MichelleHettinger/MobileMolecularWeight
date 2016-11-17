import React, { Component } from 'react';
import Button from 'react-native-button';
import {View, StyleSheet} from 'react-native';

import ElementSelector from './ElementSelector.js';

export default class KeyboardComponent extends Component {
  constructor(props, context) {
    super(props, context);
  }
  _handlePress(input) {
  	this.props.changeState(input)
    // console.log('Pressed: ' + input);
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
	        styleDisabled={{color: 'red'}}
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
    		<View style={[styles.row]}>{mapRow1}</View>
    		<View style={[styles.row, styles.row2]}>{mapRow2}</View>
    		<View style={[styles.row, styles.row3]}>{mapRow3}</View>
    	</View>
    );
  }
};

const styles = StyleSheet.create({

	button:{

		color: "white",
		backgroundColor: "grey",

		width: 30*0.85,
		height: 35*0.85,
		fontSize: 20*0.85,

		paddingTop: 2.5,
		paddingBottom: 5,
		marginLeft: 5,
		marginBottom: 5,
	},


	allRows: {
		position: 'absolute',
		bottom: -250,
		left: 30,

	},

	row: {
		flexDirection: 'row',
	},

	row2: {
		marginLeft: 15*0.85,
	},

	row3: {
		marginLeft: 35*0.85,
	}


});