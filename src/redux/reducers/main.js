import { combineReducers } from "redux";
import { cartreducer } from "./reducer";
import { balanceReducer } from "./balanceModule";

const rootred = combineReducers({
  cartreducer,
  balanceReducer,
});

export default rootred;
