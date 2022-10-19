import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const searchReducer = (state: RootState) => state.search;

export const keywordsSelector = createSelector(
  [searchReducer],
  search => search.keywords
);

export const categorySelector = createSelector(
  [searchReducer],
  search => search.category
);
