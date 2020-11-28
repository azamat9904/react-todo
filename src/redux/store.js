import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { listReducer, colorReducer } from './reducers';
import thunk from "redux-thunk";

const reducers = combineReducers({
    listState: listReducer,
    colorState: colorReducer
});

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default store;