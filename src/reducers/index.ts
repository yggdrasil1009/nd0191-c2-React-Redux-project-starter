import { combineReducers } from "redux";
import { appReducer } from "./appReducer";
import { ThunkAction } from "redux-thunk";
import { Action } from "redux";

export const rootReducer = combineReducers({
  appReducer: appReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

// Define AppDispatch that supports thunks
export type AppDispatch = ThunkAction<void, RootState, unknown, Action>;

export default rootReducer;
