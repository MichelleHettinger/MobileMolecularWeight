import React, { Component } from 'react';
import {AppRegistry, StyleSheet, View, Text, Navigator} from 'react-native';

import ElementsArray from './ElementsArray.js';

export default class ElementSelector extends Component {
	static get defaultProps(){
		return {
			title: 'Something'
		}; 
	}

	render(){

		function findElements (userInput){

			var listElements = [];
			var listElements2 = [];
			var listElements3 = [];


			//If the user has typed in one letter
			//Empty out the listElements array
			//Loop through all elements,
			//If the first letter in the elements acronym OR the elements name is equal to the user input,
			//push that into the listElements array
			//Log out the list and return it

			//The else's follow the same logic, except the matching element comes from the listElements array
			//and is pushed into the listElements2 array (for 2 letters).

			if (userInput.length == 0){
				return listElements;
			}

			else if (userInput.length == 1){
				listElements = [];
				for (i=0; i<ElementsArray.length;i++){
					if (userInput.charAt(0) == ElementsArray[i].elementName.charAt(0).toLowerCase() || userInput.charAt(0) == ElementsArray[i].elementAcronym.charAt(0).toLowerCase()){
						listElements.push(ElementsArray[i]);
					}
				}
				console.log(listElements);
				return listElements;
			}

			else if (userInput.length == 2){
				listElements2 = [];
				for (i=0;i<listElements.length;i++){
					if (userInput.charAt(1) == listElements[i].elementName.charAt(1) || userInput.charAt(1) == listElements[i].elementAcronym.charAt(1)){
						listElements2.push(listElements[i]);
					}
				}
				console.log(listElements2);
				return listElements2;
			}

			else if (userInput.length == 3){
				listElements3 = [];
				for (i=0;i<listElements2.length;i++){
					if (userInput.charAt(2) == listElements2[i].elementName.charAt(2)){
						listElements3.push(listElements2[i]);
					}
				}
				console.log(listElements3);
				return listElements3;
			}
		}


		//Just trying to see where i can find the mobile debug log.
		console.log("hello");

		//Map through the array of elements found and display them
		var elementsFound = findElements(this.props.userInput).map(function(element, i){
			return (
				
				<View style={styles.elementDiv} key={i}>
					<Text style={styles.elementNumber} key={i}>{element.atomicNumber}</Text>
					<Text style={styles.elementAcronym}>{element.elementAcronym}</Text>
					<Text style={styles.elementName}>{element.elementName}</Text>
					<Text style={styles.elementMass}>{element.mass}</Text>
				</View>
			)
		})

		//Render the elementsFound 'div'
		return (
			<View>
		       {elementsFound}
	        </View>
		)
	}
}

const styles = StyleSheet.create({

	elementDiv:{
		width: 100,
		borderRadius: 4,
		borderWidth: 0.75,
		borderColor: 'black',

	},
	elementNumber: {

	},
	elementAcronym: {

	},
	elementName: {

	},
	elementMass: {

	}

});





// var elementsPanel = {
// 	backSpace: function(){
// 		$("#elements-found").empty();

// 		if (this.lettersPressed.length > 0){
// 			this.lettersPressed.pop();

// 			console.log("After deleting: " + this.lettersPressed);
// 			console.log(this.lettersPressed);

// 			$("#current-letters").text(this.lettersPressed.join(" "));

// 			this.findElement();
// 		}
// 		if (this.lettersPressed.length == 0){
// 			$("#current-letters").text("Search");
// 		}
// 	},
// 	displayElements: function(elementsArray){
// 		$("#elements-found").empty();

// 		for(var i=0; i<elementsArray.length; i++){

// 			var elementP = 
// 			$(
// 				"<p id='atomic-number-p'>" + elementsArray[i].atomicNumber + "</p>" +
// 				"<h2 id='acronym-h2'>" + elementsArray[i].elementAcronym + "</h2>" +
// 				"<p id='name-p'>" + elementsArray[i].elementName + "</p>" +
// 				"<p id='mass-p'>" + elementsArray[i].mass + "</p>"
// 			);


// 			var elementDiv = $("<div>");
// 			elementDiv.addClass("col-sm-4 clickableElement box");
// 			elementDiv.attr("data-atom", elementsArray[i].atomicNumber);
// 			elementDiv.append(elementP);


// 			$("#elements-found").append(elementDiv);
// 		}
// 	},
// }