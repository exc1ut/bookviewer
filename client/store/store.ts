import exampleSlice from "./reducers/sampleReducer";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

const rootReducer = combineReducers({ exampleSlice });

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});
export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector = (selector: (state: AppState) => AppState) =>
  useSelector(selector);

export default store;
