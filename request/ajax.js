export const request = (params) => {
    return new Promise((res, rej) => {
        wx.request({
            ...params,
            // url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
            // data: {},
            // header: { 'content-type': 'application/json' },
            // method: 'GET',
            // dataType: 'json',
            // responseType: 'text',
            success: (result) => { res(result) },
            fail: (err) => { rej(err), console.log("shibai") },
            complete: () => {},

        });
    });
}