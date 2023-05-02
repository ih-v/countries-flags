import { useEffect } from "react";
import { useSelector } from "react-redux";

import { RootState, useAppDispatch } from "store";
import { loadCountries } from "./countries-thunks";
import { selectControls } from "features/controls/controls-selectors";
import {
  selectCountriesInfo,
  selectVisibleCountries,
} from "./countries-selectors";
import { Country } from "types";

export const useCountries = (): [
  Country[],
  ReturnType<typeof selectCountriesInfo>
] => {
  const dispatch = useAppDispatch();
  const controls = useSelector(selectControls);
  const countries = useSelector((state: RootState) =>
    selectVisibleCountries(state, controls)
  );
  const { status, error, qty } = useSelector(selectCountriesInfo);

  useEffect(() => {
    if (!qty) {
      dispatch(loadCountries());
    }
  }, [qty, dispatch]);

  return [countries, { status, error, qty }];
};
