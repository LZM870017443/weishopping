// pages/inde/index.js
// import { request } from "../../request/ajax.js";
import { getswiperlist } from "../../request/index.js";
import { getategorylist } from "../../request/index.js";
import { getflootlist } from "../../request/index.js";
Page({

    /**
     * 页面的初始数据
     */

    data: {
        swiperlist: [],
        categorylist: [],
        flootlist: []

    },
    // 获取轮播图
    async getswiperlist() {
        const swiperlist = await getswiperlist();
        this.setData({ swiperlist })
    },
    // 获取导航栏图
    async getcategorylist() {
        const categorylist = await getategorylist();
        this.setData({ categorylist })
    },
    async getflootlist() {
        const flootlist = await getflootlist();
        this.setData({ flootlist })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.getswiperlist();
        this.getcategorylist();
        this.getflootlist()
            // 获取轮播图
            // const swiperlists = getswiperlist();
            // // console.log(swiperlists)
            // var swiperlist = Promise.resolve(swiperlists);
            // swiperlist.then((result) => { this.setData({ swiperlist: result }) });
            // 获取导航栏图
            // const categorylists = getategorylist();
            // var categorylist = Promise.resolve((categorylists));
            // categorylist.then((result) => { this.setData({ categorylist: result }) });
            // 获取楼层数据
            // const flootlists = getflootlist();
            // var flootlist = Promise.resolve((flootlists));
            // // console.log(flootlist)
            // flootlist.then((result) => { this.setData({ flootlist: result }) });



        // var reqTask = wx.request({
        //     url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
        //     data: {},
        //     header: { 'content-type': 'application/json' },
        //     method: 'GET',
        //     dataType: 'json',
        //     responseType: 'text',
        //     success: (result) => {
        //         // console.log(result)
        //         this.setData({ swiperlist: result.data.message })
        //             // console.log(this.data.swiperlist)
        //     },
        //     fail: () => {},
        //     complete: () => {}
        // });

        // // 获取轮播图
        // request({ url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata' }).then((result) => {
        //     this.setData({ swiperlist: result.data.message })
        // }).catch((err) => {
        //     console.log(err)
        // });
        // // 获取导航栏图
        // request({ url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems' }).then((result) => {
        //     this.setData({ categorylist: result.data.message })
        // }).catch((err) => {
        //     console.log(err)
        // });
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