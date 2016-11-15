import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View } from 'react-native';

import ElementSelector from './ElementSelector.js';


class UserInputToElement extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  render() {
    return (
      <View style={{padding: 10}}>
        <TextInput
          style={{height: 40}}
          placeholder="Type here to find an element!"
          onChangeText={(text) => this.setState({text})}
        />

        <ElementSelector userInput={this.state.text}/>

      </View>
    );
  }
}



AppRegistry.registerComponent('MobileMolecularWeight', () => UserInputToElement);