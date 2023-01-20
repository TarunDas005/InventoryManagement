import {combineReducers} from 'redux';
import productReducer from "./product";

const rootReducer = combineReducers({
    productReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
