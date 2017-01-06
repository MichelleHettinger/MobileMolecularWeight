import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import Button from 'react-native-button';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class ElementCalculator extends Component {
constructor(props) {
  super(props);

  this.getPlusMinus = this.getPlusMinus.bind(this);
  this.displayElements = this.displayElements.bind(this);
}
getPlusMinus(input, element, i) {
  //console.log(input)
  this.props.newEdit(input, element, i);
}
displayElements(selectedElements){
  return selectedElements.map( (element, i) => {
    return (
      <View key={i} style={[styles.elementDiv]}>
        <Button key={i} onPress={()=>this.getPlusMinus('+', element, i)} style={[styles.plus]}> + </Button>

        <Text style={[styles.acronym]}>

          {element.elementAcronym}

          <Text key={i} style={[styles.subscript]}>
            {this.props.elementMultipliers[i]}
          </Text>

        </Text>

        <Button onPress={()=>this.getPlusMinus("-", element, i)} style={[styles.minus]}> - </Button>
      </View>
    )
  })
}

  render(){

    const user = this.props.user;

    // Upon tapping a selected atom, loop all atoms
    const elementsToDisplay = this.displayElements(this.props.selectedElements);

    if (user){
      return (
        <View style={[styles.calculationPanel]}>
          <View style={[styles.MWTView]}>
            <Text style={[styles.MWTText]}>
              Molecular Weight: {this.props.total.toFixed(3)} g/mol
            </Text>
          </View>

          <View style={[styles.elementRows]}>
            {elementsToDisplay}
          </View>
        </View>
      )
    }

    return (
      <View style={[styles.calculationPanel]}>
        <View style={[styles.MWTView]}>
          <Text style={[styles.MWTText]}>
            Molecular Weight: {this.props.total.toFixed(3)} g/mol
          </Text>
        </View>

        <View style={[styles.elementRows]}>
          {elementsToDisplay}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  calculationPanel: {
    height: height*0.28,
    width: width*0.96,

    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'black',
  },

  MWTView: {
    height: height*0.031,
    width: width*0.96,
  },

  MWTText: {
    textAlign: "center",
    color: 'black',
  },

  elementRows: {
    flexWrap: 'wrap',
    flexDirection: 'row',

    marginLeft: width*0.033, 
  },

  elementDiv: {
    width: width*0.11,
    height: height*0.11,

    marginTop: height*0.01,
    marginBottom: 0,
  },

  plus: {
    fontSize: height*0.022,
  },

  minus: {
    color: 'red',
    fontSize: height*0.022,
  },

  acronym: {
    color: 'black',
    textAlign: 'center',
    fontSize: height*0.03,
  },

  subscript: {
    color: 'black',
    fontWeight: 'bold',

    fontSize: height*0.015,
  },
});