// store.js
import React, { createContext, useReducer } from 'react';

const initialState = {
  data: [],
  uploadedPicture: null,
};
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'SET_DATA':
        return { ...state, data: action.data };
      case 'SET_UPLOADED_PICTURE':
        return { ...state, uploadedPicture: action.data };
      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
