// pages/search/search.js
import { getqsearch } from '../../request/index.js';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goods: [],
        isFocus: false,
        inpValue: ""
    },
    TimeId: -1,
    handleInput(e) {
        // console.log(e)
        const { value } = e.detail;
        clearTimeout(this.TimeId);
        if (!value.trim()) {
            this.setData({
                goods: [],
                isFocus: false,
            })
            return
        }
        this.setData({ isFocus: true })
        clearTimeout(this.TimeId);
        this.TimeId = setTimeout(() => {
            this.qsearch(value);
        }, 1000);

    },
    async qsearch(query) {

        // console.log(query)
        const res = await getqsearch(query)
            // console.log(res)
        this.setData({
            goods: res
        })

    },
    // 点击 取消按钮
    handleCancel() {
        this.setData({
            inpValue: "",
            isFocus: false,
            goods: []
        })
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