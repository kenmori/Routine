import React from "react";
import { Router, Switch, Route, Link } from "../common/Routing";
import { Platform, View, Text, StyleSheet, Button } from "react-native";

const Photo = ({ selectPhoto, postPhoto }) => (
  <View>
    <Text style={styles.appIntro}>Photo</Text>
    <Text>{Platform.OS === "web" && "web is here"}</Text>
    <Text>{Platform.OS === "ios" && "ios is here"}</Text>
    <Link to="/">
      <Text>TOPへ</Text>
    </Link>
    <Button onPress={() => selectPhoto()} title="select" />
    <Button onPress={() => postPhoto()} title="upload" />
  </View>
);

const styles = StyleSheet.create({
  appIntro: {
    color: "red",
    fontSize: 30
  }
});
export { Photo };
