import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filters: [],
  activeFilter: 'all',
  filteredHeroes: [],
  filtersLoadingStatus: 'idle',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    filtersFetching: (state) => {
      state.filtersLoadingStatus = 'loading';
    },
    filtersFetched: (state, action) => {
      state.filtersLoadingStatus = 'idle';
      state.filters = action.payload;
    },
    filtersFetchingError: (state) => {
      state.filtersLoadingStatus = 'error';
    },
    filtersActiveFilterChanged: (state, action) => {
      state.activeFilter = action.payload;
    },
  },
});

const { actions, reducer } = filtersSlice;

export default reducer;
export const {
  filtersFetching,
  filtersFetched,
  filtersFetchingError,
  filtersActiveFilterChanged,
} = actions;
