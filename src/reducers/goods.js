import types from '../constants';

const initialState = {
    loading: false,
    listData: {
        page: 1,
        rows: 20,
        total_number: 0,
        list: [],
    },
    list: [],
    categoryTree:[],
    categoryList: [],
    data: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        // 分类
        case types.goods.START_GET_GOODS_CATEGORY_LIST:
            return Object.assign({}, state, {
                loading: true
            });
        case types.goods.SET_GOODS_CATEGORY_LIST:
            return Object.assign({}, state, {
                categoryTree: action.categoryTree,
                categoryList: action.categoryList,
                loading: false,
            });
        default:
            return state;
    }
}
