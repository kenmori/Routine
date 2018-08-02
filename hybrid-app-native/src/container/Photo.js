import React from "react";
import { connect } from "react-redux";
import { Platform, View, Button, Text } from "react-native";
import { Photo } from "../components/Photo";
import { request, post, select } from "../modules/photo";
import { lifecycle } from "recompose";

let PhotoContainer = props => (
  <View>
    <Text>Photo</Text>
    <Photo {...props} />
  </View>
);

const mapStateToProps = (state, ownProps) => {
  return {
    count: state.counter.count
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postPhoto() {
      dispatch(post());
    },
    selectPhoto() {
      dispatch(select());
    },
    requestPhoto() {
      dispatch(request());
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PhotoContainer);
