import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();
const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    sagaMiddleware,
)(createStore);

const initialState = {};
const store = createStoreWithMiddleware(rootReducer, initialState);
sagaMiddleware.run(rootSaga)
export default store
