import React, { Component } from 'react';
import {AppRegistry, View, Text, Navigator} from 'react-native';

import ElementsArray from './ElementsArray.js';

export default class ElementSelector extends Component {
	static get defaultProps(){
		return {
			title: 'Something'
		}; 
	}

	render(){


		var elementObject = {

			lettersPressed:[this.props.userInput],
			listElements:[],
			listElements2:[],
			listElements3:[],

			Find: function (){
				if (this.lettersPressed.length == 1){
					this.listElements = [];
					for (i=0; i<ElementsArray.length;i++){
						if (this.lettersPressed[0] == ElementsArray[i].elementName.charAt(0).toLowerCase() || this.lettersPressed[0] == ElementsArray[i].elementAcronym.charAt(0).toLowerCase()){
							this.listElements.push(ElementsArray[i]);
						}
					}
					console.log(this.listElements);
					// this.displayElements(this.listElements);
					return this.listElements;
				}
				else if (this.lettersPressed.length == 2){
					this.listElements2 = [];
					for (i=0;i<this.listElements.length;i++){
						if (this.lettersPressed[1] == this.listElements[i].elementName.charAt(1) || this.lettersPressed[1] == this.listElements[i].elementAcronym.charAt(1)){
							this.listElements2.push(this.listElements[i]);
						}
					}
					console.log(this.listElements2);
					// this.displayElements(this.listElements2);
					return this.listElements2;
				}
				else if (this.lettersPressed.length == 3){
					this.listElements3 = [];
					for (i=0;i<this.listElements2.length;i++){
						if (this.lettersPressed[2] == this.listElements2[i].elementName.charAt(2)){
							this.listElements3.push(this.listElements2[i]);
						}
					}
					console.log(this.listElements3);
					// this.displayElements(this.listElements3);
					return this.listElements3;
				}
			}
		};


		console.log("hello");

		var currentElementsArray = elementObject.Find();

		var listItems = currentElementsArray.map(function(element, i){
			return (
				//element.atomicNumber
				//element.elementAcronym
				<Text style={styles.atom} key={i}>{element.elementName}</Text>
				//element.mass
			)
		})


		return (
			<View>
		        {listItems}
			</View>
		)
	}
}

const styles = StyleSheet.create({
  elementNumber: {
    color: 'red',
  },

  elementAcronym: {

  },

  elementName: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
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