import React from "react";
import { connect } from "react-redux";
import { Platform, View, Button, Text } from "react-native";
import { Photo } from "../components/Photo";
import { request, post, select, get } from "../modules/photo";
import { ImagePicker, Permissions } from "expo";
import { lifecycle, compose } from "recompose";

//React Native Image Picker(https://github.com/react-community/react-native-image-picker)を使わないでexpoのAPI(https://docs.expo.io/versions/v28.0.0/sdk/imagepicker)を使った理由
//expoをrejectしてnativeコードを触る必要性があるから。どこまで本格的に作るかに依る。

let PhotoContainer = props => (
  <View>
    <Text>Photo</Text>
    <Photo {...props} />
  </View>
);

PhotoContainer = compose(
  lifecycle({
    componentDidMount() {
      this.props.dispatch(get());
    }
  })
)(PhotoContainer);

const mapStateToProps = (state, ownProps) => {
  return {
    entities: state.photo.entities,
    photos: state.photo.selectedFiles
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postPhoto() {
      dispatch(post());
    },
    selectPhoto(e) {
      //とりあえず1つの画像のみをdispatch
      dispatch(select(e[0]));
    },
    requestPhoto() {
      dispatch(request());
    },
    pickImageForNative: async () => {
      //必要に応じてパーミッションへの許可への実装が必要
      //https://docs.expo.io/versions/latest/sdk/permissions#expopermissionscamera_roll
      const { cameraStatus } = await Permissions.askAsync(Permissions.CAMERA);
      const { cameraRollStatus } = await Permissions.askAsync(
        Permissions.CAMERA_ROLL
      );
      console.log(cameraRollStatus);
      console.log(cameraStatus);
      //
      //
      //ImagePicker
      //https://docs.expo.io/versions/v28.0.0/sdk/imagepicker
      let result = await ImagePicker.launchImageLibraryAsync({
        //立ち上がるまで待つ
        allowsEditing: true, //pickした際にEditするUIを見せるかどうか
        aspect: [4, 3]
      });
      if (!result.cancelled) {
        dispatch(select(result));
      }
    },
    dispatch
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PhotoContainer);
