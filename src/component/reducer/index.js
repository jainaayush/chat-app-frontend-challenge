import { combineReducers } from "redux";
import personReducer from "./PersonReducer";
import SelectcontactReducer from "./SelectcontactReducer";
import TitleReducer from "./TitleReducer";

export const rootReducer = combineReducers({
    user: personReducer,
    SelectcontactReducer:SelectcontactReducer,
    TitleReducer:TitleReducer
})