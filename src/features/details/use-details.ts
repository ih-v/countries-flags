import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "store";

import { clearDetails } from "./details-slice";
import { loadCountryByName } from "./details-thunks";
import { selectDetails } from "./details-selectors";

export const useDetails = (name: string) => {
  const dispatch = useAppDispatch();
  const details = useSelector(selectDetails);

  useEffect(() => {
    dispatch(loadCountryByName(name));

    return () => {
      dispatch(clearDetails());
    };
  }, [name, dispatch]);

  return details;
};
