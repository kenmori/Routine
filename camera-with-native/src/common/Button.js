import React from "react";
import { Button } from "react-native";

export const UploadButton = props => (
  <Button onPress={() => props.postPhoto()} title="upload" />
);
