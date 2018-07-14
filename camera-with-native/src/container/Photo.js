import React from "react";
import { connect } from "react-redux";
import { Platform, View, Button, Text } from "react-native";
import { Photo } from "../components/Photo";
import { request, post, select } from "../modules/photo";
import { lifecycle } from "recompose";
import { ImagePicker, Permissions } from "expo";

let PhotoContainer = props => (
  <View>
    <Text>Photo</Text>
    <Photo {...props} />
  </View>
);

const mapStateToProps = (state, ownProps) => {
  console.log("state", state.photo, ownProps);
  return {
    photos: state.photo.selectedFiles
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postPhoto() {
      dispatch(post());
    },
    selectPhoto(e) {
      console.log(e);
      //TODO　1つめのみ
      dispatch(select(e[0]));
    },
    requestPhoto() {
      dispatch(request());
    },
    pickImageForNative: async () => {
      const { cameraStatus } = await Permissions.askAsync(Permissions.CAMERA);
      const { cameraRollStatus } = await Permissions.askAsync(
        Permissions.CAMERA_ROLL
      );
      console.log(cameraRollStatus);
      console.log(cameraStatus);
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3]
      });
      console.log(result);
      if (!result.cancelled) {
        dispatch(select(result));
      }
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PhotoContainer);
