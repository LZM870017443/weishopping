// pages/goods_list/goods_list.js
import { getgoodslist } from "../../request/index.js";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: [{
                id: 0,
                name: "综合",
                isActive: true
            },
            {
                id: 2,
                name: "销量",
                isActive: false
            },
            {
                id: 3,
                name: "价格",
                isActive: false
            },

        ],
        goodsLists: []
    },
    //请求参数
    requestparmas: {
        query: "",
        cid: "",
        pagenum: "1",
        pagesize: "10"
    },
    totalPages: 1,
    // 点击tab事件
    handerTabItemChang(e) {
        // console.log(e)
        const { index } = e.detail
            // console.log(index)
        const { tabs } = this.data
        tabs.forEach((v, i) => {
            i === index ? v.isActive = true : v.isActive = false;
            this.setData({ tabs })
        })
    },
    // 获取商品列表数据
    async getGoods(requestparmas) {
        // 获取分类数据
        const goodslist = await getgoodslist(requestparmas);
        // console.log(goodslist.goods)
        // 获取总条数
        const total = goodslist.total;
        // console.log(total)
        this.totalPages = Math.ceil(total / requestparmas.pagesize)
            // console.log(this.totalPages)
        this.setData({
            goodsLists: [...this.data.goodsLists, ...goodslist.goods],
        });
        wx.setStorageSync("goodslists", { time: Date.now(), data: this.data.goodsLists });
        wx.stopPullDownRefresh()
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // console.log(options)
        this.requestparmas.cid = options.cid || "";
        this.requestparmas.query = options.query || "";
        this.getGoods(this.requestparmas)
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
        this.setData({
            goodsLists: []
        });
        this.requestparmas.pagenum = 1;
        this.getGoods();

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        // console.log("chudu")
        if (this.requestparmas.pagenum >= this.totalPages) {
            // console.log("到底了")
            wx.showToast({
                title: '到底了',
                image: '../../icons/glgs.jpg',
                duration: 1000,

            });

        } else {
            console.log("没到底")
            this.requestparmas.pagenum++
                this.getGoods();



        }

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})