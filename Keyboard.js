import React, { Component } from 'react';
import Button from 'react-native-button';
import {View, StyleSheet} from 'react-native';

export default class ExampleComponent extends Component {
  constructor(props, context) {
    super(props, context);
  }
  _handlePress() {
    console.log('Pressed!');
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
	        onPress={() => this._handlePress()}>
	        {letter.toUpperCase()}
	      </Button>
	    );
  	});

  	var mapRow2 = keyRow2.map(function(letter, i){
	    return (
	      <Button
	      	key={i}
	        style={[styles.button]}
	        styleDisabled={{color: 'red'}}
	        onPress={() => this._handlePress()}>
	        {letter.toUpperCase()}
	      </Button>
	    );
  	});

  	var mapRow3 = keyRow3.map(function(letter, i){
	    return (
	      <Button
	      	key={i}
	        style={[styles.button]}
	        styleDisabled={{color: 'red'}}
	        onPress={() => this._handlePress()}>
	        {letter.toUpperCase()}
	      </Button>
	    );
  	});




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
		fontSize: 20,
		color: "white",
		backgroundColor: "grey",
		width: 30,
		height: 35,

		paddingTop: 2.5,
		paddingBottom: 5,

		marginLeft: 5,
		marginBottom: 5,
	},


	allRows: {
		position: 'absolute',
		bottom: -250,
		left: 12,

	},

	row: {
		flexDirection: 'row',
	},

	row2: {
		marginLeft: 15,
	},

	row3: {
		marginLeft: 35,
	}


});