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