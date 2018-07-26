//web
import React, { Component } from 'react'
import { Router, Switch, Route, Link } from './Routing/Routing'
import { View, Text, StyleSheet } from 'react-native'
import {About} from './components/About'

export default class App extends Component {
  render() {
    return (
      <Router>
        <View style={styles.app}>
          <View style={styles.appHeader}>
             <Text style={styles.appTitle}>Welcome to Reactfaf</Text>
          </View>
          <Text>SPA Link</Text>
          <Link to="/about"><Text>About</Text></Link>
            <Switch>
             <Route path="/about" underlayColor='#f0f4f7' component={About} />
           </Switch>
        </View>
      </Router>
    )
  }
}
const styles = StyleSheet.create({
  app: {
    flex: 1
  },
  appHeader: {
    flex: 1,
    backgroundColor: '#222',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  appTitle: {
    fontSize: 16,
    color: 'white'
  },
  appIntro: {
    flex: 2,
    fontSize: 30,
    textAlign: 'center'
  }
})




