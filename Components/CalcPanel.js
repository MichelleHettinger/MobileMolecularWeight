import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions, Modal, TextInput } from 'react-native';
import Button from 'react-native-button';

import * as firebase from "firebase";
const config = {
  apiKey: "AIzaSyBQUQPgITUNyCSsjufVVhJp-4laWw21QdU",
  authDomain: "mobile-molecular-weight-85984.firebaseapp.com",
  databaseURL: "https://mobile-molecular-weight-85984.firebaseio.com",
  storageBucket: "mobile-molecular-weight-85984.appspot.com",
  messagingSenderId: "837319764944"
};

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class ElementCalculator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      saveModalVisible: false,

      chemicalName: '',
    }


    this.displayElements = this.displayElements.bind(this);

    this.saveModalVisible = this.saveModalVisible.bind(this);
    this.displayModalBody = this.displayModalBody.bind(this);
    this.grabChemicalName = this.grabChemicalName.bind(this);
    this.displaySavedCompounds = this.displaySavedCompounds.bind(this);
    this.loadSavedMolecule = this.loadSavedMolecule.bind(this);
    this.saveMolecule = this.saveMolecule.bind(this);
  }

  displayElements(selectedElements){
    return selectedElements.map( (element, i) => {
      return (
        <View key={i} style={[styles.elementDiv]}>
          <Button key={i} onPress={()=>this.props.getPlusMinus('+', element, i)} style={[styles.plus]}> + </Button>
          <Text style={[styles.centerBlack,{fontSize:height*0.03}]}>
            {element.elementAcronym}
            <Text key={i} style={[styles.subscript]}>
              {this.props.mainState.multipliers[i]}
            </Text>
          </Text>
          <Button onPress={()=>this.props.getPlusMinus("-", element, i)} style={[styles.minus]}> - </Button>
        </View>
      )
    })
  }

  saveModalVisible(visisble){
    this.setState({
      saveModalVisible: visisble,
    });
  }
  grabChemicalName(name){
    //console.log(name)
    this.setState({
      chemicalName:name,
    });
  }
  displayModalBody(){
    const elements = this.props.mainState.elements.map( (element, i) => {
      const multipliers = this.props.mainState.multipliers;
      return (
        <View  key={i}>
          <Text style={[{color:'black'}]} key={i}>
            {element.elementAcronym}
            <Text style={[{color:'black', fontSize: 10}]} key={i}>
              {multipliers[i]}
            </Text>
          </Text>
        </View>
      )
    });

    const total = this.props.mainState.total.toFixed(3);

    return (
      <View>
        <View style={[styles.border,{marginBottom:height*0.01}]}>
          <Text style={[{fontSize:height*0.045}]}>Mobile Molecular Weight</Text>
          <View style={[styles.flexRow, {justifyContent:'center'}]}>
            <Text style={[{color:'black'}]}>Save Your Compound!</Text>
          </View>
        </View>
        <View style={[{marginLeft:width*0.1}]}>
          <View style={[styles.flexRow]}>
            <Text style={[{color:'black', width:width*0.17}]}>Weight: </Text>
            <Text style={[{color:'black'}]}>{total} g/mol</Text>
          </View>
          <View style={[styles.flexRow]}>
            <Text style={[{color:'black', width:width*0.17}]}>Formula: </Text>
            <View style={[styles.flexRow]}>
              {elements}
            </View>
          </View>
          <View style={[styles.flexRow, {width:width}]}>
            <Text style={[{color:'black', width:width*0.17, height:height*0.03, marginTop:height*0.015}]}>Name: </Text>
            <TextInput style={[{width:width*0.5, height:height*0.06}]}
              underlineColorAndroid={'white'}
              autoFocus={true}
              onChangeText={this.grabChemicalName}
              placeholder={"Compound Name"}
            />
            <View style={[styles.border, {height:height*0.037, width:width*0.1, marginTop:height*0.01}]}>
              <Button onPress={this.saveMolecule}>
                <Text style={[{color:'black', textAlign:'center'}]}>
                  Save
                </Text>
              </Button>
            </View>
          </View>
        </View>
      </View>
    )
  }
  displaySavedCompounds(userCompounds){
    if (userCompounds != null) {
      //console.log(userCompounds);
      const compoundsMapped = Object.keys(userCompounds).map( (compoundX, i) => {
        const compoundName = userCompounds[compoundX].chemicalName;
        const compoundTotal = userCompounds[compoundX].total;
        //console.log("---------------");
        //console.log(compoundX + " - " + compoundName + " - " + compoundTotal);
        const molecFormula = userCompounds[compoundX].elements.map( (elements, j) => {
          //console.log(elements)
          //console.log(j)
          const elementAcronym = elements.elementAcronym;
          const elementMultiplier = userCompounds[compoundX].multipliers[j];
          //console.log(elementAcronym + ' ' + elementMultiplier);
          return (
            <Text key={j} style={[{color:'black'}]} >
              {elementAcronym}
              <Text key={j} style={[{fontSize:10}]}>
                {elementMultiplier}
              </Text>
            </Text>
          )
        });
        return (
          <View key={i} style={[styles.border, {marginTop: width*0.05}]}>
            <View key={i} style={[]}>
              <View key={i} style={[]}>
                <Text key={i} style={[{color:'black'}]}>
                  {compoundName} - {compoundTotal} g/mol
                </Text>
              </View>
              <View style={[styles.flexRow]}>
                {molecFormula}
              </View>
            </View>
            <View style={[styles.flexRow, {justifyContent:'center'}]}>
              <View style={[styles.border, {width: width*0.15, marginRight:width*0.05}]}>
                <Button onPress={()=>this.loadSavedMolecule(compoundX)}>
                  <Text style={[{textAlign:'center'}]}>Load</Text>
                </Button>
              </View>
              <View style={[styles.border, {width:width*0.15, marginLeft:width*0.05}]}>
                <Button onPress={()=>this.props.updateDeleted(compoundX)}>
                  <Text style={[{textAlign:'center'}]}>Delete</Text>
                </Button>
              </View>
            </View>
          </View>
        )
      });
      return compoundsMapped;
    }
    else {
      return
    }
  }
  saveMolecule(){
    const userID = this.props.mainState.user.uid;
    //If user has saved compounds, give it a name in database and write
    if (this.props.mainState.userSavedCompounds){
      const compArray = Object.keys(this.props.mainState.userSavedCompounds);
      let compoundNumber = compArray[compArray.length-1];

      compoundNumber = compoundNumber.charAt(compoundNumber.length -1);
      compoundNumber ++;
      compoundNumber = compoundNumber.toString();
      //console.log(compoundNumber)
      //console.log(compArray)
      //map through names. if it exists return true
      const compoundNameExists = Object.keys(this.props.mainState.userSavedCompounds).map( (compoundX, i) => {
        const compoundName = this.props.mainState.userSavedCompounds[compoundX].chemicalName;
        //console.log(compoundName);
        if (compoundName == this.state.chemicalName){
          return true
        }
        else {
          return false
        }
      });
      //console.log(compoundNameExists)
      const nameExists = compoundNameExists.indexOf(true);
      //console.log(nameExists)
      //-1 means that true was not found, meaning that the chosen name has not been used before.
      if ( nameExists == -1 && this.state.chemicalName != '' && this.props.mainState.elements.length != 0 ) {
        //Create a new data entry named compound#
        firebase.database().ref('users/' + userID + '/compounds/compound' + compoundNumber).set({
            chemicalName: this.state.chemicalName,
            elements: this.props.mainState.elements,
            multipliers: this.props.mainState.multipliers,
            total: this.props.mainState.total.toFixed(3),
            //parenMultiplier: this.props.mainState.parenMultiplier,
        }, () => {
            //console.log('Wrote to database');
            firebase.database().ref('users/' + userID + '/compounds').once('value').then( snapshot => {
              //Grab 'snapshot' of the users saved compounds.
              const allCompounds = snapshot.val();
              //console.log(allCompounds);
              //this.setState({chemicalName: ''});
              this.props.updateSaved(allCompounds);
            });
        });
      }
      //Invalid input
      else {
        console.log('invalid input')
      }
    }
    else {
      //Create a new data entry named compound1
      firebase.database().ref('users/' + userID + '/compounds/compound1').set({
          chemicalName: this.state.chemicalName,
          elements: this.props.mainState.elements,
          multipliers: this.props.mainState.multipliers,
          total: this.props.mainState.total.toFixed(3),
          //parenMultiplier: this.props.mainState.parenMultiplier,
      }, () => {
          //console.log('Wrote to database');
          firebase.database().ref('users/' + userID + '/compounds').once('value').then( snapshot => {
            //Grab 'snapshot' of the users saved compounds.
            const allCompounds = snapshot.val();
            //console.log(allCompounds);
            //this.setState({chemicalName: ''});
            this.props.updateSaved(allCompounds);
          });
      });
    }
  }
  loadSavedMolecule (compoundX) {
    //console.log(compoundX)
    this.setState({
      saveModalVisible: false,
    });
    this.props.updateMainState(compoundX)
  }

  render(){
    // Upon tapping a selected atom, loop all atoms
    const elementsToDisplay = this.displayElements(this.props.mainState.elements);
    const userCompounds = this.displaySavedCompounds(this.props.mainState.userSavedCompounds);
    const modalBody = this.displayModalBody();
    //If logged in
    if (this.props.mainState.logged){
      return (
        <View style={[styles.border,{height:height*0.28,width:width*0.96}]}>
          <View style={[styles.flexRow,{marginLeft:width*0.13,height:height*0.031,width:width*0.96}]}>
            <Text style={[styles.centerBlack]}>
              Molecular Weight: {this.props.mainState.total.toFixed(3)} g/mol
            </Text>
            <View>
              <Modal
                animationType={"none"} 
                transparent={false}
                visible={this.state.saveModalVisible}
                onRequestClose={()=>this.saveModalVisible(false)}
              >
                {modalBody}
                {userCompounds}
              </Modal>
            </View>
            <View style={[{marginLeft:width*0.1}]}>
              <Button onPress={()=>this.saveModalVisible(true)}>
                <Text style={{color:'blue'}}>Save</Text>
              </Button>
            </View>
          </View>
          <View style={[styles.flexRow,{marginLeft:width*0.033}]}>
            {elementsToDisplay}
          </View>
        </View>
      )
    }
    return (
      <View style={[styles.border,{height:height*0.28,width:width*0.96}]}>
        <View style={[styles.flexRow,{marginLeft:width*0.13,height:height*0.031,width:width*0.96}]}>
          <Text style={[styles.centerBlack]}>
            Molecular Weight: {this.props.mainState.total.toFixed(3)} g/mol
          </Text>
        </View>
        <View style={[styles.flexRow,{marginLeft:width*0.033}]}>
          {elementsToDisplay}
        </View>
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
  flexRow: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  centerBlack:{
    textAlign: 'center',
    color: 'black',
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