import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Greeting, Blinking} from './components/statics/index.js'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Blinking text='INTERESTS' />

        <Greeting name="Alfonso" />
        <Greeting name="Ilhe" />
        <Greeting name="Emilio" />
        <Greeting name="Kevin I" />
        <Greeting name="Kevin II" />
        <Greeting name="Luis" />

        <Text> Shake your phone to open the developer menu. </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
