import React, { Component } from 'react';
import {AppRegistry, StyleSheet, View, Text, Navigator, Dimensions} from 'react-native';
import Button from 'react-native-button';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class ElementSelector extends Component {
  constructor(props) {
    super(props);
    this.displayElementsFound = this.displayElementsFound.bind(this);
  }

  displayElementsFound(elementsFound){
    return elementsFound.map( (element, i) => {
      return (
        <Button containerStyle={{width: width*0.232, height:width*0.22}} key={i} onPress={()=>this.props.getElement(element)}>
          <View style={[styles.elementDiv,styles.border]} key={i}>
            <Text style={[styles.elementNumber,styles.elementFont]} key={i}>{element.atomicNumber}</Text>
            <Text style={[styles.elementAcronym,styles.elementFont]}>{element.elementAcronym}</Text>
            <Text style={[styles.elementName,styles.elementFont]}>{element.elementName}</Text>
            <Text style={[styles.elementMass,styles.elementFont]}>{element.mass.toFixed(3)}</Text>
          </View>
        </Button>
      )
    })
  }

  render(){
    //Map through the array of elements found and display them
    const elementsFound = this.displayElementsFound(this.props.elementsFound);
    //Render the elementsFound 'div'
    return (
      <View style={[styles.allElements,styles.border]}>
           {elementsFound}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  border: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'black',
  },
  allElements: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    height: height*0.38,
    width: width*0.96,
  },
  elementFont: {
    color: "black",
    fontFamily: "Helvetica",
  },
  elementDiv:{
    marginTop: height*0.005,
    marginLeft: width*0.023,
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
    fontSize: height*0.019,
  },
  elementMass: {
    textAlign: "center",
    fontSize: height*0.018,
  }
});
