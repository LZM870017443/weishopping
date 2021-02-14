import { request } from "../request/ajax.js";
let BS_ADS = "https://api-hmugo-web.itheima.net/"
    // 获取轮播图
export const getswiperlist = () => request({ url: BS_ADS + 'api/public/v1/home/swiperdata' }).then((result) => {
    // console.log(result)
    return result
}).catch((err) => {
    console.log(err)
});
// 获取导航栏图
export const getategorylist = () => request({ url: BS_ADS + 'api/public/v1/home/catitems' }).then((result) => {
    // console.log(result)
    return result
}).catch((err) => {
    console.log(err)
});
// 获取楼层数据
export const getflootlist = () => request({ url: BS_ADS + 'api/public/v1/home/floordata' }).then((result) => {
    // console.log(result)
    return result
}).catch((err) => {
    console.log(err)
});


// 获取分类列表
export const getcategorylist = () => request({ url: BS_ADS + 'api/public/v1/categories' }).then((result) => {
    // console.log(result)
    return result
}).catch((err) => {
    console.log(err)
});
// 获取商品列表
export const getgoodslist = (requestparmas) => request({ url: BS_ADS + 'api/public/v1/goods/search', data: requestparmas }).then((result) => {
    // console.log(requestparmas)
    return result
}).catch((err) => {
    console.log(err)
});
// 获取商品详情
export const getdetailobj = (goods_id) => request({ url: BS_ADS + 'api/public/v1/goods/detail', data: { goods_id } }).then((result) => {
    // console.log(goods_id)
    return result
}).catch((err) => {
    console.log(err)
});

// // 获取token
// export const gettoken = (loginParams) => request({
//     url: BS_ADS + 'api/public/v1/users/wxlogin',
//     data: loginParams,
//     method: "post"
// }).then((result) => {
//     // console.log(goods_id)
//     return result
// }).catch((err) => {wx
//     console.log(err)
// });
// 获取订单号
export const getOrder = (orderParams) => request({ url: BS_ADS + 'api/public/v1/my/orders/create', data: orderParams, method: "POST" }).then((result) => {
    // console.log(result)
    return result
}).catch((err) => {
    console.log(err)
});
// 获取订单状态
export const getchkOrder = (order_number) => request({ url: BS_ADS + 'api/public/v1/my/orders/chkOrder', data: { order_number }, method: "POST" }).then((result) => {
    // console.log(result)
    return result
}).catch((err) => {
    console.log(err)
});
// 获取订单
export const getsOrder = (type) => request({ url: BS_ADS + 'api/public/v1/my/orders/all', data: { type } }).then((result) => {
    // console.log(result)
    return result
}).catch((err) => {
    console.log(err)
});
// // 搜索
export const getqsearch = (query) => request({ url: BS_ADS + 'api/public/v1/goods/qsearch', data: { query } }).then((result) => {
    // console.log(qsearch)
    return result
}).catch((err) => {
    console.log(err)
});