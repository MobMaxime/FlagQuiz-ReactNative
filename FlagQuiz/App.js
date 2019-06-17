
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {createStackNavigator,createAppContainer} from 'react-navigation';
import MainPage from './src/screen/MainPage';
import FlagQuiz from './src/screen/FlagQuiz';
import { MenuProvider } from 'react-native-popup-menu';

export default class App extends Component{
  render() {
    return (
        <MenuProvider>
            <AppContainer />
        </MenuProvider>

    );
  }
}
const AppNavigator = createStackNavigator({
  MainPage:MainPage,
  FlagQuiz:FlagQuiz,
})

const AppContainer = createAppContainer(AppNavigator)
