import { createSlice } from "@reduxjs/toolkit";
import { Country, Status } from "types";

import { loadCountries } from "./countries-thunks";

export type CountrySlice = {
  status: Status;
  error: string | null;
  list: Country[];
};

const initialState: CountrySlice = {
  status: "idle",
  error: null,
  list: [],
};

const countrySlice = createSlice({
  name: "@@countries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCountries.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadCountries.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload || "Cannot load data";
      })
      .addCase(loadCountries.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.list = action.payload.data;
      });
  },
});

export const countryReducer = countrySlice.reducer;
