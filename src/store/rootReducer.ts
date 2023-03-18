import { combineReducers } from "redux";
import coursesOverviewReducer from "../containers/coursesOverview/logic/reducer";
import { IRootState } from "./models";

const rootReducer = combineReducers<IRootState>({
  coursesOverview: coursesOverviewReducer,
});

export default rootReducer;
