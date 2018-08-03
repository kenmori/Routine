import React from "react";
import { Router, Switch, Route, Link } from "../common/Routing";
import { Platform, View, Text, StyleSheet, Button } from "react-native";

const Photo = ({ selectPhoto, postPhoto, onChange }) => (
  <React.Fragment>
    <Text style={styles.appIntro}>Photo</Text>
    <Text>{Platform.OS === "web" && "web is here"}</Text>
    <Text>{Platform.OS === "ios" && "ios is here"}</Text>
    <Link to="/">
      <Text>TOPへ</Text>
    </Link>
    <input type="file" onChange={selectPhoto} />
    <Button onPress={() => postPhoto()} title="upload" />
  </React.Fragment>
);

const styles = StyleSheet.create({
  appIntro: {
    color: "red",
    fontSize: 30
  }
});
export { Photo };
