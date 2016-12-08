import React, { Component } from 'react';
import { AppRegistry, Navigator, Text, View } from 'react-native';
import Button from 'react-native-button';


//Navigatible Components
import Main from './Components/Main.js';
import Login from './Components/Auth/Login.js';


class ChemistryApp extends Component {

	render (){

		return (
			<Navigator

				initialRoute={{id: 'MainPage', name: 'Index'}}
				renderScene = {this.renderScene.bind(this)}

				configureScene={(route) => {

					if (route.sceneConfig){
						return route.sceneConfig;
					}

					return Navigator.SceneConfigs.FloatFromRight;

				}}
			/>
		)
	}


	renderScene(route, navigator){0

		var routeId = route.id;

		if (routeId === 'MainPage'){
			return (
				<Main navigator={navigator} />
			)
		};
		if (routeId === 'LoginPage'){
			return (
				<Login navigator={navigator} />
			)
		};

		//return this.noRoute(navigator);
	}


	// noRoute(navigator){
	// 	return (
	// 		<View>
	// 			<Button onPress={()=>navigator.pop()}>
	// 				<Text>Go back</Text>
	// 			</Button>
	// 		</View>

	// 	)
	// }

}

AppRegistry.registerComponent('MobileMolecularWeight', () => ChemistryApp);