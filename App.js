import React from 'react';
import {Button,  ScrollView, StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  _handleButtonPress = () => {
    console.log("ifafa")
   };
render() {
 return (
   <View>
     <Button accessibilityLabel="Learn more about" title="Learn More" color="#841584" onPress={this._handleButtonPress} />
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
