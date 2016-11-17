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
				console.log(listElements);
				return listElements;
			}
			else if (userInput.length == 2){
				console.log(listElements2);
				return listElements2;
			}
			else if (userInput.length == 3){
				console.log(listElements3);
				return listElements3;
			}
			else if (userInput.length >= 4){
				return listElements3;
			}

		}

		//Map through the array of elements found and display them
		var elementsFound = findElements(this.props.userInput).map(function(element, i){
			return (
				
				<View style={styles.elementDiv} key={i}>
					<Text style={[styles.elementNumber, styles.elementFont]} key={i}>{element.atomicNumber}</Text>
					<Text style={[styles.elementAcronym, styles.elementFont]}>{element.elementAcronym}</Text>
					<Text style={[styles.elementName, styles.elementFont]}>{element.elementName}</Text>
					<Text style={[styles.elementMass, styles.elementFont]}>{element.mass.toFixed(3)}</Text>
				</View>
			)
		})

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



		height: 280*0.8,
		width: 440*0.8,

		marginBottom:0,

			// borderRadius: 4,
			// borderWidth: 1,
			// borderColor: 'black',

	},

	elementFont: {
		color: "black",
		fontFamily: "Helvetica",

	},

	elementDiv:{
		width: 80*0.8,
		height: 80*0.8,
		marginTop: 2,
		marginLeft: 5,
		marginRight:0,
		marginTop:5,
		marginBottom: 5,

		borderRadius: 4,
		borderWidth: 1,
		borderColor: 'black',

		backgroundColor: '#499AB5FF',

	},
	elementNumber: {
		fontSize: 10*0.8,
		marginLeft: 2,
	},
	elementAcronym: {
		textAlign: "center",
		fontSize: 18*0.8,
	},
	elementName: {
		textAlign: "center",
		fontSize: 15*0.8,
	},
	elementMass: {
		textAlign: "center",
		fontSize: 12*0.8,
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