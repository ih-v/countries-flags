import { createSlice } from "@reduxjs/toolkit";
import { Country, Status } from "types";
import { loadCountryByName, loadNeighborsByBorder } from "./details-thunks";

export type DetailsSlice = {
  currentCountry: Country | null;
  neighbors: string[];
  status: Status;
  error: string | null;
};

const initialState: DetailsSlice = {
  currentCountry: null,
  neighbors: [],
  status: "idle",
  error: null,
};

const detailsSlice = createSlice({
  name: "@@details",
  initialState,
  reducers: {
    clearDetails: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCountryByName.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadCountryByName.rejected, (state) => {
        state.status = "rejected";
        state.error = "Can not load data";
      })
      .addCase(loadCountryByName.fulfilled, (state, action) => {
        state.status = "idle";
        state.currentCountry = action.payload.data[0];
      })
      .addCase(loadNeighborsByBorder.fulfilled, (state, action) => {
        state.neighbors = action.payload.data.map((country) => country.name);
      });
  },
});

export const { clearDetails } = detailsSlice.actions;
export const detailsReducer = detailsSlice.reducer;
