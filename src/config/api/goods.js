const ROOT_URL = `/admin/`;
export const GoodsApi = {
    category:{
        list:{
            url: `${ROOT_URL}goodscategory/list`,
            method: 'GET',
            showLoading: false,
            needLogin: true,
        },
        sort:{
            url: `${ROOT_URL}goodscategory/sort`,
            method: 'POST',
            showLoading: true,
            needLogin: true,
        },
        del:{
            url: `${ROOT_URL}goodscategory/del`,
            method: 'POST',
            showLoading: true,
            needLogin: true,
        },
        add:{
            url: `${ROOT_URL}goodscategory/add`,
            method: 'POST',
            showLoading: true,
            needLogin: true,
        },
        edit:{
            url: `${ROOT_URL}goodscategory/edit`,
            method: 'POST',
            showLoading: true,
            needLogin: true,
        },
        info:{
            url: `${ROOT_URL}goodscategory/info`,
            method: 'GET',
            showLoading: false,
            needLogin: true,
        }
    }
}
