import { createAsyncThunk } from "@reduxjs/toolkit";
import { Country, Extra } from "types";

export const loadCountryByName = createAsyncThunk<
  { data: Country[] },
  string,
  { extra: Extra }
>("@@details/load-country-by-name", (name, { extra: { client, api } }) => {
  return client.get(api.searchByCountry(name));
});

export const loadNeighborsByBorder = createAsyncThunk<
  { data: Country[] },
  string[],
  { extra: Extra }
>("@@details/load-neighbors", (borders, { extra: { client, api } }) => {
  return client.get(api.filterByCode(borders));
});
