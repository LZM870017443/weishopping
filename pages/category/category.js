// pages/category/category.js
import { getcategorylist } from "../../request/index.js";
Page({

    /**
     * 页面的初始数据
     */
    data: {

        leftMenulist: [],
        rightMenulist: [],
        // 被点击的左侧的菜单
        currentIndex: 0,
        // 右侧内容的滚动条距离顶部的距离
        scrollTop: 0
    },

    categorylists: [],

    // 左侧菜单的点击事件
    handleItemTap(e) {
        const { index } = e.currentTarget.dataset;
        let rightMenulist = this.data.categorylists[index].children
        this.setData({
            currentIndex: index,
            rightMenulist,
            // // 重新设置 右侧内容的scroll-view标签的距离顶部的距离
            scrollTop: 0
        })

    },
    // getCates() {
    //     // 获取分类数据
    //     const categorylists = getcategorylist();
    //     // console.log(categorylists)
    //     var categorylist = Promise.resolve(categorylists);
    //     categorylist.then((result) => {
    //             let categorylists = result.data.message;
    //             // 本地存储
    //             wx.setStorageSync("categorylists", { time: Date.now(), data: categorylists });
    //             // 左边名
    //             let leftMenulist = categorylists.map(v => v.cat_name);
    //             console.log(categorylists)
    //                 // 右边商品显示
    //             let rightMenulist = categorylists[0].children
    //             this.setData({
    //                 categorylists,
    //                 leftMenulist,
    //                 rightMenulist
    //             });

    //         },

    //     );
    // },
    async getCates() {
        // 获取分类数据
        const categorylist = await getcategorylist();
        // console.log(categorylist)
        this.categorylists = categorylist;
        // console.log(categorylist)
        // 本地存储
        wx.setStorageSync("categorylists", { time: Date.now(), data: this.categorylists });
        // 左边名
        let leftMenulist = this.categorylists.map(v => v.cat_name);
        // 右边商品显示
        let rightMenulist = this.categorylists[0].children
        this.setData({
            categorylists: this.categorylists,
            leftMenulist,
            rightMenulist
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        const categorylists = wx.getStorageSync("categorylists");
        if (!categorylists) {
            // 不存在  发送请求获取数据
            this.getCates()
        } else {
            // 有旧的数据 定义过期时间
            if (Date.now() - categorylists.time > 10000 * 10) {
                this.getCates();
            } else {
                // 可以使用旧的本地数据
                this.categorylists = categorylists.data;
                let leftMenulist = this.categorylists.map(v => v.cat_name);
                // console.log(leftMenulist)
                // 右边商品显示
                let rightMenulist = this.categorylists[0].children
                this.setData({
                    leftMenulist,
                    rightMenulist
                });

            }
        }

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