import React from "react";
import { Router, Switch, Route, Link } from "../common/Routing";
import { View, Text, StyleSheet } from "react-native";

const About = () => (
  <View>
    <Text style={styles.appIntro}>About</Text>
    <Link to="/">
      <Text>TOPへ</Text>
    </Link>
  </View>
);

const styles = StyleSheet.create({
  appIntro: {
    color: "red",
    fontSize: 30
  }
});
export { About };
