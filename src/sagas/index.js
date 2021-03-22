import { fork } from 'redux-saga/effects';
import goodsCategory from './goods/category';



export default function* rootSaga() {
    yield fork(goodsCategory);
}
