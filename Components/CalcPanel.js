import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions, Modal, TextInput } from 'react-native';
import Button from 'react-native-button';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class ElementCalculator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      saveModalVisible: false,
    }

    this.saveModalVisible = this.saveModalVisible.bind(this);

    this.displayElements = this.displayElements.bind(this);
  }

  displayElements(selectedElements){
    return selectedElements.map( (element, i) => {
      return (
        <View key={i} style={[styles.elementDiv]}>
          <Button key={i} onPress={()=>this.props.getPlusMinus('+', element, i)} style={[styles.plus]}> + </Button>

          <Text style={[styles.acronym]}>

            {element.elementAcronym}

            <Text key={i} style={[styles.subscript]}>
              {this.props.elementMultipliers[i]}
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
    })
  }

  render(){

    // Upon tapping a selected atom, loop all atoms
    const elementsToDisplay = this.displayElements(this.props.selectedElements);

    //If logged in
    if (this.props.logged){
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

          <View>
            <Modal
              animationType={"none"} 
              transparent={false}
              visible={this.state.saveModalVisible}
              onRequestClose={ () => {alert("Modal closed")} }
            >
              <View>
                <View style={[styles.accountModalHeading]}>
                  <Text style={[styles.modalTitle]}>Mobile Molecular Weight</Text>
                  <Text style={[styles.accountModalText]}>Save Your Compound!</Text>
                </View>

                <View style={[styles.accountModalContent]}>

                  <View>

                  </View>


                  <View style={[styles.loginModalButtons]}>

                    <View style={[styles.cancelLoginView]}>
                      <Button onPress={()=>this.saveModalVisible(false)}>
                        <Text style={{color:'black'}}>Close</Text>
                      </Button>
                    </View>

                  </View>

                </View>
              </View>
            </Modal>
          </View>

          <View style={[styles.calcPanelSaveButtonView]}>
            <Button onPress={()=>this.saveModalVisible(true)}>
              <Text style={{color: 'blue'}}>Save</Text>
            </Button>
          </View>

        </View>

        <View style={[styles.elementRows]}>
          {elementsToDisplay}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  accountModalHeading: {
    marginBottom: height*0.01,

    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'black',
  },
  modalTitle: {
    textAlign: 'center',
    fontSize: height*0.045,
    color: 'black',
  },
  accountModalText: {
    color: 'black',
    marginLeft: width*0.28,
  },




  calcPanelSaveButtonView: {
    marginLeft: width*0.1,
  },


  calculationPanel: {
    height: height*0.28,
    width: width*0.96,

    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'black',
  },

  MWTView: {
    flexWrap: 'wrap',
    flexDirection: 'row',

    marginLeft: width*0.13,

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