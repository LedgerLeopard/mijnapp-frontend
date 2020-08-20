import { combineReducers } from "redux";

import { login } from "./authentication.reducer";

const rootReducer = combineReducers({
  login,
});

export default rootReducer;
