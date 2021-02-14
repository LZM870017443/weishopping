// pages/aut/aut.js
// import { gettoken } from '../../request/index'
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    handleGetUserInfo(e) {
        try {
            // console.log(e)
            const { encryptedData, rawData, iv, signature } = e.detail;
            wx.login({
                timeout: 10000,
                success: (result) => {
                    const { code } = result;
                    const loginParams = { encryptedData, rawData, iv, signature, code };
                    console.log(loginParams);
                    var reqTask = wx.request({
                        url: 'https://api-hmugo-web.itheima.net/api/public/v1/users/wxlogin',
                        data: { encryptedData, rawData, iv, signature, code },
                        header: { 'content-type': 'application/json' },
                        method: 'POST',
                        dataType: 'json',
                        responseType: 'text',
                        success: (result) => {
                            // console.log(result)

                        },
                        fail: () => {},
                        complete: () => { wx.setStorageSync("token", 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo'); }
                    });


                },

                fail: () => {},
                complete: () => {}
            });

            wx.navigateBack({
                delta: 1
            });
        } catch (error) {
            console.log(error);
        }


    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})