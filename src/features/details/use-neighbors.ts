import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "store";

import { loadNeighborsByBorder } from "./details-thunks";
import { selectNeighbors } from "./details-selectors";

export const useNeighbors = (borders: string[] = []) => {
  const dispatch = useAppDispatch();
  const neighbors = useSelector(selectNeighbors);

  useEffect(() => {
    if (borders.length) {
      dispatch(loadNeighborsByBorder(borders));
    }
  }, [borders, dispatch]);

  return neighbors;
};
