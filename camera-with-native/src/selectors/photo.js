import { createSelector } from "reselect";

const photoSelector = state => state.photo;
export const getSelectedPhoto = createSelector(
  photoSelector,
  photo => photo.selectedFiles
);
