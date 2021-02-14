let ajaxnum = 0;
export const request = (params) => {
    ajaxnum++
    let header = {...params.header };
    if (params.url.includes("/my/")) {
        // 拼接header 带上token
        header["Authorization"] = wx.getStorageSync("token");
    }

    wx.showLoading({
        title: "正在加载中",
        mask: true,
    });

    return new Promise((res, rej) => {

        wx.request({
            ...params,
            header: header,
            success: (result) => {
                res(result.data.message);
                // console.log(result.data)
            },
            fail: (err) => {
                rej(err), console.log(err);
                console.log(result.data)
            },
            complete: () => {
                ajaxnum--;
                if (ajaxnum === 0) {
                    wx.hideLoading();
                }


            },

        });
    });
}