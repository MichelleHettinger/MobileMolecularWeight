import React, { Component } from 'react';
import Button from 'react-native-button';
import { Text, View, StyleSheet, Dimensions } from 'react-native';

import ElementSelector from './ElementSelector.js';


var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;



export default class KeyboardComponent extends Component {
	constructor(props, context) {
		super(props, context);

    this.getKeyPress = this.getKeyPress.bind(this);
    this.mapAllRows = this.mapAllRows.bind(this);

	}
	getKeyPress(input) {
    //Goes to index.android.js
		this.props.newKeyPress(input)
	}

  mapAllRows(row){

    return row.map((letter, i)=>{
      return (
        <Button
          key={i}
          style={[styles.button]}
          onPress={()=>this.getKeyPress(letter.toLowerCase())}>

          {letter.toUpperCase()}

        </Button>
      );
    });

  }
 
  render() {
    const mapRow1 = this.mapAllRows(['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p']);
    const mapRow2 = this.mapAllRows(['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l']);
    const mapRow3 = this.mapAllRows(['z', 'x', 'c', 'v', 'b', 'n', 'm', '<-']);

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