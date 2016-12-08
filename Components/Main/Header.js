import React, { Component } from 'react';
import { Text, View, Navigator, StyleSheet, Dimensions } from 'react-native';
import Button from 'react-native-button';

var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

export default class UserInputToElement extends Component {
	constructor(props) {
		super(props);

	}
	
	render() {
		return (

		  <View style={[styles.all]}>

		  	<Text>This is my header</Text>

		  </View>
		);
	}
}

const styles = StyleSheet.create({
    all: {

		width: width*0.96,
		height: height*0.08,


		borderRadius: 4,
		borderWidth: 1,
		borderColor: 'black',

    },


});