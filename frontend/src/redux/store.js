// redux store here

import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { reducer as authReducer} from "./authReducer/reducer";
import {reducer as blogReducer} from './blogReducer/reducer';
import thunk from 'redux-thunk';

const rootReducer=combineReducers({authReducer,blogReducer})
export const store=legacy_createStore(rootReducer,applyMiddleware(thunk))