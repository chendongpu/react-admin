import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import goods from './goods'

const rootReducer = combineReducers({
    view: combineReducers({
        goods
    }),
    router: routerReducer
});

export default rootReducer;
