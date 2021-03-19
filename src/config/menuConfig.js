const menuList=[{
        title:"首页",
        key:"/home"
    },
    {
        title:"商品管理",
        key:"/products",
        children:[
            {
                title:"分类管理",
                key:"/category"
            },
            {
                title:"商品管理",
                key:"/product"
            }
        ]
    }
];
export default menuList;