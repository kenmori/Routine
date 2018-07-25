//web
import React, { Component } from "react";
import { Provider } from "react-redux";
import Counter from "./container/Counter";
import PhotoContainer from "./container/Photo";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import { Router, Switch, Route, Link } from "./common/Routing";
import { View, Text, StyleSheet } from "react-native";
import { About } from "./components/About";
import reducer from "./modules";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, {}, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <View style={styles.app}>
            <View style={styles.appHeader}>
              <Text style={styles.appTitle}>Welcome to React</Text>
            </View>
            <Text>SPA Link</Text>
            <Link to="/about">
              <Text>About</Text>
            </Link>
            <Link to="/counter">
              <Text>Counter</Text>
            </Link>
            <Link to="/photo">
              <Text>Photo</Text>
            </Link>
            <Switch>
              <Route path="/about" underlayColor="#f0f4f7" component={About} />
              <Route
                path="/counter"
                underlayColor="#f0f4f7"
                component={Counter}
              />
              <Route
                path="/photo"
                underlayColor="#f0f4f7"
                component={PhotoContainer}
              />
            </Switch>
          </View>
        </Router>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  app: {
    flex: 1
  },
  appHeader: {
    flex: 1,
    backgroundColor: "#222",
    padding: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  appTitle: {
    fontSize: 16,
    color: "white"
  },
  appIntro: {
    flex: 2,
    fontSize: 30,
    textAlign: "center"
  }
});
