import React from "react";
import { Router, Switch, Route, Link } from "../common/Routing";
import { UploadButton } from "../common/Button";
import { Image, Platform, View, Text, StyleSheet, Button } from "react-native";
import Dropzone from "react-dropzone";
const Photo = ({ entities, photos, selectPhoto, postPhoto }) => (
  <View>
    <Text style={styles.appIntro}>Photo</Text>
    <Text>{Platform.OS === "web" && "web is here"}</Text>
    <Text>db.json内の写真を表示しています。respon値に置き換えてください</Text>
    {entities.length !== 0 &&
      entities.map((e, i) => (
        <a target="_blank" key={i} href={e.src}>
          <img width="50%" src={e.src} />
        </a>
      ))}
    <Link to="/">
      <Text>TOPへ</Text>
    </Link>
    <Dropzone onDrop={selectPhoto} multiple={true} />
    <div>
      {photos.length !== 0 &&
        photos.map((e, i) => (
          <a target="_blank" key={i} href={photos[i].preview}>
            <img width="50%" src={photos[i].preview} />
          </a>
        ))}
    </div>
    <UploadButton postPhoto={postPhoto} />
  </View>
);

const styles = StyleSheet.create({
  appIntro: {
    color: "red",
    fontSize: 30
  }
});
export { Photo };
