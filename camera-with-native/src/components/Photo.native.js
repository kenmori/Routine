import React from "react";
import { Router, Switch, Route, Link } from "../common/Routing";
import { UploadButton } from "../common/Button";
import { Image, Platform, View, Text, StyleSheet, Button } from "react-native";
import Dropzone from "react-dropzone";
const Photo = ({ photos, selectPhoto, postPhoto, pickImageForNative }) => (
  <View>
    <Text style={styles.appIntro}>Photo</Text>
    <Text>{Platform.OS === "ios" && "ioss here dayo"}</Text>
    <Link to="/">
      <Text>TOPへ</Text>
    </Link>
    <View>
      {photos.length !== 0 &&
        photos.map((e, i) => (
          <Link target="_blank" key={i} href={photos[i].uri}>
            {/*ここが違うところ*/}
            <Image
              source={{ uri: photos[i].uri }}
              style={{ width: 58, height: 58 }}
            />
          </Link>
        ))}
    </View>
    <Button
      color="#2196f3"
      onPress={() => pickImageForNative()}
      title="Pick on image from camera roll"
    />
    <UploadButton postPhoto={postPhoto} />
  </View>
);

const styles = StyleSheet.create({
  appIntro: {
    color: "red",
    fontSize: 30
  },
  red: {
    color: "red"
  }
});
export { Photo };
