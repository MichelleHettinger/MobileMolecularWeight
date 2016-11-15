import React, { Component } from 'react';
import {View, Text, Navigator} from 'react-native';

export default class ElementSelector extends Component {
	static get defaultProps(){
		return {
			title: 'Something'
		};
	}


	render(){

		let newText;


		if (this.props.userInput == 'a'){
			newText = "it works";
		}

		return (
			<View>
		        <Text style={{padding: 10, fontSize: 42}}>
		          {newText}
		        </Text>
			</View>
		)
	}
}