import { createSlice } from "@reduxjs/toolkit";
import { selectSearchTerm } from "../search/search.slice";
import photos from "./photos.data.js";

const initialState = {
  photos,
};

const options = {
  name: "photos",
  initialState,
  reducers: {
    addPhoto: (state, action) => {
      state.photos.push({
        id: state.photos.length + 1,
        caption: action.payload.caption,
        imageUrl: action.payload.imageUrl,
      });
    },
    removePhoto: (state, action) => {
      state.photos.splice(
        state.photos.findIndex((photo) => photo.id === action.payload),
        1
      );
    },
  },
};

const photosSlice = createSlice(options);

export const { addPhoto, removePhoto } = photosSlice.actions;

export default photosSlice.reducer;

export const selectAllPhotos = (state) => state.photos.photos;
export const selectFilteredPhotos = (state) => {
  const allPhotos = selectAllPhotos(state);
  const searchTerm = selectSearchTerm(state);

  return allPhotos.filter((photo) =>
    photo.caption.toLowerCase().includes(searchTerm.toLowerCase())
  );
};
