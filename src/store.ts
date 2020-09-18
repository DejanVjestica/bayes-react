import { TypedUseSelectorHook, useSelector as useSelectorUntyped } from 'react-redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { State } from './types';

const initialState: State = {
  matches: {},
  exampleText: '',
  token: '',
  isOpen: false,
  isLogedIn: false,
  isLoaded: false,
  matchecDOM: [],
  page: 0,
  numOfPages: 0,
  isLoading: false,
  isModalAddMatch: false
};

export const { reducer, actions } = createSlice({
  name: 'memory',
  initialState,
  reducers: {
    setExampleText: (state, action) => {
      state.exampleText = action.payload;
    },
    setMatches: (state, action) => {
      state.matches = action.payload;
    },
    addMatches: (state, action) => {
      // TODO: Merge payload with state
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setIsOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    setIsLoggedIn: (state, action) => {
      state.isLogedIn = action.payload;
    },
    setIsLoaded: (state, action) => {
      state.isLoaded = action.payload;
    },
    setMatchesDom: (state, action) => {
      state.matchecDOM = action.payload;
    },
    setisLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setNumOfPages: (state, action) => {
      state.numOfPages = action.payload;
    },
    setModalAddMatch: (state, action) => {
      state.isModalAddMatch = action.payload;
    }
  }
});

export default configureStore({
  reducer,
  devTools: true,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
    immutableCheck: false
  })
});

export { useDispatch } from 'react-redux';

export const useSelector: TypedUseSelectorHook<State> = useSelectorUntyped;
