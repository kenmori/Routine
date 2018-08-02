import React from "react";
import { connect } from "react-redux";
import { View, Button, Text } from "react-native";
import { downCounter, upCounter } from "../modules/counter";

let Counter = ({ count, up, down }) => (
  <View>
    <Text>{count}</Text>
    <Button onPress={() => up()} title="up" />
    <Button onPress={() => down()} title="down" />
  </View>
);

const mapStateToProps = (state, ownProps) => {
  return {
    count: state.counter.count
  };
};

const mapDispatchToProps = dispatch => {
  return {
    up() {
      dispatch(upCounter());
    },
    down() {
      dispatch(downCounter());
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Counter);
