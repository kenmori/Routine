import React from "react";
import { Router, Switch, Route, Link } from "../common/Routing";
import {
  TextInput,
  Platform,
  View,
  Text,
  StyleSheet,
  Button
} from "react-native";

const Photo = ({ onChange }) => (
  <React.Fragment>
    <Text style={styles.appIntro}>Photo</Text>
    <Text>{Platform.OS === "web" && "web is here"}</Text>
    <Text>{Platform.OS === "ios" && "ios is here"}</Text>
  </React.Fragment>
);

const styles = StyleSheet.create({
  appIntro: {
    color: "red",
    fontSize: 30
  }
});
export { Photo };
