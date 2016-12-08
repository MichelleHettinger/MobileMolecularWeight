import React, { Component } from 'react';
import {AppRegistry, StyleSheet, View, Text, Navigator, Dimensions} from 'react-native';
import Button from 'react-native-button';

import ElementsArray from './ElementsArray.js';


var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;


export default class ElementSelector extends Component {
	constructor(props) {
		super(props);
	}
	_handlePress(input) {
		this.props.newElement(input)
	}
	render(){
		function findElements (userInput){

			var listElements = [];
			var listElements2 = [];
			var listElements3 = [];

			// Loop through every typed letter
			for (i=0; i<userInput.length; i++){

				if (i==0){
					//Loop through all elements
					for (j=0; j<ElementsArray.length;j++){
						//If the letters at position i match, push that element to the array
						if (userInput.charAt(i) == ElementsArray[j].elementName.charAt(i).toLowerCase() || userInput.charAt(i) == ElementsArray[j].elementAcronym.charAt(i).toLowerCase()){
							listElements.push(ElementsArray[j]);
						}	
					}					
				}

				else if (i==1){
					//Loop through the first list of elements
					for (j=0; j<listElements.length;j++){
						//If the letters at position i match, push that element to a new array
						if (userInput.charAt(i) == listElements[j].elementName.charAt(i).toLowerCase() || userInput.charAt(i) == listElements[j].elementAcronym.charAt(i).toLowerCase()){
							listElements2.push(listElements[j]);
						}	
					}
				}

				else if (i==2){
					//Loop through the second list of elements
					for (j=0; j<listElements2.length;j++){
						//If the letters at position i match, push that element to a new array
						if (userInput.charAt(i) == listElements2[j].elementName.charAt(i).toLowerCase() || userInput.charAt(i) == listElements2[j].elementAcronym.charAt(i).toLowerCase()){
							listElements3.push(listElements2[j]);
						}	
					}
				}
			
			}

			//Depending on how many letters were typed in, display the appropriate array
			if (userInput.length == 0){
				return listElements;
			}
			else if (userInput.length == 1){
				//console.log(listElements);
				return listElements;
			}
			else if (userInput.length == 2){
				//console.log(listElements2);
				return listElements2;
			}
			else if (userInput.length == 3){
				//console.log(listElements3);
				return listElements3;
			}
			else if (userInput.length >= 4){
				return listElements3;
			}
		}

		//Map through the array of elements found and display them
		var elementsFound = findElements(this.props.userInput).map(function(element, i){
			return (
				<Button containerStyle={{height:80}} key={i} onPress={() => this._handlePress(element)}>
					<View style={styles.elementDiv} key={i}>
						<Text style={[styles.elementNumber, styles.elementFont]} key={i}>{element.atomicNumber}</Text>
						<Text style={[styles.elementAcronym, styles.elementFont]}>{element.elementAcronym}</Text>
						<Text style={[styles.elementName, styles.elementFont]}>{element.elementName}</Text>
						<Text style={[styles.elementMass, styles.elementFont]}>{element.mass.toFixed(3)}</Text>
					</View>
				</Button>
			)
		}.bind(this))

		//Render the elementsFound 'div'
		return (
			<View style={styles.allElements}>
		       {elementsFound}
	        </View>
		)
	
	}
}

const styles = StyleSheet.create({

	allElements: {
		flexWrap: 'wrap',
		flexDirection: 'row',

		height: height*0.38,
		width: width*0.96,

		borderRadius: 4,
		borderWidth: 1,
		borderColor: 'black',
	},

	elementFont: {
		color: "black",
		fontFamily: "Helvetica",

	},

	elementDiv:{
		width: width*0.21,
		height: width*0.21,
		marginTop: height*0.005,
		marginLeft: width*0.023,

		borderRadius: 4,
		borderWidth: 1,
		borderColor: 'black',

		backgroundColor: '#499AB5FF',

	},


	elementNumber: {
		fontSize: height*0.011,
		marginLeft: width*0.011,
	},
	elementAcronym: {
		textAlign: "center",
		fontSize: height*0.03,
	},
	elementName: {
		textAlign: "center",
		fontSize: height*0.02,
	},
	elementMass: {
		textAlign: "center",
		fontSize: height*0.018,
	}

});
